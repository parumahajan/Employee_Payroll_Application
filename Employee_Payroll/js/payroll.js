// ================= SALARY LIVE UPDATE =================
const salarySlider = document.getElementById("salary");
const salaryOutput = document.getElementById("salary-output");

if (salarySlider && salaryOutput) {
  salaryOutput.textContent = `₹${salarySlider.value}`;
  salarySlider.oninput = () => {
    salaryOutput.textContent = `₹${salarySlider.value}`;
  };
}

// ================= RESET FIX =================
const form = document.getElementById("payrollForm");
if (form && salarySlider && salaryOutput) {
  form.addEventListener("reset", () => {
    setTimeout(() => {
      salarySlider.value = 30000;
      salaryOutput.textContent = "₹30000";
      localStorage.removeItem("editEmployeeIndex");
    }, 0);
  });
}

// ================= EMPLOYEE CLASS =================
class EmployeePayrollData {
  set name(name) {
    if (!/^[A-Z][a-zA-Z]{2,}$/.test(name))
      throw "Name must start with capital & have minimum 3 letters";
  }

  set startDate(date) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    date.setHours(0, 0, 0, 0);
    if (date > today) throw "Future date not allowed";
  }
}

// ================= FORM SUBMIT (ADD + EDIT) =================
if (form) {
  const editIndex = localStorage.getItem("editEmployeeIndex");
  let list = JSON.parse(localStorage.getItem("EmployeePayrollList")) || [];

  if (editIndex !== null && list[editIndex]) {
    const emp = list[editIndex];
    document.getElementById("name").value = emp.name;
    document.querySelector(`input[name="profile"][value="${emp.profile}"]`).checked = true;
    document.querySelector(`input[name="gender"][value="${emp.gender}"]`).checked = true;
    emp.departments.forEach(d => {
      document.querySelector(`input[name="department"][value="${d}"]`).checked = true;
    });
    salarySlider.value = emp.salary;
    salaryOutput.textContent = `₹${emp.salary}`;

    const d = new Date(emp.startDate);
    document.querySelector('[name="day"]').value = d.getDate();
    document.querySelector('[name="month"]').value =
      d.toLocaleString("default", { month: "long" });
    document.querySelector('[name="year"]').value = d.getFullYear();
  }

  form.onsubmit = e => {
    e.preventDefault();
    try {
      const empObj = new EmployeePayrollData();
      const name = document.getElementById("name").value;
      empObj.name = name;

      const profile = document.querySelector('input[name="profile"]:checked').value;
      const gender = document.querySelector('input[name="gender"]:checked').value;
      const departments = [...document.querySelectorAll('input[name="department"]:checked')]
        .map(d => d.value);
      if (!departments.length) throw "Select department";

      const day = document.querySelector('[name="day"]').value;
      const month = document.querySelector('[name="month"]').value;
      const year = document.querySelector('[name="year"]').value;
      const startDate = new Date(`${month} ${day}, ${year}`);
      empObj.startDate = startDate;

      const data = {
        name,
        profile,
        gender,
        departments,
        salary: salarySlider.value,
        startDate: startDate.getTime()
      };

      if (editIndex !== null) {
        list[editIndex] = data;
        localStorage.removeItem("editEmployeeIndex");
      } else {
        list.push(data);
      }

      localStorage.setItem("EmployeePayrollList", JSON.stringify(list));
      location.href = "employee-list.html";
    } catch (err) {
      alert(err);
    }
  };
}

// ================= CANCEL BUTTON =================
const cancelBtn = document.querySelector(".cancel-btn");
if (cancelBtn) {
  cancelBtn.onclick = () => {
    localStorage.removeItem("editEmployeeIndex");
    location.href = "employee-list.html";
  };
}

// ================= SEARCH FUNCTIONALITY =================
function toggleSearch() {
  const container = document.querySelector(".search-container");
  const input = document.getElementById("searchInput");

  container.classList.toggle("active");

  if (container.classList.contains("active")) {
    input.focus();
  } else {
    input.value = "";
    filterTable("");
  }
}

const searchInput = document.getElementById("searchInput");
if (searchInput) {
  searchInput.addEventListener("keyup", () => {
    filterTable(searchInput.value);
  });
}

function filterTable(value) {
  const rows = document.querySelectorAll("#employeeTableBody tr");
  value = value.toLowerCase();

  rows.forEach(row => {
    row.style.display = row.innerText.toLowerCase().includes(value)
      ? ""
      : "none";
  });
}

// ================= TABLE RENDER =================
const tableBody = document.getElementById("employeeTableBody");
if (tableBody) {
  const list = JSON.parse(localStorage.getItem("EmployeePayrollList")) || [];
  tableBody.innerHTML = "";

  list.forEach((e, i) => {
    const date = new Date(e.startDate).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    });

    tableBody.innerHTML += `
      <tr>
        <td class="name-cell">
          <img src="assets/images/${e.profile}" class="profile-img">
          ${e.name}
        </td>
        <td>${e.gender}</td>
        <td>${e.departments.map(d => `<span class="dept-pill">${d}</span>`).join("")}</td>
        <td>₹${e.salary}</td>
        <td>${date}</td>
        <td>
          <button onclick="deleteEmployee(${i})">🗑</button>
          <button onclick="editEmployee(${i})">✏️</button>
        </td>
      </tr>`;
  });
}

// ================= DELETE =================
function deleteEmployee(i) {
  const list = JSON.parse(localStorage.getItem("EmployeePayrollList"));
  list.splice(i, 1);
  localStorage.setItem("EmployeePayrollList", JSON.stringify(list));
  location.reload();
}

// ================= EDIT =================
function editEmployee(i) {
  localStorage.setItem("editEmployeeIndex", i);
  location.href = "index.html";
}
