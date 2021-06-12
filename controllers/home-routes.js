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

router.get("/users/:id", async (req, res) => {
  console.log(req.session)
  if (!req.session.loggedIn) {
    res.redirect('/login');
  } else {
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

    let user = userDashboard.get({ plain: true });
    res.render("dashboard", { posts: user.posts });
  } catch (error) {
    res.status(500).json(error);
  }
}});

router.get('/login', (req, res) => {
  // if (req.session.loggedIn) {
  //   res.redirect('/');
  //   return;
  // }

  res.render('login');
});

module.exports = router;
