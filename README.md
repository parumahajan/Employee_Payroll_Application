# 🧾 Employee Payroll Management System

A front-end web application built using **HTML, CSS, and JavaScript that allows users to add, view, edit, delete, and search employee payroll details.  

The project demonstrates form handling, validation, dynamic DOM manipulation, and browser-based data persistence using `localStorage`.

---

## 🚀 Features

### 🔹 Employee Payroll Form
- Add employee details:
  - Name validation
  - Profile image selection
  - Gender selection
  - Department selection (multiple)
  - Salary slider with live update
  - Start date selection (Day / Month / Year)
  - Notes section
    
- Form validations for:
  - Name format
  - Future date restriction
  - Mandatory fields
    
- Buttons:
  - **Submit** – saves data
  - **Reset** – resets all fields including salary
  - **Cancel** – redirects back to Employee Details page

---

### 🔹 Employee Details Page
- Displays employee data in a **tabular format**
- Each row includes:
  - Profile image
  - Name
  - Gender
  - Departments (highlighted as pills)
  - Salary
  - Start Date (formatted as `Dec 30 2025`)
    
- Actions:
  - 🗑 **Delete employee**
  - ✏️ **Edit employee** (pre-fills form)

---

### 🔹 Search Functionality
- Click on 🔍 to open search bar
- Live filtering of employee records
- Matches search text against:
  - Name
  - Gender
  - Department
- Clear search using ❌ icon

---

### 🔹 Edit Functionality
- Click ✏️ icon to edit employee
- Data is pre-filled in the form
- Updating replaces existing record (no duplicates)

---

### 🔹 Data Persistence
- Uses **Browser `localStorage`**
- Data remains available even after page refresh

---

## 🛠️ Technologies Used

- **HTML5** – structure
- **CSS3** – styling & layout
- **JavaScript (Vanilla JS)** – logic & interactivity
- **localStorage** – client-side data storage

---
## 📂 Project Structure
```
Employee-Payroll-App/
│
├── index.html                  # Employee Payroll Form
├── employee-list.html          # Employee Details page
│
├── css/
│ └── payroll.css               # Styling
│
├── js/
│ └── payroll.js                # Application logic
│
├── assets/
│ └── images/                   # Logos & profile images
│
└── README.md                   # Project documentation
```
