const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const port = 3019

const app = express()
app.use(express.static(__dirname))
app.use(express.urlencoded({ extended: true }))
app.use(express.json()) // Middleware to parse JSON data

// mongodb://localhost:27017
mongoose.connect("mongodb://127.0.0.1:27017/registration", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
const db = mongoose.connection
db.once('open', () => {
    console.log('Connected to MongoDB is successfully')
})

const userSchema = new mongoose.Schema({
    ns_fname: String,
    ns_lname: String,
    ns_roll_no: String,
    ns_email: String,
    ns_phone: Number,
    ns_password: String,
    ns_gender: String,
    ns_course: String
})

const User = mongoose.model('data', userSchema)

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'login_db.html'))
})

app.post('/post', async (req, res) => { // Changed from GET to POST
    const { ns_fname, ns_lname, ns_roll_no, ns_email, ns_phone, ns_password, ns_gender, ns_course } = req.body

        // Validate that gender and course are selected
        if (!ns_gender || !ns_course) {
            return res.status(400).send('Gender and Course selection are required.');
        }

    const user = new User({
        ns_fname,
        ns_lname,
        ns_roll_no,    
        ns_email,
        ns_phone,
        ns_password,
        ns_gender,
        ns_course
    })
    await user.save()
    console.log(user)
    res.send('Registration successful')
})

app.listen(port, () => {
    console.log(`Server is Started`)
})
