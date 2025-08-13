require('dotenv').config();
const session = require('express-session');
const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;

const express = require('express');

const mongodb = require('./database/connect');
const app = express();

const cors = require('cors');
const MongoStore = require('connect-mongo');

const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Request-with, Content-Type, Accept, Z-key'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, OPTIONS'
  );
  next();
});

app.use(cors({ methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'] }));
app.use(cors({ origin: '*' }));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl:
        process.env.MONGODB_URI || 'mongodb://localhost:27017/tu_basededatos',
      collectionName: 'sessions'
    })
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use('/', require('./routes'));

// Middleware para proteger rutas
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ error: 'No autenticado' });
}

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((obj, done) => {
  done(null, obj);
});

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: 'https://finalproject-6yx6.onrender.com/auth/github/callback'
    },
    function (accessToken, refreshToken, profile, done) {
      // Aquí puedes guardar el usuario en la base de datos si lo deseas
      return done(null, profile);
    }
  )
);

app.get(
  '/auth/github',
  passport.authenticate('github', { scope: ['user:email'] })
);

app.get(
  '/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/' }),
  function (req, res) {
    // Autenticación exitosa
    res.redirect('/');
  }
);

// Ruta protegida que muestra el usuario autenticado
app.get('/profile', ensureAuthenticated, (req, res) => {
  res.json({ user: req.user });
});

// Ruta para cerrar sesión
app.get('/logout', (req, res) => {
  req.logout(() => {
    res.redirect('/');
  });
});

process.on('uncaughtException', (err, origin) => {
  console.log(
    process.stderr.fd,
    `Caught exception: ${err}\n` + `Exception origin: ${origin}`
  );
});

mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(process.env.PORT || port, () => {
      console.log(`Running and db on port  ` + (process.env.PORT || 3000));
    });
  }
});
