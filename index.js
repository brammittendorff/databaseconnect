const { MongoClient } = require('mongodb');
const { Client } = require('pg');
const url = require('url');

// Get url by first arg
var myUrl = process.argv.slice(2)[0];

var parsedUrl = url.parse(myUrl, true);

async function mongo() {
    const uri = myUrl;
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        await client.connect();
	    console.log('Connected to mongo server.');
        await listMongoDatabases(client);
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

async function listMongoDatabases(client) {
    databasesList = await client.db().admin().listDatabases();
    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};

async function postgres() {
    const uri = myUrl;
    const client = new Client(uri);

    try {
        client.connect();
        console.log('Connected to postgres server.');
        client.query('SELECT datname FROM pg_database', (err, res) => {
            if (Boolean(res.rows)) {
                console.log("Databases:");
                res.rows.forEach(db => console.log(` - ${db.datname}`));
            } else {
                console.log(err, res);
            }
            client.end();
        })
    } catch (e) {
        console.error(e);
    }
}

// Determin the type of protocol 
protocol = parsedUrl.protocol.slice(0,-1);
if (protocol == 'mongodb+srv' || protocol == 'mongodb') {
    mongo().catch(console.error);
} else if (protocol == 'postgres') {
    postgres().catch(console.error)
} else {
    console.log('This protocol is not yet supported: ' + protocol);
}
