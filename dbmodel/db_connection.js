import mysql from 'mysql2/promise'

const DEFAULT_CONFIG = {
    host: 'localhost',
    user: 'root',
    port: 3306,
    password: 'root',
    database: 'servtesdb'
}

const connection = await mysql.createConnection(DEFAULT_CONFIG)

export async function checkUser(user,pass) {
    const result = await connection.query(`
        select name, pass, rol from users where (name = ? && pass = ?)`,
        [user,pass]
        )
    return result[0]
}

export async function getContent(tipo){
    const result = await connection.query(`
        select name, des from ${tipo}`
        )
    return result[0]
}