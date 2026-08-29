const incomeSource = document.querySelector('#income-source');
const incomeAmount = document.querySelector('#income-amount');
const addIncomeBtn = document.querySelector('#add-income-btn');

const expenseTitle = document.querySelector('#expense-source');
const expenseAmount = document.querySelector('#expense-amount');
const addExpenseBtn = document.querySelector('#add-expense-btn');

const totalIncomeEl = document.querySelector('#total-income');
const totalExpenseEl = document.querySelector('#total-expense');
const balanceEl = document.querySelector('#balance');

const incomeList = document.querySelector('#income-list');
const expenseList = document.querySelector('#expense-list');
const resetBtn = document.querySelector('#reset-btn');

const localStorageIncomes = JSON.parse(localStorage.getItem('incomes'));
let incomes = localStorage.getItem('incomes') !== null ? localStorageIncomes : [];

const localStorageExpenses = JSON.parse(localStorage.getItem('expenses'));
let expenses = localStorage.getItem('expenses') !== null ? localStorageExpenses : [];

function generateID() {
    return Math.floor(Math.random() * 100000000);
}

function addIncome(e) {
    e.preventDefault();

    if (incomeSource.value.trim() === '' || incomeAmount.value.trim() === '') {
      alert('Mohon masukkan sumber dan jumlah pemasukan!');
      return;
    }

    const income = {
      id: generateID(),
      source: incomeSource.value.trim(),
      amount: parseFloat(incomeAmount.value)
    };

    incomes.push(income);
    addIncomeDOM(income);
    updateTotalAmount();
    updateLocalStorage();

    incomeSource.value = '';
    incomeAmount.value = '';
}


function addExpense(e) {
    e.preventDefault();

    if (expenseTitle.value.trim() === '' || expenseAmount.value.trim() === '') {
      alert('Mohon masukkan nama dan jumlah pengeluaran!');
      return;
    }

    const expense = {
      id: generateID(),
      title: expenseTitle.value.trim(),
      amount: parseFloat(expenseAmount.value)
    };

    expenses.push(expense);
    addExpenseDOM(expense);
    updateTotalAmount();
    updateLocalStorage();

    expenseTitle.value = '';
    expenseAmount.value = '';
}

resetBtn.addEventListener('click', function () {
    const confirmReset = confirm(
            'Apakah Anda yakin ingin menghapus semua data pemasukan dan pengeluaran?'
        );

        if (!confirmReset) {
        return;
    }

    incomes = [];
    expenses = [];

    localStorage.removeItem('incomes');
    localStorage.removeItem('expenses');

    init();
});

function addIncomeDOM(income) {
    const li = document.createElement('li');
    li.classList.add('income-item');

    li.innerHTML = `
      <span>${income.source}</span>
      <div class="income-item-details">
        <span class="item-amount">+Rp ${income.amount.toLocaleString('id-ID')}</span>
        <button class="delete-btn" onclick="removeIncome(${income.id})">X</button>
      </div>
    `;

    incomeList.appendChild(li);
}

function addExpenseDOM(expense) {
    const li = document.createElement('li');
    li.classList.add('expense-item');

    li.innerHTML = `
      <span>${expense.title}</span>
      <div class="expense-item-details">
        <span class="item-amount">-Rp ${expense.amount.toLocaleString('id-ID')}</span>
        <button class="delete-btn" onclick="removeExpense(${expense.id})">X</button>
      </div>
    `;

    expenseList.appendChild(li);
}

function updateTotalAmount() {
    const totalIncome = incomes.reduce((acc, item) => acc + item.amount, 0);
    const totalExpense = expenses.reduce((acc, item) => acc + item.amount, 0);
    const balance = totalIncome - totalExpense;

    totalIncomeEl.innerText = `Rp ${totalIncome.toLocaleString('id-ID')}`;
    totalExpenseEl.innerText = `Rp ${totalExpense.toLocaleString('id-ID')}`;
    balanceEl.innerText = `Rp ${balance.toLocaleString('id-ID')}`;
}


function removeIncome(id) {
    incomes = incomes.filter(income => income.id !== id);
    updateLocalStorage();
    init();
}

function removeExpense(id) {
    expenses = expenses.filter(expense => expense.id !== id);
    updateLocalStorage();
    init();
}


function updateLocalStorage() {
    localStorage.setItem('incomes', JSON.stringify(incomes));
    localStorage.setItem('expenses', JSON.stringify(expenses));
}


addIncomeBtn.addEventListener('click', addIncome);
addExpenseBtn.addEventListener('click', addExpense);


function init() {
    incomeList.innerHTML = '';
    expenseList.innerHTML = '';

    incomes.forEach(addIncomeDOM);
    expenses.forEach(addExpenseDOM);

    updateTotalAmount();
}

init();