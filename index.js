const express = require("express");
const app = express();
const PORT = process.env.PORT || 4000;
const middleware = require("./utils/middleware");
const indexRouter = require("./routes/index");
const agendamentoRouter = require("./routes/agendamento");
const meusagendamentosRouter = require("./routes/meusagendamentos");
const buscarAgendamentosRouter = require("./routes/buscarAgendamentos")

// db connection
const mongoose = require("mongoose");
mongoose.connect(
  //"mongodb+srv://admin:admin@cluster0.ltclo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  "mongodb://localhost:27017/barbearia_database"
);

// middleware
middleware(app);
app.use(express.urlencoded({ extended: true }));

// routes
app.use("/", indexRouter);
app.use("/agendamento", agendamentoRouter);
app.use("/meusagendamentos", meusagendamentosRouter);
app.use("/buscarAgendamentos", buscarAgendamentosRouter)

// server listen
app.listen(PORT, () => {
  console.log(`The app start on http://localhost:${PORT}`);
});
