// const chartElem = document.querySelector('#chart');
// var width = chartElem.clientWidth,
//     height = chartElem.clientHeight;

// var color = d3.scale.category20();

// var dist = (width + height) / 8;

// var force = d3.layout.force()
//     // .charge(-120)
//     // .linkDistance(dist)
//     .charge(-100)
//     .linkDistance(dist)
//     .size([width, height]);

// function getrank(rval) {
//     return (rval/2.0) + 3;
// }

// function getcolor(rval) {
//     return color(rval);
// }

// var svg = d3.select("#chart").append("svg")
//     .attr("width", width)
//     .attr("height", height);

// const showDetail = (d) => { 
//     const template = `
//         <table>
//             <tr>
//                 <td>Address:</td>
//                 <td><a href="${d.url}" target="_blank">${d.url}</a></td>
//             </tr>
//             <tr>
//                 <td>Rank</td>
//                 <td>${d.rank}</td>
//             </tr>
//     `;
//     document.querySelector('#detail').innerHTML = template;
//     d3.event.stopPropagation();
// };

// const dragstart = d => {
//     console.log(d);
//     d3.select(this).classed("fixed", d.fixed = true);
// };

// const dblclick = d => {
//     d3.select(this).classed("fixed", d.fixed = false);
// };
  
// function loadData(json) {
//     force
//         .nodes(json.nodes)
//         .links(json.links)
//         .start();

//     // var k = Math.sqrt(json.nodes.length / (width * height));

//     // force
//     //     .charge(-100 / k)
//     //     .gravity(100 * k)
//     //     .start();

//     var drag = force.drag()
//         .on("dragstart", dragstart);

//     var link = svg.selectAll(".link")
//         .data(json.links)
//         .enter().append("line")
//         .attr("class", "link")
//         .style("stroke-width", function(d) { d.value**2; });

//     var node = svg.selectAll(".node")
//         .data(json.nodes)
//         .enter().append("g")
//         .attr("class", "node")
//         // .call(drag);
//         // .call(force.drag);

//     node.append("circle")
//         .attr("class", "node")
//         .attr("r", function(d) { return getrank(d.rank) * 3; } )
//         // .style("fill", function (d) { return getcolor(d.rank); })
//         .on("click", showDetail)
//         .call(drag)
//         .on("dblclick", dblclick);
      
//     node.append("text")
//         .attr("class", "label")
//         .attr("y", 4)
//         .text(function(d) { return d.rank.toFixed(2) });



//     force.on("tick", function() {
//         link.attr("x1", function(d) { return d.source.x; })
//             .attr("y1", function(d) { return d.source.y; })
//             .attr("x2", function(d) { return d.target.x; })
//             .attr("y2", function(d) { return d.target.y; });

//         node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
//     });
// }


const showDetail = (d) => { 
    const template = `
        <table>
            <tr>
                <td>Address:</td>
                <td><a href="${d.url}" target="_blank">${d.url}</a></td>
            </tr>
            <tr>
                <td>Rank</td>
                <td>${d.rank}</td>
            </tr>
    `;
    document.querySelector('#detail').innerHTML = template;
    d3.event.stopPropagation();
};

function getrank(rval) {
    return (rval/2.0) + 3;
}

function dblclick(d) {
    d3.select(this).classed("fixed", d.fixed = false);
}

function dragstart(d) {
    d3.select(this).classed("fixed", d.fixed = true);
}

function loadData (graph) {
    
    const chartElem = document.querySelector('#chart');
    const width = chartElem.clientWidth;
    const height = chartElem.clientHeight;
    const dist = (width + height) / 4;

    var force = d3.layout.force()
        .size([width, height])
        .charge(-200)
        .linkDistance(dist)
        .on("tick", tick);

    var drag = force.drag()
        .on("dragstart", dragstart);

    var svg = d3.select("#chart").append("svg")
        .attr("width", width)
        .attr("height", height);

    var link = svg.selectAll(".link"),
        node = svg.selectAll(".node");


    force
        .nodes(graph.nodes)
        .links(graph.links)
        .start();

    link = link.data(graph.links)
        .enter().append("line")
        .attr("class", "link");

    node = node.data(graph.nodes)
        .enter().append("g")
        .attr("class", "node")
        .on("dblclick", dblclick)
        .on("click", showDetail)
        .call(drag);

    node.append("circle")
        .attr("class", "node")
        .attr("r", function(d) { 
            return getrank(d.rank) * 3; 
        })
        .style("fill", function (d) { return '#CCC' });

    node.append("text")
        .attr("class", "label")
        .attr("y", 4)
        .text(function(d) { return d.rank.toFixed(2) });

    function tick() {
        link.attr("x1", function(d) { return d.source.x; })
            .attr("y1", function(d) { return d.source.y; })
            .attr("x2", function(d) { return d.target.x; })
            .attr("y2", function(d) { return d.target.y; });
    
        node.attr("cx", function(d) { return d.x; })
            .attr("cy", function(d) { return d.y; });
    
        node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
    }
}

loadData(spiderJson);
