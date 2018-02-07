
const settings = require("./settings"); // settings.json

const knex = require('knex')({
    client: 'pg',
    connection: {
        host : settings.hostname,
        user : settings.user,
        password : settings.password,
        database : settings.database
    },
});


const resultsList = function(result) {
            
    for (let i=0; i < result.length; i++) {
        let bdate = result[i].birthdate.toString().slice(0, 15);
        console.log(`-${i+1}: ${result[i].first_name} ${result[i].last_name}, born '${bdate}'`)
    }
    knex.destroy();
}

const query = function (knex, arg) {
    knex.select()
    .from('famous_people')
    .where({ first_name: arg })
    .orWhere({ last_name: arg })
    .then(function(result) {            
        resultsList(result);
    });
}


query(knex, process.argv[2]);



