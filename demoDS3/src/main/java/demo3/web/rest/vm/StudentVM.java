package demo3.web.rest.vm;

public class StudentVM {

    private int code;
    private String name;
    private double marks;
    private String classes;

    public StudentVM() {}

    public StudentVM(int code, String name, double marks, String classes) {
        this.code = code;
        this.name = name;
        this.marks = marks;
        this.classes = classes;
    }

    public int getCode() {
        return code;
    }

    public void setCode(int code) {
        this.code = code;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public double getMarks() {
        return marks;
    }

    public void setMarks(double marks) {
        this.marks = marks;
    }

    public String getClasses() {
        return classes;
    }

    public void setClasses(String classes) {
        this.classes = classes;
    }
}
