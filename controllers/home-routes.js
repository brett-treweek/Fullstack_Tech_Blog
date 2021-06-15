const router = require("express").Router();
const { Posts, User, Comments } = require("../models");

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

router.get("/dashboard", async (req, res) => {
  if (!req.session.loggedIn) {
    res.redirect("/login");
  } else {
    try {
      console.log("YYYYYYYYYYYYYYYYYYY", req.session.userId);
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

router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render("login");
});

module.exports = router;
