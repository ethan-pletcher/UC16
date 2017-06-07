var data1 = [];
var noMatch = true;
/**
 * Uses AJAX to query an internet data source
 */
function testFetchAll() {
    for (var i = 1; i < 11; i++) {
        var query = "https://www.anapioficeandfire.com/api/houses?page=" + i + "&pageSize=50";
        sendRequest(query);
    }
    var data = JSON.stringify(data1)
    filterData(data);
}

function addData(data) {
    var gender = getCheckedRadioValue("gender")
    var rank = getCheckedRadioValue("title")
    var newData = JSON.parse(data)
    var dataRank = (newData.titles[0])
    var realGender = newData.gender
    if (realGender != gender && getTitle(rank, dataRank)) {
        dataDivide(data);
        noMatch = false;
    }
}

function getTitle(inputTitle, realTitle) {
    if (inputTitle === "Lord" && realTitle === "Lady") {
        return true;
    }
    else if (inputTitle === "Lady" && realTitle === "Lord") {
        return true;
    }
    else if (inputTitle === "Ser" && realTitle === "Princess") {
        return true;
    }
    else if (inputTitle === "Princess" && realTitle === "Ser") {
        return true;
    }
    else if (inputTitle === "Lady" && realTitle === "Prince") {
        return true;
    }
    else if (inputTitle === "Prince" && realTitle === "Lady") {
        return true;
    }
    else if (inputTitle === "Lady" && realTitle === "Ser") {
        return true;
    }
    else if (inputTitle === "Ser" && realTitle === "Lady") {
        return true;
    }
    else if (inputTitle === "Knight" && realTitle === "Lady") {
        return true;
    }
    else if (inputTitle === "King" && realTitle === "Queen") {
        return true;
    }
    else if (inputTitle === "Queen" && realTitle === "King") {
        return true;
    }
    else if (inputTitle === "Peasant" && realTitle === undefined) {
        return true;
    }
    else {
        return false
    }
}

function sendRequest(query) {
    var httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function () {
        if (this.readyState === 4) {
            // We got a response from the server!
            if (this.status === 200) {
                data1 = data1.concat(JSON.parse(this.responseText));
            }
            else {
                // There was a problem with the request.
                // For example, the response may have a 404 (Not Found)
                // or 500 (Internal Server Error) response code.
            }
        }
        else {
            // Waiting for a response...
        }
    };
    httpRequest.open("GET", query, true);
    httpRequest.send();
}

function sendRequest2(query) {
    var httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function () {
        if (this.readyState === 4) {
            // We got a response from the server!
            if (this.status === 200) {
                addData(this.responseText);
            }
            else {
                // There was a problem with the request.
                // For example, the response may have a 404 (Not Found)
                // or 500 (Internal Server Error) response code.
            }
        }
        else {
            // Waiting for a response...
        }
    };
    httpRequest.open("GET", query, true);
    httpRequest.send();
}

function filterData(data) {
    var house = getCheckedRadioValue("house");
    var newData = (JSON.parse(data));
    var houseData
    for (i = 0; i < 443; i++) {
        if (newData[i].name == house) {
            houseData = newData[i].swornMembers;
            break;
            if (newData[i] == undefined) {
                console.log("hi");
            }
        }
    }
    characterFilter(houseData);
}

function characterFilter(data) {
    for (i = 0; i < data.length; i++) {
        sendRequest2(data[i])
    }
    if (noMatch === true) {
        alert("We are sorry, but even with all of these disgusting personalities, we were unable to find you a match. Sorry about that. have a nice day, and have fun dying alone;(");
    }
}

function randomPhone() {
    var str = "+77("
    for (i = 0; i < 3; i++) {
        str += Math.floor(Math.random() * 10);
    }
    str += ") 555-"
    for (i = 0; i < 4; i++) {
        str += Math.floor(Math.random() * 10);
    }
    return str;
}

function dataDivide(data) {
    var gender = JSON.parse(data).gender;
    var titles = JSON.parse(data).titles;
    var name = JSON.parse(data).name;
    displayResponseData(name, gender, titles)
}

function displayResponseData(name, gender, title) {
    if (noMatch === true) {
        alert("We are sorry, but even with all of these disgusting personalities, we were unable to find you a match. Sorry about that. have a nice day, and have fun dying alone;(");
    }
    document.getElementById("Noutput").innerHTML = name;
    document.getElementById("Toutput").innerHTML = title;
    document.getElementById("Goutput").innerHTML = gender;
    document.getElementById("Eoutput").innerHTML = "whosit@whocares.net";
    document.getElementById("Poutput").innerHTML = randomPhone();
    //   document.getElementById("Boutput").innerHTML = data;
}
//var title = document.getElementById('title1').value;
//  var house = document.getElementById("house1").value;
//var gender = document.getElementById("gender1").value;
function getCheckedRadioValue(name) {
    var elements = document.getElementsByName(name);
    for (var i = 0, len = elements.length; i < len; ++i) {
        if (elements[i].checked) {
            return elements[i].value;
        }
    }
}
