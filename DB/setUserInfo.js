var pg = require("pg");
var async = require("async");
const config = require('./config');


const setUserInfo = (info) => {
    var pool = new pg.Pool(config);
    pool.connect(function (err, client, done) {
        var finish = function () {
            done();
            process.exit();
        };

        if (err) {
            console.error("Error connecting to the CockroachDB", err);
            finish();
        }

        async.waterfall(
            [
                function (next) {
                    var query =
                        `INSERT INTO users(id,name,age,preferences,agerange, 
                            bio, relationship, song,pizza,superhero,food,
                            language, philosophy, software) VALUES
                            ('${info.id}','${info.name}','${info.age}','${info.preferences}'
                            ,'${info.agerange}','${info.bio}','${info.relationship}','${info.song}',
                            '${info.pizza}','${info.superhero}','${info.food}','${info.language}','${info.philosophy}',
                            '${info.software}');`;
                    client.query(query,next);
                },
            ],
            function (err, results) {
                if (err) {
                    console.error("Error Inserting and Printing demo table: ", err);
                    finish();
                }
                finish();
            }
        );
    });
}


module.exports = setUserInfo