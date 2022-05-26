import e, { Request, Response } from 'express';
import mongoose from 'mongoose';
import {DostawcaService} from '..//Services/dostawcaService'

const express = require('express');
const router = express.Router();
const app = express()
app.use(express.json())

const dostawcaService = new DostawcaService()

router.post('/add', async (req: Request, res: Response) => 
{

    const {NazwaDostawcy, NumerTelefonu} = req.body;
    try
    {
        let dostawcaId = await dostawcaService.AddDostawca(NazwaDostawcy, NumerTelefonu);
        res.status(200).send(`Udało się dodać dostawcę o ID: ${dostawcaId}`);
    }
    catch(error)
    {
        res.status(400).send("Nie udało się dodać dostawcy");
    }

    
})

router.delete('/delete/:id', async (req: Request, res: Response) => {
    
    try
    {
        const id:any = req.params.id

        let dostawca = await dostawcaService.GetDostawcaById(id)
        if(!dostawca)
        {
            res.status(400).send("Dostawca nie istenieje!");
        }
        const tokenUserId = req.headers.userId

        dostawcaService.DeleteDostawca(id)
        res.status(200).send("Udało Ci się usunąć dostawcę");

    }
    catch(error)
    {
        throw error
    }
})

router.get('/getAll', async (req: Request, res: Response) =>
{
    let dostawcy = await dostawcaService.FindAll()
    res.status(200).send(dostawcy)
})

router.get('/get/:id', async (req: Request, res: Response) =>
{
    const id:any = req.params.id
    let dostawca = await dostawcaService.GetDostawcaById(id)
    res.status(200).send(dostawca)
})


router.put('/edit/:id', async (req: Request, res: Response) => 
{
    const id:any = req.params.id

    const {NazwaDostawcy, NumerTelefonu} = req.body

    await dostawcaService.Edit(id, NazwaDostawcy, NumerTelefonu)

    res.status(200).send("Udało się edytować dostawcę")
})




module.exports = router