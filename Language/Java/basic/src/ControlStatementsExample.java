public class ControlStatementsExample {
  public static void main(String[] args) {
    /* if문 */
    int number = 10;
    if (number > 0) {
      System.out.println("양수");
    } else if (number < 0) {
      System.out.println("음수");
    } else {
      System.out.println("0");
    }

    /* switch문 */
    int day = 3;
    switch (day) {
      case 1:
        System.out.println("월요일");
      case 2:
        System.out.println("화요일");
      case 3:
        System.out.println("수요일");
      default:
        System.out.println("몰라");
    }

    /* for문 */
    for (int i = 0; i < 5; i++) {
      System.out.println(i);
    }

    /* while문 */
    int count = 0;
    while (count < 5) {
      System.out.println(count);
      count++;
    }

    /* do-while문 */
    int num = 0;
    do {
      System.out.println(num);
      num++;
    } while (num < 5);
  }
}
