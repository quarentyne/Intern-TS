Array.prototype.myReduce = function () {
    let result = 0;
    for (let i = 0; i < this.length; i++) {
        result += this[i];
    }
    return result;
};
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
});
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
console.log(takeAverageTwoDimensionalArrayElements([[2], [4], [2, 2, 0, 6]], v => v % 2 === 0));
