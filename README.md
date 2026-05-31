 Student Result Management System
A full-featured Student Result Management System built with Core Java, JDBC, and MySQL — available in both a console-based application and a responsive web interface.
---
 Features
 Add, View, Search, Update, Delete students (Full CRUD)
 Auto grade calculation based on marks
 Console-based Java application
 Responsive web interface (HTML + CSS + JavaScript)
 Dark Mode / Light Mode toggle
 Export results to PDF
 Print report functionality
 Password protection for web app
 Search by ID or Name
 Dashboard with Total, Passed, Failed, Average stats
---
 Tech Stack
Layer	Technology
Language	Java (OOP), JavaScript, HTML, CSS
Backend (Console)	Core Java + JDBC
Database	MySQL
Frontend	HTML5, CSS3, Bootstrap 5
PDF Export	jsPDF + AutoTable
IDE	VS Code
---
 Project Structure
```
StudentResultSystem/
│
├──  Student.java                  # Model class — student data & grade logic
├──  DatabaseConnection.java       # MySQL JDBC connection
├──  StudentDAO.java               # CRUD operations (Data Access Object)
├──  StudentService.java           # Service layer
├──  Main.java                     # Console menu & user interaction
│
├──  index.html                    # Web interface
├──  style.css                     # Styling + dark mode
├──  script.js                     # Frontend logic
│
└──  mysql-connector-j-9.x.x.jar  # JDBC Driver
```
---
 Setup & Installation
Prerequisites
Java JDK 17+
MySQL 8.0+
VS Code (with Java Extension Pack)
MySQL Connector JAR
Step 1 — Clone the Repository
```bash
git clone https://github.com/D-Abinaya/StudentResultSystem.git
cd StudentResultSystem
```
Step 2 — Setup MySQL Database
Open MySQL Workbench or MySQL CLI and run:
```sql
CREATE DATABASE student_db;
USE student_db;

CREATE TABLE students (
    id         INT PRIMARY KEY,
    name       VARCHAR(50),
    department VARCHAR(50),
    marks      DOUBLE,
    grade      VARCHAR(5)
);
```
Step 3 — Configure Database Connection
Open `DatabaseConnection.java` and update:
```java
private static final String URL      = "jdbc:mysql://localhost:3306/student_db";
private static final String USER     = "root";
private static final String PASSWORD = "your_password"; // change this
```
Step 4 — Add JDBC Driver
Download MySQL Connector/J from dev.mysql.com/downloads/connector/j
Place the `.jar` file in the project root folder
In VS Code → JAVA PROJECTS → Referenced Libraries → click + → select the JAR
Step 5 — Run the Console App
```bash
javac -cp .;mysql-connector-j-9.x.x.jar *.java
java  -cp .;mysql-connector-j-9.x.x.jar Main
```
Step 6 — Run the Web Interface
Open `index.html` in VS Code
Right click → Open with Live Server
Enter password: `diamond key`
---
 Console Menu
```
=== Student Result Management ===
1. Add Student
2. View All Students
3. Search Student
4. Update Marks
5. Delete Student
6. Exit
Choose:
```
---
 Grade Calculation Logic
Marks	Grade
90 – 100	A+
80 – 89	A
70 – 79	B
60 – 69	C
Below 60	Fail
---
 OOP Concepts Used
Concept	Where Used
Encapsulation	`Student.java` — private fields + getters
Abstraction	DAO pattern — DB logic separated from UI
Class & Object	`Student` object created for each record
Constructor	`Student()` constructor with grade auto-calc
---
 Web Interface Features
Feature	Description
 Password Protection	Secure login before accessing the app
 Dashboard	Live stats — Total, Passed, Failed, Average
 Add Student	Form with validation
 View All	Table with delete option
 Search	Search by ID or Name
 Update Marks	Update marks + auto grade recalculate
 Dark Mode	Toggle with localStorage persistence
 Export PDF	Download full result as PDF
 Print Report	Printable report with summary
---
 Future Enhancements
[ ] Spring Boot REST API backend
[ ] React.js frontend
[ ] Role-based login (Admin / Student)
[ ] Multi-subject marks entry
[ ] Charts & data visualization
[ ] Email result to students
---
