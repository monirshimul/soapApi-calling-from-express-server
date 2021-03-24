const express = require('express');
const soap = require('soap');
const app = express();
let bodyParser = require('body-parser');
app.use(express.urlencoded({ extended: false }))
app.use(bodyParser.json())



app.get('/', async (req, res) => {
    var url = 'http://www.chemspider.com/MassSpecAPI.asmx?WSDL';
    await soap.createClient(url, (err, client) => {
        client.GetDatabases((err, result) => {
            res.send(result)
        });
    });
})

app.post('/getCity', async (req, res) => {
    var url = 'http://webservices.oorsprong.org/websamples.countryinfo/CountryInfoService.wso?WSDL';
    var args = { sCountryISOCode: req.body.code };
    await soap.createClient(url, (err, client) => {
        client.CapitalCity(args, (err, result) => {
            res.json(result)
        });
    });
})

const port = 3030
app.listen(port, () => {
    console.log(`App is Running on port ${port}`)
})