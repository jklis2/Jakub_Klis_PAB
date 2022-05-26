import mongoose from "mongoose";

const ProducentSchema = new mongoose.Schema({
    NazwaProducenta: {type: String},
    NumerTelefonu: {type: Number}
},{timestamps:true});

const DostawcaSchema = new mongoose.Schema({
    NazwaDostawcy: {type: String},
    NumerTelefonu: {type: Number}
},{timestamps:true});

const KategoriaSchema = new mongoose.Schema({
    NazwaKategorii: {type: String}
},{timestamps:true});

const Producent = mongoose.model('Producent', ProducentSchema)
const Dostawca = mongoose.model('Dostawca', DostawcaSchema)
const Kategoria = mongoose.model('Kategoria', KategoriaSchema)

module.exports= {Producent, Dostawca, Kategoria}