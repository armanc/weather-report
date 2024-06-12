import prompts from "prompts";
import fetch from "node-fetch";

import config from './config.json' assert { type: "json" };
const apiKey: string = config.apiKey;
console.log(apiKey);



type City = {
    lat: number;
    lon: number;
};

type MeteoData = {
    temp: number,
    humidity: number
};

type WeatherReportResponse = {
    main: MeteoData
};

(async () => {
    const response = await prompts({
        type: 'text',
        name: 'city',
        message: 'City: '
    });
    // const city = 'Riga';

    const country = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${response.city}&limit=1&appid=${apiKey}`
    );
    const cityData: City[] = await country.json() as City[];
    const city = cityData[0];

    // console.log(cityData[0].lat, cityData[0].lon);

    const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${city.lat}&lon=${city.lon}&appid=${apiKey}&units=metric`);
    const weatherData: WeatherReportResponse = await weatherResponse.json() as WeatherReportResponse;

    console.log(`Temperature is ${weatherData.main.temp} C degrees and humidity is ${weatherData.main.humidity}%`);
})();