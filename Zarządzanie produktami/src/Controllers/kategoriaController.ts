import e, { Request, Response } from 'express';
import mongoose from 'mongoose';
import {KategoriaService} from '../Services/kategoriaService'

const express = require('express');
const router = express.Router();
const app = express()
app.use(express.json())

const kategoriaService = new KategoriaService()

router.post('/add', async (req: Request, res: Response) => 
{

    const {NazwaKategorii} = req.body;
    try
    {
        let kategoriaId = await kategoriaService.AddKategoria(NazwaKategorii);
        res.status(200).send(`Udało się dodać kategorię o ID: ${kategoriaId}`);
    }
    catch(error)
    {
        res.status(400).send("Nie udało się dodać kategorii");
    }

    
})

router.delete('/delete/:id', async (req: Request, res: Response) => {
    
    try
    {
        const id:any = req.params.id

        let kategoria = await kategoriaService.GetKategoriaById(id)
        if(!kategoria)
        {
            res.status(400).send("Kategoria nie istenieje!");
        }
        const tokenUserId = req.headers.userId

        kategoriaService.DeleteKategoria(id)
        res.status(200).send("Udało Ci się usunąć kategorię");

    }
    catch(error)
    {
        throw error
    }
})

router.get('/getAll', async (req: Request, res: Response) =>
{
    let kategorie = await kategoriaService.FindAll()
    res.status(200).send(kategorie)
})

router.get('/get/:id', async (req: Request, res: Response) =>
{
    const id:any = req.params.id
    let kategoria = await kategoriaService.GetKategoriaById(id)
    res.status(200).send(kategoria)
})

router.put('/edit/:id', async (req: Request, res: Response) => 
{
    const id:any = req.params.id

    const {NazwaKategorii} = req.body

    await kategoriaService.Edit(id, NazwaKategorii)

    res.status(200).send("Udało się edytować kategorię")
})




module.exports = router