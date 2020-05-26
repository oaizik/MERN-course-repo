const http = require('http');
const url = require('url');
const moment = require('moment');
const config = require('./config');

const controller = require('./controller');
const User = require("./user");

const port = process.env.PORT || config.PORT;

console.log("Welcome to the Lady Gaga show website!");

http.createServer((req, res) => {
    console.log(`Request ${req.method} came from ${req.url}`);

    const urlObject = url.parse(req.url, true, false);
    req.urlObject = urlObject;
    const user = new User();

    switch (req.method) {
        case "GET":
        if (urlObject.pathname === '/') {
            res.writeHeader(200);
            res.end("Welcome to the Lady Gaga ticket service!\nyou can start your session by Contact our API!");
            break;
        } else if (urlObject.pathname === '/admin/getLogs') {
            const admin = user.checkUserAdmin(req.urlObject.query.name, req.urlObject.query.password);
            if (admin) {
                const logs = controller.getLogs();
                res.writeHeader(200);
                res.end(logs);
            } else {
                res.writeHeader(401);
                res.end(config.INDEX_LOG_MESSAGES.PERMISSION_DENIED);
            }
            break;
        } else if (urlObject.pathname === '/admin/getAllReservations') {
            const admin = user.checkUserAdmin(req.urlObject.query.name, req.urlObject.query.password);
            if (admin) {
                const allReservations = JSON.stringify(controller.getAllReservations());
                res.writeHeader(200);
                res.end(allReservations);
            } else {
                res.writeHeader(401);
                res.end(config.INDEX_LOG_MESSAGES.PERMISSION_DENIED);
            }
            break;
        }
        case "POST":
        if (urlObject.pathname === '/addReservation') {
            let reqBody = '';
            req.on('data', chunk => {
                reqBody += chunk.toString();
            });
            req.on('end', () => {
                reqBody = JSON.parse(reqBody);
                const check_user = user.checkUser(reqBody.name, reqBody.password);
                if (check_user) {
                    const done = controller.addReservation(moment().format(), reqBody.num_of_tickets, check_user);
                    if (done) {
                        res.writeHeader(200);
                        res.end(`Hi ${reqBody.name}, We've created a new reservation for ${reqBody.num_of_tickets} tickets, under your name\nYour reservation id is: ${done.getId()}`);
                    }
                } else if (reqBody.name && reqBody.password) {
                    const new_user = user.addUser(reqBody.name, reqBody.password)
                    const done = controller.addReservation(moment().format(), reqBody.num_of_tickets, new_user);
                    if (done) {
                        res.writeHeader(200);
                        res.end(`We've created a new reservation for ${reqBody.num_of_tickets} tickets, under the name: ${reqBody.name}\nYour reservation id is: ${done.getId()}`);
                    }
                }
                res.end(config.INDEX_LOG_MESSAGES.PROBLEM);
            });
            break;
        }
        case "PUT":
        if (urlObject.pathname === '/editReservation') {
            let reqBody = '';
            req.on('data', chunk => {
                reqBody += chunk.toString();
            });
            req.on('end', () => {
                reqBody = JSON.parse(reqBody);
                if(reqBody.id && reqBody.num_of_tickets) {
                    if (controller.editReservation(parseInt(reqBody.id), moment().format(), parseInt(reqBody.num_of_tickets))) {
                        res.end(`The reservation id: ${reqBody.id} was successfully edited`);
                    } else {
                        res.end(config.INDEX_LOG_MESSAGES.PROBLEM);
                    }
                } else {
                    res.writeHeader(400);
                    res.end(`Sorry ${reqBody.id} is not an existing reservation id, try again`);
                }
            });
            break;
        }
        case "DELETE":
        if (urlObject.pathname === '/cancelReservation') {
            let reqBody = '';
            req.on('data', chunk => {
                reqBody += chunk.toString();
            });
            req.on('end', () => {
                reqBody = JSON.parse(reqBody);
                if (controller.cancelReservation(parseInt(reqBody.id))) {
                    res.writeHeader(200);
                    res.end(`The reservation id: ${reqBody.id} was successfully deleted`);
                    console.log(controller.getAllReservations());
                } else {
                    res.writeHeader(400);
                    res.end(`Sorry ${reqBody.id} is not an existing reservation id, try again`);
                }
            });
            break;
        } else if (urlObject.pathname === '/admin/deleteAllReservations') {
            let reqBody = '';
            req.on('data', chunk => {
                reqBody += chunk.toString();
            });
            req.on('end', () => {
                reqBody = JSON.parse(reqBody);
                const admin = user.checkUserAdmin(reqBody.name, reqBody.password);
                if (admin) {
                    controller.deleteAllReservations();
                    res.writeHeader(200);
                    res.end("All the reservations has been destroyed");
                } else {
                    res.writeHeader(401);
                    res.end(config.INDEX_LOG_MESSAGES.PERMISSION_DENIED);
                }
            });
            break;
        }
        default:
        console.log(`url ${req.urlObject.pathname} not exist!`);
        res.writeHeader(404);
        res.write('Bad request');
        res.end();
    }
}).listen(port, () => console.log(`listening on port ${port}`));
