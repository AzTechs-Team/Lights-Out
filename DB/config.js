var fs = require("fs");

//config for connection
var config = {
    user: "Aztechs",
    password:'AztechsAztechsAztechs',
    host: "free-tier.gcp-us-central1.cockroachlabs.cloud",
    database: "wild-impala-668.lights_out",
    port: 26257,
    ssl: {
        ca:fs.readFileSync('./certs/cc-ca.crt.txt').toString()
    }
};

module.exports=config