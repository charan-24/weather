const exp=require('express');
const https=require('https');
const bodyParser=require('body-parser');

const app=exp();
app.use(bodyParser.urlencoded({extended:true}));

app.get('/',(req,res)=>{
    res.sendFile(__dirname+"/index.html");
});

app.post('/',(req,res)=>{
    const query=req.body.city;
    const apiKey="fc7f9ff19d8f4d2550db24187289d1a8";
    const unit="metric";
    const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&units="+unit+"&APPID="+apiKey;
    https.get(url,(response)=>{
        console.log(response.statusCode);
        response.on('data',(data)=>{
            const weatherData=JSON.parse(data);
            const temp=weatherData.main.temp;
            const desc=weatherData.weather[0].description;
            const city=weatherData.name;
            const icon=weatherData.weather[0].icon;
            const imgUrl="https://openweathermap.org/img/wn/"+icon+"@2x.png"
            res.write("<p>The weather now in " + city +" is "+desc+".</p>");
            res.write("<h1>The temperature in "+city+" is "+temp+"</h1>");
            res.write("<img src="+imgUrl+">")
            res.send();
        });
    });
});

    

app.listen(process.env.PORT||3000,()=>{
    console.log("server is running on 3000");
})