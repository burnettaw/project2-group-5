var data = [
    {
      domain: { x: [0, 1], y: [0, 1] },
      value: `${average}`,
      title: { text: `Average Severity in ${selected_yr}` },
      type: "indicator",
      mode: "gauge+number"
    }
  ];

  sum = 0;
  for (var i = 0; i < results.length; i++) {
    sum += +results[i].Severity;
  }
  average = Math.round(sum / results.length * 10) / 10
  console.log("average")
  console.log("average= ", sum, " / ", results.length, " = ", average)
  var data = [
    {
      domain: { x: [0, 1], y: [0, 1] },
      value: `${average}`,
      title: { text: `Average Severity in ${selected_yr}` },
      type: "indicator",
      mode: "gauge+number"
    }
  ];
11:36
var yearTag = d3.select('#selYear');
year_array = [];
team_array = [];
team = {};
d3.csv("/static/data/nfl-duiupdate2.csv").then(function (data) {
// console.log("data")
// console.log(data)
data.map((row_data) => {
  if (year_array.indexOf(row_data.Year) === -1) {
    year_array.push(row_data.Year)
    // console.log("row_data")
    // console.log(row_data.Year)
  }
  if (team_array.indexOf(row_data.TEAM) === -1) {
    team_array.push(row_data.TEAM)
  }
});
console.log(year_array);
yearTag
  .append("option")
  .property("value", "")
  .text("Select Year");
year_array.map((year) => {
  yearTag
    .append("option")
    .property("value", year)
    .text(year);
});
team_array.map((element) => {
  team[element] = 0
  // console.log(element, "= ", team[element])
});
});
// console.log("team_array")
// console.log(team_array)
// Select a year from the dropdown list of Year in index.html
function optionYear(selected_yr) {
console.log("selected_yr=", selected_yr);
team_array.map((element) => {
  team[element] = 0
  // console.log(element, "= ", team[element])
});
d3.csv("/static/data/nfl-duiupdate2.csv").then(function (data) {
  results = data.filter(row => row.Year == selected_yr);
  // console.log("results")
  // console.log(results)
  // console.log("results.length")
  // console.log(results.length)
  for (var i = 0; i < results.length; i++) {
    teamName = results[i].TEAM
    team[teamName] += 1
    console.log(teamName, "= ", team[teamName])
  }
  y_label = [];
  x_value = [];
  for (teamName in team) {
    if (team[teamName] != 0) {
      y_label.push(teamName)
      x_value.push(team[teamName])
    }
  }