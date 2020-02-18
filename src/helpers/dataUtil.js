const moment = require('moment')

/*module.exports = {
    convertCurrent: (json) => {
        let viz = isNaN((json.visibility / 1000).toFixed(0)) ? 'Not available' : (json.visibility / 1000).toFixed(0)

        if (viz !== 'Not available') {
            viz += ' mi'
        }

        const weather = {
            'City': json.name,
            'Temperature': `${Math.round(json.main.temp)} ° F`,
            'Humidity': `${json.main.humidity} %`,
            'Visibility': `${viz}`,
            'WindSpeed': `${Math.round(json.wind.speed)} mph`,
            'Sunrise': `${timeStamp(json.sys.sunrise)}`,
            'Sunset': `${timeStamp(json.sys.sunset)}`
        }
        Object.defineProperty(weather, 'iconUrl', {
            value: `http://openweathermap.org/img/wn/${json.weather[0].icon}@2x.png`,
            enumerable: false
        });

        return weather;
    },
    convertFiveday: (json) => {
        let weatherArray = []
        for (let i = 0; i < 5; i++) {
            let weather = {
                'City': json.city.name,
                'Date': moment().add(i, 'days').format('l'),
                'Temperature': `${Math.round(json.list[i].main.temp)} ° F`,
                'Humidity': `${json.list[i].main.humidity} %`,
                'WindSpeed': `${Math.round(json.list[i].wind.speed)} mph`,
                'Sunrise': `${timeStamp(json.city.sunrise)}`,
                'Sunset': `${timeStamp(json.city.sunset)}`
            }
            Object.defineProperty(weather, 'iconUrl', {
                value: `http://openweathermap.org/img/wn/${json.list[i].weather[0].icon}@2x.png`,
                enumerable: false
            });
            weatherArray.push(weather)
        }
        return weatherArray;
    }
}*/
