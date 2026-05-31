public class Student {
    private int id;
    private String name;
    private String department;
    private double marks;
    private String grade;

    // Constructor
    public Student(int id, String name, String department, double marks) {
        this.id = id;
        this.name = name;
        this.department = department;
        this.marks = marks;
        this.grade = calculateGrade(marks);
    }

    // Grade logic
    private String calculateGrade(double marks) {
        if (marks >= 90) return "A+";
        else if (marks >= 80) return "A";
        else if (marks >= 70) return "B";
        else if (marks >= 60) return "C";
        else return "Fail";
    }

    // Getters
    public int getId() { return id; }
    public String getName() { return name; }
    public String getDepartment() { return department; }
    public double getMarks() { return marks; }
    public String getGrade() { return grade; }
}