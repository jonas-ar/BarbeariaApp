const express = require("express");
const app = express();
const PORT = process.env.PORT || 4000;
const middleware = require("./utils/middleware");
const indexRouter = require("./routes/index");
const agendamentoRouter = require("./routes/agendamento");

// db connection
const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://admin:admin@cluster0.ltclo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
);

// middleware
middleware(app);

// routes
app.use("/", indexRouter);
app.use("/agendamento", agendamentoRouter);

// server listen
app.listen(PORT, () => {
  console.log(`The app start on http://localhost:${PORT}`);
});
