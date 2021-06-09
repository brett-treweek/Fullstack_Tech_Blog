const sequelize = require('../config/connection')
const { Comments, Posts, User } = require('../models')

const testBlogPosts = require('./testBlogPosts.json')
const testComments = require('./testComments.json')
const testUserData = require('./testUserData.json')

const seedDatabase = async () => {
    await sequelize.sync({ force: true })
    await User.bulkCreate(testUserData, {
        individualHooks: true,
        returning: true,
    })
    await Posts.bulkCreate(testBlogPosts)
    await Comments.bulkCreate(testComments)
    process.exit(0)
}

seedDatabase()