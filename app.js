const express = require('express')
const app = express()
const port = 3000

// Mongoose connection
const mongoose = require('mongoose')
const Reg = require('./register')


mongoose.connect('mongodb+srv://bahubali:test123@cluster0.p5eb8.mongodb.net/login?retryWrites=true&w=majority', { useNewUrlParser: true })
    .then(() => {
        console.log('Connected to MongoDB.......');
    })
    .catch(err => {
        console.error('Error connecting to MongoDB', err);
    });


app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


// app.get('/', (req, res) => {
//     res.send('Hello World!')
// })


app.post('/', (req, res) => {
    const regUser = async() => {
        try {
            const reg = new Reg(req.body)
            const result = await reg.save()
            console.log(result)

            res.send('User registered successfully')
        } catch (err) {
            console.log(err.message)
        }
    }
    regUser()
})

app.listen(port, () => {
    console.log(`Login app listening on port http://localhost:${port}`)
})