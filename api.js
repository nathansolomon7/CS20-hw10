
//on click of the enter button, the API is called
$("#submitButton").click(function() {
    userInputString = $("#userInputBox").val();
    getData(userInputString);
    fetchGetData(userInputString);
});
//calling API using the AJAX method
function getData(userInputInfo){
    request = new XMLHttpRequest();
    // Step 2: Open the JSON file at remote location
    request.open("GET", 'https://www.omdbapi.com/?t=' + userInputInfo + '&apikey=ae410769', true);
    // Step 3: set up callback for when HTTP response is returned 
    //(i.e., you get the JSON file back)
    request.onreadystatechange = function() {
    if (request.readyState == 4 && request.status == 200) {
        // Step 5: when we get all the JSON data back, parse it and use it
        theData = request.responseText;
        returnHTML = theData;
        data = JSON.parse(theData);
        displayData(data, aJAXResponseDiv);
    }
    else if (request.readyState == 4 && request.status != 200) {
    
        console.log("error");
    
    }
    
    }//end on readystate change
    
    // Step 4: fire off the HTTP request
    request.send();

};
//displays the data retrieved from the API. Takes in an array of json objects and 
//the title of the div where the data will be displayed to on the page
function displayData(movieObject, responseDiv){
    const htmlString = 
    `
    <div class="movieInfoDiv">
    <p>${movieObject.Title} </p>
    <p> <strong>Release Date:</strong> ${movieObject.Released} </p>
    <p> <strong>Director:</strong> ${movieObject.Director} </p>
    <p> <strong>Genre:</strong> ${movieObject.Genre} </p>
    <p> <strong>Runtime:</strong> ${movieObject.Runtime} </p>
    <p> <strong>Plot:</strong> ${movieObject.Plot} </p>
    </div>`;
    responseDiv.innerHTML = htmlString;
};


//function that calls the API using the fetch method
function fetchGetData(userInputInfo){
 fetch('https://www.omdbapi.com/?t=' + userInputInfo + '&apikey=ae410769')
    .then(response => response.json())
    // once the data is fully received, display the data to the page
    .then(jSONData => displayData(jSONData, fetchResponseDiv))
}






