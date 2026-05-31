// Password Check
function checkPassword() {
    const pwd = document.getElementById('pwdInput').value;
    if (pwd === 'diamond key') {
        document.getElementById('loginOverlay').style.display = 'none';
        sessionStorage.setItem('auth', 'true');
    } else {
        document.getElementById('pwdError').textContent = '❌ Wrong password!';
        document.getElementById('pwdInput').value = '';
    }
}

// Already logged in check
window.addEventListener('load', function() {
    if (sessionStorage.getItem('auth') === 'true') {
        document.getElementById('loginOverlay').style.display = 'none';
    }
});
// Section show/hide
function showSection(id) {
    document.getElementById('dashboard').style.display = 'none';
    document.querySelectorAll('.section').forEach(s => s.style.display = 'none');
    document.getElementById(id).style.display = 'block';
    if (id === 'view') loadStudents();
}

// Grade calculate
function getGrade(marks) {
    if (marks >= 90) return 'A+';
    if (marks >= 80) return 'A';
    if (marks >= 70) return 'B';
    if (marks >= 60) return 'C';
    return 'Fail';
}

// Local storage use pannrom (Spring Boot ready aana appuram API replace pannuvom)
function getStudents() {
    return JSON.parse(localStorage.getItem('students') || '[]');
}

function saveStudents(students) {
    localStorage.setItem('students', JSON.stringify(students));
}

// Add Student
function addStudent() {
    const id = parseInt(document.getElementById('addId').value);
    const name = document.getElementById('addName').value.trim();
    const dept = document.getElementById('addDept').value.trim();
    const marks = parseFloat(document.getElementById('addMarks').value);

    if (!id || !name || !dept || isNaN(marks)) {
        document.getElementById('addMsg').innerHTML = '<span class="text-danger">❌ All fields required!</span>';
        return;
    }

    const students = getStudents();
    if (students.find(s => s.id === id)) {
        document.getElementById('addMsg').innerHTML = '<span class="text-danger">❌ ID already exists!</span>';
        return;
    }

    students.push({ id, name, dept, marks, grade: getGrade(marks) });
    saveStudents(students);
    document.getElementById('addMsg').innerHTML = '<span class="text-success">✅ Student added!</span>';

    // Clear fields
    document.getElementById('addId').value = '';
    document.getElementById('addName').value = '';
    document.getElementById('addDept').value = '';
    document.getElementById('addMarks').value = '';
}

// Load All Students
function loadStudents() {
    const students = getStudents();
    const tbody = document.getElementById('studentTable');
    tbody.innerHTML = '';

    if (students.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" class="text-center">No students found!</td></tr>';
        return;
    }

    students.forEach(s => {
        const badgeColor = s.grade === 'Fail' ? 'danger' : s.grade === 'A+' ? 'success' : 'primary';
        tbody.innerHTML += `
            <tr>
                <td>${s.id}</td>
                <td>${s.name}</td>
                <td>${s.dept}</td>
                <td>${s.marks}</td>
                <td><span class="badge bg-${badgeColor}">${s.grade}</span></td>
                <td><button class="btn btn-danger btn-sm" onclick="deleteStudent(${s.id})">🗑️ Delete</button></td>
            </tr>`;
    });
}

function searchStudent() {
    const id = document.getElementById('searchId').value;
    const name = document.getElementById('searchName').value.trim().toLowerCase();
    const students = getStudents();
    let found = [];

    if (id) {
        found = students.filter(s => s.id === parseInt(id));
    } else if (name) {
        found = students.filter(s => s.name.toLowerCase().includes(name));
    }

    const div = document.getElementById('searchResult');
    if (found.length > 0) {
        div.innerHTML = found.map(s => {
            const badgeColor = s.grade === 'Fail' ? 'danger' : 'success';
            return `
            <div class="card p-3 mt-2">
                <p>🆔 <b>ID:</b> ${s.id}</p>
                <p>👤 <b>Name:</b> ${s.name}</p>
                <p>🏫 <b>Department:</b> ${s.dept}</p>
                <p>📊 <b>Marks:</b> ${s.marks}</p>
                <p>🎯 <b>Grade:</b> <span class="badge bg-${badgeColor}">${s.grade}</span></p>
            </div>`;
        }).join('');
    } else {
        div.innerHTML = '<span class="text-danger">❌ Student not found!</span>';
    }
}

