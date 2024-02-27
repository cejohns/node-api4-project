const express = require('express')
const cors = require('cors')
require('dotenv').config()

const app = express()

app.use(cors())
app.use(express.json()) // Middleware to parse JSON bodies

let users = [] // Simple in-memory array to store users

// GET /api/users - Returns an array of users
app.get('/api/users', (req, res) => {
    res.json(users)
})

// POST /api/register - Creates a user and returns the newly created user
app.post('/api/register', (req, res) => {
    const { username, password } = req.body
    if (!username || !password) {
        return res.status(400).send('Username and password are required')
    }
    const newUser = { username, password } // In a real app, you should hash the password before storing it
    users.push(newUser)
    res.status(201).json(newUser)
})

// POST /api/login - Checks user credentials and responds with a welcome message
app.post('/api/login', (req, res) => {
    const { username, password } = req.body
    const user = users.find(u => u.username === username && u.password === password) // This is insecure; always hash passwords in real applications
    if (user) {
        res.send(`Welcome ${username}!`)
    } else {
        res.status(401).send('Invalid credentials')
    }
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
