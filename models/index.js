const User = require('./User');
const Note = require('./Note');
const Genre = require('./Genre');

User.hasMany(Note, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Note.belongsTo(User, {
  foreignKey: 'user_id'
});

Genre.hasMany(Note, {
  foreignKey: 'note_id'
});

module.exports = { User, Note, Genre};
