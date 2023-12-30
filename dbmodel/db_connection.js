import postgres from "postgres"

const sql = postgres('postgres://fl0user:TD7HKbU4tZoq@ep-hidden-glitter-78222556.us-east-2.aws.neon.fl0.io:5432/servtesdb?sslmode=require', {
  host                 : 'ep-hidden-glitter-78222556.us-east-2.aws.neon.fl0.io',           
  port                 : 5432,          
  database             : 'servtesdb',            
  username             : 'fl0user',           
  password             : 'TD7HKbU4tZoq',
  ssl                  : 'require'
})


export async function checkUser (user,pass) {
    try {
        const result = await sql`
        select user_name, pass_word, rol from users where (user_name = ${user} and pass_word = ${pass})`

        return result.at(0)
    } catch (e) {
        console.log(e)
        return
    }
}

export async function getContent(tipo){
    try {
        const result = await sql`select id, title, description, image, tipo, destacado from datos where tipo = ${tipo}`
        
        let lista = []

        result.forEach(element => {
            lista.push(element)
        })

        return {resultado : lista}
    } catch (e) {
        console.log(e)
        return
    }
}

export async function delContent(id) {
    try {
        const columns = [tipo]
        await sql`delete from datos where id = ${id}`
        return true
    } catch (e) {
        console.log(e)
        return false
    }
}

export async function addContent(title, description, image, tipo, destacado) {
    try {
        await sql`insert into datos (title, description, image, tipo, destacado) values (${title}, ${description}, ${image}, ${tipo}, ${destacado})`
        return true
    } catch (e) {
        console.log(e)
        return false
    }
}

// test
// addContent('name', 'des', '/servicio.png', 'producto', 0)
// delContent(1, 'productos')
// console.log(await checkUser ('admin','admin'))
// console.log(await getContent ('producto'))