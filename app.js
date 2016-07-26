/*
    Kevin Huang
    6/27/2019
    IBM ARC
    app.js
    
    JS file that defines controller for angulartut.html,
    reads in JSON file from local.
*/

//to store the number of entries in json "rows"
var numOfEntries;

//array of Values arrays
var arrayVals = [];

//arrays to store data to be passed into barchart
var barDataY = [];
var barDataX = [];

//create array of arrays to be passed as pieData
var pieData = [];

//variables to save the names and types of the datafields
var xField = "";
var yField = "";
var xFieldType = "";
var yFieldType = "";

var queryMessage = "";

//creates a new instance of an XMLHttpRequest and loads asynchronously response.json 
// this code was adapted from https://codepen.io/KryptoniteDove/post/load-json-file-locally-using-pure-javascript

function loadJSON(callback){
    var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
    xobj.open('GET', 'response.json', false);
    xobj.onreadystatechange = function (){
        if(xobj.readyState == 4 && xobj.status == "200"){
            callback(xobj.responseText);
        }
    };
    xobj.send(null);
}

//initializing function to use anonymous callback
function init(){
    
    loadJSON(function(response) {
        var actual_JSON = JSON.parse(response);
        
        //alert("hey" + actual_JSON.question.answers[0].SQLAnswer[0].answers[0].fields[1].name);
        //get names and types of datafields
        xField = actual_JSON.answers[0].fields[1].name;
        yField = actual_JSON.answers[0].fields[0].name;
        xFieldType = actual_JSON.answers[0].fields[1].type;
        yFieldType = actual_JSON.answers[0].fields[0].type;
        
        queryMessage = actual_JSON.message;
        
        //loop through rows array
        for(i = 0; i < actual_JSON.answers[0].answerData.rows.length; i++) {
            arrayVals.push(actual_JSON.answers[0].answerData.rows[i]);
            
            //assign Y values to be displayed in barDataY array
            barDataY.push(actual_JSON.answers[0].answerData.rows[i].values[0]);
            
            //assign X values to be displayed
            barDataX.push(actual_JSON.answers[0].answerData.rows[i].values[1]);
            
            //assign data pairs to the pieData
            pieData.push({label: actual_JSON.answers[0].answerData.rows[i].values[1], value: actual_JSON.answers[0].answerData.rows[i].values[0]});
        }
        
    });
}

//call init to load json file and set variables
init();

//declare angular app
var app1 = angular.module('app1', []);

//variable defined in wcsfinancial 2.5
//var query = message.question.text;
var query = "";

//TODO: import jquery for ajax call

//ajax call from the app.js in wcsfinancial 2.5
 /*var deferred = $.ajax({
					            url: "/TATZIA/api/v1/nlq/answer?q=" + query,
					            type: "GET",
					            contentType: "application/json",
					            headers: {"Content-Type": "application/json", "Accept": "application/json"},
                                 // url: "/TATZIA/api/v1/question",
                                 // type: "POST",
                                 // contentType: "application/json",
                                 // headers: {"Content-Type": "application/json", "Accept": "application/json"},
                                 //   data: JSON.stringify(message),
                                 // dataType: "json"
                              });

*/
//declare controller for html file
app1.controller('ctrl1', function($scope) {
 
    //defines value of the search box
    $scope.first = "";
    
    $scope.numEntries = numOfEntries;
    
 
    //function run whenever search button is hit, this is where we should call REST API and get json file.
    $scope.updateValue = function() {
    $scope.submitted = $scope.first;
        
    query = $scope.first;
    
    if($scope.first == "Query response"){
        $scope.submitted = "Get JSON";
        //init();
    }
    
   
  };
    
});
