window.onload = function(){
      // window.setInterval(AddBubble(), 600);
    if(typeof(Storage) !== "undefined") {
        if (sessionStorage.predictNo) {
            sessionStorage.predictNo = Number(sessionStorage.predictNo) + 1;
        }    
        else{
             sessionStorage.predictNo = 1;
        }          
        console.log(sessionStorage.predictNo);
        console.log("countNo:" + sessionStorage.predictNo);

        AddBubble(sessionStorage.predictNo);
    }
    else
    {   
        console.log("cannotRun");
    }
};


// var myList = document.querySelector('ul');
var myList = document.querySelector('#NewsGroup');
var m = Math.floor(Math.random() * 3 + 10);
var d = Math.floor((Math.random() * 10) + 1);

if( m == 10 || m == 11){
  d = Math.floor((Math.random() * 28) + 1);
}

var month = "2017-" + m;
var date = month + "-" + d;

console.log(date);

var url = 'https://newsapi.org/v2/everything?domains=wsj.com,nytimes.com,bbc.co.uk&' +
          'from='+date+'&to=2017-12-10&'+
          'sortBy=popularity&' +
          'language=en&'+
          'apiKey=7a9fafb663e14ec7811c46226367cf1e';

var req = new Request(url);

fetch(req)
.then(function(response) { return response.json(); })
  .then(function(data) {

    for (var i = 0; i < 9; i++) {
      var div = document.createElement('div');
      div.setAttribute('class', 'col span_1_of_3 newsItem');

      var subdiv = document.createElement('div');
      subdiv.setAttribute('class', 'newsImg');
      subdiv.innerHTML = '<img src="' + data.articles[i].urlToImage + '">';

      var subcontent = document.createElement('div');
      subcontent.setAttribute('class', 'newstitle');

      // subcontent.innerHTML = '<div onclick="sendPrediction("'+data.articles[i].description+'")">' + data.articles[i].title + '</div>';
      subcontent.innerHTML = '<div onclick="addStorageText(\''+data.articles[i].description+'\')">' + data.articles[i].title + '</div>';

      div.appendChild(subdiv);
      div.appendChild(subcontent);

      // myList.appendChild(div);

      // listItem.innerHTML = ' Author: '+data.articles[i].author + '<br>';
      // listItem.innerHTML +=' Description: ' + data.articles[i].description + '<br>';
      // listItem.innerHTML +=' Source: ' + data.articles[i].source.id + '<br>';
      // listItem.innerHTML +=' Image: ' + data.articles[i].urlToImage + '<br>';
      myList.appendChild(div);
    }
})


function addStorageText(text) {
    if(typeof(Storage) !== "undefined") {
        if (sessionStorage.predictText) {
            sessionStorage.predictText = String(sessionStorage.predictText) + text;
        } else {
            sessionStorage.predictText = text;
        }
        console.log("You have clicked the button " + sessionStorage.predictText + " time(s) in this session.");
    } else {
        console.log("Sorry, your browser does not support web storage...");
    }

    if(sessionStorage.predictNo >= 3 ){
      window.location.replace("result")
    }
    else
    {
      window.location.replace("page")
    }

    // var url = 'https://newsapi.org/v2/everything?domains=nytimes.com&' +
    //       'sortBy=popularity&' +
    //       'language=en&'+
    //       'apiKey=7a9fafb663e14ec7811c46226367cf1e';

    // var req = new Request(url);
}

function AddBubble(bubbleNo)
{
    for(var b = 0; b <= bubbleNo; b++){
      var random = Math.random() + 1;
      var x = Math.floor((Math.random() * document.documentElement.clientWidth) + 1);;
      var y = Math.floor((Math.random() * document.documentElement.clientHeight) + 1);;
      var iDiv = document.createElement('div');
      iDiv.className = 'bubble b1';
      iDiv.style.left = x+"px";
      iDiv.style.top = y+"px";
      iDiv.style.transform = "scale("+random+")";
      document.getElementsByClassName('bubbles')[0].appendChild(iDiv);
    }
    // setTimeout(AddBubble, 5000);
}

// function sendPrediction(text){
//     $.ajax({
//         url: '/addPredictText',
//         data: { myPredict: text },
//         type: 'POST',
//         success: function(response) {
//             window.location.replace("http://stackoverflow.com");
//         },
//         error: function(error) {
//             console.log("failed");
//             return "failed" + error;
//         }
//     });
// }