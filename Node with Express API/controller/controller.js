const mongoose = require("mongoose");
const moment = require("moment");
const Model = require("../db_files/model");

// get connection details
const { url, options } = require("../db_files/db_connection");

// establish connection with mongo
mongoose
  .connect(url, options)
  .then(db => console.log(`connected to: ${db.connection.name}`))
  .catch(err => console.error("connection error: ", err));

module.exports = {
  // get all members function
  getAllMembers(req, res, next) {
    console.log("get all members request accepted");
    mongoose
      .connect(url, options)
      .then(async () => {
        const result = await Model.find({});

        if (result) res.status(200).json(result);
        else
          res
            .status(500)
            .send("some error occurred while get all members called");
      })
      .catch(err => {
        console.error("some error occurred", err);
        res.status(500).send(err.message);
      });
  },

  // get one member function using mail address
  getMember(req, res, next) {
    console.log("get member request accepted");
    mongoose
      .connect(url, options)
      .then(async () => {
        let { mail_p = null } = req.query;

        const result = await Model.findOne({ mail: mail_p });

        if (result) res.status(200).json(result);
        else
          res
            .status(404)
            .send(`user dosent exist in the system for id: ${mail_p}`);
      })
      .catch(err => {
        res
          .status(500)
          .send(`${err.message}, invaild input for mail_p: ${mail_p}`);
        console.error("some error occurred", err);
      });
  },

  // edit member period time using mail, get user mail and updates period, price and date
  editMemberPeriod(req, res, next) {
    console.log("edit member request accepted");
    mongoose
      .connect(url, options)
      .then(async () => {
        let { mail_p = null, period_p = null } = req.body;

        // check id user with id_p exist!!!
        const verifyExist = await Model.findOne({ mail: mail_p });
        if (!verifyExist) {
          res.status(404).send(`user dosent exist for mail address: ${mail_p}`);
        }

        let date_p = moment();
        switch (period_p) {
          case "month":
            price_p = 100;
            break;
          case "half-year":
            price_p = 500;
            break;
          case "year":
            price_p = 900;
            break;
          default:
            res
              .status(404)
              .send(
                `invaild period argument: ${period_p}\n, input should only be: [month, half-year, year]`
              );
        }
        const result = await Model.updateOne(
          { mail: mail_p },
          {
            $set: {
              startDate: date_p,
              period: period_p,
              price: price_p
            }
          }
        );

        if (result) res.json(result);
        else
          res
            .status(500)
            .send(
              `somthing went wrong while editing the period for user mail: ${mail_p}`
            );
      })
      .catch(err => {
        console.error("some error occurred", err);
        res.status(500).send(err.message);
      });
  },

  // add member to the DB
  addMember(req, res, next) {
    console.log("add member request accepted");
    mongoose
      .connect(url, options)
      .then(async () => {
        let {
          name_p = null,
          age_p = null,
          mail_p = null,
          address_p = null,
          period_p = null
        } = req.body;
        // check if age is vaild number
        if (isNaN(age_p)) {
          res.status(404).send(`invaild input for age: ${age_p}`);
        } else {
          age_p = parseInt(age_p);
        }
        let date_p = moment();
        let price_p = 0;
        switch (period_p) {
          case "month":
            price_p = 100;
            break;
          case "half-year":
            price_p = 500;
            break;
          case "year":
            price_p = 900;
            break;
          default:
            res
              .status(404)
              .send(
                `invaild period argument: ${period_p}.\nvalue should include only: [month, half-year, year]`
              );
        }

        const user = new Model({
          name: name_p,
          age: age_p,
          mail: mail_p,
          address: address_p,
          startDate: date_p,
          period: period_p,
          price: price_p
        });

        const result = await user.save();

        if (result) res.json(result);
        else
          res
            .status(500)
            .send(`somthing went wrong while adding user ${name_p}`);
      })
      .catch(err => {
        if (err.code == 11000) {
          res
            .status(404)
            .send(`the mail address is already exist in the system`);
        } else {
          res.status(500).send(err.message);
          console.error("some error occurred", err);
        }
      });
  },

  // delete member from DB
  removeMember(req, res, next) {
    console.log("remove member request accepted");
    mongoose
      .connect(url, options)
      .then(async () => {
        let { mail_p = null } = req.body;

        // check id user with mail_p exist!!!
        const verifyExist = await Model.findOne({ mail: mail_p });
        if (!verifyExist) {
          res.status(404).send(`user dosent exist for mail address: ${mail_p}`);
        }

        const result = await Model.deleteOne({ mail: mail_p });
        if (result) res.json(result);
        else
          res
            .status(404)
            .send(
              `somthing went wrong while deleting user with mail address: ${mail_p}`
            );
      })
      .catch(err => {
        console.error("some error occurred", err);
        res.status(500).send(err.message);
      });
  }
};
