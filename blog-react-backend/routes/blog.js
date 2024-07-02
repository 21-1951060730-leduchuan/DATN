var express = require("express");
var router = express.Router();

var upload = require("./multer");

const userController = require("../controllers/user.controller");
const subscribersController = require("../controllers/subscribers.controller");
const categoryController = require("../controllers/category.controller");
const likeController = require("../controllers/like.controller");
const commentController = require("../controllers/comment.controller");
const postController = require("../controllers/post.controller");

router.post("/create-post", upload.single("poster"), postController.createPost);

router.post("/duplicate-post", postController.duplicatePost);

router.post(
  "/create-category",
  upload.single("poster"),
  categoryController.createCategory
);

router.get("/fetch-category", categoryController.fetchCategory);

router.get("/display-category-list", categoryController.displayCategoryList);

router.post("/update-category-data", categoryController.updateCategoryData);

router.post(
  "/update-category-poster",
  upload.single("poster"),
  categoryController.updateCategoryPoster
);

router.post("/delete-category", categoryController.deleteCategory);

router.get("/display-post-list", postController.displayPostList);

router.post(
  "/update-post-poster",
  upload.single("poster"),
  postController.updatePostPoster
);

router.post("/update-post-data", postController.updatePostData);

router.post("/delete-post", postController.deletePost);

router.get("/display-search-list", postController.displaySearchList);

router.post("/login", userController.login);

router.post(
  "/create-author",
  upload.single("picture"),
  userController.createAuth
);

router.get("/fetch-author", userController.fetchAuthor);

router.post("/update-author-data", userController.updateAuthorData);

router.post("/delete-author", userController.deleteAuthor);

router.post(
  "/update-author-picture",
  upload.single("picture"),
  userController.updateAuthorPicture
);

router.get("/fetch-admin", userController.fetchAdmin);

router.post("/update-admin-data", userController.updateAdminData);

router.post(
  "/update-admin-picture",
  upload.single("picture"),
  userController.updateAdminPicture
);

router.post("/filter-category", categoryController.filterCategory);

router.post("/add-subscribers", subscribersController.addSubscribers);

router.get(
  "/display-post-list-by-category",
  postController.displayPostListByCategory
);

router.post("/add-like", likeController.addLike);

router.post("/add-comment", commentController.addComment);

router.get("/get-comment", commentController.getComment);

router.post("/handle-comment", commentController.handleComment);

module.exports = router;
