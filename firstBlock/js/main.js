Array.prototype.myReduce = function () {
    let result = 0;
    for (let i = 0; i < this.length; i++) {
        result += this[i];
    }
    return result;
};
// Why without callback?
Array.prototype.mySort = function () {
    for (let i = 0; i < this.length; i++) {
        for (let j = 0; j < this.length; j++) {
            if (this[j] > this[j + 1]) {
                let temp = this[j];
                this[j] = this[j + 1];
                this[j + 1] = temp;
            }
        }
    }
    return this;
};
Array.prototype.myFilter = function (callback) {
    const result = [];
    for (let i = 0; i < this.length; i++) {
        if (callback(this[i])) {
            result.push(this[i]);
        }
    }
    return result;
};
Array.prototype.myIncludes = function (element) {
    for (let item of this) {
        if (item === element) {
            return true;
        }
    }
    return false;
};
String.prototype.deleteSpaces = function () {
    return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
};
String.prototype.mySplit = function (separator, limit) {
    limit = limit || 0;
    const wordsArray = [];
    let word = '';
    for (let i = 0; i < this.length; i++) {
        if (this[i] !== separator) {
            word += this[i];
        }
        if (this[i] === separator || i === this.length - 1) {
            wordsArray.push(word);
            word = '';
            if (wordsArray.length === limit) {
                break;
            }
        }
    }
    return wordsArray;
};
//1
const checkIsAnagramm = (firstString, secondString) => {
    firstString = firstString.deleteSpaces().toLowerCase();
    secondString = secondString.deleteSpaces().toLowerCase();
    if (firstString.length !== secondString.length) {
        return false;
    }
    const firstArray = [];
    const secondArray = [];
    for (let word of firstString) {
        firstArray.push(word);
    }
    for (let word of firstString) {
        secondArray.push(word);
    }
    firstArray.mySort();
    secondArray.mySort();
    for (let i = 0; i < firstArray.length; i++) {
        if (firstArray[i] !== secondArray[i]) {
            return false;
        }
    }
    return true;
};
//3
const getNumberAmoutRecursion = (number, count) => {
    count = count || 0;
    if (number > -10 && number < 10) {
        return ++count;
    }
    return getNumberAmoutRecursion(number / 10, ++count);
};
const getNumberAmout = (number) => {
    let count = 0;
    for (count; number >= 1; count++) {
        number /= 10;
    }
    return count;
};
//4
const checkIsPalindrom = (string) => {
    for (let i = 0; i < string.length; i++) {
        if (string[i] !== string[string.length - 1 - i]) {
            return false;
        }
    }
    return true;
};
//5
const getCountUniqWords = (string) => {
    string = string.deleteSpaces().toLowerCase().replace(/[,?!()\.]/g, '');
    const stringWords = string.mySplit(' ').myFilter(value => value);
    const result = [];
    for (let word of stringWords) {
        if (!result.myIncludes(word)) {
            result.push(word);
        }
    }
    return result.length;
};
//6
const getWordsCount = (string) => {
    string = string.deleteSpaces().toLowerCase().replace(/[,?!()\.]/g, '');
    const stringWords = string.mySplit(' ').myFilter(value => value);
    const wordCount = {};
    for (let word of stringWords) {
        if (!wordCount[word]) {
            wordCount[word] = 1;
        }
        else {
            wordCount[word]++;
        }
    }
    return wordCount;
};
//7
class Triangle {
    constructor(base, firstAdditionalSide, secondAdditionalSide) {
        if (base < 1 || firstAdditionalSide < 1 || secondAdditionalSide < 1) {
            throw new Error('Operators cannot be less then 1');
        }
        this.base = base;
        this.firstAdditionalSide = firstAdditionalSide;
        this.secondAdditionalSide = secondAdditionalSide;
    }
    getPerimeter() {
        return this.base + this.firstAdditionalSide + this.secondAdditionalSide;
    }
    getSquare() {
        let halfPerimeter = this.getPerimeter() / 2;
        return Math.sqrt(halfPerimeter * (halfPerimeter - this.base) * (halfPerimeter - this.firstAdditionalSide) *
            (halfPerimeter - this.secondAdditionalSide));
    }
}
class Circle {
    constructor(radius) {
        if (radius < 1) {
            throw new Error('Operator cannot be less then 1');
        }
        this.radius = radius;
    }
    getPerimeter() {
        return 2 * this.radius * Math.PI;
    }
    getSquare() {
        return Math.PI * (Math.pow(this.radius, 2));
    }
}
class Rectangle {
    constructor(width, length) {
        if (width < 1 || length <= 1) {
            throw new Error('Operators cannot be less then 1');
        }
        this.width = width;
        this.length = length;
    }
    getPerimeter() {
        return 2 * (this.width * this.length);
    }
    getSquare() {
        return this.width * this.length;
    }
}
function TriangleConstructor(base, firstAdditionalSide, secondAdditionalSide) {
    if (base < 1 || firstAdditionalSide < 1 || secondAdditionalSide < 1) {
        throw new Error('Operators cannot be less then 1');
    }
    this.base = base;
    this.firstAdditionalSide = firstAdditionalSide;
    this.secondAdditionalSide = secondAdditionalSide;
}
TriangleConstructor.prototype.getPerimeter = function () {
    return this.base + this.firstAdditionalSide + this.secondAdditionalSide;
};
TriangleConstructor.prototype.getSquare = function () {
    let halfPerimeter = this.getPerimeter() / 2;
    return Math.sqrt(halfPerimeter * (halfPerimeter - this.base) * (halfPerimeter - this.firstAdditionalSide) *
        (halfPerimeter - this.secondAdditionalSide));
};
function CircleConstructor(radius) {
    if (radius < 1) {
        throw new Error('Operator cannot be less then 1');
    }
    this.radius = radius;
}
CircleConstructor.prototype.getPerimeter = function () {
    return 2 * this.radius * Math.PI;
};
CircleConstructor.prototype.getSquare = function () {
    return Math.PI * (Math.pow(this.radius, 2));
};
function RectangleConstructor(width, length) {
    if (width < 1 || length < 1) {
        throw new Error('Operators cannot be less then 1');
    }
    this.width = width;
    this.length - length;
}
RectangleConstructor.prototype.getPerimeter = function () {
    return 2 * (this.length + this.width);
};
RectangleConstructor.prototype.getSquare = function () {
    return this.length * this.width;
};
// 8
const getFactorialMemo = (function () {
    const memory = {};
    return function recursionFact(number) {
        if (number === 0) {
            return 1;
        }
        if (!memory[number]) {
            memory[number] = recursionFact(number - 1);
        }
        return number * memory[number];
    };
})();
const getFactorialCycle = (number) => {
    let result = 1;
    for (let i = 1; i <= number; i++) {
        result *= i;
    }
    return result;
};
// 9
const getSummFromArrayRecursion = (array, callback, result, index) => {
    result = result || 0;
    index = index || 0;
    if (index >= array.length) {
        return result;
    }
    if (callback(array[index])) {
        result += array[index];
    }
    return getSummFromArrayRecursion(array, callback, result, ++index);
};
const getSummFromArray = (array, callback) => {
    let result = 0;
    for (let i = 0; i < array.length; i++) {
        if (callback(array[i])) {
            result += array[i];
        }
    }
    return result;
};
// 10
const getElemsCount = (array, callback) => {
    let count = 0;
    for (let number of array) {
        if (callback(number)) {
            count++;
        }
    }
    return count;
};
//  11
const toDecimal = (number) => {
    let result = 0;
    const numbersArray = [];
    const numLength = Math.ceil(Math.log10(number + 1));
    let maxLength = Math.pow(10, (numLength - 1));
    while (maxLength >= 1) {
        let trunced = Math.trunc(number / maxLength);
        numbersArray.push(trunced);
        trunced = trunced * maxLength;
        maxLength = maxLength / 10;
        number = number - trunced;
    }
    for (let i = 0; i < numbersArray.length; i++) {
        result = result * 2 + numbersArray[i];
    }
    return result;
};
const toBinary = (number) => {
    const numbersArray = [];
    let result = '';
    while (number / 2 > 0) {
        numbersArray.push(number % 2);
        number = Math.floor(number / 2);
    }
    for (let i = numbersArray.length - 1; i >= 0; i--) {
        result += numbersArray[i];
    }
    return result;
};
// 12
const getSumTwoDimensionalArray = (array, callback) => {
    let result = 0;
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array[i].length; j++) {
            if (callback(array[i][j])) {
                result += array[i][j];
            }
        }
    }
    return result;
};
const getElemsCountTwoDimensionalArray = (array, callback) => {
    let result = 0;
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array[i].length; j++) {
            if (callback(array[i][j])) {
                result++;
            }
        }
    }
    return result;
};
// 13
const getSumFromSegmentOfNumbers = (min, max, callback) => {
    let result = 0;
    for (let i = min; i <= max; i++) {
        if (callback(i)) {
            result += i;
        }
    }
    return result;
};
const getSumFromSegmentOfNumbersRecursion = (min, max, callback, result) => {
    result = result || 0;
    if (min > max) {
        return result;
    }
    if (callback(min)) {
        result += min;
    }
    return getSumFromSegmentOfNumbersRecursion(min + 1, max, callback, result);
};
// 14
const takeAverageArrayElements = (array, callback) => {
    const filteredArray = array.myFilter(callback);
    return filteredArray.myReduce() / filteredArray.length;
};
const takeAverageTwoDimensionalArrayElements = (array, callback) => {
    let result = 0;
    let count = 0;
    for (let i = 0; i < array.length; i++) {
        const filtered = array[i].myFilter(callback);
        if (filtered.length !== 0) {
            count += filtered.length;
            result += filtered.myReduce();
        }
    }
    return result / count;
};
// 15
const transposeMatrix = (matrix) => {
    if (matrix.length === 0) {
        throw new Error('The input parameter must be a matrix');
    }
    const transposed = [];
    let maxLength = matrix.length;
    while (maxLength > 0) {
        transposed.push([]);
        maxLength--;
    }
    for (let i = 0; i < matrix.length; i++) {
        if (matrix[i].length !== matrix.length) {
            throw new Error('This matrix cant be transposed');
        }
        for (let j = 0; j < matrix[i].length; j++) {
            transposed[j].push(matrix[i][j]);
        }
    }
    return transposed;
};
const getMatrixSum = (matrix1, matrix2) => {
    const matrixSum = [];
    for (let i = 0; i < matrix1.length; i++) {
        if (matrix1[i].length !== matrix2[i].length) {
            throw new Error('The arrays are not the same size. Addition not possible');
        }
        matrixSum[i] = [];
        for (let j = 0; j < matrix1[i].length; j++) {
            matrixSum[i][j] = matrix1[i][j] + matrix2[i][j];
        }
    }
    return matrixSum;
};
//16
const deleteRowsWithZero = (array) => {
    for (let i = 0; i < array.length; i++) {
        if (array[i].myIncludes(0)) {
            array.splice(i--, 1);
        }
    }
    return array;
};
const deleteColumnWithZero = (array) => {
    const deleteIndex = [];
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array[i].length; j++) {
            if (array[i][j] === 0) {
                if (!deleteIndex.myIncludes(j)) {
                    deleteIndex.push(j);
                }
            }
        }
    }
    let count = 0;
    deleteIndex.mySort();
    for (let key of deleteIndex) {
        for (let i = 0; i < array.length; i++) {
            array[i].splice(key + count, 1);
        }
        count--;
    }
    return array;
};
// 17
const takeActionOnMatrix = (matrix, direction, resultFunction) => {
    let result = 0;
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            if (direction(i, j)) {
                result += resultFunction(matrix[i][j]);
            }
        }
    }
    return result;
};
const fibonachiObject = {
    start: 0,
    end: 10,
    current: 1,
    prev: 0,
    [Symbol.iterator]() {
        return {
            start: this.start,
            end: this.end,
            current: this.current,
            prev: this.prev,
            nexNum: 0,
            next() {
                if (this.start < this.end) {
                    this.nextNum = this.prev;
                    this.prev = this.current;
                    this.current = this.nextNum + this.current;
                    this.start++;
                    return {
                        value: this.nextNum,
                        done: false,
                    };
                }
                return {
                    value: undefined,
                    done: true,
                };
            },
        };
    },
};
function* fibonachi() {
    let prev = 0;
    let current = 1;
    while (true) {
        let result = prev;
        prev = current;
        current = result + current;
        yield result;
    }
}
const fibonachiRecursion = (number) => {
    if (number <= 1) {
        return number;
    }
    return fibonachiRecursion(number - 1) + fibonachiRecursion(number - 2);
};
const fibonachiMemoized = (function () {
    const memo = {};
    return function fibonachiMemo(number) {
        if (number === 0 || number === 1) {
            return number;
        }
        if (number in memo) {
            return memo[number];
        }
        memo[number] = fibonachiMemo(number - 1) + fibonachiMemo(number - 2);
        return memo[number];
    };
})();
// 19
function* trafficLightGenerator() {
    while (true) {
        yield 'red';
        yield 'yellow';
        yield 'green';
        yield 'yellow';
    }
}
const trafficIterator = {
    color: ['red', 'yellow', 'green', 'yellow'],
    [Symbol.iterator]() {
        return {
            color: this.color,
            index: 0,
            next() {
                if (this.index === this.color.length) {
                    this.index = 0;
                }
                while (this.index < this.color.length) {
                    return {
                        value: this.color[this.index++],
                        done: false,
                    };
                }
            },
        };
    },
};
// 20
const checkIsNegativeNumber = (number) => {
    return (number & (1 << 31)) === (1 << 31);
};
const getNumberOfBits = (number) => {
    let binaryNumber = toBinary((number >>> 0));
    let zeroes = 32;
    let units = 0;
    for (let num of binaryNumber) {
        if (num === '1') {
            units++;
        }
    }
    const result = {};
    result[0] = zeroes - units;
    result[1] = units;
    return result;
};
const bitwiseNotEasy = (number) => {
    return -number - 1;
};
const bitwiseNot = (number) => {
    let result = 0;
    for (let i = 0; i < 32; i++) {
        if (((number >> i) & 1) !== 1) {
            result |= (1 << i);
        }
    }
    return result;
};
