const apikey='3fa322b40a0bb823162e399613dc1770'
const apiurl='https://api.openweathermap.org/data/2.5/weather?units=metric&q='
const aqiapiurl="http://api.openweathermap.org/data/2.5/air_pollution?"
function Time() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const mins = String(now.getMinutes()).padStart(2, '0');
    const secs = String(now.getSeconds()).padStart(2, '0');
    const time = `${hours}:${mins}:${secs}`;
    document.getElementById('time').textContent = time;
  }

  setInterval(Time, 1000);
  Time();
  document.getElementById("city").addEventListener("keypress", function(event) {
    if (event.key ==='Enter') { 
      event.preventDefault();
      weather(ip.value);
    }
  });
const ip=document.querySelector('#city');
const button=document.getElementById('search');
const aqiinfo=document.querySelector('#aqi')
const humidity=document.querySelector('#humidity')
const wind=document.querySelector('#wind')
const deg=document.querySelector('#deg')
const cityname=document.querySelector('.city')
const icon = document.querySelector('.icon')
const type=document.querySelector('#type')

async function weather(city)
{
    const res= await fetch(apiurl+city+`&appid=${apikey}`);
    var data= await res.json();
    if(res.status==404)
        {
            document.querySelector('.error').style.display='block';
            document.querySelector('.disability').style.display='none';
        }
    console.log(data)
    type.innerHTML=data.weather[0].main;
    cityname.innerHTML=data.name;
    deg.innerHTML=Math.round(data.main.temp)+'°c';
    humidity.innerHTML=data.main.humidity+'%';
    wind.innerHTML=data.wind.speed+' KMPH';

    if (data.weather[0].main=='Clouds') {
        icon.src='images/cloudy.svg';
    } else if (data.weather[0].main=='Clear') {
        icon.src='images/clear.svg';
    } else if (data.weather[0].main=='Drizzle') {
        icon.src='images/Drizzle.svg';
    } else if (data.weather[0].main=='Mist') {
        icon.src='images/Mist.svg';
    } else if (data.weather[0].main=='Thunderstorm') {
        icon.src='images/thunder.svg';
    } else if (data.weather[0].main=='Rain') {
        icon.src='images/rain.svg';
    } 
    var lat=data.coord.lat
    var lon=data.coord.lon
    aqi(lat,lon);
    document.querySelector('.error').style.display='none';
    document.querySelector('.disability').style.display='block'
}

async function aqi(lat,lon)
{
    const res= await fetch(aqiapiurl+`lat=${lat}&lon=${lon}&appid=${apikey}`);
    var data= await res.json();
    console.log(data)
    aqiinfo.innerHTML=data.list[0].main.aqi;
}

button.addEventListener("click",()=>{
    weather(ip.value);
})
