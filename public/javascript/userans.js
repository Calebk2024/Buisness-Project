var myArray = JSON.parse(localStorage.getItem("myArray")) || [];
console.log(myArray);

function addRowToTable(name, amount, category, date) {
    var table = document.getElementById('dataTable');
    var newRow = table.insertRow(table.rows.length);
    var cell1 = newRow.insertCell(0);
    var cell2 = newRow.insertCell(1);
    var cell3 = newRow.insertCell(2);
    var cell4 = newRow.insertCell(3);
    cell1.innerHTML = name;
    cell2.innerHTML = amount + " $";
    cell4.innerHTML = date.substring(5) + "-" + date.substring(0, 4);
    cell3.innerHTML = category;
}

function updateTable() {
    var table = document.getElementById('dataTable');
    for (var i = 0; i < myArray.length; i++) {
        addRowToTable(myArray[i].description, myArray[i].amount, myArray[i].category, myArray[i].transactionDate);
    }
}

function calculatePercentages() {
    var add = 0;
    var food = 0;
    var enter = 0;
    var house = 0;
    var trans = 0;
    var util = 0;
    var local = [];
    var oth = 0;

    for (var i = 0; i < myArray.length; i++) {
        add += Number(myArray[i]["amount"]);
        local.push(myArray[i]["transactionDate"]);

        if (myArray[i]["category"] == "food") {
            food += Number(myArray[i]["amount"]);
        }
        if (myArray[i]["category"] == "housing") {
            house += Number(myArray[i]["amount"]);
        }
        if (myArray[i]["category"] == "transportation") {
            trans += Number(myArray[i]["amount"]);
        }
        if (myArray[i]["category"] == "utilities") {
            util += Number(myArray[i]["amount"]);
        }
        if (myArray[i]["category"] == "entertainment") {
            enter += Number(myArray[i]["amount"]);
        }
        if (myArray[i]["category"] == "other") {
            oth += Number(myArray[i]["amount"]);
        }
    }

    function samedates(Array) {
        const same = [];
        let counter = 0;
        Array.forEach(dateStr => {
            const dateObj = new Date(dateStr);
            dateObj.setDate(dateObj.getDate() + 1);
            const year = dateObj.getFullYear();
            const month = dateObj.getMonth() + 1;
            const day = dateObj.getDate();
            const dateKey = `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`;
            bool = true;
            for (let i = 0; i < same.length; i++) {
                if (dateKey == same[i]) {
                    bool = false;
                }
            }
            if (bool) {
                same.push(dateKey);
                counter += 1;
            }
        });
        return counter;
    }

    function sameweek(dateArray) {
        const group = [];
        let counter = 0;
        dateArray.forEach(date => {
            const dateObj = new Date(date);
            dateObj.setDate(dateObj.getDate() + 1);
            const year = dateObj.getFullYear();
            const weekNum = getWeek(dateObj) - 1;
            const weekKey = `${year}-W${weekNum < 10 ? '0' : ''}${weekNum}`;
            bool = true;
            for (let i = 0; i < group.length; i++) {
                if (weekKey == group[i]) {
                    bool = false;
                }
            }
            if (bool) {
                group.push(weekKey)
                counter += 1
            }
        });
        return counter;
    }

    function getWeek(date) {
        const target = new Date(date.valueOf());
        const day = (date.getDay() + 7) % 7;
        target.setDate(target.getDate() - day + 3);
        const first = target.valueOf();
        target.setMonth(0, 1);
        if (target.getDay() !== 0) {
            target.setMonth(0, 1 + ((0 - target.getDay()) + 7) % 7);
        }
        return 1 + Math.ceil((first - target) / 604800000);
    }

    var table = document.getElementById('percentages');
    var newRow = table.insertRow(table.rows.length);
    var cell1 = newRow.insertCell(0);
    var cell2 = newRow.insertCell(1);
    var cell3 = newRow.insertCell(2);
    var cell4 = newRow.insertCell(3)
    var cell5 = newRow.insertCell(4);
    var cell6 = newRow.insertCell(5);
    var cell7 = newRow.insertCell(6);
    cell1.innerHTML = add + " dollars";
    cell2.innerHTML = parseFloat(food / add);
    cell3.innerHTML = parseFloat(enter / add);
    cell4.innerHTML = parseFloat(house / add);
    cell5.innerHTML = parseFloat(trans / add);
    cell6.innerHTML = parseFloat(util / add);
    cell7.innerHTML = parseFloat(oth / add);
    localStorage.setItem("fpercent", cell2.innerHTML);
    localStorage.setItem("epercent", cell3.innerHTML);
    localStorage.setItem("hpercent", cell4.innerHTML);
    localStorage.setItem("tpercent", cell5.innerHTML);
    localStorage.setItem("upercent", cell6.innerHTML);
    localStorage.setItem("opercent", cell7.innerHTML);

    var t = document.getElementById('avgamount');
    var newTable = t.insertRow(t.rows.length);
    var cell1 = newTable.insertCell(0);
    var cell2 = newTable.insertCell(1);
    cell1.innerHTML = parseFloat(add / samedates(local));
    cell2.innerHTML = parseFloat(add / sameweek(local));

    localStorage.setItem("food", food);
    localStorage.setItem("enter", enter);
    localStorage.setItem("house", house);
    localStorage.setItem("trans", trans);
    localStorage.setItem("util", util);
    localStorage.setItem("oth", oth);
    var wBudget = localStorage.getItem("weekbudget");
    var mBudget = localStorage.getItem("monthbudget");

    function budget() {
        var weekcounter = 0;
        var monthcounter = 0;
        weekArray = {};
        monthArray = {};
        myArray.forEach((t) => {
            var am = t.amount;
            var tr = t.transactionDate;
            var obj = new Date(tr);
            obj.setDate(obj.getDate() + 1);
            key = getWeek(obj) - 1;
            key2 = obj.getMonth() + 1;
            if (weekArray[key]) {
                weekArray[key] += parseFloat(am);
            } else {
                weekArray[key] = parseFloat(am);
            }
            if (monthArray[key2]) {
                monthArray[key2] += parseFloat(am);
            } else {
                monthArray[key2] = parseFloat(am);
            }
            if (weekArray[key] > parseFloat(wBudget) && weekcounter == 0) {
                alert("You have exceeded your weekly budget for week " + key);
                weekcounter += 1
            }
            if (monthArray[key2] > parseFloat(mBudget) && monthcounter == 0) {
                alert("You have exceeded your monthly budget for month " + key2);
                monthcounter += 1
            }
        });
    }

    budget();
}

document.addEventListener('DOMContentLoaded', function () {
    updateTable();
    calculatePercentages();
});
