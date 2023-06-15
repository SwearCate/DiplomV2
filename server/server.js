const PORT = process.env.PORT ?? 8000
const express = require('express')
const cors = require ('cors')
const {v4: uuidv4} = require('uuid')
const app = express()
const pool = require('./db')
const {response} = require("express");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())
app.use(express.json())
// все задачи

app.get('/todos/:userEmail', async (req, res) =>{


    const {userEmail} = req.params

    try{
        const todos = await pool.query('SELECT * FROM todos WHERE user_email = $1', [userEmail])
        res.json(todos.rows)
    } catch (err){
        console.error(err)
    }
})

// все сотрудники

app.get('/employees/:userEmail', async (req, res) =>{


    const {userEmail} = req.params

    try{
        const employees = await pool.query('SELECT * FROM employees WHERE user_email = $1', [userEmail])
        res.json(employees.rows)
    } catch (err){
        console.error(err)
    }
})

// create a new todo

app.post('/todos', async (req, res) => {
    const { user_email, title, progress, date } = req.body;
    console.log(req.body);
    console.log(user_email, title, progress, date);
    const id = uuidv4();
    try {
        const newToDo = await pool.query(
            'INSERT INTO todos(id, user_email, title, progress, date) VALUES($1, $2, $3, $4, $5)',
            [id, user_email, title, progress, date]
        );
        res.json({ id, user_email, title, progress, date }); // Send the response back to the client
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Ошибка создания задания' });
    }
});

// edit todo
app.put('/todos/:id', async (req, res) => {
    const { id } = req.params;
    console.log(req.body);

    const { user_email, title, progress, date } = req.body;

    console.log(user_email)
    console.log(title)

    try {
        const editToDo = await pool.query(
            'UPDATE todos SET user_email = $1, title = $2, progress = $3, date = $4 WHERE id = $5 RETURNING *;',
            [user_email, title, progress, date, id]
        );
        res.json(editToDo.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Ошибка редактирования задания' });
    }
});

// delete a todo
app.delete('/todos/:id', async (req, res) => {
    const  {id} = req.params
    try {
        const deleteToDo = await pool.query('DELETE FROM todos WHERE id = $1;',[id] )
        res.json(deleteToDo)
    } catch (err){
        console.error(err)
    }
})

// signup
app.post('/signup', async (req, res) => {
    const {email, password} = req.body
    const salt = await bcrypt.genSaltSync(10)
    const hashedPassword = bcrypt.hashSync(password, salt)
    try {
        const signUp = await pool.query('INSERT INTO users (email, hashed_password) VALUES($1, $2)',
            [email, hashedPassword])
        const token = jwt.sign({email}, 'secret', {expiresIn: '1hr'})

        res.json({email, token})


    } catch (err){
        console.error(err)
        if(err){
            res.json({ detail: err.detail})
        }
    }
})



// login
app.post('/login', async (req, res) => {
    const {email, password} = req.body
    try {
        const users = await pool.query('SELECT * FROM users WHERE email = $1', [email])
        const token = jwt.sign({email}, 'secret', {expiresIn: '1hr'})
        if(!users.rows.length) return res.json({detail: "Пользователя не существует"})
       const success = await bcrypt.compare(password, users.rows[0].hashed_password)
        if(success){
            res.json({'email' : users.rows[0].email, token})
        } else {
            res.json({detaul : 'Ошибка авторизации'})
        }
        console.log(users.rows)
    } catch (err){
        console.error(err)
    }
})


app.listen(PORT, ()=> console.log('Server running on ' + PORT ))