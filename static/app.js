


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

//Loads the detail data into sample metadata area
function metadata(yrid){

    d3.json("../static/data/nfl-dui2.json").then(function(data){
        console.log("in metadata")
        
        //filter the year details
        function filterDuiData(d) {
            return d.Year == yrid;
        }  
        var yr = data.filter(filterDuiData)

        var metadata = yr;
       // console.log(metadata)
                
        var result = metadata;
        var display = d3.select("#sample-metadata");
        display.html("");
       // display.html("<table>");
        for (i=0; i<result.length; i++){
           // display.html('<tr>');
            Object.entries(result[i]).forEach(([key, value]) => {
                //display.append('div class=row');
                display.append("h5").html(`<b>${key}</b>: ${value}`);
             //   display.html('</tr>');    
            })//end forEach
            display.append('hr');
        }
       // display.html("</table>");
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
}//end function gauge


//create a line graph of teams
function lineGraph(yrid){
    console.log("in line gragh function")
    d3.json("../static/data/nfl-dui2.json").then(function(data){
        // console.log("in metadata")
        // console.log(data)
         function filterDuiData(d) {
             return d.Year == yrid;
         }  
        var yrdetails = data.filter(filterDuiData) 
       // var yearTag = d3.select('#selDataset');

        year_array = [];
        team_array = [];
        team = {};
        data.map((row_data) => {
            if (year_array.indexOf(row_data.Year) === -1) {
                year_array.push(row_data.Year)
                // console.log("row_data")
                // console.log(row_data.Year)
            }
            if (team_array.indexOf(row_data.TEAM) === -1) {
            team_array.push(row_data.TEAM)
            }//end if
        });//end data.map
        
        console.log(year_array);
        // yearTag.append("option")
        //         .property("value", "")
        //         .text("Select Year");
        // year_array.map((year) => {
        //     yearTag.append("option")
        //             .property("value", year)
        //             .text(year);
        // });
        // console.log("yearTag")
        // console.log(yearTag)
        team_array.map((element) => {
            team[element] = 0
            // console.log(element, "= ", team[element])
        });
        results = yrdetails; //data.filter(row => row.Year == selected_yr);
     
        for (var i = 0; i < results.length; i++) {
            teamName = results[i].TEAM
            team[teamName] += 1
            console.log(teamName, "= ", team[teamName])
        }//end for
        y_label = [];
        x_value = [];
        for (teamName in team) {
            if (team[teamName] != 0) {
                y_label.push(teamName)
                x_value.push(team[teamName])
            }
        }
        
        // Line chart months
        var month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        var dui = [];
        for (var i = 0; i <= 12; i++) {
        dui[i.toString()] = 0
        }
        console.log("results.length")
        console.log(results)
        for (var i = 0; i < results.length; i++) {
        m = results[i].DATE[0]
        dui[m] += 1
        }
        console.log(month, "= ", dui)
        var line_trace = {
        x: month,
        y: dui,
        type: 'scatter'
        };

        selected_yr = yrid
        var line_layout = {
        title: `NFL Teams Monthly DUI in ${selected_yr}`
        };
        var data = [line_trace];
        Plotly.newPlot('line', data, line_layout);
  
  });
}// line chart
initdropdown(); //calls function to fill dropdown object
