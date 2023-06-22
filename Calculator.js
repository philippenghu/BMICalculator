const express = require('express')
const app = express()
const port = 3000
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
})

app.post("/", (req, res) => {

    var height = req.body.height !== "" ? Number(req.body.height) : null;
    var weight = req.body.weight !== "" ? Number(req.body.weight) : null;


    if (!req.body || !req.body.height || !req.body.weight) {
        return res.status(400).send("Please provide valid input values");
    }
    var result = (weight / (height ** 2)).toFixed(2);
    var explanation;

    switch (true) {
        case result < 18.5:
            explanation = "you are Underweight.";
            break;
        case result >= 18.5 && result < 24.9:
            explanation = "you are Healthy.";
            break;
        case result >= 24.9 && result < 29.9:
            explanation = "you are Overweight.";
            break;
        default:
            explanation = "you are Obese."
    }

    res.send("Your BMI is " + result + ", " + explanation);
})

app.listen(port, () => {
    console.log(`Calculator app listening on port ${port}`);
})