var async = require('async');
var fs = require('fs');
var pg = require('pg');

// Connect to the "bank" database.
// var config = {
//     user: 'maxroach',
//     host: 'localhost',
//     database: 'bank',
//     port: 26257,
//     ssl: {
//         ca: fs.readFileSync('certs/ca.crt')
//             .toString(),
//         key: fs.readFileSync('certs/client.maxroach.key')
//             .toString(),
//         cert: fs.readFileSync('certs/client.maxroach.crt')
//             .toString()
//     }
// };

var config = {
    user: "orkb",
    host: "localhost",
    database: "somedb",
    port: 26257
  };

// Create a pool.
// var pool = new pg.Pool(config);

// pool.connect(function (err, client, done) {

//     // Close communication with the database and exit.
//     var finish = function () {
//         done();
//         process.exit();
//     };

//     if (err) {
//         console.error('could not connect to cockroachdb', err);
//         finish();
//     }
//     async.waterfall([
//             function (next) {
//                 // Create the 'accounts' table.
//                 client.query('CREATE TABLE IF NOT EXISTS accounts (id INT PRIMARY KEY, balance INT);', next);
//             },
//             function (results, next) {
//                 // Insert two rows into the 'accounts' table.
//                 client.query('INSERT INTO accounts (id, balance) VALUES (1, 1000), (2, 250);', next);
//             },
//             function (results, next) {
//                 // Print out account balances.
//                 client.query('SELECT id, balance FROM accounts;', next);
//             },
//         ],
//         function (err, results) {
//             if (err) {
//                 console.error('Error inserting into and selecting from accounts: ', err);
//                 finish();
//             }

//             console.log('Initial balances:');
//             results.rows.forEach(function (row) {
//                 console.log(row);
//             });

//             finish();
//         });
// });

var pool = new pg.Pool(config);
pool.connect(function (err, client, done) {

    // Close the connection to the database and exit
    var finish = function () {
        done();
        process.exit();
    };

    if (err) {
        console.error('Error connecting to the CockroachDB', err);
        finish();
    }
    // async.waterfall is used to run a multiple task that is dependent to the previous one.
    async.waterfall([
        function (next) {
            // Create the an 'demo' table
            client.query('CREATE TABLE IF NOT EXISTS demo (id INT PRIMARY KEY, string_txt TEXT NOT NULL);', next);
        },
        function (results, next) {
            // Insert three rows into the 'demo' table.
            client.query("INSERT INTO demo(id, string_txt) VALUES (1, 'Hello Guys!'), (2, 'Hows it going?'), (3, 'Kamusta na');", next);
        },
        function (results, next) {
            // Print the record inserted into the table
            client.query('SELECT id, string_txt FROM demo;', next);
        },
    ],
    function (err, results) {
        if (err) {
            console.error('Error Inserting and Printing demo table: ', err);
            finish();
        }

        console.log('demo App with CockroachDB:');
        results.rows.forEach(function (row) {
            console.log(row);
        });

        finish();
    });
});