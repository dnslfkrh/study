public class ObjectOrientedExample {
  private String name;
  private int age;

  public ObjectOrientedExample(String name, int age) { // 생성자는 클래스와 동일한 이름을 가짐
    this.name = name;
    this.age = age;
  }

  public void introduce() { // void 함수는 반환값이 없음
    System.out.println("내 이름은 " + name + "이고, " + age + "살입니다.");
  }

  public static void main(String[] args) {
    ObjectOrientedExample person = new ObjectOrientedExample("mark", 22); // person 객체 생성 (생성자 호출)
    person.introduce(); // introduce 함수 호출
  }
}
