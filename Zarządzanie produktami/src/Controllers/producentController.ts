import e, { Request, Response } from 'express';
import mongoose from 'mongoose';
import {ProducentService} from '../Services/producentService'

const auth = require('../auth')
const express = require('express');
const router = express.Router();
const app = express()
app.use(express.json())

const producentService = new ProducentService()

router.post('/add', auth, async (req: Request, res: Response) => 
{

    const {NazwaProducenta, NumerTelefonu} = req.body;
    try
    {
        const UserID = req.headers.userId
        let producentId = await producentService.AddProducent(UserID, NazwaProducenta, NumerTelefonu);
        res.status(200).send(`Udało się dodać producenta o ID: ${producentId}`);
    }
    catch(error)
    {
        res.status(400).send("Nie udało się dodać producenta");
    }

    
})

router.delete('/delete/:id', auth, async (req: Request, res: Response) => {
    
    try
    {
        const id:any = req.params.id

        let producent = await producentService.GetProducentById(id)
        if(!producent)
        {
            res.status(400).send("Producent nie istenieje!");
        }

        producentService.DeleteProducent(id)
        res.status(200).send("Udało Ci się usunąć producenta");

    }
    catch(error)
    {
        throw error
    }
})

router.get('/getAll', async (req: Request, res: Response) =>
{
    let producenci = await producentService.FindAll()
    res.status(200).send(producenci)
})

router.get('/get/:id', async (req: Request, res: Response) =>
{
    const id:any = req.params.id
    let producent = await producentService.GetProducentById(id)
    res.status(200).send(producent)
})

router.put('/edit/:id', auth, async (req: Request, res: Response) => 
{
    const id:any = req.params.id

    const {NazwaProducenta, NumerTelefonu} = req.body

    await producentService.Edit(id, NazwaProducenta, NumerTelefonu)

    res.status(200).send("Udało się edytować producenta")
})




module.exports = router