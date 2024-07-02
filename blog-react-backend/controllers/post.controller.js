var Posts = require("../models/postsModel");

module.exports = {
  createPost(req, res, next) {
    try {
      var body = { ...req.body, poster: req.file.filename };
      var post = new Posts(body);

      post.save().then((saveData) => {
        if (post == saveData) {
          res.json({ status: true, message: "Post added successfully!" });
        } else {
          res.json({ status: false, message: "Database Error!" });
        }
      });
    } catch (e) {
      console.log("ERROR", e);
      res.json({ status: false, message: "Server Error!" });
    }
  },

  duplicatePost(req, res, next) {
    try {
      var post = new Posts(req.body);

      post.save().then((saveData) => {
        if (post == saveData) {
          res.json({ status: true, message: "Post duplicated successfully!" });
        } else {
          res.json({ status: false, message: "Database Error!" });
        }
      });
    } catch (e) {
      res.json({ status: false, message: "Server Error!" });
      console.log("ERROR", e);
    }
  },

  async displayPostList(req, res, next) {
    await Posts.aggregate(
      [
        {
          $lookup: {
            from: "authors",
            localField: "author",
            foreignField: "_id",
            as: "authorData",
          },
        },
      ],
      { $unwind: "$authorData" }
    )
      .then((result) => {
        res.json({ status: true, postListData: result });
      })
      .catch((e) => {
        res.json({ msg: "Error" });
      });
  },

  async updatePostPoster(req, res, next) {
    var body = { ...req.body, poster: req.file.filename };
    await Posts.updateOne({ _id: req.body._id }, body)
      .then((result) => {
        res.json({ status: true });
      })
      .catch((e) => {
        res.json({ status: false, message: "Database Error" });
        console.log(e);
      });
  },

  async updatePostData(req, res, next) {
    var { _id, ...postListData } = req.body;
    await Posts.updateOne({ _id: req.body._id }, postListData)
      .then((result) => {
        res.json({ status: true });
      })
      .catch((e) => {
        res.json({ status: false, message: "Database Error" });
        console.log(e);
      });
  },

  async deletePost(req, res, next) {
    await Posts.deleteOne({ _id: req.body._id })
      .then((result) => {
        res.json({ status: true });
      })
      .catch((e) => {
        res.json({ status: false, message: "Database Error" });
        console.log(e);
      });
  },

  async displaySearchList(req, res, next) {
    await Posts.aggregate(
      [
        {
          $lookup: {
            from: "categories",
            localField: "category",
            foreignField: "_id",
            as: "categoryData",
          },
        },
        {
          $match: {
            title: { $regex: req.body.search, $options: "i" },
          },
        },
      ],
      { $unwind: "$categoryData" }
    )
      .then((result) => {
        //console.log(result[0].categoryData);
        //console.log(result);
        res.json({ status: true, searchListData: result });
      })
      .catch((e) => {
        res.json({ msg: "Error" });
      });
  },

  async displayPostListByCategory(req, res, next) {
    await Posts.aggregate(
      [
        {
          $lookup: {
            from: "authors",
            localField: "author",
            foreignField: "_id",
            as: "authorData",
          },
        },
        {
          $match: {
            category: req.query.category,
          },
        },
      ],
      { $unwind: "$authorData" }
    )
      .then((result) => {
        res.json({ status: true, data: result });
      })
      .catch((e) => {
        res.json({ msg: "Error" });
      });
  },
};
