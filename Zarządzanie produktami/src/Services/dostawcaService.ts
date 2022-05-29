import mongoose from "mongoose";
import { dbmain } from "../DataBase/DbConnection";
const {Producent, Dostawca, Produkt} = require('../DataBase/models')

export class DostawcaService
{
    async AddDostawca(_UserID:any, _NazwaDostawcy:string, _NumerTelefonu:number)
    {
        try
        {
            const nowydostawca = new Dostawca({
                UserID: _UserID,
                NazwaDostawcy: _NazwaDostawcy,
                NumerTelefonu: +_NumerTelefonu
            })

            const prod = await nowydostawca.save();   
   
            return prod
        }
        catch(error)
        {
            throw error
        }
    }

    async GetDostawcaById(id:any)
    {
        try
        {
            let dostawca = await Dostawca.findById(id)
            return dostawca
        }
        catch(error)
        {
            throw error
        }
    }

    async DeleteDostawca(id:any)
    {
        try
        {
            await Dostawca.findByIdAndRemove(id)
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
            let dostawcy = await Dostawca.find()
            return dostawcy
        }
        catch(error)
        {
            throw error
        }
    }

    async Edit(id:any, _NazwaDostawcy:string, _NumerTelefonu:number)
    {
        try
        {
            let dostawca = await Dostawca.findById(id)

            if(_NazwaDostawcy != null)
            {
                dostawca.NazwaDostawcy = _NazwaDostawcy
            }
            if(_NumerTelefonu != null)
            {
                dostawca.NumerTelefonu = _NumerTelefonu
            }

            let dostawca2 = await Dostawca.findByIdAndUpdate(id, dostawca)
        }
        catch(e)
        {
            throw e
        }
    }
}