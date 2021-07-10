


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
      //  createBubbles(id);
        gauge(year);
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
    //createBubbles(id);
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

// function createBubbles(sampleid){    
//     d3.json("data/samples.json").then(function(data){
// /*
// Create a bubble scatter chart 
// */
//         console.log(data)//displays data to console
//         var samples = data.samples;
//         var filterdata = samples.filter(row => row.id == sampleid);
//         var result = filterdata[0];
//         //console.log("result otu labels");
//         //console.log(result.otu_labels);
//        // console.log(filterdata[0].otu_labels);
//         var sample_values = result.sample_values;
//         var otu_ids = result.otu_ids;
//        // var otu_labels = filterdata[0].otu_labels;
//         var otu_labels = result.otu_labels;
       
//         marker_sizes = sample_values.slice(0, 10).reverse();
//         var data = [{
//             y:sample_values.slice(0, 10).reverse(), 
//             x:otu_ids.slice(0, 10).reverse(),
//             mode: 'markers',
//             marker: {
//                 color: ['rgb(93, 164, 214)', 'rgb(255, 144, 14)',  'rgb(44, 160, 101)', 'rgb(255, 65, 54)'],
//                 size: marker_sizes
//             },
//             text:otu_ids.slice(0, 10).map(otu_ids => `OTU${otu_ids}`).reverse(),
//             transform: "rotate(-90)"
//         }];

//         var layout = {
//             title: "<b>Bacteria Culture Per Sample<b>",
//             yaxis: { title: "<b>Sample Values<b>" },
//             xaxis: { title: "<b>OTU<b>" }
//         };
//         Plotly.newPlot("bubble", data, layout);
//     })

// }//end function

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
        console.log(yrdetails)
        var metadata = yrdetails[0];
        
       
       //if severity category is 0 add 1
        var duicat = metadata.Severity;
        if(duicat == 0){
            duicat +=1
            metadata.Severity+=1
        }
        var title = metadata.TEAM
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
        //Sub title should be Team name
      };//end layout
      
      Plotly.newPlot('gauge', data, layout);
    })//end d3
}//end function

function lineGraph(yrid){

    

}
initdropdown(); //calls function to fill dropdown object
