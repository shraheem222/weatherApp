const express = require("express");

// get request for external server 
const https = require("https");

// require bodyParser
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res)=>{
    

    res.sendFile(`${__dirname}/index.html`);

});

app.post("/", (req, res)=>{

    console.log("Post");

    const cityName = req.body.city;
    const apiKey = "e0fc4a516f501c4314b66a5eec1428b2";
    const unit = "metric";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=${unit}`;

    https.get(url, (response)=>{
        console.log(response.statusCode);
        
        // this method is used to get actuall data from api Server
        response.on("data", (data)=>{
            const weatherData = JSON.parse(data);
            // console.log(weatherData);

            const temp = weatherData.main.temp;
            console.log(temp);

            const description = weatherData.weather[0].description;
            console.log(description);

            const icon = weatherData.weather[0].icon;
            const iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`

            console.log(url);
            res.write(`<h1> The temperature in ${cityName} is ${temp} degree centigrate.</h1>`)
            res.write( `<p>The weather currently is ${description}.</p>`);
            res.write(`<img src=${iconUrl} alt=weatherIcon>`);
            // res.write("<img src=" + iconUrl + ">" );
            res.send();
        });
    }); 
});


const PORT = process.env.PORT || 3000

app.listen(PORT, ()=>{
    console.log("Server is running on 3000");
});