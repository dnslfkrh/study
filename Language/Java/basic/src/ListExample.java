import java.util.ArrayList;

public class ListExample {
  public static void main(String[] args) {
    // ArrayList 선언 및 초기화
    ArrayList<String> names = new ArrayList<>();

    // 요소 추가
    names.add("Alice");
    names.add("Bob");
    names.add("Charlie");

    // 특정 위치에 요소 삽입
    names.add(1, "David");

    // 요소 제거
    names.remove("Bob");

    // 리스트 크기 확인
    System.out.println("Size of list: " + names.size());

    // 특정 요소 접근
    System.out.println("First element: " + names.get(0));

    // 리스트 순회
    for (String name : names) {
      System.out.println("Name: " + name);
    }
  }
}
