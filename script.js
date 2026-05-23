

let city = "";
let cityUrl = "";
let lat = 0; 
let lon = 0;


function getPosition(pos) 
{
    lat = pos.coords.latitude;
    lon = pos.coords.longitude;

    if (lat !== 0 || lon !== 0) 
    {
        city = `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=54b0679db2076b725007a1f3664eba96`;

        fetch(city
        ).then(res => res.json()
        ).then(data => 
        {
            if (data.length > 0) {
                city = data[0].name;
                mainInput.value = city; 
            }
            today.click(); 
        })
        .catch(() => {
            today.click(); 
        });
    } 
    else 
    {
        funkMyPlace(); 
    }
}

navigator.geolocation.getCurrentPosition(getPosition, funkMyPlace);

function funkMyPlace()
{       
        city = "Bratislava";
        mainInput.value = city;
        cityUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=54b0679db2076b725007a1f3664eba96`
        fetch(cityUrl
        ).then((data) => data.json()
        ).then((data) => 
        {
            if(data.length == 0)
            {
                funkError();  
                return;
            }       
            lat = data[0].lat;
            lon = data[0].lon; 
            today.click();
        }).catch((error) => {
            funkError();
            return;
        });
}



buttonFind.addEventListener('click', ()=>
{
    if(mainInput.value != '')
    {
        city = mainInput.value;
        cityUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=54b0679db2076b725007a1f3664eba96`
        fetch(cityUrl
        ).then( (data) => data.json()
        ).then((data) => 
        {
            if(data.length == 0)
            {
                funkError();  
                return;
            }       
            lat = data[0].lat;
            lon = data[0].lon; 

            today.click();
        }).catch((error) => {
            funkError();
            return;
        });     
    }
})



function funkError()
{
    let err = document.querySelector('.error'); 
    err.innerHTML = ""; 

    let par = document.createElement('div');    
    par.innerHTML = `
        <div class="errDiv">
            <img src="https://ojukbujuk.com.tm/404.png" alt = "404" class = "fof"> 
            <div class="errText">
            <p> ${city} could not be found.</p>
            <p> Pleace enter a different location</p>
            </div>  
        </div>
    `;
    err.append(par);
    
    let tF = document.querySelector('.todayForecast');
    let fD = document.querySelector('.fiveDayForecast');
    fD.style.display = "none";    
    t.style.display = "none";
    err.style.display = "block";

    city = "";
    cityUrl = "";
    lat = 0; 
    lon = 0;
    today.classList.remove('active');
    fiveDay.classList.remove('active');
}


function funkTodayForecast(info)
{
    let cityLatAndLon = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=54b0679db2076b725007a1f3664eba96`
    fetch(cityLatAndLon
    ).then((data) => data.json()
    ).then((data) => 
    {
        let cW = document.querySelector('.currentWeather'); 
        cW.innerHTML = ""; 

        let par = document.createElement('div');      
        par.classList.add('curWea');

        let sunrise = new Date(data.sys.sunrise * 1000);
        let sunset = new Date(data.sys.sunset * 1000);
            
        let sunriseH = sunrise.getHours();
        let sunriseM = sunrise.getMinutes();
        let sunsetH = sunset.getHours();
        let sunsetM = sunset.getMinutes(); 

        let duration = data.sys.sunset - data.sys.sunrise;
        let durationH = Math.floor(duration / 3600); 
        let durationM = Math.floor((duration % 3600) / 60); 

        if (sunriseM < 10) {sunriseM = '0' + sunriseM;}
        if (sunsetM < 10) {sunsetM = '0' + sunsetM;}
        if (durationM < 10) {durationM = '0' + durationM;}
        if (sunriseH < 10) {sunriseH = '0' + sunriseH;}

        par.innerHTML = `
            <div class="curHead">
                <span class="title">CURRENT WEATHER</span>
                <span class="date">${(new Date()).toLocaleDateString()}</span>
            </div>
            <div class="curMiddle">
                <div class="image">
                    <img src="https://openweathermap.org/payload/api/media/file/${data.weather[0].icon}.png/" alt = "icon"> 
                    <p> ${data.weather[0].main} </p>
                </div>
                <div class="degs">
                    <p class = "temp"> ${Math.round(data.main.temp)} °C </p>
                    <p> Real Feel ${Math.round(data.main.feels_like)} °C </p>
                </div>

                <div class="sun">
                    <p> Sunrise: ${sunriseH}:${sunriseM}</p>
                    <p> Sunset: ${sunsetH}:${sunsetM}</p>
                    <p> Duration: ${durationH}:${durationM}</p>
                </div>
            </div>
        `;
        cW.append(par);





        hHour = `https://api.openweathermap.org/data/2.5/forecast/?lat=${lat}&lon=${lon}&units=metric&appid=54b0679db2076b725007a1f3664eba96`
        fetch(hHour             
        ).then((data) => data.json()
        ).then((data) => 
        {
            let days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
            let today = new Date();
            let dayName = days[today.getDay()]; 

            let hour = document.querySelector('.hourly'); 
            hour.innerHTML = ""; 

            let par2 = document.createElement('div');      
            par2.classList.add('curWea');
        
            let hourlyHtml = "";
            data.list.slice(1, 9).forEach((item) => 
            {
                let hour = item.dt_txt.slice(11, 16);

                hourlyHtml += `
                    <div class="divHoulry"> 
                        <p class="pToday">${hour}</p>  
                        <img src="https://openweathermap.org/img/wn/${item.weather[0].icon}.png" alt="icon">
                        <p>${item.weather[0].main}</p>
                        <p>${Math.round(item.main.temp)}°</p>
                        <p>${Math.round(item.main.feels_like)}°</p>  
                        <p>${Math.round(item.wind.speed * 3.6)}</p>  
                    </div>
                `;
            });

            par2.innerHTML = `
                <div class="curHead" style="height:50px">
                    <span class="title">HOURLY</span>
                </div>
                <div class="curHourly">
                    <div class="divHoulry divHToday"> 
                        <p class="pToday">${dayName}</p>  
                        <p style="height:20px"></p> 
                        <p>Forecast</p>
                        <p>Temp(°C)</p>
                        <p>RealFeel</p>
                        <p>Wind(km/h)</p>  
                        </div>
                        ${hourlyHtml}
                </div>
            `;
            hour.append(par2);
        });            
    }).catch((error) => {
        alert("ERROR");
        return;
    });
}


