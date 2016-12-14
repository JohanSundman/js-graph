// The graph library

/*
	Data exampel:
	[
		{
			label: "car",
			data: [
				{x: "2016-09-20", y: 200}, 
				{x: "2016-09-21", y: 250}
			]
		},
		{
			label: "buss",
			data: [
				{x: "2016-09-20", y: 20}, 
				{x: "2016-09-21", y: 18}
			]
		}
	]
*/
var graphList = []; // List of graphs
window.addEventListener('resize', function(){
	for(var i = 0; i < graphList.length; i++){
		graphList[i].draw();
	}
});
	


class Graph{
	constructor(target, data, xLabel, yLabel){
		this.data = data; // Get the data
		
		this.target = target; // Save the target name
		this.canvas = this.createCanvas(target); // Make the canvas element
		this.context = this.createContext(this.canvas); // Create the context
		
		// Add the new object to the graph list
		graphList.push(this);

		this.draw(); // Draw the graph
	}
	
	draw(){
		this.crop();
		this.scale = this.scaling(this.data); // Get the scale
		this.print();
	}
	
	createCanvas(target){
		var canvas = document.createElement("canvas");
		canvas.className = "graph";
		canvas.width = target.offsetWidth; // Target size is now canvas size
		canvas.height = target.offsetHeight; // Target size is now canvas size
		target.appendChild(canvas); // Append the canvas to the element
		return canvas;
	}
	
	crop(){
		this.canvas.width = this.target.offsetWidth; // Target size is now canvas size
		this.canvas.height = this.target.offsetHeight; // Target size is now canvas size
	}
	
	createContext(canvas){
		var context = canvas.getContext('2d');
		return context;
	}
	
	scaling(data){ // get the right scaling for a datset
		var temp = {
			min: null,
			max: null,
			dateMin: null,
			dateMax: null
		}
		
		/* Look for the extreme values */
		for(var i = 0; i < data.length; i++){ // Loop through each dataset
			for(var n = 0; n < data[i].data.length; n++){ // Loop the induvidual points
				
				// Value(y) min and Max
				if(data[i].data[n].y < temp.min || temp.min === null){
					temp.min = data[i].data[n].y;
				}
				if(data[i].data[n].y > temp.max || temp.max === null){
					temp.max = data[i].data[n].y;
				}
				
				// Date(x) Min and Max
				if(temp.dateMin === null  ||  data[i].data[n].x.d2ms() < temp.dateMin.d2ms()){
					temp.dateMin = data[i].data[n].x;
				}
				if(temp.dateMax === null  ||  data[i].data[n].x.d2ms() > temp.dateMax.d2ms()){
					temp.dateMax = data[i].data[n].x;
				}
			}
		}
		return temp; // Give away the hard collected data
	}
	
	print(){ // Redraw the data
		
		// var timeFrame = this.scale.dateMax.dateToMilliseconds() - this.scale.dateMin.dateToMilliseconds(); // (Ms)
		// var percentOfWidth = *data* / timeFrame; // Get the percentage of the timeFrame
		// percentOfWidth * canvas.width; // Get the pixel coordinate by percentage
		
		var timeFrame = this.scale.dateMax.d2ms() - this.scale.dateMin.d2ms(); // (Ms)
		var valueFrame = this.scale.max - this.scale.min;
		
		this.context.fillStyle = 'red';
		this.context.lineWidth = 0;
		
		for(var i = 0; i < this.data.length; i++){ // Loop through each dataset
			console.log(this.data[i].label);
			for(var n = 0; n < this.data[i].data.length; n++){ // Loop the induvidual points
				
				/* Calculate each coordinate position on the canvas */
				var percentOfWidth = (this.data[i].data[n].x.d2ms() - this.scale.dateMin.d2ms()) / timeFrame; // Get the percentage of the timeFrame
			    var percentOfHeight = (this.data[i].data[n].y - this.scale.min) / valueFrame; // Get the percentage of the timeFrame
				var canvasPosX = percentOfWidth * this.canvas.width; // Get the pixel coordinate by percentage
				var canvasPosY = this.canvas.height - percentOfHeight * this.canvas.height; // Get the pixel coordinate by percentage (reverse)
				
				this.context.beginPath();
				this.context.arc(canvasPosX, canvasPosY, 3,0,2*Math.PI);
				this.context.fill();
				this.context.closePath();
			}
		}
	}
	
	addKeyData(key, data, label){
		
		
	}
	
	removeKeyData(key){
		console.log(key);
		console.log(this.target);
	}
}



String.prototype.d2ms = function(){
	var date = new Date(this);
	return date.getTime();
}



