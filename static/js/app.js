// Remember to place the html file in the templates folder
// we initiate this app through app.py and run on local host

function buildMetadata(sample) {
    // pull data for dropdown
    d3.json(`/metadata/${sample}`).then((data) => {
        var PANEL = d3.select("#sample-metadata");
        // Clear and then create panel bellow dropdown selector
        // Notice the data is attached to "h6" elements located on html (more code magic!)
        PANEL.html("");
        Object.entries(data).forEach(([key, value]) => {
            PANEL.append("h6").text(`${key}: ${value}`);
        });
    });
}

function buildCharts(sample) {
    d3.json(`/samples/${sample}`).then((data) => {
        // const for charts
        const otu_ids = data.otu_ids;
        const otu_labels = data.otu_labels;
        const sample_values = data.sample_values;
        // Bubble Chart
        var bubble_Layout = {
            margin: { t: 0 },
            hovermode: "closest",
            xaxis: {
                title: "OTU ID"
            }
        };
        var bubble_Data = [{
            x: otu_ids,
            y: sample_values,
            text: otu_labels,
            mode: "markers",
            marker: {
                size: sample_values,
                color: otu_ids,
                colorscale: "blue"
            }
        }];
        // plot the bubble
        Plotly.plot("bubble", bubble_Data, bubble_Layout);
        // pie chart
        var pie_Data = [{
            values: sample_values.slice(0, 10),
            labels: otu_ids.slice(0, 10),
            hovertext: otu_labels.slice(0, 10),
            hoverinfo: "hovertext",
            type: "pie"
        }];
        // dont forget margins!
        var pie_Layout = {
            margin: { t: 0, l: 0 }
        };
        // plot the pie
        Plotly.plot("pie", pie_Data, pie_Layout);
    });
}
// define initial loading sample
// thist part I'm a little "fuzzy" with
function init() {
    var selector = d3.select("#selDataset");
    d3.json("/names").then((sampleNames) => {
        sampleNames.forEach((sample) => {
            selector
                .append("option")
                .text(sample)
                .property("value", sample);
        });
        // build charts using firstSample as default
        const firstSample = sampleNames[0];
        buildCharts(firstSample);
        buildMetadata(firstSample);
    });
}

function optionChanged(newSample) {
    buildCharts(newSample);
    buildMetadata(newSample);
}

// Need to review this HW!!
init();