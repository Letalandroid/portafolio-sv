const Mongoose = require("mongoose");
const { Schema, model } = Mongoose;

const proyectoSchema = new Schema(
  {
    imagen: String,
    titulo: String,
    descripcion: String,
    link: String,
    linkRepo: String
  },
  { versionKey: false }
);

// Crear un modelo
const newProyecto = Mongoose.model("proyectos", proyectoSchema);

module.exports = newProyecto;