// Update Marks
function updateMarks() {
    const id = parseInt(document.getElementById('updateId').value);
    const newMarks = parseFloat(document.getElementById('updateMarks').value);
    const students = getStudents();
    const index = students.findIndex(s => s.id === id);

    if (index === -1) {
        document.getElementById('updateMsg').innerHTML = '<span class="text-danger">❌ Student not found!</span>';
        return;
    }

    students[index].marks = newMarks;
    students[index].grade = getGrade(newMarks);
    saveStudents(students);
    document.getElementById('updateMsg').innerHTML = '<span class="text-success">✅ Marks updated!</span>';
}

// Delete Student
function deleteStudent(id) {
    if (!confirm('Delete this student?')) return;
    let students = getStudents();
    students = students.filter(s => s.id !== id);
    saveStudents(students);
    loadStudents();
}

// Dashboard counts
window.onload = function() {
    const students = getStudents();
    document.getElementById('totalCount').textContent = students.length;
    document.getElementById('passCount').textContent = students.filter(s => s.grade !== 'Fail').length;
    document.getElementById('failCount').textContent = students.filter(s => s.grade === 'Fail').length;
    const avg = students.length ? (students.reduce((a, s) => a + s.marks, 0) / students.length).toFixed(1) : 0;
    document.getElementById('avgMarks').textContent = avg;
}

// Export to PDF
function exportPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Title
    doc.setFontSize(16);
    doc.setTextColor(26, 26, 46);
    doc.text('Student Result Management System', 14, 15);

    // Date
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text('Generated: ' + new Date().toLocaleDateString(), 14, 22);

    // Table
    const students = getStudents();
    const tableData = students.map(s => [s.id, s.name, s.dept, s.marks, s.grade]);

    doc.autoTable({
        head: [['ID', 'Name', 'Department', 'Marks', 'Grade']],
        body: tableData,
        startY: 28,
        headStyles: { fillColor: [26, 26, 46] },
        alternateRowStyles: { fillColor: [240, 240, 240] },
        styles: { fontSize: 10 }
    });

    // Summary
    const finalY = doc.lastAutoTable.finalY + 10;
    doc.setFontSize(11);
    doc.setTextColor(0);
    doc.text(`Total Students: ${students.length}`, 14, finalY);
    doc.text(`Passed: ${students.filter(s => s.grade !== 'Fail').length}`, 14, finalY + 7);
    doc.text(`Failed: ${students.filter(s => s.grade === 'Fail').length}`, 14, finalY + 14);
    const avg = students.length ? (students.reduce((a, s) => a + s.marks, 0) / students.length).toFixed(1) : 0;
    doc.text(`Average Marks: ${avg}`, 14, finalY + 21);

    doc.save('StudentResults.pdf');
}

// Print Report
function printReport() {
    const students = getStudents();
    const avg = students.length ? (students.reduce((a, s) => a + s.marks, 0) / students.length).toFixed(1) : 0;

    const rows = students.map(s => `
        <tr>
            <td>${s.id}</td>
            <td>${s.name}</td>
            <td>${s.dept}</td>
            <td>${s.marks}</td>
            <td>${s.grade}</td>
        </tr>`).join('');

    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
        <html>
        <head>
            <title>Student Result Report</title>
            <style>
                body { font-family: Arial, sans-serif; padding: 20px; }
                h2 { color: #1a1a2e; text-align: center; }
                table { width: 100%; border-collapse: collapse; margin-top: 20px; }
                th { background-color: #1a1a2e; color: white; padding: 10px; }
                td { border: 1px solid #ddd; padding: 8px; text-align: center; }
                tr:nth-child(even) { background-color: #f2f2f2; }
                .summary { margin-top: 20px; font-size: 14px; }
                .summary span { margin-right: 20px; font-weight: bold; }
                @media print { button { display: none; } }
            </style>
        </head>
        <body>
            <h2>🎓 Student Result Management System</h2>
            <p style="text-align:center;">Generated: ${new Date().toLocaleDateString()}</p>
            <table>
                <thead>
                    <tr>
                        <th>ID</th><th>Name</th><th>Department</th><th>Marks</th><th>Grade</th>
                    </tr>
                </thead>
                <tbody>${rows}</tbody>
            </table>
            <div class="summary">
                <span>Total: ${students.length}</span>
                <span>Passed: ${students.filter(s => s.grade !== 'Fail').length}</span>
                <span>Failed: ${students.filter(s => s.grade === 'Fail').length}</span>
                <span>Average: ${avg}</span>
            </div>
            <br>
            <button onclick="window.print()">🖨️ Print</button>
        </body>
        </html>
    `);
    printWindow.document.close();
    printWindow.focus();
}
