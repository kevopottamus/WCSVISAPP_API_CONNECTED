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

//save number of Fields
var numOfFields = 0;

var queryMessage = "";

//variable defined in wcsfinancial 2.5 to get the user's query
//var query = "revenue for Apple";

var resultData;

function executeSearch(query){
    
    $("#chart").html("");
    $("#pie").html("");
    $("#datatable").html("");
jQuery.ajax({
    //url http://acr046mgt06.almaden.ibm.com:9091/TATZIA/api/v1/nlq/answer?q= for single company queries
    url: "http://acr046mgt06.almaden.ibm.com:9095/TATZIA/api/v1/nlq/answer?q=" + query,
    type: "GET",
    contentType: 'application/json; charset=utf-8',
    success: function(data){
       
        resultData = data;
        
        yFieldType = data.question.answers[0].SQLAnswer[0].answers[0].fields[0].type;
        
        //get field information
        var fieldString = "";
        numOfFields = data.question.answers[0].SQLAnswer[0].answers[0].fields.length;
        for(i = 0; i< numOfFields; i++){
            fieldString = fieldString + data.question.answers[0].SQLAnswer[0].answers[0].fields[i].type;
        }
        
        queryMessage = data.question.annotatedQuestion;
        
        
        //alert(" data is " + data.question.annotatedQuestion);
       
        //alert(xField);
        if(numOfFields == 1 && yFieldType == "String"){
            
            for(i = 0; i < data.question.answers[0].SQLAnswer[0].answers[0].answerData.rows.length; i++){
                arrayVals.push(data.question.answers[0].SQLAnswer[0].answers[0].answerData.rows[i].values[0]);
            }
            
        }
        
        if(numOfFields == 2){
            
        //alert(data.question.answers[0].SQLAnswer[0].answers[0].answerData.rows[0].values[1]);
        xField = data.question.answers[0].SQLAnswer[0].answers[0].fields[1].name;
        yField = data.question.answers[0].SQLAnswer[0].answers[0].fields[0].name;
        xFieldType = data.question.answers[0].SQLAnswer[0].answers[0].fields[1].type;
        
        
        //loop through rows array and assign values to barData and pieData
            for(i = 0; i < data.question.answers[0].SQLAnswer[0].answers[0].answerData.rows.length; i++) {
            arrayVals.push(data.question.answers[0].SQLAnswer[0].answers[0].answerData.rows[i]);
            
            //assign Y values to be displayed in barDataY array
            barDataY.push(data.question.answers[0].SQLAnswer[0].answers[0].answerData.rows[i].values[0]);
            
            //assign X values to be displayed
            barDataX.push(data.question.answers[0].SQLAnswer[0].answers[0].answerData.rows[i].values[1]);
            
            //assign data pairs to the pieData
            pieData.push({label: data.question.answers[0].SQLAnswer[0].answers[0].answerData.rows[i].values[1], value: data.question.answers[0].SQLAnswer[0].answers[0].answerData.rows[i].values[0]});
            }
        
            if((xFieldType == "Float" || xFieldType == "Integer") && (yFieldType == "Float" || xFieldType == "Integer")){
                renderBarGraph();
                renderPieChart();
                renderTable();
            }   
        }
        
        //set color based on max endDate
        //fields":[{"name":"OINSIDERHISTORY_POSITION","type":"String"},{"name":"OCOMPANY_NAME","type":"String"},{"name":"OINSIDERHISTORY_TITLE","type":"String"},{"name":"OINSIDERHISTORY_EARLIEST_DATE","type":"Date"},{"name":"OINSIDERHISTORY_LATEST_DATE","type":"Date"},{"name":"OINSIDERPERSON_NAME","type":"String"}]}]
        //["FACEBOOK INC","Director","2016-02-15","Board Member","2013-03-05","Susan Desmond-hellmann"]}
        if(numOfFields >= 5){
            var maxDate = new Date("1000-01-01");
            
            for(i = 0; i < data.question.answers[0].SQLAnswer[0].answers[0].answerData.rows.length; i++){
                arrayVals.push({"startDate": new Date(data.question.answers[0].SQLAnswer[0].answers[0].answerData.rows[i].values[4]),
                        "endDate": new Date(data.question.answers[0].SQLAnswer[0].answers[0].answerData.rows[i].values[2]),
                        "taskName": data.question.answers[0].SQLAnswer[0].answers[0].answerData.rows[i].values[5],
                        "status": "RUNNING"});
                if(data.question.answers[0].SQLAnswer[0].answers[0].answerData.rows[i].values[2] > maxDate){
                    maxDate = new Date(data.question.answers[0].SQLAnswer[0].answers[0].answerData.rows[i].values[2]);
                }
            }
            
            alert("maxDate is" + maxDate);
            for(i = 0; i < data.question.answers[0].SQLAnswer[0].answers[0].answerData.rows.length; i++){
                console.log(arrayVals[i].endDate);
                if(arrayVals[i].endDate == maxDate){
                    alert("maxDate at: " + arrayVals[i].taskName);
                    arrayVals[i].status = "SUCCEEDED";
                }
            }
            //render gantt chart
            renderGantt();
            
            
            
        }
        
    },
    error: function(jqXHR, textStatus, errorThrown){
        alert("getJSON failed, status: " + textStatus + ", error: " + errorThrown + query);
    },
    //timeout: 1200 
});
    
}

//declare angular app
var app1 = angular.module('app1', []);


//declare controller for html file
app1.controller('ctrl1', function($scope) {
 
    //defines value of the search box
    $scope.first = "";
    
    $scope.numEntries = numOfEntries;
    
 
    //function run whenever search button is hit, this is where we should call REST API and get json file.
    $scope.updateValue = function() {
    $scope.submitted = $scope.first;
        
    query = $scope.first;
    //alert("calling executesearch");
        
    //location.reload(true);
    
    executeSearch($scope.submitted);
    
    if(numOfFields == 1){
        alert("one field fam");
        $scope.submitted = arrayVals;
    }
    
    
    
    if($scope.first == "Query response"){
        $scope.submitted = "Get JSON";
        alert("xfield is " + xField);
        //window.location.reload(true);
        //renderBarGraph();
        //renderBarGraph();
        
    }
    
   
  };
    
});
