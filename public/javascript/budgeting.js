class Budget {
    constructor() {
        this.weeklyBudget = 0;
        this.monthlyBudget = 0;
    }
    setBudgets(weekly, monthly) {
        this.weeklyBudget = weekly;
        this.monthlyBudget = monthly;
    }
}
class BudgetForm {
    constructor(budgetInstance) {
        this.budget = budgetInstance;
    }
    handleForm() {
        const weeklyBudgetInput = document.getElementById('weeklyBudget');
        const monthlyBudgetInput = document.getElementById('monthlyBudget');
        const weeklyBudget = parseFloat(weeklyBudgetInput.value);
        const monthlyBudget = parseFloat(monthlyBudgetInput.value);
        
        this.budget.setBudgets(weeklyBudget, monthlyBudget);
        
    }
}
const budgetInstance = new Budget();
const budgetFormInstance = new BudgetForm(budgetInstance);
function handleBudgetForm() {
    budgetFormInstance.handleForm();
    if(budgetInstance.weeklyBudget<0 || isNaN(parseFloat(budgetInstance.weeklyBudget))){
        alert("Please enter a weekly budget that is not negative");
        return;
    }
    if(budgetInstance.monthlyBudget<0 || isNaN(parseFloat(budgetInstance.monthlyBudget))){
        alert("Please enter a monthly budget that is not negative");
        return;
    }
    localStorage.setItem("weekbudget", budgetInstance.weeklyBudget);
    localStorage.setItem("monthbudget", budgetInstance.monthlyBudget);
    alert(`Weekly Budget: $${budgetInstance.weeklyBudget}\nMonthly Budget: $${budgetInstance.monthlyBudget}`);
}
function buttonClick() {
    const button = document.querySelector('button');
    button.classList.add('clicked');
}
function buttonRelease() {
    const button = document.querySelector('button');
    button.classList.remove('clicked');
}