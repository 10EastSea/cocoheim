function convert18Decimal(value) { // value에다 10^18을 곱해줌
    return value * (10 ** 18);
}

function balance4Deciaml(value) { // value(소수점 이하 4자리까지 표현된 값)을 소수점 형태로 변경
    return value / (10 ** 4);
}