alert("in gantt");
function renderGantt(){

    "Director","Board Member","2015-01-30","2016-05-15","Marc L Andreessen","FACEBOOK INC"
var tasks = arrayVals;
    

var testTasks =   [{"startDate":new Date("2015-01-30"), "endDate":new Date("2016-05-15"), "taskName": "Marc A Andreessen", "status": "SUCCEEDED"},
{"startDate":new Date("2015-02-30"), "endDate":new Date("2016-02-15"), "taskName": "Marc B Andreessen", "status": "SUCCEEDED"},
{"startDate":new Date("2015-04-30"), "endDate":new Date("2016-04-13"), "taskName": "Marc C Andreessen", "status": "SUCCEEDED"},
{"startDate":new Date("2015-07-30"), "endDate":new Date("2016-01-15"), "taskName": "Marc D Andreessen", "status": "SUCCEEDED"}
];


//var tasks = arrayVals;
    
var taskStatus = {
    "SUCCEEDED" : "bar",
    "FAILED" : "bar-failed",
    "RUNNING" : "bar-running",
    "KILLED" : "bar-killed"
};

//var taskNames = [ "Marc A Andreessen", "Marc B Andreessen", "Marc C Andreessen", "Marc D Andreessen"];

var taskNames = [];
for(i = 0; i < arrayVals.length; i++){
    taskNames.push(arrayVals[i].taskName);
}
    
alert(taskNames);
alert(arrayVals[0].startDate);
alert(testTasks[0].startDate);
    
tasks.sort(function(a, b) {
    return a.endDate - b.endDate;
});
var maxDate = tasks[tasks.length - 1].endDate;
tasks.sort(function(a, b) {
    return a.startDate - b.startDate;
});
var minDate = tasks[0].startDate;

var format = "%x";

var gantt = d3.gantt().taskTypes(taskNames).taskStatus(taskStatus).tickFormat(format);
gantt(tasks);
}