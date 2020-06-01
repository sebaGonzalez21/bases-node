const express = require('express')
const app = express()
const bodyParser = require('body-parser')
require('./server/config/config');
const PORT = process.env.PORT;
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
    // parse application/json
app.use(bodyParser.json())
app.use(require('./server/routes/usuario'))

app.listen(PORT, () => {
    console.log(`Escuchando puerto ${PORT}`);
})