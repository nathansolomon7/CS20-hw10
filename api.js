
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
    request.open("GET", "http://universities.hipolabs.com/search?name=" + 
                                                        userInputInfo, true);
    // Step 3: set up callback for when HTTP response is returned 
    //(i.e., you get the JSON file back)
    request.onreadystatechange = function() {
    if (request.readyState == 4 && request.status == 200) {
        // Step 5: when we get all the JSON data back, parse it and use it
        theData = request.responseText;
        returnHTML = theData;
        data = JSON.parse(theData);
        console.log(data);
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
function displayData(universityObjects, responseDiv){
    //error handling for when no results are returned
    if(universityObjects.length == 0){
        responseDiv.innerHTML = "No results returned for " + userInputString;
        return;
    }
    //iterating through the array of objects, printing the data to page for each
    //0obbject
    const htmlString = universityObjects.map((university) => {
        webPagesString = (university.web_pages).join(', ');
        emailDomainsString = (university.domains).join(', ');
     return `
    <div class="universityInfoDiv">
        <p id = "schoolName"> ${university.name} </p>
        <p class = "schoolDetails"> School Web Pages: ${webPagesString} </p>
        <p class = "schoolDetails"> School Email Domain Name: ${emailDomainsString} </p>
    </div>`;
    }).join('');
    responseDiv.innerHTML = htmlString;
};


//function that calls the API using the fetch method
function fetchGetData(userInputInfo){
 fetch("http://universities.hipolabs.com/search?name=" + userInputInfo)
    .then(response => response.json())
    // once the data is fully received, display the data to the page
    .then(jSONData => displayData(jSONData, fetchResponseDiv))
}






