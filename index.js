const http = require("http");
const fs = require("fs");
const { info } = require("console");
const { platform } = require("os");

const server = http.createServer((req, res) => {
  const replceTemplate = (template, places) => {
    let content = template.replace(/{%IMG%}/g, places.img);
    content = content.replace(/{%TITLE%}/g, places.title);
    content = content.replace(/{%ABOUT%}/g, places.about);
    content = content.replace(/{%ID%}/g, places.id);
    return content;
  };

  const path = req.url;
  const card = fs.readFileSync(
    `${__dirname}/template/template-card.html`,
    "utf-8"
  );
  const data = fs.readFileSync("./dev-data/data.json", "utf-8");
  const infoData = JSON.parse(data);

  if (path === "/" || path === "/content") {
    res.writeHead(200, {
      "Content-type": "text/html",
    });

    const mapData = infoData.map((el) => replceTemplate(card, el)).join("");
    console.log(mapData);
    res.end(mapData);
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
