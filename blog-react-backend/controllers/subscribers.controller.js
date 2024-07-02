var Subscribers = require("../models/subscribersModel");

module.exports = {
    addSubscribers(req, res, next) {
    var subscribers = new Subscribers(req.body);
    subscribers.save().then((saveData) => {
      if (subscribers == saveData) {
        res.json({ status: true, message: "Subscribers added successfully!" });
      } else {
        res.json({ status: false, message: "Database Error" });
      }
    });
  },
};
