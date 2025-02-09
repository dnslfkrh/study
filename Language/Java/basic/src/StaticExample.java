public class StaticExample {
  public static void printMessage() {
    System.out.println("Static method called!");
  }

  public static void main(String[] args) {
    StaticExample.printMessage(); // 객체 생성 없이 호출 가능 (함수가 클래스에 바로 속함)
  }
}