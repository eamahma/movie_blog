const User = require('./User');
const Note = require('./Note');
const Genre = require('./Genre');
const Comment = require("./Comment");
const Post = require("./Post");


User.hasMany(Post, {
  foreignKey: "user_id",
});
Post.belongsTo(User, {
  foreignKey: "user_id",
});

Comment.belongsTo(User, {
  foreignKey: "user_id",
});

Comment.belongsTo(Post, {
  foreignKey: "post_id",
});

User.hasMany(Comment, {
  foreignKey: "user_id",
});

Post.hasMany(Comment, {
  foreignKey: "post_id",
});

/*
 Genre.hasMany(Note, {
  foreignKey: 'note_id'
 });
*/

/*
const User = require("./User");
const Post = require("./Post");
const Comment = require("./Comment");

*/

//add genre when firing
module.exports = { User, Note, Post, Comment, Genre};



