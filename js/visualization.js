var units = "Widgets";
var margin = {
        top: 10,
        right: 10,
        bottom: 10,
        left: 10
    }
    // Apparently has to be global (referenced in sankey.js)
var width;
var formatNumber = d3.format(",.0f"), // zero decimal places
    format = function(d) {
        return formatNumber(d) + " " + units;
    },
    color = d3.scale.category20();
// append the svg canvas to the page
var svg = d3.select("#chart").append("svg")
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
// Set the sankey diagram properties
var sankey = d3.sankey()
    .nodeWidth(36)
    .nodePadding(15)
var path = sankey.link();

// Update diagram size when window size changes
window.onresize = function() {
    var svg = document.querySelector('#chart svg')
    var chart = svg.parentElement
    var height = 0.99 * chart.parentElement.clientHeight;
    svg.setAttribute('height', height)
    width = 0.95 * svg.clientWidth
        // Update visualization size
    sankey.size([width, 0.95 * height])
    sankey.relayout()
}
window.onresize()

// load the data

var source = ["Students", "CSE 142", "CSE 143", "CSE 143 - Not applied"];
var target = ["Enrolled", "Did not enroll", "Application Verified", "Accept", "Did not Apply", "Deny", "Soft Deny"];

d3.csv("./data/studentDataE.csv", function(error, data) {
    if (error) {
        alert(error)
        return
    }

    var nodeMap = {};
    var graph = {
        "nodes": [],
        "links": []
    };

    //filter data for stage 1
    var groupedStage1 = d3.nest()
        .key(function(d) {
            return d.source;
        })
        .key(function(d) {
            return d.target142;
        })
        .rollup(function(v) {
            return d3.sum(v, function(d) {
                return 1;
            });
        })
        .map(data);
    var weightStage1 = groupedStage1.student.CSE142;
    graph.nodes.push({
        "name": source[0]
    });
    graph.nodes.push({
        "name": source[1]
    });
    graph.links.push({
        "source": source[0],
        "target": source[1],
        "value": +weightStage1
    });
    //filter data for stage 2
    var groupedStage2 = d3.nest()
        .key(function(d) {
            return d.source;
        })
        .key(function(d) {
            return d.target142;
        })
        .key(function(d) {
            return d.target143;
        })
        .rollup(function(v) {
            return d3.sum(v, function(d) {
                return 1;
            });
        })
        .map(data);
    var weight1Stage2 = groupedStage2.student.CSE142.CSE143;
    var weight2Stage2 = groupedStage2.student.CSE142.NA143;


    var weightStage1 = groupedStage1.student.CSE142;
    graph.nodes.push({
        "name": source[1]
    });
    graph.nodes.push({
        "name": source[2]
    });
    graph.links.push({
        "source": source[1],
        "target": source[2],
        "value": +weight1Stage2
    });

    graph.nodes.push({
        "name": source[1]
    });
    graph.nodes.push({
        "name": source[3]
    });
    graph.links.push({
        "source": source[1],
        "target": source[3],
        "value": +weight2Stage2
    });

    //filter data for stage 3
    var groupedStage3 = d3.nest()
        .key(function(d) {
            return d.source;
        })
        .key(function(d) {
            return d.target142;
        })
        .key(function(d) {
            return d.target143;
        })
        .key(function(d) {
            return d.admitStatus;
        })
        .rollup(function(v) {
            return d3.sum(v, function(d) {
                return 1;
            });
        })
        .map(data);
    var weight1Stage3 = groupedStage3.student.CSE142.CSE143.Enrolled;
    var weight2Stage3 = groupedStage3.student.CSE142.CSE143.DNE;
    var weight3Stage3 = groupedStage3.student.CSE142.CSE143.AV;
    var weight4Stage3 = groupedStage3.student.CSE142.CSE143.Accept;
    var weight5Stage3 = groupedStage3.student.CSE142.CSE143.DNA;
    var weight6Stage3 = groupedStage3.student.CSE142.CSE143.Deny;
    var weight7Stage3 = groupedStage3.student.CSE142.CSE143.SD;

    graph.nodes.push({
        "name": source[2]
    });
    graph.nodes.push({
        "name": target[0]
    });
    graph.links.push({
        "source": source[2],
        "target": target[0],
        "value": +weight1Stage3
    });

    graph.nodes.push({
        "name": source[2]
    });
    graph.nodes.push({
        "name": target[1]
    });
    graph.links.push({
        "source": source[2],
        "target": target[1],
        "value": +weight2Stage3
    });

    graph.nodes.push({
        "name": source[2]
    });
    graph.nodes.push({
        "name": target[2]
    });
    graph.links.push({
        "source": source[2],
        "target": target[2],
        "value": +weight3Stage3
    });


    graph.nodes.push({
        "name": source[2]
    });
    graph.nodes.push({
        "name": target[3]
    });
    graph.links.push({
        "source": source[2],
        "target": target[3],
        "value": +weight4Stage3
    });

    graph.nodes.push({
        "name": source[2]
    });
    graph.nodes.push({
        "name": target[4]
    });
    graph.links.push({
        "source": source[2],
        "target": target[4],
        "value": +weight5Stage3
    });

    graph.nodes.push({
        "name": source[2]
    });
    graph.nodes.push({
        "name": target[5]
    });
    graph.links.push({
        "source": source[2],
        "target": target[5],
        "value": +weight6Stage3
    });

    graph.nodes.push({
        "name": source[2]
    });
    graph.nodes.push({
        "name": target[6]
    });
    graph.links.push({
        "source": source[2],
        "target": target[6],
        "value": +weight7Stage3
    });

    graph.nodes.push({
        "name": source[3]
    });
    graph.nodes.push({
        "name": target[4]
    });
    graph.links.push({
        "source": source[3],
        "target": target[4],
        "value": +weight2Stage2
    });



    graph.nodes = d3.keys(d3.nest()
        .key(function(d) {
            return d.name;
        })
        .map(graph.nodes));

    // loop through each link replacing the text with its index from node
    graph.links.forEach(function(d, i) {
        graph.links[i].source = graph.nodes.indexOf(graph.links[i].source);
        graph.links[i].target = graph.nodes.indexOf(graph.links[i].target);
    });

    //now loop through each nodes to make nodes an array of objects
    // rather than an array of strings
    graph.nodes.forEach(function(d, i) {
        graph.nodes[i] = {
            "name": d
        };
    });

    sankey
        .nodes(graph.nodes)
        .links(graph.links)
        .layout(32);

    // add in the links
    var link = svg.append("g").selectAll(".link")
        .data(graph.links)
        .enter().append("path")
        .attr("class", "link")
        .attr("d", path)
        .attr("id", function(d, i) {
            d.id = i;
            return "link-" + i;
        })
        .style("stroke-width", function(d) {
            return Math.max(0.1, d.dy);
        }) //
        .style("stroke", function(d, i) {
            return colorLink(i);
        })
        .sort(function(a, b) {
            return (b.dy - a.dy);
        });

    // add the link titles
    link.append("title")
        .text(function(d) {
            return "Student ID: " + d.studentID + "\n" +
                d.source.name + " → " +
                d.target.name + "\n" + d.value;
        });

    // add in the nodes
    var node = svg.append("g").selectAll(".node")
        .data(graph.nodes)
        .enter().append("g")
        .attr("class", "node")
        .attr("transform", function(d) {
            return "translate(" + d.x + "," + d.y + ")";
        })
        //.on("click",highlight_node_links);
        .on("mouseover", highlight_node_links)
        .on("mouseout", highlight_node_links_mouseout);

    // add the rectangles for the nodes
    node.append("rect")
        .attr("height", function(d) {
            return d.dy;
        })
        .attr("width", sankey.nodeWidth())
        .style("fill", function(d) {
            return colorNode(d);
        }) //d.color = color(d.name.replace(/ .*/, ""));
        .style("stroke", function(d) {
            return d3.rgb(d.color).darker(2);
        })
        .append("title")
        .text(function(d) {
            return d.name + "\n" + format(d.value);
        });

    // add in the title for the nodes
    node.append("text")
        .attr("x", -6)
        .attr("y", function(d) {
            return d.dy / 2;
        })
        .attr("dy", ".35em")
        .attr("text-anchor", "end")
        .attr("transform", null)
        .text(function(d) {
            return d.name;
        })
        .filter(function(d) {
            return d.x < width / 2;
        })
        .attr("x", 6 + sankey.nodeWidth())
        .attr("text-anchor", "start");
});

