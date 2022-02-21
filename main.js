const { MongoClient, ObjectID } = require("mongodb");
const Express = require("express");
const BodyParser = require('body-parser');
const e = require("express");

const server = Express();

server.use(BodyParser.json());
server.use(BodyParser.urlencoded({ extended: true }));

const client = new MongoClient("mongodb+srv://hesukastro:nEAmpNLUibdAdLEC@geebee.xz3el.mongodb.net/GeeBee?retryWrites=true&w=majority");

var patients;
var records;

//Create Patient
server.post("/patients", async (request, response, next) => {
    try {
        let result = await patients.insertOne(request.body);
        response.send(result);
    } catch (e) {
        response.status(500).send({ message: e.message });
    }
});

//Create Record
server.post("/records", async (request, response, next) => {
    try {
        let result = await records.insertOne(request.body);
        response.send(result);
    } catch (e) {
        response.status(500).send({ message: e.message });
    }
});

//Fetch patieents
server.get("/patients", async (request, response, next) => {
    try {
        let result = await patients.find({}).toArray();
        response.send(result);
    } catch (e) {
        console.log('huh');
        response.status(500).send({ message: e.message });
    }
});

//Fetch records
server.get("/records", async (request, response, next) => {
    try {
        let result = await records.find({}).toArray();
        response.send(result);
    } catch (e) {
        response.status(500).send({ message: e.message });
    }
});

//Fetch specific patient
server.get("/patients/:patientID", async (request, response, next) => {
    try {
        let result = await patients.findOne({ "patientID": request.params.patientID });
        response.send(result);
    } catch (e) {
        response.status(500).send({ message: e.message });
    }
});

//Update specific patient
server.put("/patients/:patientID", async (request, response, next) => {
    try {
        let result = await patients.updateOne(
            { "patientID": request.params.patientID },
            { "$set": request.body }
        );
        response.send(result);
    } catch (e) {
        response.status(500).send({ message: e.message });
    }
});

//Delete specific patient
server.delete("/patients/:patientID", async (request, response, next) => {
    try {
        let result = await patients.deleteOne({ "patientID": request.params.patientID });
        response.send(result);
    } catch (e) {
        response.status(500).send({ message: e.message });
    }
});

server.listen(process.env.PORT, async () => {
    try {
        await client.connect();
        patients = client.db("GeeBee").collection("Patients");
        records = client.db("GeeBee").collection("Records");
        console.log("Listening...");
    } catch (e) {
        console.error(e);
    }
});