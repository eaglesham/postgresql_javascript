
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



const arg1 = process.argv[2];
const arg2 = process.argv[3];
const arg3 = process.argv[4];
knex('famous_people')
.insert({first_name: arg1, last_name: arg2, birthdate: arg3})
.then(function() {
    process.exit();
});
