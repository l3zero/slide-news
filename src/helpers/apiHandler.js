const fetch = require('node-fetch')
const apiReq = require('./apiReq')
const nodeCache = require('node-cache')
const cache = new nodeCache({stdTTL: 600, maxKeys: 1000000}) //In seconds

/*async function grabCurrentWeather(cityId, coords) {
    let myRequest, response, jsonData, myData
    if (coords === undefined) {
        if (cache.has(cityId)) {
            myData = cache.get(cityId)
        } else {
            myRequest = createCityRequest(cityId)
            response = await fetch(myRequest).then(checkStatus)
            jsonData = await response.json()
            myData = data.convertCurrent(jsonData)

            if (myData === undefined) {
                let erz = new Error('MyData conversion failed. Please see dataUtility.js')
                console.log(erz)
                throw erz
            } else {
                cache.set(cityId, myData)
            }
        }
    } else {
        if (cache.has(`${cityId}_${coords}`)) {
            myData = cache.get(`${cityId}${coords}`)
        } else {
            myRequest = createCoordsRequest(cityId, coords)
            response = await fetch(myRequest).then(checkStatus)
            jsonData = await response.json()
            myData = data.convertCurrent(jsonData)

            if (myData === undefined) {
                let erz = new Error('MyData conversion failed. Please see dataUtility.js')
                console.log(erz)
                throw erz
            } else {
                cache.set(`${cityId}_${coords}`, myData)
            }
        }
    }
    return myData
}

async function grabFivedayWeather(cityId, coords) {
    let myRequest, response, jsonData, myData
    if (coords === undefined) {
        if (cache.has(cityId)) {
            myData = cache.get(cityId)
        } else {
            myRequest = createFivedayCityRequest(cityId)
            response = await fetch(myRequest).then(checkStatus)
            jsonData = await response.json()
            myData = data.convertFiveday(jsonData)

            if (myData === undefined) {
                let erz = new Error('MyData conversion failed. Please see dataUtility.js')
                console.log(erz)
                throw erz
            } else {
                cache.set(cityId, myData)
            }
        }
    } else {
        if (cache.has(`${cityId}_${coords}`)) {
            myData = cache.get(`${cityId}${coords}`)
        } else {
            myRequest = createFivedayCoordsRequest(cityId, coords)
            response = await fetch(myRequest).then(checkStatus)
            jsonData = await response.json()
            myData = data.convertFiveday(jsonData)

            if (myData === undefined) {
                let erz = new Error('MyData conversion failed. Please see dataUtility.js')
                console.log(erz)
                throw erz
            } else {
                cache.set(`${cityId}_${coords}`, myData)
            }
        }
    }
    return myData
}

function checkStatus(res) {
    if (res.ok) {
        return res
    } else {
        let erz = new Error(res.statusText)
        console.log(erz)
        throw erz
    }
}

function createCityRequest(cityId) {
    return new Request(apiReq.cityUrl(cityId), apiReq.getInit())
}

export { grabCurrentWeather, grabFivedayWeather }*/
