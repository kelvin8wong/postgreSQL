const settings = require("./settings"); // settings.json
var knex = require('knex')({
    client: 'pg',
    connection: {
        user     : settings.user,
        password : settings.password,
        database : settings.database,
        host     : settings.hostname,
        port     : settings.port,
        ssl      : settings.ssl
    }
});

var input = process.argv[2];
    console.log("Searching ...");
    knex.select().from("famous_people")
        .where("last_name", input)
        .orWhere("first_name", input)
        .asCallback((error, result) => {  
            if (result) {
                console.log(`Found ${result.length} person(s) by the name '${input}':`);
                result.forEach(row => {
                console.log (`- ${result.indexOf(row)+1} ${row.first_name} ${row.last_name}, born ${row.birthdate}`);
            }); 
        }
    knex.destroy();
});
    