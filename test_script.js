// test script connects to a psql databsae

const { Client } = require("pg");
const settings = require("./settings"); // settings.json

// create new client object by calling Client function we deconstructed above
const client = new Client({
  user      : settings.user,
  password  : settings.password,
  database  : settings.database,
  host      : settings.hostname,
  port      : settings.port,
  ssl       : settings.ssl
});

const query = {
  text: 'SELECT first_name, last_name, birthdate FROM famous_people where first_name = $1::text',
  // rowMode: 'array',
  values: ['Paul']
};


client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
  client.query(query, (err, result) => {
    if (err) {
      return console.error("error running query", err);
    }

  listRows(result);
  client.end();

  // console.log(results);

  });
});

function listRows(list) {
   list.rows.forEach( (row, index) => {
    let date = new Date(row.birthdate);
    console.log(date.getMonth());
// add moment.js to get dates in here
    console.log(`${index}: ${row.first_name} ${row.last_name}, born ${row.birthdate}`);
  });
}


