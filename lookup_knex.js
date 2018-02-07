
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




// const input = process.argv[2];
// function printResults (arr) {
//   console.log('Found ', arr.length, ' person(s) by the name of', input);
//   for (var key in arr) {
//     console.log(arr[key].id, ': ', arr[key].first_name, arr[key].last_name, ', born ', arr[key].birthdate.toString().slice(0,15));
//   }
// }
// knex('famous_people')
//   .where('first_name', 'like', '%' + input + '%')
//   .orWhere('last_name', 'like', '%' + input + '%')
//   .select()
//   .then(function(result) {
//         printResults(result);
//         process.exit();
//     });
