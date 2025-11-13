const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let lastData = null;

// Recibir datos desde The Things Stack
app.post("/uplink", (req, res) => {
  console.log("Datos recibidos desde TTS:", req.body);
  lastData = req.body;
  res.sendStatus(200);
});

// Enviar los últimos datos al frontend
app.get("/data", (req, res) => {
  if (lastData) res.json(lastData);
  else res.status(404).json({ error: "No hay datos aún" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Servidor relay activo en el puerto", PORT));

