const expenseForm = document.getElementById("expenseForm");
const expenseList = document.getElementById("expenseList");
const totalExpense = document.getElementById("totalExpense");

const filterDate = document.getElementById("filterDate");
const resetFilter = document.getElementById("resetFilter");

let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

function saveExpenses() {
  localStorage.setItem("expenses", JSON.stringify(expenses));
}

function renderExpenses(data) {
  expenseList.innerHTML = "";
  let total = 0;

  data.forEach((expense, index) => {
    total += expense.amount;

    const li = document.createElement("li");
    li.innerHTML = `
      <div>
        <strong>${expense.title}</strong><br/>
        Rp ${expense.amount} | ${expense.date}
      </div>
      <button class="btn small" onclick="deleteExpense(${index})">Hapus</button>
    `;
    expenseList.appendChild(li);
  });

  totalExpense.textContent = total.toLocaleString("id-ID");
}

function deleteExpense(index) {
  expenses.splice(index, 1);
  saveExpenses();
  applyFilter();
}

expenseForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const title = document.getElementById("title").value;
  const amount = parseInt(document.getElementById("amount").value);
  const date = document.getElementById("date").value;

  expenses.push({ title, amount, date });

  saveExpenses();
  expenseForm.reset();
  applyFilter();
});

function applyFilter() {
  const dateValue = filterDate.value;

  if (dateValue) {
    const filtered = expenses.filter((e) => e.date === dateValue);
    renderExpenses(filtered);
  } else {
    renderExpenses(expenses);
  }
}

filterDate.addEventListener("change", applyFilter);

resetFilter.addEventListener("click", function () {
  filterDate.value = "";
  renderExpenses(expenses);
});

renderExpenses(expenses);