document.addEventListener('DOMContentLoaded', function () {
    var food = 0;
    var enter = 0;
    var house = 0;
    var trans = 0;
    var util = 0;
    var o = 0;
    var myArray = JSON.parse(localStorage.getItem("myArray")) || [];
    console.log(myArray);

    for (var i = 0; i < myArray.length; i++) {
        if (myArray[i]["category"] == "food") {
            food += parseFloat(myArray[i]["amount"]);
        }
        if (myArray[i]["category"] == "housing") {
            house += parseFloat(myArray[i]["amount"]);
        }
        if (myArray[i]["category"] == "transportation") {
            trans += parseFloat(myArray[i]["amount"]);
        }
        if (myArray[i]["category"] == "utilities") {
            util += parseFloat(myArray[i]["amount"]);
        }
        if (myArray[i]["category"] == "entertainment") {
            enter += parseFloat(myArray[i]["amount"]);
        }
        if (myArray[i]["category"] == "other") {
            o += parseFloat(myArray[i]["amount"]);
        }
    }

    const expenses = [
        { category: 'Food', amount: food },
        { category: 'Transportation', amount: trans },
        { category: 'Entertainment', amount: enter },
        { category: 'Utilities', amount: util },
        { category: 'Housing', amount: house },
        { category: 'Other', amount: o }
    ];

    const categories = expenses.map(expense => expense.category);
    const amounts = expenses.map(expense => expense.amount);

    const data = [{
        type: 'bar',
        x: categories,
        y: amounts,
        marker: {
            color: "rgb(0,0,0)",
            opacity: 0.7,
        }
    }];

    const layout = {
        font: { color: 'black', family: 'Arial', weight: 'bold' },
        title: 'Expense Tracked per Category',
        xaxis: { title: 'Expense Category' },
        yaxis: { title: 'Expense Amount (US $)' }
    };

    // Check if the element with id 'expense-chart' exists
    var expenseChartElement = document.getElementById('expense-chart');
    if (expenseChartElement) {
        Plotly.newPlot('expense-chart', data, layout);
    } else {
        console.error("No DOM element with id 'expense-chart' exists on the page.");
    }
});
