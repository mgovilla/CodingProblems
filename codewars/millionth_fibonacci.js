function fib(n) {
    return n < 0 ? (n % 2n == 0 ? -1n : 1n) * fibIter(1n, 0n, 0n, 1n, -n) : fibIter(1n, 0n, 0n, 1n, n)
}

function fibIter(a, b, p, q, n) {
    if (n == 0) return BigInt(b)
    if (n % 2n == 0) return fibIter(a, b, p * p + q * q, 2n * p * q + q * q, n / 2n)

    return fibIter(b * q + a * q + a * p, b * p + a * q, p, q, n - 1n)
}

console.log(fib(10n));