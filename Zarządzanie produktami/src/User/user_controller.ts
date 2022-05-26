import { Request, Response } from 'express';
import { send } from 'process';
import {UserService} from './user_service'
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = require('./user_model')
const auth = require("../auth")


const express = require('express');
const router = express.Router();
const app = express()
app.use(express.json())

const _userService = new UserService();

router.post('/register', async (req: Request, res: Response) => {

    try
    {
        const {username, password} = req.body;
        if(!username || !password){
            throw "Nie wszystkie pola zostały uzupełnione"
        }
        if(password.legth < 7){
            throw "Hasło musi mieć minimum 7 znaków!"
        }
        const existingUsername = await User.findOne({username:username})
        if(existingUsername){
            throw "Taka nazwa użytkownika już istnieje!"
        }
        let newUser = await _userService.AddUser(username, password)

        res.status(200).send(newUser.id)
    }
    catch(error)
    {
        res.status(400).send(error);
    }
})

router.post('/login', async (req: Request, res: Response) => {

    try
    {
        const {username, password} = req.body;
        if(!username || !password){
            throw "Nie wszystkie pola zostały uzupełnione"
        }
        
        let token = await _userService.LoginUser(username, password)
        res.cookie('accesstoken', token)
        res.status(200).send(token)

    }
    catch(error)
    {
        res.status(400).send(error);
    }

})
router.get('/logout', auth, async (req:Request, res:Response) => {
    res
      .clearCookie("accesstoken")
      .status(200)
      .send("Wylogowano")  
    });

router.get('/testget', auth, async (req:Request, res:Response) => {
    let x = req.headers.userId
    let y = req.headers.username
    res.status(200).send(`${x} ${y}`)
    });

router.get('/protected', async (req:Request, res:Response) => {
    let x = req.cookies
    res.status(200).send(x)
    })

router.delete('/delete',auth, async (req: Request, res: Response) => {

    try{
        let x = req.headers.userId
        let deletedUser = await _userService.DeleteUser(x)
        res.clearCookie("accesstoken").status(200).send(`Usunięto użytkownika o id: ${deletedUser.id}`)
    }
    catch(error)
    {
        res.status(500).send(error);
    }

})


module.exports = router;