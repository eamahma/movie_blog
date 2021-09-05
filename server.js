//make sure session appears in db!

const path = require('path');
const exphbs = require('express-handlebars');
const express = require('express');
const session = require('express-session');
const routes = require('./controllers');
const helpers = require('./utils/helpers');

//const handlebars = require('express-handlebars');
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;



// Set up Handlebars.js engine with custom helpers
const hbs = exphbs.create({ helpers });

const sess = {
  secret: 'Super secret secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
//app.engine('html', hbs.engine);


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Important Note: our /js routing is a bit confusing due to the public/css file share. Keep this in mind when firing new routes!

app.use(express.static(path.join(__dirname, 'public/css')));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//added public/css to route.
app.use(express.static(path.join(__dirname, 'public/css')));

// Set Handlebars as the default template engine.

// app.engine('handlebars', hbs.engine);
// app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

//app.use(express.urlencoded({ extended: true }));
//I suspect routing issues stem from here. 
//app.use(express.static(path.join(__dirname, 'public')));
//app.use(require('./controllers/index'));


sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});