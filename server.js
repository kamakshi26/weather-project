const express=require("express");
const https=require("https");
const bodyParser=require("body-parser");
const app=express();
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/',function(req,res)
{
  res.sendFile(__dirname + "/index.html");
});
app.post('/',function(req,res)
{
  const cityName=req.body.city;
  const appId="73491a30c4f32e5c4b01fedce1bd13ef";

  const url="https://api.openweathermap.org/data/2.5/forecast?q=" + cityName +"&appid=" + appId;

  https.get(url,function(response)
{
  response.on("data", function(data)
{
  const weatherdata=JSON.parse(data);
  const temp=weatherdata.list[1].main.temp;
  const desc=weatherdata.list[1].weather[0].description;
  const icon="https://openweathermap.org/img/wn/"+weatherdata.list[0].weather[0].icon+"@2x.png";

  res.write("<p> The weather currently is "+desc+"</p>");
  res.write("<h1> The temperature in "+cityName +" is "+ temp +" celcius </h1>");
  res.write("<img src="+icon + ">");
  res.send();
});
});
});


app.listen(3000, function(req,res)
{
  console.log("server started listening");
});
