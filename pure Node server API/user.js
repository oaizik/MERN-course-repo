const fs = require('fs');
const config = require('./config');

class User {
    constructor(name, password, admin = false) {
        this.name = name;
        this.admin = admin;
        this.password = password;
    }
    // getters & setters
    getName() {
        return this.name;
    }

    setName(new_name) {
        this.name = new_name;
    }

    getPassword() {
        return this.password;
    }

    setPassword(new_pw) {
        this.password = new_pw;
    }

    isAdmin() {
        return this.admin;
    }

    makeAdmin() {
        this.admin = true;
    }

    isUser(name, password) {
        return (this.getName() === name && this.getPassword() === password)
    }
}

module.exports = class UsersList {
    constructor() {
        this.path = config.DATA_PATH;
        this.users = [];
        this.initUsersList();
    }
    // Initialize the users list every time the program start
    initUsersList() {
        const dataBuffer = fs.readFileSync(this.path);
        const dataJSON = JSON.parse(dataBuffer);
        dataJSON.forEach(u => {
            this.users.push(new User(u.name, u.password, u.admin))
        });
    }
    // Add user to the users array
    addUser(name, password) {
        this.users.push(new User(name, password));
        this.save();
        return this.users[this.users.length - 1];
    }
    // Check if user exist in the users array
    checkUser(name, password) {
        const found = this.users.find((user) => user.isUser(name, password));
        return found ? found : false;
    }
    // Check if user is admin
    checkUserAdmin(name, password) {
        const found = this.users.find((user) => user.isUser(name, password));
        if (found) {
            return found.isAdmin();
        }
        return false;
    }
    // Add user to the users JSON
    save() {
        const dataJSON = JSON.stringify(this.users);
        fs.writeFileSync(this.path, dataJSON)
    }
}
