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

var input = process.argv[2];

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
  console.log("Searching ...");
  client.query("SELECT * FROM famous_people WHERE last_name = $1 or first_name = $1",[input] , (err, result) => {
    if (err) {
      return console.error("error running query", err);
    }
    console.log(`Found ${result.rows.length} person(s) by the name '${input}':`);
        result.rows.forEach(row => {
            console.log (`- ${result.rows.indexOf(row)+1} ${row.first_name} ${row.last_name}, born ${row.birthdate}`);
        });   
    client.end();
  });
});
