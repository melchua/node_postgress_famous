
// make connection to knex

var fname = process.argv[2];

var moment = require('moment');

var knex = require('knex')({
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    user: 'development',
    password: 'development',
    database: 'test_db'
  }
});


function getFamousPeople(cb) {
  knex.from('famous_people').select('first_name', 'last_name', 'birthdate').where({first_name: fname}).asCallback(function(err, rows) {
    if (err) {
      return console.error(err);
    }
    cb(rows);
  });
}

//getFamousPeople(printRows);
const printRows = ((results) => {
  results.forEach( (result, index) => {
  console.log(`${index + 1}: ${result.first_name} ${result.last_name}, born ${moment(result.birthdate).format('YYYY-MM-DD')}`);
  });
});

getFamousPeople(printRows);
