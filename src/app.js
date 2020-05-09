// app.get('',(req,res)=>{
//     res.send('Hello Express!')
// })
// app.get('/help',(req,res)=>{
//     res.send('In help page')
// })

// app.get('/about',(req,res)=>{
//     res.send('<body><h2>In About Tab</h2></body>')
// })
const path = require('path')
const geoCode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const express = require('express')
const hbs = require('hbs')
const app = express()
const port  =   process.env.PORT || 3000

//Define Path for Express Config
const publicDirectoryPath   =  path.join(__dirname,'../public')
const viewsPath             =  path.join(__dirname,'../template/views')
const partialsPath          =  path.join(__dirname,'../template/partials')    

//Set up Handlebars engine and Views Location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//Set up Static Views Location
app.use(express.static(publicDirectoryPath))


app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather Application',
        createdBy:'Joydeep'
    })

})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'Weather Application',
        aboutApplication:'This is a weather forecast application,showing weather in your area',
        createdBy:'Joydeep'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Weather Application',
        helpText:'For Any Help Visit Here!',
        createdBy:'Joydeep'
    })
})




app.get('/weather',(req,res)=>{
   
    if(!req.query.address){
       return res.send({
            error:'Please Provide an address'
        })
    }

    geoCode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send({error})
        }
        forecast(latitude,longitude,(error,{temperature,feelsLike,forecast,forecastImage}={})=>{
                if(error){
                    return res.send({error})
                }
                res.send({
                    temperature,
                    feelsLike,
                    forecast,
                    forecastImage,
                    location,
                    address:req.query.address
                })    
        })
    })

})

app.get('/help/*',(req,res)=>{
    res.render('errorPage',{
        title:'404',
        errorMessage:'Help Article Not Found',
        createdBy:'Joydeep'

    })
})

app.get('*',(req,res)=>{
    res.render('errorPage',{
        title:'404',
        errorMessage:'Page Not Found',
        createdBy:'Joydeep'
    })
})
app.listen(port,()=>{
    console.log('Web Server running on port '+port)
})

