/**
 * Uses AJAX to query an internet data source for age
 * @param {string} AgeId The element id that has the age
 */
function findDate(ageId, ) {
    // First get the age from the HTML textbox
    var age = document.getElementById(ageId).value;
    // Now make a HTTP request
    var httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function () {
        if (this.readyState === 4) {
            // We got a response from the server!
            if(this.status === 200) {
                // The request was successful!
                displayPlace(this.responseText);
            } else if (this.status === 404){
                // No postal code found
                displayPlace('{ "country" : "none" }');
            } else {
                console.log("We have a problem...server responded with code: " + this.status);
            }
        } else {
            // Waiting for a response...
        }
    };
    // Notice how the URL is appended with the age
    var url = "http://www.anapioficeandfire.com/api/characters " + age;
    httpRequest.open("GET", url, true);
    httpRequest.send();
}

// Now make a HTTP request
    var httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function () {
        if (this.readyState === 4) {
            // We got a response from the server!
            if(this.status === 200) {
                // The request was successful!
                displayPlace(this.responseText);
            } else if (this.status === 404){
                // No postal code found
                displayPlace('{ "country" : "none" }');
            } else {
                console.log("We have a problem...server responded with code: " + this.status);
            }
        } else {
            // Waiting for a response...
        }
    };

/**
 * Displays the age place given the JSON data
 * @param {string} data JSON data representing place for given age
 */
function displayPlace(data){
    var place = JSON.parse(data);
    if(place.country === "none") {
        document.getElementById("place").className = "alert alert-warning";
        document.getElementById("place").innerHTML = "No place matches that age."
    } else {
        document.getElementById("place").className = "alert alert-success";
        document.getElementById("place").innerHTML = place.places[0]["place name"] +
        ", " +
        place.places[0].state +
        ", " +
        place.country;
    }
}
