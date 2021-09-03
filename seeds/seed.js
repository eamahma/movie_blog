const sequelize = require('../config/connection');
const { User, Note } = require('../models');

const userData = require('./userData.json');
//const noteData = require('./noteData.json');
//const genreData = require('./genreData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  
  for (const note of noteData) {
    await Note.create({
      ...note,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  for (const genre of genreData) {
    await Genre.create({
      ...genre,
    });
  }

  process.exit(0);
};

seedDatabase();
