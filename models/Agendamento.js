const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const AgendamentoSchema = new Schema({
  tipoCorte: { type: String, required: true },
  tipoBarba: { type: String, required: false }, // Só será preenchido se o usuário escolher fazer a barba
  hora: { type: String, required: true },
  data: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Associa ao usuário logado
});

// Export model
module.exports = mongoose.model("Agendamento", AgendamentoSchema);
