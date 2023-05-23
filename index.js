require("dotenv").config();

const app = require("./app.js");

app.listen(process.env.PORT, () => {
    console.log(`API listening on ${process.env.PORT}`);
})
