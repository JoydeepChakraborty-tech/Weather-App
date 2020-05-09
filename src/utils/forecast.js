const request = require('request')

const forecast = (latitude,longitude,callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=a1b405ddbcc97f90081d8b03765185fe&query='+latitude+','+longitude+'&units=m'

    request({url,json:true},(error,{body}={})=>{
            if(error){
                callback('Cannot connect to weather service',undefined)
            }else if(body.error){
                 callback('Unable to fetch weather information',undefined)   
            }else{
                callback(undefined,{
                    temperature:body.current.temperature,
                    feelsLike:body.current.feelslike,
                    forecast:body.current.weather_descriptions[0],
                    forecastImage:body.current.weather_icons[0]
                })
            }
    })

}
module.exports = forecast