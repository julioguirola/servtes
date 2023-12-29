import express from 'express'
import { addContent, checkUser, delContent, getContent } from './dbmodel/db_connection.js'

const app = express();

app.use(express.static("./frontend"))
app.use(express.json())

app.get('/', (req,res) => {
    res.sendFile(process.cwd() + '/frontend/index.html')
})

app.get('/productos', async (req,res) => {
    res.sendFile(process.cwd() + '/frontend/productos.html')
})

app.get('/servicios', (req,res) => {
    res.sendFile(process.cwd() + '/frontend/servicios.html')
})

app.get('/trabajos', (req,res) => {
    res.sendFile(process.cwd() + '/frontend/trabajos.html')
})

app.get('/login', (req,res) => {
    res.sendFile(process.cwd() + '/frontend/login.html')
})

app.get('/admin', async (req,res) => {
    res.sendFile(process.cwd() + '/frontend/admin.html')
})

app.post('/login_api', async (req,res) => {
    const {user, pass} = req.body
    const result = await checkUser(user, pass)
    if (result) {
        res.json({succes: true, user: user, pass: pass, rol: result.rol})
    } else {
        res.json({succes: false})
    }
})

app.post('/get_content', async (req,res) => {
    const {tipo} = req.body
    const result = await getContent(tipo)

    if (result) {
        res.json({succes: true, result: result})
    } else {
        res.json({succes: false})
    }
})

app.post('/post_content', async (req,res) => {
    const {name, des, tipo} = req.body
    const result = await addContent(name, des, tipo)
    res.json({succes: result})    
})

app.delete('/del_content', async (req,res) => {
    const {id, tipo} = req.body
    const result = await delContent(id, tipo)
    res.json({succes: result})
})

app.get('*', (req,res) => {
    res.sendFile(process.cwd() + '/frontend/notfound.html')
})

const port = process.env.PORT ?? 8080;

app.listen(8080, () => {
    console.log('http://localhost:8080')
})
