const express = require("express");
const passport = require("passport");
const router = express.Router();
const User = require("../models/User");

router.get("/", (req, res) => {
  if (req.isAuthenticated()) {
    res.render("index");
  } else {
    res.redirect("/login");
  }
});

router.get("/cadastro", (req, res) => {
  res.render("cadastro");
});

router.post("/cadastro", (req, res) => {
  const { username, firstName, lastName, password, phone } = req.body;

  const novoUsuario = new User({
    username,
    firstName,
    lastName,
    password,
    phone,
  });

  // console.log(novoUsuario);

  novoUsuario
    .save()
    .then(() => {
      res.redirect("/login");
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Erro ao salvar usuário");
    });
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureMessage: true,
    badRequestMessage: "Insira login e senha",
  })
);

router.get("/login", (req, res) => {
  res.render("login");
});

// middleware to check if user is authenticated
router.use((req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect("/login");
  }
});

module.exports = router; // exports router
