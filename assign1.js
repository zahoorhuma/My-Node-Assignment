const http = require("http");
const fs = require("fs");
const path = require("path");

// Create a server
const server = http.createServer((req, res) => {
  const url = req.url;
  url === "/"
    ? readFile("home.html", res)
    : url === "/about"
    ? readFile("about.txt", res)
    : url === "/contact"
    ? readFile("contact.txt", res)
    : handleNotFound(res);
});

function readFile(filename, res) {
  const filePath = path.join(__dirname, filename);
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Some error occurred while reading the file:", err);
      res.statusCode = 500;
      res.end("500 - Internal Server Error :(");
      return;
    }
    console.log("File Read Successfully");
    res.statusCode = 200;
    res.write(data);
    res.end();
  });
}

function handleNotFound(res) {
  console.log("Page Not Found");
  res.statusCode = 404;
  res.end("404 - Not Found :(");
}

// Start the server
const port = 3000;
server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
