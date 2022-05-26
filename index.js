const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const session = require("express-session");
const connection = require("./database/database");

//Controllers
const categoriesController = require("./categories/CategoriesController");
const articlesController = require("./articles/ArticlesController");
const usersController = require("./users/UsersController");

//Models
const Category = require("./categories/Category");
const Article = require("./articles/Article");
const User = require("./users/User")

//Sessions
app.use(session({
  secret: "zigzagzaplatz",
  cookie: { maxAge: 30000000 },
}));

//Set view engine
app.set('view engine', 'ejs');

//Set Static folder
app.use(express.static('public'));

//Set up Body Parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Database set up
connection.authenticate().
  then(()=>{
    console.log("Connected to DB");
  }).catch(err => {
    console.log("Error connecting to the Database: ", err);
  })

//Set controller routes
app.use("/", categoriesController);
app.use("/", articlesController);
app.use("/", usersController);

//Set index route
app.get('/', (req, res) => {
  Article.findAll({ 
    order:[['createdAt', 'DESC']],
    limit: 4,
  }).then( articles => {
      Category.findAll().then(categories => {
        res.render('index', { articles, categories });
      })
  });
});

app.get("/:slug", (req, res) => {
  let slug = req.params.slug;
  Article.findOne({
    where: {
      slug
    }
  }).then(article => {
    if (article) {
      Category.findAll().then(categories => {
        res.render("article", { article, categories });
      })
    } else {
      res.redirect("/");
    }
  }).catch(err => {
    res.redirect("/");
  })

});

app.get("/category/:slug", (req, res) => {
  let slug = req.params.slug;
  Category.findOne({
    where: { slug,},
    include: [{model: Article}],
  }).then( category => {  
    if (category) {
      Category.findAll().then( categories => {
        res.render("index", { articles: category.articles, categories })
      })
    } else {
      redirect("/");
    }
  }).catch( err => {
    redirect("/");
  });
});

const port = 8080;

app.listen(port, () => {
  console.log("App running on port ", port);
})