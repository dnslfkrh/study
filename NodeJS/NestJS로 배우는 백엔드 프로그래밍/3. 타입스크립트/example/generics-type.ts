function identityAny(arg: any): any /* 반환 값은 any타입으로 */ {
    return arg;
}

function identity<T>(arg: T): T /* 반환 값의 타입은 함수 호출 시점의 인수로 넣은 타입으로 결정됨 */ {
    return arg;
}