function highlight_node_links(node, i) {
    var remainingNodes = [],
        nextNodes = [];

    var stroke_opacity = 0.9;

    var traverse = [{
        linkType: "sourceLinks",
        nodeType: "target"
    }, {
        linkType: "targetLinks",
        nodeType: "source"
    }];

    traverse.forEach(function(step) {
        node[step.linkType].forEach(function(link) {
            remainingNodes.push(link[step.nodeType]);
            highlight_link(link.id, stroke_opacity);
        });

        while (remainingNodes.length) {
            nextNodes = [];
            remainingNodes.forEach(function(node) {
                node[step.linkType].forEach(function(link) {
                    nextNodes.push(link[step.nodeType]);
                    highlight_link(link.id, stroke_opacity);
                });
            });
            remainingNodes = nextNodes;
        }
    });
}

function highlight_node_links_mouseout(node, i) {
    //console.log("De-emphasize");
    var remainingNodes = [],
        nextNodes = [];

    var stroke_opacity = 0.2;
    var traverse = [{
        linkType: "sourceLinks",
        nodeType: "target"
    }, {
        linkType: "targetLinks",
        nodeType: "source"
    }];

    traverse.forEach(function(step) {
        node[step.linkType].forEach(function(link) {
            remainingNodes.push(link[step.nodeType]);
            highlight_link(link.id, stroke_opacity);
        });

        while (remainingNodes.length) {
            nextNodes = [];
            remainingNodes.forEach(function(node) {
                node[step.linkType].forEach(function(link) {
                    nextNodes.push(link[step.nodeType]);
                    highlight_link(link.id, stroke_opacity);
                });
            });
            remainingNodes = nextNodes;
        }
    });
}

