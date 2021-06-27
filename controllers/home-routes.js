const router = require("express").Router();
// const { where } = require("sequelize/types");
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

router.get("/view/:id", async (req, res) => {
  try {
    console.log('req.params:', req.params)

    const postData = await Posts.findByPk(req.params.id);
    console.log('postbyPk:', postData)
    const posts = postData.get({ plain: true });
    console.log('PPPPPPPPPPPPPP:',posts)
    res.render("view", {
      posts,
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

router.post("/dashboard", async (req, res) => {
  try {
    const postData = await Posts.create({
      author: req.session.username,
      title: req.body.title,
      content: req.body.content,
      user_id: req.session.userId,
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

router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }

  res.render("login");
});

module.exports = router;
