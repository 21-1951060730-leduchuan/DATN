var Category = require("../models/categoryModel");

module.exports = {
  createCategory(req, res, next) {
    var body = { ...req.body, poster: req.file.filename };
    var category = new Category(body);
    category.save().then((saveData) => {
      if (category == saveData) {
        res.json({ status: true, message: "Category added successfully!" });
      } else {
        res.json({ status: false, message: "Database Error!" });
        console.log(error);
      }
    });
  },

  async fetchCategory (req, res, next) {
    await Category.find({})
      .then((result) => {
        res.json({ categoryData: result, status: true });
      })
      .catch((e) => {
        res.json({ msg: "Server Error" });
      });
  },

  async displayCategoryList (req, res, next) {
    await Category.find({})
      .then((result) => {
        res.json({ categoryData: result, status: true });
      })
      .catch((e) => {
        res.json({ status: false });
      });
  },

  async updateCategoryData (req, res, next) {
    var { _id, ...categoryData } = req.body;
    await Category.updateOne({ _id: req.body._id }, categoryData)
      .then((result) => {
        res.json({ status: true });
      })
      .catch((e) => {
        res.json({ status: false, message: "Database Error" });
        console.log(e);
      });
  },

  async updateCategoryPoster (req, res, next) {
    var body = { ...req.body, poster: req.file.filename };
    await Category.updateOne({ _id: req.body._id }, body)
      .then((result) => {
        res.json({ status: true });
      })
      .catch((e) => {
        res.json({ status: false, message: "Database Error" });
        console.log(e);
      });
  },

  async deleteCategory (req, res, next) {
    await Category.deleteOne({ _id: req.body._id })
      .then((result) => {
        res.json({ status: true });
      })
      .catch((e) => {
        res.json({ status: false, message: "Database Error" });
        console.log(e);
      });
  },

  async filterCategory (req, res, next) {
    await Posts.find({ category: req.body.category })
      .then((result) => {
        res.json({ status: true, data: result });
      })
      .catch((e) => {
        res.json({ status: false });
      });
  }
};
