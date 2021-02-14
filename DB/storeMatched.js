var pg = require("pg");
var async = require("async");
const config = require('./config');

let matched = false;

const fun = (value) => {
    console.log(value,'here');
}

const storeMatched = async(id,matchedId) => {
    // let id = '547152349085302829'
    // let matchedId = '628480864392708096'
    // console.log(id,matchedId)
    var pool = new pg.Pool(config);
    pool.connect(async function (err, client, done) {
        var finish = function () {
            done();
        };

        if (err) {
            console.error("Error connecting to the CockroachDB", err);
            finish();
        }

        async.waterfall(
            [
                function (next) {
                    var query =
                        `UPDATE users SET matchedid=${matchedId} WHERE userdiscordid=${id}`;
                    client.query(query, next);
                },
                function (results,next) {
                    var query =
                        `SELECT * FROM users WHERE userdiscordid=${matchedId} AND matchedid=${id}`;
                    client.query(query, next);
                },
                function (results, next) {
                    if (results.rows == null) {

                    } else {
                        matched = true;
                        console.log(matched)
                    }
                    fun(matched)
                    finish();
                },
            ],
            
            function (err, results) {
                if (err) {
                    console.error("Error Inserting and Printing demo table: ", err);
                    finish();
                }
            }
        );
    });
}

storeMatched();
