import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import db from '../db.js'

const router = express.Router();

// Register a new user endpoint
router.post('/register', (req, res) => {
    const {username, password} = req.body;
    const hashedPassword = bcrypt.hashSync(password, 8);

    try{
        // Save user to DB
        const insertUser = db.prepare(`
            INSERT INTO users(username, password)
            VALUES (?, ?)
            `);
        const userResult = insertUser.run(username, hashedPassword);

        // Create a default todo for the user
        const defaultTodo = "Hello! Add your first todo.";
        const insertTodo = db.prepare(`
            INSERT INTO todos(user_id, task)
            VALUES (?,?)
            `);
        insertTodo.run(userResult.lastInsertRowid, defaultTodo);

        // Create a token
        const token = jwt.sign(
            { id: userResult.lastInsertRowid }, 
            process.env.JWT_SECRET, 
            { expiresIn: '24h' }
        );

        res.json({token});
    }
    catch(err){
        console.log(err.message | "Unexpected error occured" );
        res.sendStatus(503);
    }

});

router.post('/login', (req, res) => {

});

export default router