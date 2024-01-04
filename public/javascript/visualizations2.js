document.addEventListener('DOMContentLoaded', function () {
    var myArray = JSON.parse(localStorage.getItem("myArray")) || [];

    function compare(a, b) {
        const A = new Date(a.transactionDate);
        const B = new Date(b.transactionDate);
        return A - B;
    }

    myArray.sort(compare);

    var dates = [];
    var values = [];
    var Maps = {};

    for (var i = 0; i < myArray.length; i++) {
        var d = myArray[i]["transactionDate"];
        var v = parseFloat(myArray[i]["amount"]);

        if (Maps.hasOwnProperty(d)) {
            Maps[d] += v;
        } else {
            Maps[d] = v;
            dates.push(d);
        }
    }

    for (var i = 0; i < dates.length; i++) {
        values.push(Maps[dates[i]]);
    }

    var dateObjects = dates.map(date => new Date(date + "T00:00:00"));

    var trace = {
        x: dateObjects,
        y: values,
        type: 'scatter',
        mode: 'lines+markers'
    };

    var layout = {
        font: { color: 'black', family: 'Arial', weight: 'bold' },
        title: 'Expense Tracked Each Day',
        xaxis: {
            title: 'Dates',
            type: 'date',
            tickformat: '%m-%d-%Y',
            tickvals: dateObjects,
            tickfont: {
                color: 'black'
            }
        },
        yaxis: {
            title: 'Expense Amount (US $)'
        }
        
    };

    // Check if the element with id 'plot' exists
    var plotElement = document.getElementById('plot');
    if (plotElement) {
        Plotly.newPlot('plot', [trace], layout);
    } else {
        console.error("No DOM element with id 'plot' exists on the page.");
    }
});
