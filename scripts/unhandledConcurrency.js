var axios = require('axios')

const checkForUnhandledConcurrency = function () {
    for (let i = 0; i < 10; i++) {
        axios
            .default
            .get('http://localhost:3000/users')
            .then((response) => console.log("Response for the value", response.data))
            .catch(error => console.log("Error", error))
    }
}

checkForUnhandledConcurrency()