import mongoose from "mongoose";


const connString = 'mongodb+srv://Kisielot:WUqWNriUUvqGw9zM@cluster0.5tj1g.mongodb.net/projzal?retryWrites=true&w=majority'


export async function dbmain() {
    console.log('Connecting to mongo');
    const db = await mongoose.connect(connString)
    console.log('Mongo Connected!')

}