const { Router } = require("express");
const nodemailer = require("nodemailer");
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

router.get("/proyectos", async (req, res) => {

  const proyectos = await proyectosModel.find().lean();

  res.send(proyectos);

});

router.post("/send-email", async (req, res) => {

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    auth: {
      user: process.env.AUTH_USER,
      pass: process.env.AUTH_PASS,
    },
    tls: { rejectUnauthorized: false },
  });

  transporter.verify(function (error) {
    if (error) {
      console.log(error);
    } else {
      console.log("Server is ready to take our messages");
    }
  });

  const { nombre, email, asunto, mensaje } = req.body;

  const mailOptions = {
    from: email,
    to: process.env.AUTH_EMAIL,
    subject: "Quisiera contactarme contigo!",
    text: `${nombre} quiere contactarse contigo, los siguientes datos del mensaje son:\n
    Email: ${email}\n
    Asunto: ${asunto}\n
    Mensaje: ${mensaje}`,
  };

  await transporter.sendMail(mailOptions, (error) => {
    error ? console.log(error) : console.log("Email enviado ");
    res.redirect(process.env.FRONT_URL);
  });

});

router.get("*", (_req, res) => {
  res.status(404).json({
    status: "404",
    message: "Ruta no encontrada.",
  });
});

module.exports = router;
