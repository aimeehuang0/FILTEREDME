window.onload = function(){
    if(typeof(Storage) !== "undefined") {
        console.log(sessionStorage.predictText);
        if (!sessionStorage.predictText) {
            sessionStorage.predictText = "Lorem ipsum dolor sit amet";
        }
        if (sessionStorage.predictNo) {
            sessionStorage.predictNo = Number(sessionStorage.predictNo) + 1;
        }    
        else{
             sessionStorage.predictNo = 1;
        }          
        console.log(sessionStorage.predictNo);
        sessionStorage.predictText = sessionStorage.predictText.replace(/\'/g, "");
        sessionStorage.predictText = sessionStorage.predictText.replace(/\’/g, "");
        sessionStorage.predictText = sessionStorage.predictText.replace(/\./g, "");
        sessionStorage.predictText = sessionStorage.predictText.replace(/\//g, "");
        sessionStorage.predictText = sessionStorage.predictText.replace(/\$/g, "");
        sessionStorage.predictText = sessionStorage.predictText.replace(/\…/g, "");
        sessionStorage.predictText = sessionStorage.predictText.replace(/\,/g, "");
        sessionStorage.predictText = sessionStorage.predictText.replace(/\ó/g, "");
        sessionStorage.predictText = sessionStorage.predictText.replace(/\“/g, "");
        sessionStorage.predictText = sessionStorage.predictText.replace(/\”/g, "");
        sessionStorage.predictText = sessionStorage.predictText.replace(/\-/g, "");
        // sessionStorage.predictText = sessionStorage.predictText.replace(/\”/g, "");

        console.log("newStr:" + sessionStorage.predictText);
        result = runPyScript(sessionStorage.predictText);
    }
    else
    {   
        result = runPyScript("Lorem ipsum dolor sit amet"); 
        console.log("run 2");
    }
};


function runPyScript(input){
    $.ajax({
        url: '/checkPrediction',
        data: { mydata: input },
        type: 'POST',
        success: function(response) {
            // console.log("success");
            predictResult(response);
            return "success" + response;
        },
        error: function(error) {
            console.log("failed");
            sessionStorage.clear();
            return "failed" + error;
        }
    });

}

function predictResult(response){
    var data = JSON.parse(response);

    var age = "20";
    var gender = "Female";
    var agreeableness = "0.01";
    var openness = "0.01";
    var conscientiousness = "0.01";
    var extraversion = "0.01";
    var neuroticism = "0.01";

    console.log(JSON.parse(response));

    var myList = document.querySelector('#predBox');

    for(var o = 0; o <= 6; o++)
    {
        console.log(o);
        if(data.predictions[o].trait == "Age")
        {
            age = data.predictions[o].value;
        }
        if(data.predictions[o].trait == "Female" || data.predictions[o].trait == "Male")
        {
            gender = "Female";

            if(data.predictions[o].value <= 0.10){
                gender = "Male";
            }
        }
        if(data.predictions[o].trait == "BIG5_Agreeableness")
        {
            agreeableness = data.predictions[o].value;
        }
        if(data.predictions[o].trait == "BIG5_Openness")
        {
            openness = data.predictions[o].value;
        }
        if(data.predictions[o].trait == "BIG5_Conscientiousness")
        {
            conscientiousness = data.predictions[o].value;
        }
        if(data.predictions[o].trait == "BIG5_Extraversion")
        {
            extraversion = data.predictions[o].value;
        }
        if(data.predictions[o].trait == "BIG5_Neuroticism")
        {
            neuroticism = data.predictions[o].value;
        }
    }

    console.log(gender + "age" + age);
    // var age = data.predictions[1].value;
    // var gender = data.predictions[5].trait;
    // var neuroticism = data.predictions[0].value;
    // var openness = data.predictions[2].value;
    // var agreeableness = data.predictions[3].value;
    // var conscientiousness = data.predictions[4].value;
    // var extraversion = data.predictions[6].value;

    var div = document.createElement('div');
    div.setAttribute('class', 'col span_6_of_12 myImage');

    if(gender == "Male" && age >= 30 && age < 50 )
        div.innerHTML = '<img src=\'static/css/person2.png\')>';
    else if (gender == "Male" && age < 30 )
        div.innerHTML = '<img src=\'static/css/person1.png\')>';
    else if (gender == "Male" && age >= 50 )
        div.innerHTML = '<img src=\'static/css/person5.png\')>';
    else if (gender == "Female" && age >= 30 && age < 50 )
        div.innerHTML = '<img src=\'static/css/person3.png\')>';
    else if (gender == "Female" && age < 30 )
        div.innerHTML = '<img src=\'static/css/person4.png\')>';
    else if (gender == "Female" && age >= 50 )
        div.innerHTML = '<img src=\'static/css/person6.png\')>';
    else
        div.innerHTML = '<img src=\'static/css/person1.png\')>';

    // div.innerHTML = '<img src=\"{{ url_for(\'static\', filename=\'css/person1.png\') }}\">';

    var nextdiv = document.createElement('div');
    nextdiv.setAttribute('class', 'col span_6_of_12 predictResult');
    nextdiv.innerHTML = 'Age:' + age.toString().substring(0,4) + '<br>' +
                        'Gender:' + gender + '<br>'+
                        'Neuroticism:' + neuroticism.toString().substring(0,4) + '<br>'+
                        'Openness:' + openness.toString().substring(0,4) + '<br>' +
                        'Agreeableness:' + agreeableness.toString().substring(0,4) + '<br>' + 
                        'Conscientiousness:' + conscientiousness.toString().substring(0,4) + '<br>' +
                        'Extraversion:' + extraversion.toString().substring(0,4) + '<br>';


    myList.appendChild(div);
    myList.appendChild(nextdiv);

    sessionStorage.clear();
}