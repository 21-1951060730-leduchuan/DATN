var Posts = require("../models/postsModel");

module.exports = {
    async addLike (req, res, next) {
        const { type } = req.query;
        const { postId } = req.body;
        const getPost = await Posts.findById(postId);
        const getCountLike = getPost.countLike;
      
        if (type == "add") {
          await Posts.updateOne({ _id: postId }, { countLike: getCountLike + 1 })
            .then((result) => {
              res.json(result);
            })
            .catch((error) => res.json(error));
        } else if (type == "remove" && getCountLike !== 0) {
          await Posts.updateOne({ _id: postId }, { countLike: getCountLike - 1 })
            .then((result) => {
              res.json(result);
            })
            .catch((error) => res.json(error));
        }
      }
}