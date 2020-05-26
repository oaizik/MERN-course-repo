module.exports = {
    MAX_TICKETS: 10,
    PORT: 3000,
    DATA_PATH:"./data/users.json",
    CONTROLLER_EMMITER_MESSAGES:{
        RESERVATION_CREATED:"Your reservation has been created",
        RESERVATION_NOT_CREATED:"Sorry we couldn't add your reservation",
        RESERVATION_CANCELED:"Reservation has been canceled successfuly",
        RESERVATION_NOT_CANCELED:"Reservation hasn't been canceled",
        RESERVATIONS_DELETE:"All reservations has been deleted successfuly",
        RESERVATION_PRINT:"Printing all the reservations",
        RESERVATION_CHANGED:"Your reservation has been changed",
        RESERVATION_NOT_CHANGED:"Sorry we couldn't change your reservation",
        PRINT_LOGS:"Printing logs"
    },
    INDEX_LOG_MESSAGES:{
        PERMISSION_DENIED:"Sorry but You do not have permission to perform such activity",
        PROBLEM:"sorry, but ufortunately we couldn't complete the action"
    }
}