import express from 'express'
import { checkUser, getContent } from './dbmodel/db_connection.js'

const app = express();

app.use(express.static("./frontend"))
app.use(express.json())

app.get('/', (req,res) => {
    res.sendFile(process.cwd() + '/frontend/index.html')
})

app.get('/productos', (req,res) => {
    const {username, pass} = req.body
    if (checkUser(username, pass)) {
        res.sendFile(process.cwd() + '/frontend/productos.html')
    } else {
        res.sendFile(process.cwd() + '/frontend/notlogged.html')
    }
})

app.get('/servicios', (req,res) => {
    const {username, pass} = req.body
    if (checkUser(username, pass)) {
        res.sendFile(process.cwd() + '/frontend/servicios.html')
    } else {
        res.sendFile(process.cwd() + '/frontend/notlogged.html')
    }
})

app.get('/trabajos', (req,res) => {
    const {username, pass} = req.body
    if (checkUser(username, pass)) {
        res.sendFile(process.cwd() + '/frontend/trabajos.html')
    } else {
        res.sendFile(process.cwd() + '/frontend/notlogged.html')
    }
})

app.get('/login', (req,res) => {
    res.sendFile(process.cwd() + '/frontend/login.html')
})

app.post('/login_api', async (req,res) => {
    const {username, password} = req.body
    const result = await checkUser(username, password)
    if (result.length !== 0) {
        res.json({succes: 'ok', username: username, password: password})
    } else {
        res.json({succes: 'notok'})
    }
})

app.post('/get_content', async (req,res) => {
    const {tipo} = req.body
    const result = await getContent(tipo)

    if (result.length !== 0) {
        res.json({result})
    }

})

app.get('*', (req,res) => {
    res.sendFile(process.cwd() + '/frontend/notfound.html')
})

app.listen(80, () => {
    console.log('http://localhost:80')
})
