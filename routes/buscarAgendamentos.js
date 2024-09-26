const express = require("express");
const router = express.Router();
const Agendamento = require("../models/Agendamento");
const User = require("../models/User");

// Search route
router.post("/", async (req, res) => {
    const searchCategory = req.body.categoria; // Categoria selecionada pelo usuário no menu dropdown
    const searchTerm = req.body.searchCustomText; // Conteúdo digitado pelo usuário na barra de busca
    
    console.log("Search Category:", searchCategory);
    console.log("Search Term:", searchTerm);

    let results = [];
  
    try {
        if (searchCategory === "E-mail") {
            // First find the user by their email in the 'users' collection
            const user = await User.findOne({ username: { $regex: searchTerm, $options: "i" } });
    
            if (user) {
                // If the user is found, then search for agendamentos related to this user
                results = await Agendamento.find({ userId: user._id }).populate('userId');
            }
        } else if (searchCategory === "Corte de cabelo") {
            results = await Agendamento.find({ tipoCorte: { $regex: searchTerm, $options: "i" } }).populate('userId');
        } else if (searchCategory === "Corte de barba") {
            console.log("Searching Corte de barba with term:", searchTerm);
            results = await Agendamento.find({ tipoBarba: { $regex: searchTerm, $options: "i" } }).populate('userId');
        } else if (searchCategory === "Hora") {
            //console.log("Searching Hora with term:", searchTerm);
            results = await Agendamento.find({ hora: { $regex: searchTerm, $options: "i" } }).populate('userId');
        } else if (searchCategory === "Data") {
            //console.log("Searching Data with term:", searchTerm);
            results = await Agendamento.find({ data: { $regex: searchTerm, $options: "i" } }).populate('userId');
        } else if (searchCategory === "CPF") {
            //console.log("Searching CPF with term:", searchTerm);
            const user = await User.findOne({ CPF: { $regex: searchTerm, $options: "i" } });
            if (user) {
                results = await Agendamento.find({ userId: user._id }).populate('userId');
            }
        }

        console.log("Search Results:", results);
        return res.render("meusagendamentos", { results });
    } catch (error) {
      console.error("Error during search:", error);
      return res.status(500).send("Error occurred during search.");
    }
  });  
 
module.exports = router;
