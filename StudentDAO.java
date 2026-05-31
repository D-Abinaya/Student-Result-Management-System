import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class StudentDAO {

    // Add Student
    public void addStudent(Student s) throws SQLException {
        String sql = "INSERT INTO students(id, name, department, marks, grade) VALUES(?,?,?,?,?)";
        try (Connection con = DatabaseConnection.getConnection();
             PreparedStatement ps = con.prepareStatement(sql)) {
            ps.setInt(1, s.getId());
            ps.setString(2, s.getName());
            ps.setString(3, s.getDepartment());
            ps.setDouble(4, s.getMarks());
            ps.setString(5, s.getGrade());
            ps.executeUpdate();
            System.out.println("Student added successfully!");
        }
    }

    // View All Students
    public List<Student> getAllStudents() throws SQLException {
        List<Student> list = new ArrayList<>();
        String sql = "SELECT * FROM students";
        try (Connection con = DatabaseConnection.getConnection();
             Statement st = con.createStatement();
             ResultSet rs = st.executeQuery(sql)) {
            while (rs.next()) {
                Student s = new Student(
                    rs.getInt("id"),
                    rs.getString("name"),
                    rs.getString("department"),
                    rs.getDouble("marks")
                );
                list.add(s);
            }
        }
        return list;
    }

    // Search Student
    public Student searchStudent(int id) throws SQLException {
        String sql = "SELECT * FROM students WHERE id=?";
        try (Connection con = DatabaseConnection.getConnection();
             PreparedStatement ps = con.prepareStatement(sql)) {
            ps.setInt(1, id);
            ResultSet rs = ps.executeQuery();
            if (rs.next()) {
                return new Student(
                    rs.getInt("id"),
                    rs.getString("name"),
                    rs.getString("department"),
                    rs.getDouble("marks")
                );
            }
        }
        return null;
    }

    // Update Marks
    public void updateMarks(int id, double newMarks) throws SQLException {
        String sql = "UPDATE students SET marks=?, grade=? WHERE id=?";
        String newGrade = newMarks >= 90 ? "A+" : newMarks >= 80 ? "A" :
                          newMarks >= 70 ? "B" : newMarks >= 60 ? "C" : "Fail";
        try (Connection con = DatabaseConnection.getConnection();
             PreparedStatement ps = con.prepareStatement(sql)) {
            ps.setDouble(1, newMarks);
            ps.setString(2, newGrade);
            ps.setInt(3, id);
            ps.executeUpdate();
            System.out.println("Marks updated!");
        }
    }

    // Delete Student
    public void deleteStudent(int id) throws SQLException {
        String sql = "DELETE FROM students WHERE id=?";
        try (Connection con = DatabaseConnection.getConnection();
             PreparedStatement ps = con.prepareStatement(sql)) {
            ps.setInt(1, id);
            ps.executeUpdate();
            System.out.println("Student deleted!");
        }
    }
}