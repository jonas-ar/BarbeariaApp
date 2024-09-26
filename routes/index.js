const express = require("express");
const passport = require("passport");
const router = express.Router();

const User = require("../models/User");
const Agendamento = require("../models/Agendamento");

router.get('/', async (req, res) => {
  if (!req.isAuthenticated()) {
    // Se o usuário não estiver autenticado, redireciona para a página de login
    return res.redirect('/login');
  }

  try {
    // Recuperar o ID do usuário logado pelo Passport.js
    const userId = req.user._id;

    // Consultar agendamentos do usuário logado no banco de dados
    const agendamentos = await Agendamento.find({ userId: userId });
    // console.log(agendamentos)

    // Renderiza a página index com os agendamentos do usuário
    res.render('index', { agendamentos });
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao carregar agendamentos");
  }
});

router.get("/cadastro", (req, res) => {
  res.render("cadastro");
});

router.post("/cadastro", (req, res) => {
  const { username, CPF, firstName, lastName, password, phone } = req.body;

  const novoUsuario = new User({
    username,
    CPF,
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
