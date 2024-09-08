const express = require("express");
const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// design
app.use(express.static("public"));
app.set("view engine", "ejs");

// rotas
app.get("/", (req, res) => {
  res.render("index");
});

app.get("/agendamento", (req, res) => {
  res.render("agendamento");
});

app.get("/cadastro", (req, res) => {
  res.render("cadastro");
})

app.get("/login", (req, res) => {
  res.render("login");
})

// escuta do servidor
app.listen(PORT, () => {
  console.log(`The app start on http://localhost:${PORT}`);
});