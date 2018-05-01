// test script connects to a psql databsae

const arg = process.argv[2];
const moment = require('moment');

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

function getUserData(cb) {
  const query = {
    text: 'SELECT first_name, last_name, birthdate FROM famous_people where first_name = $1::text',
    values: [arg]
  };

  client.connect((err) => {
    if (err) {
      return console.error("Connection Error", err);
    }
    client.query(query, (err, result) => {
      if (err) {
        return console.error("error running query", err);
      }
    cb(result);
    client.end();

    });
  });
}

function listRows(list) {
   list.rows.forEach( (row, index) => {
    console.log(`${index + 1}: ${row.first_name} ${row.last_name}, born ${moment(row.birthdate).format('YYYY-MM-DD')}`);
  });
}


getUserData(listRows);