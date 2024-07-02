
var Admin = require("../models/adminModel");
var Author = require("../models/authorModel");

module.exports = {
  async login(req, res) {
    await Admin
      .find({
        $and: [{ email: req.body.email }, { password: req.body.password }],
      })
      .then((result) => {
        if (result.length == 1) {
          res.json({ status: true, data: result });
        } else {
          res.json({ status: false });
        }
      });
  },

  createAuth(req, res, next) {
    var body = { ...req.body, picture: req.file.filename };
    var author = new Author(body);
    author.save().then((saveData) => {
      if (author == saveData) {
        res.json({ status: true, message: "Author added successfully!" });
      } else {
        res.json({ status: false, message: "Database Error!" });
      }
    });
  },

  async fetchAuthor(req, res, next) {
    await Author.aggregate(
      [
        {
          $lookup: {
            from: "posts",
            localField: "_id",
            foreignField: "author",
            as: "authorData",
          },
        },
      ],
      { $unwind: "$authorData" }
    )
      .then((result) => {
        res.json({ status: true, data: result });
      })
      .catch((e) => {
        res.json({ status: false, message: "Database Error!" });
      });
  },

  async updateAuthorData(req, res, next) {
    var { _id, ...data } = req.body;
    await Author.updateOne({ _id: req.body._id }, data)
      .then((result) => {
        res.json({ status: true, message: "Author updated successfully!" });
      })
      .catch((e) => {
        res.json({ status: false, message: "Database Error!" });
      });
  },

  async deleteAuthor(req, res, next) {
    await Author.deleteOne({ _id: req.body._id })
      .then((result) => {
        res.json({ status: true, message: "Author deleted successfully!" });
      })
      .catch((e) => {
        res.json({ status: false, message: "Database Error!" });
      });
  },

  async updateAuthorPicture(req, res, next) {
    var body = { ...req.body, picture: req.file.filename };
    await Author.updateOne({ _id: req.body._id }, body)
      .then((result) => {
        res.json({ status: true });
      })
      .catch((e) => {
        res.json({ status: false, message: "Database Error" });
      });
  },

  async fetchAdmin(req, res, next) {
    await Admin.find({})
      .then((result) => {
        res.json({ status: true, data: result });
      })
      .catch((e) => {
        res.json({ status: false });
      });
  },

  async updateAdminData(req, res, next) {
    var { _id, ...data } = req.body;
    await Admin.updateOne({ _id: req.body._id }, data)
      .then((result) => {
        res.json({ status: true, message: "Admin updated successfully!" });
      })
      .catch((e) => {
        res.json({ status: false, message: "Database Error!" });
      });
  },

  async updateAdminPicture(req, res, next) {
    var body = { ...req.body, picture: req.file.filename };
    await Admin.updateOne({ _id: req.body._id }, body)
      .then((result) => {
        res.json({ status: true });
      })
      .catch((e) => {
        res.json({ status: false, message: "Database Error" });
      });
  },
};
