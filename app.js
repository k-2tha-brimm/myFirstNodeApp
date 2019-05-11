const express = require("express");
const app = express();
const db = require('./config/keys').mongoURI;
const mongoose = require("mongoose")
const bodyParser = require('body-parser');
const users = require("./routes/api/users");
const tweets = require("./routes/api/tweets");
const User = require('./models/User');

mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => console.log("Connected to MongoDB successfully"))
    .catch(err => console.log(err));

app.use(bodyParser.urlencoded({
    extended: false
}));



app.get("/", (req, res) => {
    const user = new User ({
        handle: 'kevin',
        email: 'kevin@kevin.com',
        password: 'password12'
    });
    user.save();
    res.send("Hello, ya bish")
});

const port = process.env.PORT || 5000;

app.listen(port, () => {console.log(`Server is running on port ${port}`)});

app.use("/api/users", users);
app.use("/api/tweets", tweets);