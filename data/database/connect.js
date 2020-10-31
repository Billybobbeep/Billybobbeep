const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

async function connect() {
    var url = 'mongodb://localhost:27017'
    var name = 'billybobbeep';
    const client = new MongoClient(url, { useUnifiedTopology: true });
    
    try {
        await client.connect();
        const db = client.db(name);
        console.log(db.databaseName);

/* get all collections
        const collections = await db.collections();
        collections.forEach(c => console.log(c.collectionName));
*/

        const mutedMembers = db.collection('mutedMembers'); //get the collection data by name
        var search = mutedMembers.find(); //get all data from collection 
        while (await search.hasNext()) { //while theres more data
            console.table(await search.next()) //print data
        }

    } catch(err) {
        console.log(err);
    } finally {
        client.close();
    }
}

connect()