const express = require('express');
const slugify = require('slugify');

//Controller
const Category = require('./Category');

//Middleware
const adminAuth = require('../middlewares/adminAuth');

const router = express.Router();

router.get("/admin/categories/new", adminAuth, (req, res) => {
  res.render("admin/categories/new");
});

router.post("/categories/save", adminAuth, (req, res) => {
  let title = req.body.title;
  if (title) {
    Category.create({
      title,
      slug: slugify(title),
    }).then(() => {
      res.redirect('/admin/categories');
    })
  } else {
    res.redirect("/admin/categories/new");
  }
});

router.get("/admin/categories", adminAuth, (req, res) => {
  Category.findAll().then(categories => {
    res.render("admin/categories/index", {
      categories,
    });
  })
});

router.post("/categories/delete", adminAuth, (req, res) => {
  const catId = req.body.id;
  if (catId && !isNaN(catId)) {
    Category.destroy({
      where: {
        id: catId,
      }
    }).then(() => {
      res.redirect("/admin/categories");
    })
  } else {
    res.redirect("/admin/categories");
  }
});

router.get("/admin/categories/edit/:id", adminAuth, (req, res) => {
  let id = req.params.id;
  if (isNaN(id)) 
    return res.redirect("/admin/categories");
  Category.findByPk(id).then(category => {
    if (category) {
      res.render("admin/categories/edit", {category});
    } else {
      res.redirect("/admin/categories");
    }
  }).catch(err => {
    res.redirect("/admin/categories");
  });
});

router.post("/categories/update", adminAuth, (req, res) => {
  let id = req.body.id;
  let title = req.body.title;
  let slug = slugify(title);
  Category.update({ title, slug }, { where: { id } })
});

module.exports = router;