'use strict';
const {
  Model
} = require('sequelize');
const cleanser = require('profanity-cleanser')
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Post.belongsTo(models.Tag)
      Post.belongsTo(models.User)
    }
  }
  Post.init({
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    imageURL: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    likes: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Post',
  });

  Post.beforeCreate((post, option) => {
    cleanser.setLocale()
    cleanser.addWords(['anjing', 'babi'])
    post.content = cleanser.replace(post.content)
    post.title = cleanser.replace(post.title)
  })
  return Post;
};