const express = require("express");
const slugify = require("slugify");

//Controllers
const Article = require("./Article");
const Category = require("../categories/Category");

//Middleware
const adminAuth = require('../middlewares/adminAuth');

const router = express.Router();

router.get("/admin/articles", adminAuth, (req, res) => {
  Article.findAll({
    include: [{ model: Category }],
  }).then(articles => {
    res.render("admin/articles/index", { articles });
  })
});

router.get("/admin/articles/new", adminAuth, (req, res) => {
  Category.findAll().then(categories => {
    res.render("admin/articles/new", { categories });
  });
});

router.post("/articles/save", adminAuth, (req, res) => {
  let title = req.body.title;
  let body = req.body.body;
  let catId = req.body.category;

  Article.create({
    title,
    slug: slugify(title),
    body,
    categoryId: catId,
  }).then(()=>{
    res.redirect("/admin/articles");
  })
});

router.post("/articles/delete", adminAuth, (req, res) => {
  const id = req.body.id;
  if (id && !isNaN(id)) {
    Article.destroy({
      where: {
        id,
      }
    }).then(() => {
      res.redirect("/admin/articles");
    })
  } else {
    res.redirect("/admin/articles");
  }
});

router.get("/admin/articles/edit/:id", adminAuth, (req, res) => {
  let id = req.params.id;
  if (isNaN(id)) 
    return res.redirect("/admin/articles");
  Article.findByPk(id).then(article => {
    if (article) {
      Category.findAll().then(categories => {
        res.render("admin/articles/edit", { article, categories });
      })
    } else {
      res.redirect("/admin/articles");
    }
  }).catch(err => {
    res.redirect("/admin/articles");
  });
});

router.post("/articles/update", adminAuth, (req, res) => {
  let id = req.body.id;
  let title = req.body.title;
  let slug = slugify(title);
  let body = req.body.body;
  let categoryId = req.body.category;
  Article.update({ title, slug, body, categoryId }, { where: { id } })
});

router.get("/articles/page/:num", (req, res) => {
  const pageSize = 4;
  let page = req.params.num;
  let offset = 0;

  if(!isNaN(page)){
    offset = pageSize*(parseInt(page)-1);
  }

  Article.findAndCountAll({
    limit: pageSize,
    offset,
    order:[['createdAt', 'DESC']],
  }).then( articles => {

    let next;
    if (offset+pageSize >= articles.count) {
      next = false;
    } else {
      next = true;
    }

    Category.findAll().then(categories => {
      let result = {
        page: parseInt(page),
        next,
        articles,
      }
      res.render("admin/articles/page", {result, categories})
    })
  }).catch();
});

module.exports = router;