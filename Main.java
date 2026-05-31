import java.util.List;
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        StudentDAO dao = new StudentDAO();
        Scanner sc = new Scanner(System.in);

        while (true) {
            System.out.println("\n=== Student Result Management ===");
            System.out.println("1. Add Student");
            System.out.println("2. View All Students");
            System.out.println("3. Search Student");
            System.out.println("4. Update Marks");
            System.out.println("5. Delete Student");
            System.out.println("6. Exit");
            System.out.print("Choose: ");
            int choice = sc.nextInt();

            try {
                switch (choice) {
                    case 1:
                        System.out.print("ID: "); int id = sc.nextInt();
                        System.out.print("Name: "); String name = sc.next();
                        System.out.print("Department: "); String dept = sc.next();
                        System.out.print("Marks: "); double marks = sc.nextDouble();
                        dao.addStudent(new Student(id, name, dept, marks));
                        break;
                    case 2:
                        List<Student> students = dao.getAllStudents();
                        students.forEach(s -> System.out.println(
                            s.getId() + " | " + s.getName() + " | " + s.getMarks() + " | " + s.getGrade()
                        ));
                        break;
                    case 3:
                        System.out.print("Enter ID: "); int sid = sc.nextInt();
                        Student found = dao.searchStudent(sid);
                        if (found != null)
                            System.out.println(found.getName() + " - " + found.getGrade());
                        else System.out.println("Not found!");
                        break;
                    case 4:
                        System.out.print("ID: "); int uid = sc.nextInt();
                        System.out.print("New Marks: "); double nm = sc.nextDouble();
                        dao.updateMarks(uid, nm);
                        break;
                    case 5:
                        System.out.print("ID: "); int did = sc.nextInt();
                        dao.deleteStudent(did);
                        break;
                    case 6:
                        System.out.println("Bye!");
                        return;
                }
            } catch (Exception e) {
                System.out.println("Error: " + e.getMessage());
            }
        }
    }
}