function highlight_link(id, opacity) {
    d3.select("#link-" + id).style("stroke-opacity", opacity);
}


function colorNode(node) {
    var id = node.name;
    if (id == source[0]) {
        return '#8dd3c7';
    } else if (id == source[1]) {
        return '#ffffb3';
    } else if (id == source[2]) {
        return '#bebada';
    } else if (id == source[3]) {
        return '#fb8072';
    } else if (id == target[0]) {
        return '#80b1d3';
    } else if (id == target[1]) {
        return '#fdb462';
    } else if (id == target[2]) {
        return '#b3de69';
    } else if (id == target[3]) {
        return '#fccde5';
    } else if (id == target[4]) {
        return '#d9d9d9';
    } else if (id == target[5]) {
        return '#bc80bd';
    } else if (id == target[6]) {
        return '#ccebc5';
    } else {
        return '#ffed6f';
    }
}

function colorLink(node) {
    var id = node;
    if (id == 0) {
        return '#a6cee3';
    } else if (id == 1) {
        return '#1f78b4';
    } else if (id == 2) {
        return '#b2df8a';
    } else if (id == 3) {
        return '#33a02c';
    } else if (id == 4) {
        return '#fb9a99';
    } else if (id == 5) {
        return '#e31a1c';
    } else if (id == 6) {
        return '#fdbf6f';
    } else if (id == 7) {
        return '#ff7f00';
    } else if (id == 8) {
        return '#cab2d6';
    } else if (id == 9) {
        return '#6a3d9a';
    } else if (id == 10) {
        return '#ffff99';
    } else {
        return '#000000';
    }
}
