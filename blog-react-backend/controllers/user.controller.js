var Admin = require("../models/adminModel");
var Author = require("../models/authorModel");
var bcrypt = require("bcrypt");
module.exports = {
  // async login(req, res) {
  //   await Admin.find({
  //     $and: [{ email: req.body.email }, { password: req.body.password }],
  //   }).then((result) => {
  //     if (result.length == 1) {
  //       res.json({
  //         status: true,
  //         data: result,
  //         message: "Logged in successfully!",
  //       });
  //     } else {
  //       res.json({ status: false });
  //     }
  //   });
  // },

  async login(req, res) {
    try {
      const user = await Admin.findOne({ email: req.body.email });
      if (!user) {
        return res.status(403).json({ message: "Invalid user not found	" });
      }

      const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );

      if (!validPassword) {
        return res.status(403).json({ message: "Invalid password	" });
      }

      return res.status(200).json({
        status: true,
        user,
        message: "Logged in successfully!",
      });
    } catch (error) {
      return res.status(500).json({
        status: false,
        message: "Database Error!",
      });
    }
  },

  async registerUser(req, res) {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);

      const user = new Admin({
        ...req.body,
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
      });

      await user.save();
      return res.status(200).json({
        status: true,
        results: user,
        message: "User registered successfully!",
      });
    } catch (error) {
      return res.status(500).json({
        status: false,
        message: "Database Error!",
      });
    }
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
