const express = require("express");
const router = express.Router();
const Agendamento = require("../models/Agendamento");
const sendEmail = require('../utils/sendEmail');

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
    .then(async () => {
      // Enviar e-mail de confirmação
      const userEmail = req.user.username; // Assumindo que o e-mail está no campo username
      const subject = 'Confirmação de Agendamento';
      const message = `Seu agendamento para ${tipoCorte} foi confirmado para o dia ${data} às ${hora}.`;

      await sendEmail(userEmail, subject, message);
      
      res.redirect("/agendamento");
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
