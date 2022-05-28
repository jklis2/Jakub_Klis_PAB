import mongoose from "mongoose";

const ProducentSchema = new mongoose.Schema({
    UserID: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    NazwaProducenta: {type: String},
    NumerTelefonu: {type: Number}
},{timestamps:true});

const DostawcaSchema = new mongoose.Schema({
    UserID: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    NazwaDostawcy: {type: String},
    NumerTelefonu: {type: Number}
},{timestamps:true});

const ProduktSchema = new mongoose.Schema({
    UserID: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    NazwaProduktu: {type: String},
    OpisProduktu: {type: String},
    IloscSztukWSklepie: {type: Number},
    Cena: {type: Number},
    DataKolejnejDostawy: {type: Date},
    ProducentID: {type: mongoose.Schema.Types.ObjectId, ref: 'ProducentSchema'},
    DostawcaID: {type: mongoose.Schema.Types.ObjectId, ref: 'DostawcaSchema'},
    Kategorie: {type: [String]}
},{timestamps:true})

const Producent = mongoose.model('Producent', ProducentSchema)
const Dostawca = mongoose.model('Dostawca', DostawcaSchema)
const Produkt = mongoose.model('Produkt', ProduktSchema)

module.exports= {Producent, Dostawca, Produkt}