const router = require("express").Router();
const { Posts, User } = require("../models");

router.get("/", async (req, res) => {
  try {
    const postData = await Posts.findAll();
    const posts = postData.map((post) => post.get({plain: true}))
    res.render("homepage", {posts});
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get('/dashboard/:id', async (req, res) => {
    try {
        const userDashboard = await User.findByPk(req.params.id, {
            include: [
                {
                    model: Posts,
                    attributes: [
                        'id',
                        'title',
                        'content',
                        'date'
                    ],
                    // include: [
                    //     {
                    //         model: Comments,
                    //         attributes: [
                    //             'author',
                    //             'content',
                    //             'date'
                    //         ]
                    //     }
                    // ]
                }
            ]
        })
        const user = userDashboard.get({ plain: true })
        res.render('homepage')
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router;
