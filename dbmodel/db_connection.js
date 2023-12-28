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
    const columns = [tipo]

    try {
        const result = await sql`select id, title, description, image from ${sql(columns)}`
        
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

export async function delContent(id, tipo) {
    try {
        const columns = [tipo]
        await sql`delete from ${sql(columns)} where id = ${id}`
        return true
    } catch (e) {
        console.log(e)
        return false
    }
}

export async function addContent(title, description, image, tipo) {
    try {
        const table = tipo
        await sql`insert into ${sql(table)} (title, description, image) values (${title}, ${description}, ${image})`
        return true
    } catch (e) {
        console.log(e)
        return false
    }
}

// addContent('name', 'des', 'productos')
// delContent(1, 'productos')
// console.log(await checkUser ('admin','admin'))
// console.log(await getContent ('producto'))