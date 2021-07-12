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
       // var catsorted = filteredDui.map(category => category.Severity).sort((a, b) => a - b);
        //Sorting from highest to lowest
        // teamsortedbycat=[];
        // for(i=0;i<category.length;i++)
        //     for(j=0;j<catsorted.length;j++)
        //         if(category[i] == catsorted[j])
        //             teamsortedbycat[j] = teams[i]
      
       // x.domain(data.sort(order).map(d => d.Severity));
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
            title: `NFL Teams DUI in ${yrid}`,
            xaxis: { teams: "Team" },
            yaxis: { category: "NFL Team (Dui) Arrests"},
            font: { color: "darkblue", family: "Arial" }
         
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
    
       createTable(result);
    })//end d3
}//end metada function

function setTrBackground(){
    var rows = d3.selectAll('tr')
    console.log("rows")
    console.log(rows)
    for(i=0; i<rows.length; i++)
        if (i % 2 == 0) 
            rows[i].append('tr').style('background-color', 'lightblue');
        else
            rows[i].append('tr').style('background-color', 'none')
        
}//end setbackground

function createTable(data){

   // d3.json('data.json', function (error, data) {
        columns = data.keys;
        console.log(columns);
        function tabulate(data, columns) {
              var table = d3.select('#sample-metadata')
              table.html("")
              table.append('table')
              
              var thead = table.append('thead')
              var	tbody = table.append('tbody');
            
              // append the header row
              thead.append('tr')
                .selectAll('th')
                .data(columns).enter()
                .append('th')
                .text(function (column) { return column; });
      
              // create a row for each object in the data
              var rows = tbody.selectAll('tr').html("")
                .data(data)
                .enter()
                .append('tr')
           
              // create a cell in each row for each column
              var cells = rows.selectAll('td')
                  .data(function (row) {
                  return columns.map(function (column) {
                    return {column: column, value: row[column]};
                  });
                })
                .enter()
                .append('td')
                  .text(function (d) { return d.value; });

                return table;
          }
          
          // render the table(s)
          tabulate(data, ['Year','DATE','TEAM','NAME','POSITION','CASE','CATEGORY','Severity','DESCRIPTION','OUTCOME']); // column in table
           // background of row function
           setTrBackground();
     // });
}
function gauge(yrid){
    d3.json("../static/data/nfl-dui2.json").then(function(data){
       
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
      
        var duicat = average;
        console.log('average')
        console.log(average)
       
        //var title = "Teams Average Severity"
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
        title: `NFL Overall DUI Average Severity in ${yrid}`
        //title: { text: title, font: { size: 24 }}
       
      };//end layout
      
      Plotly.newPlot('gauge', data, layout);
    })//end d3
}//end function gauge


//create a line graph of teams
function lineGraph(yrid){
    console.log("in line gragh function")
    d3.json("../static/data/nfl-dui2.json").then(function(data){
       
         function filterDuiData(d) {
             return d.Year == yrid;
         }  
        var yrdetails = data.filter(filterDuiData) 
      
        year_array = [];
        team_array = [];
        team = {};
        data.map((row_data) => {
            if (year_array.indexOf(row_data.Year) === -1) {
                year_array.push(row_data.Year)
            }
            if (team_array.indexOf(row_data.TEAM) === -1) {
                team_array.push(row_data.TEAM)
            }//end if
        });//end data.map
        
        console.log(year_array);
       
        team_array.map((element) => {
            team[element] = 0
        });
        results = yrdetails; 
     
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
            font: { color: "darkblue", family: "Arial" },
            title: `NFL Teams Monthly DUI in ${selected_yr}`
        };
        var data = [line_trace];
        Plotly.newPlot('line', data, line_layout);
  
  });
}// end line chart


//add sources info
function addSources(){
    var displaySources = " <ul><li>www.ridesharecentral.com</li><li> www.kaggle.com </li>"+
                        "<li>www.wired.com</li><li>www.CNET.com</li></ul>";
    var sources = d3.select('#sources')
        sources.html("")
        sources.append('div')
               // .append('hr')
                .html(displaySources)
                
               // .append('hr');
}//function addSources

initdropdown(); //calls function to fill dropdown object
addSources();
