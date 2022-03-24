const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const port = 30001;

//Motor de plantillas 
app.set('view engine', 'ejs');
// Folder of views
app.set('views', __dirname + '/views');

// statics files
app.use(express.static(__dirname + "/public"));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
app.use("/", require('./Router/main'))

app.use((req, res, next) => {
    res.status(404).render('404', { titulo: "404", descripcion: "Título del sitio 404" })
});

app.listen(port, () => {
    console.log('servidor escuchando en el puerto ', port)
})

