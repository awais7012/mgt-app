const mysql = require('mysql2')

const connectionDb = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'mysql',
    database: 'empGql',
    connectionLimit: 10,
    waitForConnections: true,
    queueLimit: 0,
    multipleStatements: true
})

connectionDb.getConnection((err, connection) => {
    if (err) {
        console.log(`error conencting ${err}`)
    }
    console.log("Db connected 🎉")
    connection.release()
})


module.exports = connectionDb;