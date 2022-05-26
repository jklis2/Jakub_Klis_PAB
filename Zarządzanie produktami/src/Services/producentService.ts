import mongoose from "mongoose";
import { dbmain } from "../DataBase/DbConnection";
const {Producent, Dostawca, Kategoria} = require('../DataBase/models')

export class ProducentService
{
    async AddProducent(_NazwaProducenta:string, _NumerTelefonu:number)
    {
        try
        {
            const nowyproducent = new Producent({
                NazwaProducenta: _NazwaProducenta,
                NumerTelefonu: +_NumerTelefonu
            })

            const prod = await nowyproducent.save();   
              
            return prod
        }
        catch(error)
        {
            throw error
        }
    }

    async GetProducentById(id:any)
    {
        try
        {
            let producent = await Producent.findById(id)
            return producent
        }
        catch(error)
        {
            throw error
        }
    }

    async DeleteProducent(id:any)
    {
        try
        {
            await Producent.findByIdAndRemove(id)
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
            let producenci = await Producent.find()
            return producenci
        }
        catch(error)
        {
            throw error
        }
    }

    async Edit(id:any, _NazwaProducenta:string, _NumerTelefonu:number)
    {
        try
        {
            let producent = await Producent.findById(id)

            if(_NazwaProducenta != null)
            {
                producent.NazwaProducenta = _NazwaProducenta
            }
            if(_NumerTelefonu != null)
            {
                producent.NumerTelefonu = _NumerTelefonu
            }

            let producent2 = await Producent.findByIdAndUpdate(id, producent)
        }
        catch(e)
        {
            throw e
        }
    }
}