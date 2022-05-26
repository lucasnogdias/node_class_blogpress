# Guia de Perguntas

Small project built on the eighth module of the [Node.js Class](https://www.udemy.com/course/formacao-nodejs/) by Victor Lima.

It serves a small blog-like web application where you can write and edit articles.

## Stack and Dependencies

- Node.js (v26.14.2)
- npm (v8.5.0)
- Nodemon
- Express
- MySQL
- Sequelize
- EJS
- Bootstrap (v4.5.3)
- TinyMCE

All other dependencies can be found on our `packages.json` file.

## Installing and Running the project

### Install
If you don't already have, install [Node.js](https://nodejs.org/en/), [npm](https://www.npmjs.com/) (npm should come bundled with Node.js so you probably won't have to worry about this), [Nodemon](https://www.npmjs.com/package/nodemon) and [MySQL](https://www.mysql.com/).

After installing those base dependencies you can clone this repository to a local folder on your computer (you'll need to install [git](https://git-scm.com/) to do this).

Once you have the basic dependencies and the project repository cloned on your development machine, go to the root folder of the project and run `npm install` to get the remaining dependencies that are managed by *npm*.

We have two other dependencies that are not being handled by npm: 

The first is Bootstrap. Download the compiled [Bootstrap CSS and JS](https://getbootstrap.com/docs/4.5/getting-started/download/) and unzip the css files to our `public/css` folder, and the js files to our `public/js` folder.

And the Second is [TinyMCE](https://download.tiny.cloud/tinymce/community/tinymce_6.0.3.zip?_ga=2.246069316.1771738575.1653554780-2060136169.1653318424), just downloaded the community version linked here and unzip the contents of it's `/tinymce/js/tinymce` to a `tinymce` folder inside your public folder.

### Running the project
First we'll have to create a new database called `blogpress` on MySQL. This is the database we'll use for the project. 
With the database created open your `/database/database.js` file and change the value of the parameter `[DB_PASSWORD_HERE]` to your MySQL root password on `new Sequelize` function. Do not commit your DB password to the repository.

With the DB setup we can run the project. Go to the root folder of the project and run `nodemon index.js` and the server should start running. If all goes well you'll see a message on your console that says `"App running on port 8080"`. Open your browser of choice and navigate to `localhost:8080` to start using the app.

