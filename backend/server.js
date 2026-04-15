const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());
app.use("/api/diario", require("./routes/diarioRoutes"));
app.use("/api/produto", require("./routes/produtoRoutes"));

mongoose.connect(process.env.MONGO_URI).then(() =>
  app.listen(process.env.PORT, () => {
    console.log(`Servidor rodando !!!`);
  }),
);
