const weatherForm   =   document.querySelector('form')
const search        =   document.querySelector('input')
const messageOne    =   document.querySelector('#msgOne')
const messageTwo    =   document.querySelector('#msgTwo')  
const messageThree  =   document.querySelector('#msgThree') 

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location  = search.value
    messageOne.textContent = 'Searching results...'
    messageTwo.textContent = ''
    messageThree.textContent = ''
    document.getElementById("imageOne").src =''

    fetch('/weather?address='+location).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            messageOne.textContent  =   data.error
        }else{
            messageOne.textContent      =   data.location
            messageTwo.textContent      =   "It is Currently "+data.temperature+"degrees Outside,It feels Like "+data.feelsLike+" degrees"
            messageThree.textContent    =  "Forecast :"+data.forecast    
            document.getElementById("imageOne").src = data.forecastImage
        }
        
    })
})  
})