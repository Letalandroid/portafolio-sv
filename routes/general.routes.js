const { Router } = require("express");
const router = Router();
const proyectosModel = require("../models/proyectos");

router.post("/add-proyecto", async (req, res) => {
  console.log(req.body);

  const { imagen, titulo, descripcion, link, linkRepo } = req.body;

  const newProyecto = new proyectosModel({
    imagen, titulo, descripcion, link, linkRepo
  });

  await newProyecto.save();

  res.redirect("http://localhost:5173/add-proyect");
});

router.get("*", (_req, res) => {
  res.status(404).json({
    status: "404",
    message: "Ruta no encontrada.",
  });
});

module.exports = router;
