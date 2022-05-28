import e, { Request, Response } from 'express';
import mongoose from 'mongoose';
import {ProduktService} from '..//Services/produktService'

const auth = require('../auth')
const express = require('express');
const router = express.Router();
const app = express()
app.use(express.json())

const produktService = new ProduktService()

router.post('/add/:ProducentID/:DostawcaID', auth, async (req: Request, res: Response) => 
{

    const {NazwaProduktu, OpisProduktu, IloscSztukWSklepie, Cena, DataKolejnejDostawy, Kategorie} = req.body;
    try
    {
        const UserID = req.headers.userId
        const ProducentID:any = req.params.ProducentID
        const DostawcaID:any = req.params.DostawcaID
        let ProduktId = await produktService.AddProdukt(UserID, ProducentID, DostawcaID, NazwaProduktu, OpisProduktu, IloscSztukWSklepie, Cena, DataKolejnejDostawy, Kategorie);
        res.status(200).send(`Udało się dodać produkt o ID: ${ProduktId}`);
    }
    catch(error)
    {
        res.status(400).send("Nie udało się dodać nowego produktu");
    }
})

router.delete('/delete/:id', auth, async (req: Request, res: Response) => {
    
    try
    {
        const id:any = req.params.id

        let produkt = await produktService.GetProduktById(id)
        if(!produkt)
        {
            res.status(400).send("Produkt nie istenieje!");
        }

        produktService.DeleteProdukt(id)
        res.status(200).send("Udało Ci się usunąć produkt");

    }
    catch(error)
    {
        throw error
    }
})


router.get('/getAll', async (req: Request, res: Response) =>
{
    let produkt = await produktService.GetProdukt()
    res.status(200).send(produkt)
})

router.get('/get/:id', async (req: Request, res: Response) =>
{
    const id:any = req.params.id
    let produkt = await produktService.GetProduktById(id)
    res.status(200).send(produkt)
})

router.put('/edit/:id', auth, async (req: Request, res: Response) => {

    const id:any = req.params.id
    const IdProducenta:any = req.params.idProducenta
    const IdDostawcy:any = req.params.idDostawcy
    const {NazwaProduktu, OpisProduktu, IloscSztukWSklepie, Cena, DataKolejnejDostawy, ProducentID, DostawcaID} = req.body;
    
    await produktService.EditProdukt(id, IdProducenta, IdDostawcy, NazwaProduktu, OpisProduktu, IloscSztukWSklepie, Cena, DataKolejnejDostawy)
    res.status(200).send("Udało Ci się edytować produkt!");
})

module.exports = router;