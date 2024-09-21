const express = require("express");
const router = express.Router();
const Agendamento = require("../models/Agendamento");

// Página de agendamentos
router.get("/", (req, res) => {
  Agendamento.find({ userId: req.user._id })
    .then((agendamentos) => {
      res.render("agendamento", {});
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Erro ao carregar agendamentos");
    });
});

// Rota para agendar
router.post("/", (req, res) => {
  const { tipoCorte, tipoBarba, hora, data, tipoCorteBarba } = req.body;

  const novoAgendamento = new Agendamento({
    tipoCorte,
    tipoBarba: tipoBarba !== "Não" ? tipoCorteBarba : null, // Se não for "Não", inclui o tipo de corte de barba
    hora,
    data,
    userId: req.user._id, // Associando ao usuário logado
  });

  novoAgendamento
    .save()
    .then(() => {
      res.redirect("/agendamento"); // Redireciona para a página de agendamentos
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Erro ao salvar agendamento");
    });
});

// Rota para cancelar agendamento
router.post("/cancelar/:id", (req, res) => {
  Agendamento.findByIdAndDelete(req.params.id)
    .then(() => {
      res.redirect("/agendamento");
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Erro ao cancelar agendamento");
    });
});

module.exports = router;
