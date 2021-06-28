const router = require("express").Router();
const { Posts, User, Comments } = require("../models");

// ===================== View Homepage ==================================

router.get("/", async (req, res) => {
  try {
    const postData = await Posts.findAll();
    const posts = postData.map((post) => post.get({ plain: true }));
    res.render("homepage", {
      posts,
      loggedIn: req.session.loggedIn,
      username: req.session.username,
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

// ==================== View Post with comments by ID ===========================

router.get("/view/:id", async (req, res) => {
  try {
    const postData = await Posts.findByPk(req.params.id, {
      include: { model: Comments },
    });
    const posts = postData.get({ plain: true });
    res.render("view", {
      posts,
      comments: posts.comments,
      loggedIn: req.session.loggedIn,
      username: req.session.username,
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

// ====================== View Dashboard ==============================

router.get("/dashboard", async (req, res) => {
  if (!req.session.loggedIn) {
    res.redirect("/login");
  } else {
    try {
      const userDashboard = await User.findByPk(req.session.userId, {
        include: [
          {
            model: Posts,
            include: [
              {
                model: Comments,
              },
            ],
          },
        ],
      });

      let user = userDashboard.get({ plain: true });
      res.render("dashboard", {
        username: user.username,
        id: user.id,
        posts: user.posts,
        loggedIn: req.session.loggedIn,
      });
    } catch (error) {
      res.status(500).json(error);
    }
  }
});

// ============================= Create New Post ============================

router.post("/dashboard", async (req, res) => {
  try {
    const postData = await Posts.create({
      author: req.session.username,
      title: req.body.title,
      content: req.body.content,
      user_id: req.session.userId,
      loggedIn: req.session.loggedIn,
    });

    console.log(" Post Data", postData);

    req.session.save(() => {
      req.session.loggedIn = true;
      res.status(200).json(postData);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// ============================ Delete Post =============================

router.delete("/dashboard", async (req, res) => {
  try {
    console.log("here is the request body ", req.body);
    const Data = await Posts.destroy({
      where: {
        id: req.body.postId,
      },
    });
    req.session.save(() => {
      req.session.loggedIn = true;
      res.status(200).json(Data);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// ========================= Update Post =================================

router.put("/dashboard", async (req, res) => {
  try {
    console.log("here is the request body ", req.body);
    const Data = await Posts.update({
      author: req.session.username,
      title: req.body.title,
      content: req.body.content,
      user_id: req.session.userId,
      loggedIn: req.session.loggedIn,
    },
    {
      where: {
        id: req.body.postId
      }
    }
    );
    req.session.save(() => {
      req.session.loggedIn = true;
      res.status(200).json(Data);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// ============================ Create New Comment ==============================

router.post("/comment", async (req, res) => {
  try {
    const postData = await Comments.create({

      postsId: req.body.postId,
      author: req.session.username,
      content: req.body.content,
      user_id: req.session.userId,
      loggedIn: req.session.loggedIn,
    });
    console.log(" Post Data", postData);
    res.status(200).json(postData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// ========================= Render Login Page ==========================

router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  res.render("login");
});

module.exports = router;
