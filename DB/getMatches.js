var pg = require("pg");
var async = require("async");
const config = require('./config');

let info = '547152349085302829';
let userdata;
const getMatches = (info) => {
    var pool = new pg.Pool(config);
    
    let data = pool.connect(function (err, client, done) {
        var finish = function () {
            done();
            process.exit();
        };
        console.log('connected');
        if (err) {
            console.error("Error connecting to the CockroachDB", err);
            finish();
        }
        
        async.waterfall(
            [   function (next) {
                    var query = `SELECT * FROM users WHERE userdiscordid=${info};`;
                    client.query(query, next);
                },
                function (results, next) {
                    
                    userdata= results.rows[0];
                    //console.log(results.rows[0]);
                    const rangeLower = userdata.age - userdata.agerange;
                    const rangeUpper = userdata.age + userdata.agerange;
                    var query = `SELECT * FROM users WHERE gender='${userdata.preferences}' AND age>=${rangeLower} AND age<=${rangeUpper};`;
                    client.query(query, next);
                },
            ],
            async function (err, results) {
                if (err) {
                    console.error("Error Inserting and Printing demo table: ", err);
                    finish();
                }
                let count = []
                console.log(results.rows.length);
                results.rows.forEach(person => {
                    // console.log(person)
                    let x = 0;
                    if (person.relationship == info.relationship)
                        x += 1;
                    if (person.song == info.song)
                        x += 1;
                    if (person.pizza == info.pizza)
                        x += 1;
                    if (person.superhero == info.superhero)
                        x += 1;
                    if (person.food == info.food)
                        x += 1;
                    if (person.language == info.language)
                        x += 1;
                    if (person.philosophy == info.philosophy)
                        x += 1;
                    if (person.software == info.software)
                        x += 1;
                    // console.log(count)
                    count.push([person, x])
                })
                // count.sort((a, b) => a[1] - b[1])
                // count = count.slice(0, 3);
                // count = count.reverse();
                // console.log('ending',count);
                // fun(count);
                // return count;
                //finish();
                //count;
            }
        );
        
    //     client.query(`SELECT * FROM users WHERE gender='${info.preferences}' AND age>=${rangeLower} AND age<=${rangeUpper};`)
    //         .then((data) => {
    //             data.rows.forEach(person =>{
    //                 // console.log(data.rows)
    //                 let x = 0;
    //                 if (person.relationship == info.relationship)
    //                     x += 1;
    //                 if (person.song == info.song)
    //                     x += 1;
    //                 if (person.pizza == info.pizza)
    //                     x += 1;
    //                 if (person.superhero == info.superhero)
    //                     x += 1;
    //                 if (person.food == info.food)
    //                     x += 1;
    //                 if (person.language== info.language)
    //                     x += 1;
    //                 if (person.philosophy == info.philosophy)
    //                     x += 1;
    //                 if (person.software == info.software)
    //                     x += 1;
    //                 // console.log(count)
    //                 count.push([person.id, x])
    //                 count.sort((a, b) => a[1] - b[1])
    //                 count = count.slice(0, 3);
                   
    //                 finish();
    //                 return count;
    //             })
    //     }).catch((err)=>console.log(err))
    });
    return data;
}


function fun(args){
    console.log(args);
}

module.exports = getMatches;

getMatches(info);