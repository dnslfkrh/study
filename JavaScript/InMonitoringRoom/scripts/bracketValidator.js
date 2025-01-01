function isValid(s) {
    const stack = [];
    const bracketMap = {
        '(': ')',
        '{': '}',
        '[': ']'
    };

    for (let i = 0; i < s.length; i++) {
        const char = s[i];

        if (bracketMap[char]) {
            stack.push(char)
        } else {
            const topElement = stack.pop();
            if (bracketMap[topElement] !== char) {
                return false;
            }
        }
    }

    return stack.length === 0;
}

// 실행
console.log(isValid("()")); // true
console.log(isValid("())")); // false