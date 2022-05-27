import mongoose from "mongoose";
import { dbmain } from "../DataBase/DbConnection";
const {Producent, Dostawca, Kategoria} = require('../DataBase/models')

export class KategoriaService
{
    async AddKategoria(_NazwaKategorii:string)
    {
        try
        {
            const nowakategoria = new Kategoria({
                NazwaKategorii: _NazwaKategorii
            })

            const prod = await nowakategoria.save();   
             
            return prod
        }
        catch(error)
        {
            throw error
        }
    }

    async GetKategoriaById(id:any)
    {
        try
        {
            let kategoria = await Kategoria.findById(id)
            return kategoria
        }
        catch(error)
        {
            throw error
        }
    }

    async DeleteKategoria(id:any)
    {
        try
        {
            await Kategoria.findByIdAndRemove(id)
        }
        catch(error)
        {
            throw error
        }
    }

    async FindAll()
    {
        try
        {
            let kategorie = await Kategoria.find()
            return kategorie
        }
        catch(error)
        {
            throw error
        }
    }

    async Edit(id:any, _NazwaKategorii:string)
    {
        try
        {
            let kategoria = await Kategoria.findById(id)

            if(_NazwaKategorii != null)
            {
                kategoria.NazwaKategorii = _NazwaKategorii
            }

            let kategoria2 = await Kategoria.findByIdAndUpdate(id, kategoria)
        }
        catch(e)
        {
            throw e
        }
    }
}