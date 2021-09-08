//Matt Hendrian's API Key
const apiKey = "56e2b52b436b81dd4823d8b3aa6ca06a";
const trendingWeekly = "https://api.themoviedb.org/3/trending/movie/week?api_key=";

"https://api.themoviedb.org/3/trending/movie/week?api_key=56e2b52b436b81dd4823d8b3aa6ca06a"


//geolocation API creates popup for user
//converts return value to provide a post address for long/lat. 
const openCageKey = "471148956fda4cd08121f7de8ba27beb";

//var for storing ZIP 
var userZip;

//function
const successfulLookup = (position) => {
  const {latitude, longitude} = position.coords
  fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=471148956fda4cd08121f7de8ba27beb`)
  .then(response => response.json())
  .then (console.log);
  //  userZip = 
}
//This fires the successful lookup function. 
navigator.geolocation.getCurrentPosition(successfulLookup,console.log)

//we can save the location data for the user anywhere we'd like in a new var that shows movies near them. 

//testing objects
var bitcoinPrices;
const bitArray = new Array(6);
const trendingTitles = new Array(9);
const trendingVotes = new Array(9);

function getApi() {
  const apiKey = "56e2b52b436b81dd4823d8b3aa6ca06a";
  // fetch request gets a list of all the repos for the node.js organization
  var requestUrl = "https://api.themoviedb.org/3/trending/movie/week?api_key=" + apiKey;
  console.log(requestUrl);

  fetch(requestUrl)
    .then(function (response) {
      console.log('firing');
      return response.json();
    })
    .then(function (data) {
      console.log(data)
      //Shows the top 10 trending movies.
      console.log(data.results[0].title);
      console.log(data.results[1].title);
      console.log(data.results[2].title);
      console.log(data.results[3].title);
      console.log(data.results[4].title);
      console.log(data.results[5].title);
      console.log(data.results[6].title);
      console.log(data.results[7].title);
      console.log(data.results[8].title);
      console.log(data.results[9].title);

       trendingTitles[0] = data.results[0].title;
       trendingTitles[1] = data.results[1].title;
       trendingTitles[2] = data.results[2].title; 
       trendingTitles[3] = data.results[3].title;
       trendingTitles[4] = data.results[4].title;
       trendingTitles[5] = data.results[5].title;
       trendingTitles[6] = data.results[6].title;
       trendingTitles[7] = data.results[7].title;
       trendingTitles[8] = data.results[8].title;
       trendingTitles[9] = data.results[9].title;

       trendingVotes[0] = data.results[0].vote_count;
       trendingVotes[1] = data.results[1].vote_count;
       trendingVotes[2] = data.results[2].vote_count; 
       trendingVotes[3] = data.results[3].vote_count;
       trendingVotes[4] = data.results[4].vote_count;
       trendingVotes[5] = data.results[5].vote_count;
       trendingVotes[6] = data.results[6].vote_count;
       trendingVotes[7] = data.results[7].vote_count;
       trendingVotes[8] = data.results[8].vote_count;
       trendingVotes[9] = data.results[9].vote_count;



      //Shows the trending movies(x-axis) this week and it's vote count (Y axis). 
      //This is best shown in a bar chart.
      console.log(data.results[0].title,data.results[0].vote_count);

    });

}
console.log(trendingTitles);
getApi();

var ctx = document.getElementById('myChart').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: trendingTitles,
        datasets: [{
            label: '#1 Votes This Week',
            data: trendingVotes,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});