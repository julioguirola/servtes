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
    if (user){
        const result = await sql`
        select name, pass, rol from users where (name = ${user} and pass = ${pass})`
        
        return result.at(0)
    } else {
        return false
    }
}

export async function getContent(tipo){
    const columns = [tipo]

    const result = await sql`select id, name, des from ${sql(columns)}`
    
    let lista = []

    result.forEach(element => {
        lista.push(element)
    })

    return {resultado : lista}
}

export async function delContent(id, tipo) {
    const columns = [tipo]

    await sql`delete from ${sql(columns)} where id = ${id}`
}


// delContent(1, 'productos')

// console.log(await checkUser ('administrador','admin'))
// console.log(await getContent ('productos'))