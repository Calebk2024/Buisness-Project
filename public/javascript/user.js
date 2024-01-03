class ExpenseLogger {
    constructor() {
        this.expenseArray = JSON.parse(localStorage.getItem("myArray")) || [];
    }

    logExpense(description, amount, category, transactionDate) {
        this.expenseArray.push({ description, amount, category, transactionDate });
        console.log(this.expenseArray);
        this.updateLocalStorage();
        this.clearForm();
        this.redirectToUserPage();
    }

    clearExpenses() {
        alert('Expenses have been cleared');
        this.expenseArray = [];
        this.updateLocalStorage();
    }

    updateLocalStorage() {
        localStorage.setItem("myArray", JSON.stringify(this.expenseArray));
        localStorage.setItem("fpercent", 0);
        localStorage.setItem("tpercent", 0);
        localStorage.setItem("hpercent", 0);
        localStorage.setItem("opercent", 0);
        localStorage.setItem("upercent", 0);
        localStorage.setItem("epercent", 0);
    }

    clearForm() {
        document.getElementById('description').value = '';
        document.getElementById('amount').value = '';
        document.getElementById('category').value = '';
        document.getElementById('birthdate').value = '';
    }

    redirectToUserPage() {
        window.location.href = "userans.html"; // Check the filename here
    }
}

const expenseLogger = new ExpenseLogger();

document.addEventListener('DOMContentLoaded', function () {
    const expenseForm = document.querySelector('.expense-form');
    const clearButton = document.querySelector('.clear-button');

    expenseForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const description = document.getElementById('description').value;
        const amount = parseFloat(document.getElementById('amount').value);
        const category = document.getElementById('category').value;
        const transactionDate = document.getElementById('birthdate').value;

        if (description === "" || amount === "" || category === "" || transactionDate === "" || amount === "0") {
            alert('Please enter all fields');
            return;
        }

        if (amount < 1) {
            alert('Please enter an amount above 0');
            return;
        }

        expenseLogger.logExpense(description, amount, category, transactionDate);
    });

    clearButton.addEventListener('click', function () {
        expenseLogger.clearExpenses();
    });
});
