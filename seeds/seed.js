const sequelize = require('../config/connection');
const { User, Note, Post } = require('../models');

const userData = require('./userData.json');
const postData = require('./postData.json');
//const noteData = require('./noteData.json');
//const genreData = require('./genreData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  
  for (const post of postData) {
    await Post.create({
      ...post,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }
 
  // for (const genre of genreData) {
  //   await Genre.create({
  //     ...genre,
  //   });
  // }

  process.exit(0);
};

seedDatabase();
