const fs = require('fs');
const bodyParser = require('body-parser');
const express = require('express');

const port = 3000;
const filename = 'links.json';

let links = JSON.parse(fs.readFileSync(filename).toString());

let app = express();

app.use(bodyParser.json());

app.post('/link', (req, res) => {
    let category = req.body.cat;
    let url = req.body.url;
    console.log(`Envoi de l'url ${url} pour la catégorie ${category}.`);
    links[category].push(url);
    fs.writeFile(filename, JSON.stringify(links));
    console.log(`Fichier links.json correctement mis à jour : ${JSON.stringify(links)}.`)
});

app.get('/links', (req, res) => {
    res.send(links);
})

app.listen(port, () => {
    console.log(`Server is up on port ${port}!`);
})