var knex = require('knex')({
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    user: 'development',
    password: 'development',
    database: 'test_db'
  }
});

// takes in three arguments: first_name, last_name, date
const firstName = process.argv[2];
const lastName = process.argv[3];
const dob = process.argv[4];

function addFamousPerson(firstname, lastname, birthdate) {
  knex('famous_people').insert( {first_name: firstname, last_name: lastname, birthdate: birthdate} ).asCallback(function (err, result) {
    if (err) {
      console.log(err);
    }
    console.log(result);
  });
  // insert into famous_people (first_name, last_name, birthdate) values (x x x )
}

addFamousPerson(firstName, lastName, dob);