function funkFiveDayForecast(info)
{
    
    let cityLatAndLon = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=54b0679db2076b725007a1f3664eba96`;
    fetch(cityLatAndLon             
    ).then((res) => res.json()
    ).then((data) => 
    {       
        let i = 0;
        let date = ""; 
        let allDays = [];
        while(i<40)
        {
            let curDate = data.list[i].dt_txt;

            if(curDate != date && data.list[i].dt_txt.slice(11,13) == "12")
            {
                allDays.push(data.list[i]); 
                date = curDate;         
                       
            }
            i++;
            if (allDays.length == 5) break;
        }

        let fD = document.querySelector('.fiveDays');
                                                                                        
        let days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
        let today = new Date();
        let dayName = days[today.getDay()]; 

        let D = [days[(today.getDay()+1) % 7], days[(today.getDay()+2) % 7], days[(today.getDay()+3) % 7], days[(today.getDay()+4) % 7]];

        fD.innerHTML = `
            <button class = "oneDay">  
                <p> TONIGHT </p>
                <p> ${allDays[0].dt_txt.slice(0,10)}</p>
                <img src="https://openweathermap.org/payload/api/media/file/${allDays[0].weather[0].icon}.png/" alt = "icon">          
                <p> ${Math.round(allDays[0].main.temp)}°C </p>
                <p> ${allDays[0].weather[0].main} </p>
            </button>
            <button class = "oneDay"> 
                <p> ${D[0]} </p>
                <p> ${allDays[1].dt_txt.slice(0,10)}</p>
                <img src="https://openweathermap.org/payload/api/media/file/${allDays[1].weather[0].icon}.png/" alt = "icon">          
                <p> ${Math.round(allDays[1].main.temp)}°C </p>
                <p> ${allDays[1].weather[0].main} </p>
            </button>
            <button class = "oneDay"> 
                <p> ${D[1]} </p>
                <p> ${allDays[2].dt_txt.slice(0,10)}</p>
                <img src="https://openweathermap.org/payload/api/media/file/${allDays[2].weather[0].icon}.png/" alt = "icon">          
                <p> ${Math.round(allDays[2].main.temp)}°C </p>
                <p> ${allDays[2].weather[0].main} </p>
            </button>
            <button class = "oneDay"> 
                <p> ${D[2]} </p>
                <p> ${allDays[3].dt_txt.slice(0,10)}</p>
                <img src="https://openweathermap.org/payload/api/media/file/${allDays[3].weather[0].icon}.png/" alt = "icon">          
                <p> ${Math.round(allDays[3].main.temp)}°C </p>
                <p> ${allDays[3].weather[0].main} </p>
            </button>
            <button class = "oneDay"> 
                <p> ${D[3]} </p>
                <p> ${allDays[4].dt_txt.slice(0,10)}</p>
                <img src="https://openweathermap.org/payload/api/media/file/${allDays[4].weather[0].icon}.png/" alt = "icon">          
                <p> ${Math.round(allDays[4].main.temp)}°C </p>
                <p> ${allDays[4].weather[0].main} </p>
            </button>
        `
        let buttons = document.querySelectorAll(".oneDay");

        buttons.forEach((button, index) => 
        {
            button.addEventListener('click', () =>
            {          
                buttons.forEach(btn => btn.classList.remove('selectedDay'));
                button.classList.add('selectedDay');

                hHour = `https://pro.openweathermap.org/data/2.5/forecast/?lat=${lat}&lon=${lon}&units=metric&appid=54b0679db2076b725007a1f3664eba96`
                fetch(hHour             
                ).then((data) => data.json()
                ).then((data) => 
                {
                    let date = "";
                    let day = "";
                    if(index == 0)
                    {
                        date = allDays[0].dt_txt.slice(0,10);
                        day = days[today.getDay()]
                    }
                    else if(index == 1)
                    {
                        date = allDays[1].dt_txt.slice(0,10);
                        day = days[(today.getDay()+1) % 7]
                    }
                    else if(index == 2)
                    {
                        date = allDays[2].dt_txt.slice(0,10);
                        day = days[(today.getDay()+2) % 7]
                    }
                    else if(index == 3)
                    {
                        date = allDays[3].dt_txt.slice(0,10);
                        day = days[(today.getDay()+3) % 7]
                    }
                    else if(index == 4)
                    {
                        date = allDays[4].dt_txt.slice(0,10);
                        day = days[(today.getDay()+4) % 7]
                    }

                    let hour = document.querySelector('.hourlyFiveDays'); 
                    hour.innerHTML = ""; 
                    
                    let first = 0;
                    for(let i = 0; i < 40; i++)
                    {
                        if(data.list[i].dt_txt.slice(0,10) == date)
                        {
                            first = i;
                            break;
                        }
                    }
                     

                    let hourlyHtml = "";
                    for(let j = first; j < first+6; j++)
                    {
                        let hour = data.list[j].dt_txt.slice(11, 16);
                        hourlyHtml += `
                            <div class="divHoulry"> 
                                <p class="pToday">${hour}</p>  
                                <img src="https://openweathermap.org/img/wn/${data.list[j].weather[0].icon}.png" alt="icon">
                                <p>${data.list[j].weather[0].main}</p>
                                <p>${Math.round(data.list[j].main.temp)}°</p>
                                <p>${Math.round(data.list[j].main.feels_like)}°</p>  
                                <p>${Math.round(data.list[j].wind.speed * 3.6)}</p>  
                            </div>
                        `;
                    }                      

                    let par2 = document.createElement('div');      
                    par2.classList.add('curWea');
                    par2.innerHTML = `
                        <div class="curHead" style="height:50px">
                            <span class="title">HOURLY</span>
                        </div>
                        <div class="curHourly">
                            <div class="divHoulry divHToday"> 
                                <p class="pToday">${day}</p>  
                                <p style="height:20px"></p> 
                                <p>Forecast</p>
                                <p>Temp(°C)</p>
                                <p>RealFeel</p>
                                <p>Wind(km/h)</p>  
                                </div>
                                ${hourlyHtml}
                        </div>
                    `;
                    hour.append(par2);
                })       
            })
            buttons[0].click();
        });
    })
    .catch((error) => {
        console.log(error);
    });
}



let t = document.querySelector('.todayForecast');
let fD = document.querySelector('.fiveDayForecast');
let err = document.querySelector('.error');
    
today.addEventListener('click', () =>
{    
    if (lat === 0 && lon === 0) return;

    fD.style.display = "none";    
    t.style.display = "block";
    err.style.display = "none";
    today.classList.add('active');
    fiveDay.classList.remove('active');
            
    fetch(cityUrl).then((data) => data.json()).then((data) => funkTodayForecast(data))
})

fiveDay.addEventListener('click', () =>
{
    if (lat === 0 && lon === 0) return;

    fD.style.display = "block";   
    t.style.display = "none";
    err.style.display = "none";
    fiveDay.classList.add('active');
    today.classList.remove('active');

    fetch(cityUrl).then((data) => data.json()).then((data) => funkFiveDayForecast(data))
})
        


