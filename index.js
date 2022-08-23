const express = require("express")
const cors = require("cors")


var bodyParser = require('body-parser');




const app = express()
app.use(cors())




app.use(express.json());

app.use(express.urlencoded({ extended: false }))

app.use(bodyParser.json());





const port = process.env.PORT || 4000




app.listen(port, () => {





    const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

    const uri = "mongodb+srv://mehdi:mehdimongodb@cluster0.xuahs.mongodb.net/?retryWrites=true&w=majority";
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });





    app.get("/", (req, res) => {
        res.send("running")
    })





    app.get("/fetchquiz", (req, res) => {


        client.connect(err => {

            //   const collection = client.db("database0").collection("col0");


            client.db("database0").collection("quiz-questions").find({}).toArray()
                .then((ans) => res.send(ans))
                .catch((err) => console.log(err))



        })

    })




    app.post("/save-response", (req, res) => {
        console.log(req.body)

        client.connect(err => {

            //   const collection = client.db("database0").collection("col0");


            client.db("database0").collection("quiz-results").insertOne(req.body)
                .then((ans) => res.send(ans))
                .catch((err) => console.log(err))

        })
    })





    app.get("/get-result" , (req,res) => {
        client.connect(err => {

            //   const collection = client.db("database0").collection("col0");


            client.db("database0").collection("quiz-results").find({}).toArray()
                .then((ans) => res.send(ans))
                .catch((err) => console.log(err))

        })
    })

})




