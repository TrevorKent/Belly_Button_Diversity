function buildMetadata(sample) {
    d3.json(`/metadata/${sample}`).then((data) => {
                var PANEL = d3.select("#sample-metadata");
                PANEL.html(""); // clear existing data
                Object.entries(data).forEach(([key, value]) => {
                    PANEL.append("h6").text(`${key}: ${value}`);
                });

                buildGauge(data.WFREQ);
            }

            function buildCharts(sample) {

                // @TODO: Use `d3.json` to fetch the sample data for the plots

                // @TODO: Build a Bubble Chart using the sample data
                var trace1 = {
                    x: [1, 2, 3, 4],
                    y: [10, 11, 12, 13],
                    mode: 'markers',
                    marker: {
                        size: [40, 60, 80, 100]
                    }
                };

                var data = [trace1];

                var layout = {
                    title: 'Marker Size',
                    showlegend: false,
                    height: 600,
                    width: 600
                };

                Plotly.newPlot('myDiv', data, layout);



                // @TODO: Build a Pie Chart
                // HINT: You will need to use slice() to grab the top 10 sample_values,
                // otu_ids, and labels (10 each).
                // basic pie chart (still needs slicing)
                var data = [{
                    values: [],
                    labels: [],
                    type: 'pie'
                }];

                var layout = {
                    height: 400,
                    width: 500
                };

                Plotly.newPlot('myDiv', data, layout); // verify myDiv


            }

            function init() {
                // Grab a reference to the dropdown select element
                var selector = d3.select("#selDataset");

                // Use the list of sample names to populate the select options
                d3.json("/names").then((sampleNames) => {
                    sampleNames.forEach((sample) => {
                        selector
                            .append("option")
                            .text(sample)
                            .property("value", sample);
                    });

                    // Use the first sample from the list to build the initial plots
                    const firstSample = sampleNames[0];
                    buildCharts(firstSample);
                    buildMetadata(firstSample);
                });
            }

            function optionChanged(newSample) {
                // Fetch new data each time a new sample is selected
                buildCharts(newSample);
                buildMetadata(newSample);
            }

            // Initialize the dashboard
            init();