function average(array: number[]): number {
    const sum = array.reduce((accumulator, current) => accumulator + current, 0)
    const average = sum / array.length
    return average
}

export function PearsonsR(x: number[], y: number[]): number {
    if (x.length === 0 || y.length === 0) return 0
    if (x.length !== y.length) return 0

    const meanX = average(x)
    const meanY = average(y)

    const numeratorSummationArray = []
    const denominatorX2SummationArray = []
    const denominatorY2SummationArray = []

    for (let i = 0; i < x.length; i++) {
        const a = x[i] * y[i]
        const b = x[i] * -meanY
        const c = -meanX * y[i]
        const d = -meanX * -meanY
        numeratorSummationArray.push(a+b+c+d)

        const x2 = x[i]**2 - meanX**2
        const y2 = y[i]**2 - meanY**2

        denominatorX2SummationArray.push(x2)
        denominatorY2SummationArray.push(y2)
    }

    const numeratorSummation = numeratorSummationArray.reduce((accumulator, current) => accumulator + current, 0)
    const denominatorX2Summation = denominatorX2SummationArray.reduce((accumulator, current) => accumulator + current, 0)
    const denominatorY2Summation = denominatorY2SummationArray.reduce((accumulator, current) => accumulator + current, 0)

    const r = numeratorSummation / Math.sqrt(denominatorX2Summation*denominatorY2Summation)
    return r
}

export function LinearRegressionLine(x: number[], y: number[]) {
    const numerator = x.reduce((accumulator, current, i) => accumulator + (current - average(x) * (y[i] - average(y)), 0))
    const denominator = x.reduce((accumulator, current, i) => accumulator + (current - average(x) ** 2, 0))
    const m = numerator / denominator

    const b = average(y) - m * average(x)
    const regressionLine = x.map(x => m * x + b)
    console.log(regressionLine)
    return regressionLine
}