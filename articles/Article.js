const Sequelize = require("sequelize");
const connection = require("../database/database");
const Category = require("../categories/Category");

const Article = connection.define('articles', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  slug: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  body:{
    type: Sequelize.TEXT,
    allowNull: false,
  }
});

Category.hasMany(Article); // Means ONE category can have MANY articles. 1-to-N relation.
Article.belongsTo(Category); // Means ONE article belongs to ONE category. 1-to-1 relation.

module.exports = Article;