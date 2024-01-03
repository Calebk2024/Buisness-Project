
document.addEventListener("DOMContentLoaded", function() {
    if (localStorage.getItem("fpercent") + localStorage.getItem("epercent") + localStorage.getItem("hpercent") + localStorage.getItem("tpercent") + localStorage.getItem("upercent") + localStorage.getItem("opercent") == 0) {
        alert("User has not logged any expenses");
    }
    
    

    var userChart = document.getElementById("PieChart");
    var averageChart = document.getElementById("PieChart2");

    var data = {
        labels: ["Food", "Entertainment", "Housing", "Transportation", "Utilities", "Other"],
        datasets: [{
            data: [localStorage.getItem("fpercent"), localStorage.getItem("epercent"), localStorage.getItem("hpercent"), localStorage.getItem("tpercent"),
            localStorage.getItem("upercent"), localStorage.getItem("opercent")],
            backgroundColor: ["blue", "black", "purple", "yellow", "red", "orange"]
        }]
    };
    var userPieChart = new Chart(userChart, {
        type: 'pie',
        data: data,
        options: {
            animation: {
                animateRotate: true,
                animateScale: true,
                duration: 4000
            }
        }
    });

    var data2 = {
        labels: ["Food", "Entertainment", "Housing", "Transportation", "Utilities", "Other"],
        datasets: [{
            data: [12.8, 4.7, 33.33, 16.8, 33.33, 4.1],
            backgroundColor: ["blue", "black", "purple", "yellow", "red", "orange"]
        }]
    };
    var averagePieChart = new Chart(averageChart, {
        type: 'pie',
        data: data2,
        options: {
            animation: {
                animateRotate: true,
                animateScale: true,
                duration: 4000
            }
        }
    });

    
});
function by() {
    document.getElementById("profit").style.display = "none";
    document.getElementById("R").style.display = "none";
    document.getElementById("S").style.display = "inline-block";
    var canvas = document.getElementById("BarChart");
    canvas.parentNode.removeChild(canvas);
    document.getElementById("input").value = "";
}
function my() {
    document.getElementById("S").style.display = "none";
    document.getElementById("R").style.display = "inline-block";

    var canvas = document.createElement("canvas");
    canvas.id = "BarChart";
    canvas.width = 200;
    canvas.height = 100;

    var barDiv = document.getElementById("bar");
    barDiv.innerHTML = "";  // Clear existing content
    barDiv.appendChild(canvas);

    var c = document.getElementById("BarChart");
    if (!c) {
        alert("Failed to create canvas element.");
        return;
    }

    var ir = document.getElementById("input").value;
    console.log(isNaN(parseFloat(ir)));
    if (parseFloat(ir) < 0 || isNaN(parseFloat(ir))==true) {
        document.getElementById("R").style.display = "none";
        document.getElementById("S").style.display = "inline-block";
        alert('Please enter a positive US $ Amount');
        document.getElementById("input").value = "";
        return;
    }

    var a = JSON.parse(localStorage.getItem("myArray")) || [];
    var arr = [];
    arr.push({ "01": 0 });
    arr.push({ "02": 0 });
    arr.push({ "03": 0 });
    arr.push({ "04": 0 });
    arr.push({ "05": 0 });
    arr.push({ "06": 0 });
    arr.push({ "07": 0 });
    arr.push({ "08": 0 });
    arr.push({ "09": 0 });
    arr.push({ "10": 0 });
    arr.push({ "11": 0 });
    arr.push({ "12": 0 });

    for (var i = 0; i < a.length; i++) {
        var month = a[i]["transactionDate"].substring(5, 7);
        var index = arr.findIndex(item => item[month]);
        for (var j = 0; j < arr.length; j++) {
            if (month in arr[j]) {
                var value = parseInt(arr[j][month]) + parseInt((a[i]["amount"]));
                arr[j][month] = value;
            }
        }
    }

    var data = {
        labels: ["January", "February", "March", "April", "May", "June", "July", "August",
            "September", "October", "November", "December"],
        datasets: [{
            label: "Income",
            data: [parseFloat(ir), parseFloat(ir), parseFloat(ir), parseFloat(ir), parseFloat(ir), parseFloat(ir), parseFloat(ir),
            parseFloat(ir), parseFloat(ir), parseFloat(ir), parseFloat(ir), parseFloat(ir)],
            backgroundColor: "blue"
        },
        {
            label: "Expenses",
            data: [arr[0]["01"], arr[1]["02"], arr[2]["03"], arr[3]["04"], arr[4]["05"], arr[5]["06"],
            arr[6]["07"], arr[7]["08"], arr[8]["09"], arr[9]["10"], arr[10]["11"], arr[11]["12"]],
            backgroundColor: "red"
        },]
    };

    var ctx = c.getContext('2d');
    if (!ctx) {
        alert("Failed to get context for canvas element.");
        return;
    }

    var options = {
        scales: {
            y: {
                beginAtZero: true,
            }
        }
    };

    var bar = new Chart(ctx, {
        type: 'bar',
        data: data,
        options: {
            animation: {
                animateRotate: true,
                animateScale: true,
                duration: 4000
            }
        }
    });

    var sum = 0;
    for (var index of arr) {
        for (var key in index) {
            console.log(index[key]);
            sum+=parseFloat(ir)-index[key];
        }
    }

    document.getElementById("profit").style.display = "block";
    console.log(sum);
    document.getElementById("profit").innerHTML="Your average monthly profit is "+(sum/12.0).toFixed(2)+" $"; 
}

