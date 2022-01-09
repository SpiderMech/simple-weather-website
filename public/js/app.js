const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const $getLocationButton = document.querySelector('#get-location')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value

    // Clear message contents
    messageOne.textContent = 'Checking Weather...'
    messageTwo.textContent = ''

    fetch('/weather?address=' + encodeURIComponent(location)).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecastData
            }
        })
    })
})

$getLocationButton.addEventListener('click', () => {

    messageOne.textContent = 'Checking Weather...'
    messageTwo.textContent = ''
    
    $getLocationButton.setAttribute('disabled', 'disabled')

    if (!navigator.geolocation) return alert('Location Services Not Available')

    navigator.geolocation.getCurrentPosition((position) => {
        fetch('/weather?coords=true&address=' + position.coords.latitude + ',' + position.coords.longitude).then((res) => {
            res.json().then((data) => {
                if (data.error) {
                    messageOne.textContent = data.error
                } else {
                    messageOne.textContent = data.location
                    messageTwo.textContent = data.forecastData
                }
                
            })
        })
    })

    $getLocationButton.removeAttribute('disabled')
})