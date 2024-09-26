const session = require("express-session");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/User");
const express = require("express");
const passport = require("passport");

module.exports = function middleware(app) {
  // middlewares
  app.use(session({ secret: "zxcvb", resave: false, saveUninitialized: true }));
  app.use(passport.session());
  app.use(express.static("public"));
  app.set("view engine", "ejs");
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // passport setup
  passport.use(
    new LocalStrategy(async (username, password, done) => {
      try {
        const user = await User.findOne({ username: username });
        if (!user) {
          return done(null, false, { message: "Usuário ou senha incorreto" });
        }
        if (user.password !== password) {
          return done(null, false, { message: "Usuário ou senha incorreto" });
        }
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    })
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (err) {
      done(err);
    }
  });
  // end of passport setup

  // middleware to pass user info to all routes
  app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    next();
  });
};
