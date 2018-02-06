const pg = require("pg");
const settings = require("./settings"); // settings.json

const client = new pg.Client({
    user     : settings.user,
    password : settings.password,
    database : settings.database,
    host     : settings.hostname,
    port     : settings.port,
    ssl      : settings.ssl
});

const ResultsList = function(result) {
            
    for (let i=0; i < result.rowCount; i++) {
        let bdate = result.rows[i].birthdate.toString().slice(0, 15);
        console.log(`-${i+1}: ${result.rows[i].first_name} ${result.rows[i].last_name}, born '${bdate}'`)
    }
}

const query = function (client, arg) {
    client.query(`SELECT * FROM famous_people WHERE first_name = '${arg}' OR last_name = '${arg}'`, (err, result) => {
        if (err) {
        return console.error("error running query", err);
        }
        console.log("searching...");
        console.log(result)
        client.end();
        ResultsList(result);
    });
}

client.connect((err) => {
    if (err) {
        return console.error("Connection Error", err);
    }
    query(client, process.argv[2])
});
