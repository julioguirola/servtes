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
    const {username, password} = req.body
    const result = await checkUser(username, password)
    if (result) {
        res.json({succes: 'ok', username: username, password: password, rol: result.rol})
    } else {
        res.json({succes: 'notok'})
    }
})

app.post('/get_content', async (req,res) => {
    const {tipo} = req.body
    const result = await getContent(tipo)

    if (result) {
        res.json(result)
    }
})

app.post('/post_content', async (req,res) => {
    const {name, des, tipo} = req.body
    await addContent(name, des, tipo)
    res.json({})    
})

app.delete('/del_content', async (req,res) => {
    const {id, tipo} = req.body
    await delContent(id, tipo)
    res.json({})
})

app.get('*', (req,res) => {
    res.sendFile(process.cwd() + '/frontend/notfound.html')
})

app.listen(8080, () => {
    console.log('http://localhost:8080')
})
