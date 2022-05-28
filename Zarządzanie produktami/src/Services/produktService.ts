import mongoose from "mongoose";
import { dbmain } from "../DataBase/DbConnection";
const {Producent, Dostawca, Produkt} = require('../DataBase/models')

export class ProduktService
{
    async AddProdukt(_UserID:any, _ProducentId:any, _DostawcaId:any, _NazwaProduktu:string, _OpisProduktu:string, _IloscSztukWSklepie:Number, _Cena:Number, _DataKolejnejDostawy:Date, _Kategorie:Array<String>)
    {
        try
        {
            let kategorie: Array<String> = new Array<String>()
            _Kategorie.forEach(x =>{kategorie.push(x)})

            const newProdukt = new Produkt({
                UserID: _UserID,
                NazwaProduktu: _NazwaProduktu,
                OpisProduktu: _OpisProduktu,
                IloscSztukWSklepie: _IloscSztukWSklepie,
                Cena: _Cena,
                DataKolejnejDostawy: _DataKolejnejDostawy,
                ProducentID:_ProducentId,
                DostawcaID: _DostawcaId,
                Kategorie: kategorie
            })

            await newProdukt.save();       
            return newProdukt.id;
        }
        catch(error)
        {
            throw error
        }
    }

    async GetProdukt()
    {
        try
        {
            let produkt = await Produkt.find()
            return produkt
        }
        catch(error)
        {
            throw error
        }
    }

    async GetProduktById(ProduktId:any)
    {
        try
        {
            let produkt = await Produkt.findById(ProduktId)
            return produkt
        }
        catch(error)
        {
            throw error
        }
    }

    async DeleteProdukt(id:any)
    {
        try
        {
            await Produkt.findByIdAndRemove(id)
        }
        catch(error)
        {
            throw error
        }
    }

    async EditProdukt(_ProduktId:any, _ProducentId:any, _DostawcaId:any, _NazwaProduktu:string, _OpisProduktu:string, _IloscSztukWSklepie:Number, _Cena:Number, _DataKolejnejDostawy:Date) 
    {
        try 
        {
            let produkt = await Produkt.findById(_ProduktId)
            if(_NazwaProduktu != null)
            {
                produkt.NazwaProduktu = _NazwaProduktu
            }
            if(_OpisProduktu != null)
            {
                produkt.OpisProduktu = _OpisProduktu
            }
            if(_IloscSztukWSklepie != null)
            {
                produkt.IloscSztukWSklepie = _IloscSztukWSklepie
            }
            if(_Cena != null)
            {
                produkt.Cena = _Cena
            }
            if(_DataKolejnejDostawy != null)
            {
                produkt.DataKolejnejDostawy = _DataKolejnejDostawy
            }
            if(_ProducentId != null)
            {
                produkt.ProducentId = _ProducentId
            }
            if(_DostawcaId != null)
            {
                produkt.DostawcaId = _DostawcaId
            }

            await Produkt.findByIdAndUpdate(_ProduktId, produkt)
        } 
        catch (error) {
            throw error
        }
          
    }

}