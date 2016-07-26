/*
    Kehinde Orogbangba
    pie.js
    
    javascript file that defines d3 pie chart
    
*/

var width = 400,
	height = 400,
	radius = 200,
	colors = d3.scale.category20c();

/*
    temporary pieData to display
*/

/*
var piedata = [
	{
		label: "Barot",
		value: 10
	},{
		label: "Gerad",
		value: 30
	},{
		label: "Jennifer",
		value: 70
	}
]
*/
var piedata = pieData;



//var piedata = pieData;

var pie = d3.layout.pie()
    .sort(null)
	.value(function(d){
		return d.value;
	})

var arc = d3.svg.arc()
	.outerRadius(radius - 10)
    .innerRadius(0)

var labelArc = d3.svg.arc()
    .outerRadius(radius - 40)
    .innerRadius(radius - 40);

var tooltip = d3.select('body').append('div')
	.style('position','absolute')
	.style('padding','0 10px')
	.style('background','white')
	.style('opacity',0);


var myChart = d3.select('#pie').append('svg')
	.attr('width', width)
	.attr('height', height)
	.append('g')
		.attr('transform', 'translate('+(width - radius)+ ',' +(height - radius)+')')
		.selectAll('path').data(pie(piedata))
		.enter().append('path')
			.attr('fill', function(d,i){
				return colors(i);
			})
			.attr('d', arc)

    .on('mouseover', function(d){
		tooltip.transition()
			.style('opacity', .9)
		tooltip.html(d.value)
			.style('left',(d3.event.pageX) + 'px')
			.style('top',(d3.event.pageY) + 'px')

		tempColor = this.style.fill;
		d3.select(this)
			.style('opacity', .5)
			.style('fill', 'blue')
	})
	.on('mouseout', function(d){
		d3.select(this)
			.style('opacity', 1)
			.style('fill', tempColor)
        tooltip.transition()
            .style('opacity', 0)
	})


//code to attempt to get x value to  show up on pie
var g = svg.selectAll(".arc")
      .data(piedata)
    .enter().append("g")
      .attr("class", "arc")

  g.append("path")
      .attr("d", arc)
      .style("fill", function(d) { return color(d); })

  g.append("text")
      .attr("transform", function(d) { return "translate(" + labelArc.centroid(d) + ")"; })
      .attr("dy", ".35em")
      .text(function(d) { return d.value; })
    


