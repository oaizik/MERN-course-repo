const EventEmitter = require('events');
const config = require('./config');
const moment = require('moment');

class Reservation {
    constructor(id, date, num_of_tickets, user) {
        this.id = id;
        this.date = date;
        this.num_of_tickets = num_of_tickets;
        this.user = user;
    }
    // getters & setters
    getId() {
        return this.id;
    }

    setId(new_id) {
        this.id = new_id;
    }

    getNumOfTickets() {
        return this.num_of_tickets;
    }

    setNumOfTickets(new_num_of_tickets ) {
        this.num_of_tickets = new_num_of_tickets;
    }

    getDate() {
        return this.date;
    }

    setDate(new_date) {
        this.date = new_date;
    }

    getUser() {
        return this.user;
    }

    getUserName() {
        return this.user.getName();
    }
}

class Controller extends EventEmitter {
    constructor(tickest_for_sale) {
        super();
        this.tickest_for_sale = tickest_for_sale;
        this.reservations = [];
        this.logs = `${moment().format()}:reservation session has begin with ${tickest_for_sale} tickest for sale\n`;
    }
    // Printing all the logs that collected during the execution
    getLogs() {
        this.logs += `${moment().format()}::: get logs request request\n`;

        this.emit("Get Logs"); 
        return this.logs;
    }
    // Printing all reservations logs
    getAllReservations() {
        this.logs += `${moment().format()}::: get all reservations request\n`;
        
        this.emit("Print all reservations"); 
        return this.reservations;
    }
    // Add reservation to the array
    addReservation(date, tickets, user) {
        if (tickets <= this.tickest_for_sale) {
            let id = 1;
            if (this.reservations.length != 0) {
                id = this.reservations[this.reservations.length - 1].getId() + 1;
            }
            let res = new Reservation(id, date, tickets, user);
            this.reservations.push(res);
            this.tickest_for_sale -= tickets;
            this.logs += `${moment().format()}::: adding reservation, ${tickets} tickets for ${res.getUserName()}\n`;
            
            this.emit("Add reservation", res);
            return res;
        } else {
            this.logs += `${moment().format()}::: Unsuccessful reservation by ${res.getUserName()}, the maximum tickets avilable is - ${this.tickest_for_sale}\n`;

            this.emit("Add reservation", false);
            return false;
        }
    }
    // Edit reservation, only change the tickets number
    editReservation(id, date, new_num_of_tickets) {
        const old_reservation = this.reservations.find((reservation) => reservation.getId() === id);
        if (old_reservation) {
            if ((new_num_of_tickets <= this.tickest_for_sale + old_reservation.num_of_tickets) && (old_reservation.num_of_tickets != new_num_of_tickets)) {               
                this.tickest_for_sale += old_reservation.num_of_tickets;
                this.tickest_for_sale -= new_num_of_tickets;
                old_reservation.setNumOfTickets(new_num_of_tickets);               
                old_reservation.setDate(date);
                this.logs += `${moment().format()}::: reservation id:${old_reservation.getId()} has been successfuly edited with ${new_num_of_tickets}\n`;
                
                this.emit("Change reservation", old_reservation);
                return true;
            }
        } else {
            this.logs += `${moment().format()}::: reservation id:${old_reservation.getId()} hesn't found\n`;
            
            this.emit("Change reservation", false);
            return false;
        }
    }
    // Remove reservation from the array
    cancelReservation(id) {
        const reservation = this.reservations.find((reservation) => reservation.getId() === id);
        if (reservation) {
            this.tickest_for_sale += reservation.getNumOfTickets();
            this.reservations = this.reservations.filter((reservation) => reservation.getId() != id);
            this.logs += `${moment().format()}::: reservation id ${reservation.getId()} has been canceled\n`;
            
            this.emit("Cancel Reservation", true);
            return true;

        } else {
            this.logs += `${moment().format()}::: reservation id:${reservation.getId()} hesn't found\n`;
            
            this.emit("Cancel Reservation", false);
            return false;
        }
    }
    // Clear reservations array
    deleteAllReservations() {
        this.reservations = [];
        this.tickest_for_sale = config.MAX_TICKETS;
        this.logs += `${moment().format()}::: delete all reservations request\n`;
        
        this.emit("Delete all reservations");
        return true;
    }
}

// the event emitter executer, get the number of available tickets when the session start, and create a controller instance
const system = (new Controller(config.MAX_TICKETS))
    .on("Add reservation", reservation => {
        if (reservation) {
            console.log(config.CONTROLLER_EMMITER_MESSAGES.RESERVATION_CREATED);
        } else {
            console.log(config.CONTROLLER_EMMITER_MESSAGES.RESERVATION_NOT_CREATED);
        }
    })
    .on("Cancel Reservation", status => {
        if(status) {
            console.log(config.CONTROLLER_EMMITER_MESSAGES.RESERVATION_CANCELED)
        } else {
            console.log(config.CONTROLLER_EMMITER_MESSAGES.RESERVATION_NOT_CANCELED)
        }
    })  
    .on("Delete all reservations", () => console.log(config.CONTROLLER_EMMITER_MESSAGES.RESERVATIONS_DELETE))
    .on("Print all reservations", () => console.log(config.CONTROLLER_EMMITER_MESSAGES.RESERVATION_PRINT))
    .on("Change reservation", reservation => {
        if (reservation) {
            console.log(config.CONTROLLER_EMMITER_MESSAGES.RESERVATION_CHANGED);
        } else {
            console.log(config.CONTROLLER_EMMITER_MESSAGES.RESERVATION_NOT_CHANGED);
        }
    })
    .on("Get Logs", () => console.log(config.CONTROLLER_EMMITER_MESSAGES.PRINT_LOGS));


module.exports = system;