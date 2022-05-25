import { ChangeStreamDocument } from "mongodb";
import mongoose from "mongoose";
const {producent} = require('./models')



const connString = 'mongodb+srv://Kisielot:WUqWNriUUvqGw9zM@cluster0.5tj1g.mongodb.net/projzal?retryWrites=true&w=majority'

//export const recipeModel = mongoose.model('recipes', recipeSchema)

export async function dbmain() {
    // 1. Przygotowanie komunikacji - połączenie z bazą danych
    console.log('Connecting to mongo');
    const db = await mongoose.connect(connString)
    console.log('Mongo Connected!')

    // 2. Przygotowanie komunikacji - tworzenie schema z modelu
    //const recipeModel = mongoose.model('recipes', recipeSchema)
}