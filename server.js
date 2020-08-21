const express = require("express");

const app = express();
const Port = process.env.port || 8080;

// for modules
app.use(express.static("public"));

// for proxy
app.use("/products/:product_id", express.static("public"));

app.listen(Port, () => {
  console.log(`Server is listening on Port ${Port}...`);
});
