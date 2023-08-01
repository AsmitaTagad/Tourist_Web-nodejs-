const http = require("http");
const fs = require("fs");
const { info } = require("console");
const { platform } = require("os");
// const url=require("url")

const server = http.createServer((req, res) => {
  const path = req.url;
  const data = fs.readFileSync("./dev-data/data.json", "utf-8");
  const infoData = JSON.parse(data);

  if (path === "/" || path === "/content") {
    res.writeHead(200, {
      "Content-type": "text/html",
    });
    res.end("<h2>This is sample!</h2>");
  } else if (path === "/api") {
    res.writeHead(200, {
      "Content-type": "application/json",
    });
    res.end(data);
  } else {
    res.end("404 Page Not found");
  }
});

server.listen(8000, () => {
  console.log("listening from server 8000");
});
