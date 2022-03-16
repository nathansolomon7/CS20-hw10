
var genresArr = new Array();
//used to access JSON data outside of get() call
var jsonObject;
var genresSet = new Set();

//retrieving all JSON data, where the data is stored in an array of objects called "data"
$.get("https://nathansolomon7.github.io/CS20-HW9/songs.json").then(
          function (data) {
              jsonObject = data;
               rawStr = JSON.stringify(data);
               $('#stringify').html(rawStr);
               const htmlString = data.map((artistInfo) => {
                        //using a set to keep track of already seen genres for 
                        //use when generating drop down menu
                        addGenresToSet(genresArr, artistInfo.Genre,genresSet);
                        genreString = (artistInfo.Genre).join(', ');
                        //displaying HTML for each artist/song info
                       return `
                       <li class="artists">
                           <p> ${artistInfo.SongName} </p>
                            <p> Artist: ${artistInfo.ArtistName} </p>
                           <p> Release Date: ${artistInfo.ReleaseDate} </p>
                           <p> Genre(s): ${genreString} </p>
                       </li>`;
                   })
                   .join('');
                   
                       setList.innerHTML = htmlString;
               

}).then(function(){
    //creating drop down menu of genres
    const optionsString = genresArr.map((genreOption) => {
            return `
            <option value = "${genreOption}">${genreOption}</option>`;
        })
        .join('');
        
            genreList.innerHTML = optionsString;
});


//used to determine if a song matches with the user's chosen genre of song
function isSongSpecificGenre(currGenreArr, userPreference){
    for(i = 0; i < currGenreArr.length; i++){
        if(currGenreArr[i] == userPreference){
            return true;
        }
    }
    return false;
}


//ensuring only unique values get added genresArr, used in the form
function addGenresToSet(genresArr, currGenreArr, genresSet) {

    for (i = 0; i < currGenreArr.length; i++) {
        if(!genresSet.has(currGenreArr[i]))
            genresArr.push(currGenreArr[i]);
            genresSet.add(currGenreArr[i]);
    }
};


//when the filterButton is clicked, only the songs that fit the user's 
//selected genre will be displayed on the page
$("#filterButton").click(function() {
    const htmlString = jsonObject.map((artistInfo) => {
        if (!isSongSpecificGenre(artistInfo.Genre, $('#genreList').val())) {
            return;
        }
                return `
                <li class="artists">
                    <p> ${artistInfo.SongName} </p>
                </li>`;
            }).join('');
        
            setList.innerHTML = htmlString;
});


