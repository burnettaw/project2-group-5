


function initdropdown(){


    d3.json("../static/data/nfl-dui2.json").then(function(data){
        
        //load display values
        var display = d3.select("#selDataset");
        for( i=2000; i<2018; i++) {
            display.append("option").text(i).property("value", i);
        }
       
        ///get selected text
        var e = document.getElementById("selDataset");
        var strSelected = e.value;
        
        //  filter selected year from data values
        function filterDuiData(d) {
            return d.Year == strSelected;
        }  
        var yr = data.filter(filterDuiData)
        
        var year = yr[0].Year;
        metadata(year);
        createBarChart(year);
        gauge(year);
        lineGraph(year)
    })//end d3.json 

}//end function initdropdown

//Creates a bar chart
function createBarChart(yrid){
  // Use d3.json() to fetch data from JSON file
    d3.json("../static/data/nfl-dui2.json").then((duiData) => {
        function filterDuiData(dui) {
        return dui.Year == yrid;
        }
    
        // Use filter() to pass the function as its argument
        var filteredDui = duiData.filter(filterDuiData);
    
        // Filtering Dui.
        console.log(filteredDui);
    
        var teams = filteredDui.map(category =>  category.TEAM);
    
        var category = filteredDui.map(category => category.Severity);
    
        // Filtered metascores.
        console.log(category);
    
        // Create your trace.
        var trace = {
        x: teams,
        y: category,
        type: "bar"
        };
    
        // Create the data array for our plot
        var data = [trace];
    
        // Define the plot layout
        var layout = {
        title: "Teams with highest DUI Arrested.",
        xaxis: { teams: "Team" },
        yaxis: { category: "NFL Team (Dui) Arrests"}
        };
    
        // Plot the chart to a div tag with id "bar-plot"
        Plotly.newPlot("bar", data, layout);
    });
}

function optionChanged(id){
    metadata(id);
    createBarChart(id);
    lineGraph(id);
   gauge(id);
}
   
var svgWidth = 500;
var svgHeight = 1500;
var margin = {
    top: 20,
    right: 40,
    bottom: 60,
    left: 100
    };//end margin


function metadata(yrid){

    d3.json("../static/data/nfl-dui2.json").then(function(data){
        console.log("in metadata")
        
        //filter the year
        function filterDuiData(d) {
            return d.Year == yrid;
        }  
        var yr = data.filter(filterDuiData)

        var metadata = yr;
       // console.log(metadata)
                
        var result = metadata;
        var display = d3.select("#sample-metadata");
        display.html("");
        for (i=0; i<result.length; i++){
            Object.entries(result[i]).forEach(([key, value]) => {
                display.append('div');
                display.append("h5").html(`<b>${key}</b>: ${value}`);
                
            })//end forEach
            display.append('hr');
        }
    })//end d3
}//end function

function gauge(yrid){
    d3.json("../static/data/nfl-dui2.json").then(function(data){
       // console.log("in metadata")
       // console.log(data)
        function filterDuiData(d) {
            return d.Year == yrid;
        }  
        var yrdetails = data.filter(filterDuiData) 
        console.log("yrdetails")
        console.log(yrdetails)
        console.log("yrdetails length")
        console.log(yrdetails.length)
        var metadata = yrdetails[0];
        
        sum = 0;
        for (var i = 0; i < yrdetails.length; i++) {
            sum += +yrdetails[i].Severity;
        }
        average = Math.round(sum / yrdetails.length )
        console.log("sum")
        console.log(sum)
        console.log('average')
        console.log(average)
       //if severity category is 0 add 1
        var duicat = average;
        console.log('average')
        console.log(average)
       
        var title = "Teams Average Severity"
        console.log('duicat')
        console.log(duicat)
        var data = [{
          type: "indicator",
          mode: "gauge",
          value: duicat,
          gauge: {
            axis: { range: [null, 5], tickwidth: 1, tickcolor: "darkblue" },
            bar: { color: "darkblue" },
            bgcolor: "white",
            borderwidth: 2,
            bordercolor: "gray",
            steps: [
                { range: [0, 1], color: "rgba(0,128,128,.05)" },
                { range: [1, 2], color: "rgba(0,128,128,.1)"  },
                { range: [2, 3], color: "rgba(0,128,128,.15)" },
                { range: [3, 4], color: "rgba(0,128,128,.20)" },
                { range: [4, 5], color: "rgba(0,128,128,.25)" }
            ],//end steps
            title: 'Auto-Resize',
            font: {
            size: 16
            },
            threshold: {
              line: { color: "red", width: 4 },
              thickness: 0.75,
              value: duicat
            }//end threshold
          }//end gauge
        }]; //data
      
      var layout = {
        width: 500,
        height: 400,
       // margin: { t: 0, r: 0, l: 0, b: 0 },
        font: { color: "darkblue", family: "Arial" },
        title: { text: title, font: { size: 24 }}
       
      };//end layout
      
      Plotly.newPlot('gauge', data, layout);
    })//end d3
}//end function

function lineGraph(yrid){
    // Part 1: Max, Min, Extent
    var dataArr = [10, 20, 2000];

    console.log("min value ", d3.min(dataArr));
    console.log("max value ", d3.max(dataArr));
    console.log("min and max values ", d3.extent(dataArr));

    // Part 2: scaleLinear
    // Imagine you have test scores with possible scores from 0 to 100,
    // and you want to graph them in an SVG that is 1000 pixels high.

    var testScores = [50, 90, 95, 75, 85];

    // a. hard-coded

    var yScale = d3.scaleLinear()
        .domain([0, 100])
        .range([0, 1000]);

    console.log(`50 returns ${yScale(50)}`);
    console.log(`75 returns ${yScale(75)}`);
    console.log(`100 returns ${yScale(100)}`);

    // b. max and min
    var svgHeight = 1000;

    var yScale = d3.scaleLinear()
    .domain([0, d3.max(testScores)])
    .range([0, svgHeight]);


    console.log(`50 returns ${yScale(50)}`);
    console.log(`75 returns ${yScale(75)}`);
    console.log(`95 returns ${yScale(95)}`);


    // c. extent
    var yScale = d3.scaleLinear()
    .domain(d3.extent(testScores))
    .range([0, svgHeight]);


    console.log(`50 returns ${yScale(50)}`);
    console.log(`75 returns ${yScale(75)}`);
    console.log(`95 returns ${yScale(95)}`);

    // Part 3: scaleBand
    // Imagine you want to visualize student grade information on a bar chart.
    svgHeight = 600;
    var svgWidth = 1000;

    testScores = [90, 85, 75, 90];
    var students = ["Han", "Sarah", "Matt", "Ruchi"];

    var xScale = d3.scaleBand()
    .domain(students)
    .range([0, svgWidth]);

    console.log(`Han's x-coordinate: ${xScale("Han")}`);
    console.log(`Sarah's x-coordinate: ${xScale(students[1])}`);
    console.log(`Matt's x-coordinate: ${xScale("Matt")}`);
    console.log(`Ruchi's x-coordinate: ${xScale(students[3])}`);

    console.log(`Each band is ${xScale.bandwidth()} pixels wide.`);

    // The y values are scaled separately.

    var yScale = d3.scaleLinear()
    .domain([0, 100])
    .range([0, svgHeight]);

    console.log(`The height of Han's bar: ${yScale(testScores[0])}`);  

}
initdropdown(); //calls function to fill dropdown object
