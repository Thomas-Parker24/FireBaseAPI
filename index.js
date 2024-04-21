const app = require("./src/app");

const port = process.env.port || 80;
app.listen(port, () => console.log("Listening on Port:", port));
