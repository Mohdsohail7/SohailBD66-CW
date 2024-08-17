const { app } = require("./index");
const port = 3000;
app.listen(port, () => {
  console.log("Server is running on the port number is: " + port);
});