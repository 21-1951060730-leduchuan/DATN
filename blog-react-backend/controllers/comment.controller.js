var Posts = require("../models/postsModel");

module.exports = {
  async addComment(req, res, next) {
    const { postId, title, comment, fullName, email } = req.body;

    await Posts.updateOne(
      { _id: postId },
      {
        $push: {
          comment: { comment, fullName, email, title },
        },
      }
    )
      .then((result) => res.json(result))
      .catch((error) => res.json(error));
  },

  async getComment(req, res, next) {
    const { type, postId } = req.query;
    const obj = {};

    if (type == "onePost") {
      obj._id = postId;
    } else {
      obj.comment = { $exists: true };
    }

    await Posts.find(obj)
      .then((result) => {
        if (type === "onePost") {
          res.json(result[0].comment);
        } else {
          const arrComment = result.map((comment) => comment.comment);
          res.json(arrComment);
        }
      })
      .catch((error) => res.json(error));
  },

  async handleComment(req, res, next) {
    const { type } = req.query;
    const { commentId } = req.body;

    if (type === "resolve") {
      await Posts.findOneAndUpdate(
        { "comment._id": commentId },
        {
          $set: { "comment.$.status": 1 },
        }
      )
        .then((result) => {
          res.json(result);
        })
        .catch((error) => res.json(error));
    } else if (type === "delete") {
      await Posts.findOneAndUpdate(
        { "comment._id": commentId },
        {
          $pull: { comment: { _id: commentId } },
        }
      )
        .then((result) => {
          res.json(result);
        })
        .catch((error) => res.json(error));
    }
  },
};
