var graphElement = document.getElementById("graphTarget");
var transportData = [
	{
		label: "car",
		data: [
			{x: "2016-09-20", y: 200}, 
			{x: "2016-09-21", y: 250},
			{x: "2016-09-22", y: 260},
			{x: "2016-09-23", y: 220},
			{x: "2016-09-25", y: 220}
		]
	},
	{
		label: "buss",
		data: [
			{x: "2016-10-20", y: 20},
			{x: "2016-11-21", y: 19},		
			{x: "2016-10-23", y: 18}
		]
	}
];


// Create the new graph
var transportGraph = new Graph(graphElement, transportData, "Date", "Amount"); // Will create a new graph in an element

