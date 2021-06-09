const router = require("express").Router();
const { Posts, User, Comments } = require("../models");

router.get("/", async (req, res) => {
  try {
    const postData = await Posts.findAll();
    const posts = postData.map((post) => post.get({ plain: true }));
    res.render("homepage", { posts });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/dashboard/:id", async (req, res) => {
  try {
    const userDashboard = await User.findByPk(req.params.id, {
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

    const posts = userDashboard.get({ plain: true });

    console.log("HHHHHHHHHH-------", userDashboard);
    console.log("ooooooooOOOOOO-------", posts);
    console.log("IIIIIIIIII-------", posts.posts[0].comments[0]);

    const comments = posts.posts[0].comments;
    res.render("dashboard", { posts, comments });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
