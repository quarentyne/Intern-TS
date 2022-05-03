interface Array<T> {
  myFilter(callback: (value: T) => boolean | T): Array<T>;
  mySort: (callback?: (element1: T, element2: T) => boolean) => Array<T>;
  myIncludes(element:T): boolean;
  myReduce(): number;
}

Array.prototype.myReduce = function () {
  let result: number = 0;
  for (let i: number = 0; i < this.length; i++){
    result += this[i];
  }
  return result;
}

Array.prototype.mySort = function (callback) {
  if (typeof callback !== 'function') {
    callback = (element1, element2) => element1 > element2;
  }

  for (let i: number = 0; i < this.length; i++){
    let j: number = i;
    while (j > 0 && callback(this[j - 1], this[j])) {
      [this[j], this[j - 1]] = [this[j - 1], this[j]]
      j--;
    }
  }
  return this;
}

Array.prototype.myFilter = function (callback) {
  const result = [];
  for (let i: number = 0; i < this.length; i++){
    if (callback(this[i])) {
      result.push(this[i]);
    }
  }
  return result;
}

Array.prototype.myIncludes = function (element) {
  for (let item of this) {
    if (item === element) {
      return true;
    }
  }
  return false;
}

interface String {
  deleteSpaces(): string;
  mySplit(separator: string, limit?: number): Array<string>;
}

String.prototype.deleteSpaces = function () {
  return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');  
}

String.prototype.mySplit = function (separator, limit) {
  limit = limit || 0;
  const wordsArray: string[] = [];
  let word: string = '';

  for (let i: number = 0; i < this.length; i++){
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
}

type PredicateCallback = (value: number) => boolean;

type StringObject = {
  [value: string]: number
}

type NumberObject = {
  [value: number]: number
}

//1
const checkIsAnagramm = (firstString: string, secondString: string): boolean => {
  firstString = firstString.deleteSpaces().toLowerCase();
  secondString = secondString.deleteSpaces().toLowerCase();
  if (firstString.length !== secondString.length) {
    return false;
  }

  const firstArray: string[] = [];
  const secondArray: string[] = [];

  for (let word of firstString) {
    firstArray.push(word);
  }
  for (let word of firstString) {
    secondArray.push(word);
  }
  firstArray.mySort();
  secondArray.mySort();
  for (let i: number = 0; i < firstArray.length; i++){
    if (firstArray[i] !== secondArray[i]) {
      return false;
    }
  }
  return true;
}

//3
const countNumberAmountRecursion = (number: number, count?: number): number => {
  count = count || 0;
  if (number > -10 && number < 10) {
    return ++count;
  }
  return countNumberAmountRecursion(number / 10, ++count);
}

const countNumberAmount = (number: number): number => {
  let count: number = 0;
  for (count; number >= 1; count++){
    number /= 10;
  }
  return count;
}

//4
const checkIsPalindrom = (string: string): boolean => {
  for (let i: number = 0; i < string.length; i++){
    if (string[i] !== string[string.length - 1 - i]) {
      return false;
    }
  }
  return true;
}

//5
const countUniqWords = (string: string): number => {
  string = string.deleteSpaces().toLowerCase().replace(/[,?!()\.]/g, '');
  const stringWords: string[] = string.mySplit(' ').myFilter(value => value);
  const result: string[] = [];
  for (let word of stringWords) {
    if (!result.myIncludes(word)) {
      result.push(word);
    }
  }
  return result.length;
}

//6
const countWords = (string: string): StringObject => {
  string = string.deleteSpaces().toLowerCase().replace(/[,?!()\.]/g, '');
  const stringWords: string[] = string.mySplit(' ').myFilter(value => value);
  const wordCount: StringObject = {};
  for (let word of stringWords) {
    if (!wordCount[word]) {
      wordCount[word] = 1;
    } else {
      wordCount[word]++;
    }
  }
  return wordCount;
}

//7
class Triangle {
  base: number;
  firstAdditionalSide: number;
  secondAdditionalSide: number;

  constructor(base: number, firstAdditionalSide: number, secondAdditionalSide: number) {
    if (base < 1 || firstAdditionalSide < 1 || secondAdditionalSide < 1) {
      throw new Error('Operators cannot be less then 1');
    }
    this.base = base;
    this.firstAdditionalSide = firstAdditionalSide;
    this.secondAdditionalSide = secondAdditionalSide;
  }

  getPerimeter(): number {
    return this.base + this.firstAdditionalSide + this.secondAdditionalSide;
  }
  getSquare(): number {
    let halfPerimeter = this.getPerimeter() / 2;
    return Math.sqrt(halfPerimeter * (halfPerimeter - this.base) * (halfPerimeter - this.firstAdditionalSide) *
      (halfPerimeter - this.secondAdditionalSide));
  }
}

class Circle {
  radius: number;

  constructor(radius: number) {
    if (radius < 1) {
      throw new Error('Operator cannot be less then 1');
    }
    this.radius = radius;
  }

  getPerimeter(): number {
    return 2 * this.radius * Math.PI;
  }
  getSquare(): number {
    return Math.PI * (this.radius ** 2);
  }
}

class Rectangle {
  width: number;
  length: number;

  constructor(width: number, length: number) {
    if (width < 1 || length <= 1) {
      throw new Error('Operators cannot be less then 1');
    }
    this.width = width;
    this.length = length;
  }

  getPerimeter(): number {
    return 2 * (this.width * this.length);
  }
  getSquare(): number {
    return this.width * this.length;
  }
}

function TriangleConstructor(base: number, firstAdditionalSide: number
  , secondAdditionalSide: number): void {
  if (base < 1 || firstAdditionalSide < 1 || secondAdditionalSide < 1) {
    throw new Error('Operators cannot be less then 1');
  }
  this.base = base;
  this.firstAdditionalSide = firstAdditionalSide;
  this.secondAdditionalSide = secondAdditionalSide;
}

TriangleConstructor.prototype.getPerimeter = function (): number {
  return this.base + this.firstAdditionalSide + this.secondAdditionalSide;
}

TriangleConstructor.prototype.getSquare = function (): number {
  let halfPerimeter = this.getPerimeter() / 2;  
  return Math.sqrt(halfPerimeter * (halfPerimeter - this.base) * (halfPerimeter - this.firstAdditionalSide) *
    (halfPerimeter - this.secondAdditionalSide));
}

function CircleConstructor(radius: number): void {
  if (radius < 1) {
    throw new Error('Operator cannot be less then 1');
  }
  this.radius = radius;
}

CircleConstructor.prototype.getPerimeter = function (): number {
  return 2 * this.radius * Math.PI;
}

CircleConstructor.prototype.getSquare = function (): number {
  return Math.PI * (this.radius ** 2);
}

function RectangleConstructor(width: number, length: number): void {
  if (width < 1 || length < 1) {
    throw new Error('Operators cannot be less then 1');
  }
  this.width = width;
  this.length - length;
}

RectangleConstructor.prototype.getPerimeter = function (): number {
  return 2 * (this.length + this.width);
}

RectangleConstructor.prototype.getSquare = function (): number {
  return this.length * this.width;
}

// 8
const calculateFactorialMemo = (function () {
  const memory: NumberObject = {};
  return function recursionFact(number: number): number {
    if (number === 0) {
      return 1;
    }
    if (!memory[number]) {
      memory[number] = recursionFact(number - 1);
    }
    return number * memory[number];
  }
})();

const calculateFactorialCycle = (number: number): number => {
  let result: number = 1;
  for (let i: number = 1; i <= number; i++){
    result *= i;
  }
  return result;
}

// 9
const calculateSummFromArrayRecursion = (array: number[],
  callback: PredicateCallback, result?: number, index?: number): number => {
  result = result || 0;
  index = index || 0;
  if (index >= array.length) {
    return result;
  }
  if (callback(array[index])) {
    result += array[index];
  }
  return calculateSummFromArrayRecursion(array, callback, result, ++index);
}

const calculateSummFromArray = (array: number[],
  callback: PredicateCallback): number => {
  let result: number = 0;
  for (let i: number = 0; i < array.length; i++){
    if (callback(array[i])) {
      result += array[i];
    }
  }
  return result;
}

// 10
const countElements = (array: number[],
  callback: PredicateCallback): number => {
  let count: number = 0;
  for (let number of array) {
    if (callback(number)) {
      count++;
    }
  }
  return count;
}

//  11
const toDecimal = (number: number): number => {
  let result: number = 0;
  const numbersArray: number[] = [];
  const numLength: number = Math.ceil(Math.log10(number + 1));
  let maxLength: number = 10 ** (numLength - 1);

  while (maxLength >= 1) {
    let trunced: number = Math.trunc(number / maxLength);
    numbersArray.push(trunced);
    trunced = trunced * maxLength;
    maxLength = maxLength / 10;
    number = number - trunced;
  }
  for (let i: number = 0; i < numbersArray.length; i++){
    result = result * 2 + numbersArray[i];
  }
  return result;
}

const toBinary = (number: number): string => {
  const numbersArray: number[] = [];
  let result: string = '';
  while (number / 2 > 0) {
    numbersArray.push(number % 2);
    number = Math.floor(number / 2);
  }
  for (let i: number = numbersArray.length - 1; i >= 0; i--){
    result += numbersArray[i];
  }
  return result;
}

// 12
const getSumTwoDimensionalArray = (array: number[][],
  callback: PredicateCallback) => {
  let result: number = 0;
  for (let i: number = 0; i < array.length; i++){
    for (let j: number = 0; j < array[i].length; j++){
      if (callback(array[i][j])) {
        result += array[i][j];
      }
    }
  }
  return result;
}

const countElemsTwoDimensionalArray = (array: number[][],
  callback: PredicateCallback): number => {
  let result: number = 0;
  for (let i: number = 0; i < array.length; i++){
    for (let j: number = 0; j < array[i].length; j++){
      if (callback(array[i][j])) {
        result++;
      }
    }
  }
  return result;
}

// 13
const getSumFromSegmentOfNumbers = (min: number, max: number,
  callback: PredicateCallback): number => {
  let result: number = 0;
  for (let i: number = min; i <= max; i++){
    if (callback(i)) {
      result += i;
    }
  }
  return result;
}

const getSumFromSegmentOfNumbersRecursion = (min: number, max: number,
  callback: PredicateCallback, result?: number): number => {
  result = result || 0;
  if (min > max) {
    return result;
  }
  if (callback(min)) {
    result += min;
  }
  return getSumFromSegmentOfNumbersRecursion(min + 1, max, callback, result);
}

// 14
const takeAverageArrayElements = (array: number[],
  callback: PredicateCallback): number => {
  const filteredArray: number[] = array.myFilter(callback);
  return filteredArray.myReduce() / filteredArray.length;
}

const takeAverageTwoDimensionalArrayElements = (array: number[][],
  callback: PredicateCallback): number => {
  let result: number = 0;
  let count: number = 0;
  for (let i: number = 0; i < array.length; i++){
    const filtered: number[] = array[i].myFilter(callback);
    if (filtered.length !== 0) {
      count += filtered.length;
      result += filtered.myReduce();
    }
  }
  return result / count;
}

// 15
const transposeMatrix = (matrix: number[][]): number[][] => {
  if (matrix.length === 0) {
    throw new Error('The input parameter must be a matrix');
  }
  const transposed: number[][] = [];
  let maxLength: number = matrix.length;
  while (maxLength > 0) {
    transposed.push([]);
    maxLength--;
  }

  for (let i: number = 0; i < matrix.length; i++){
    if (matrix[i].length !== matrix.length) {
      throw new Error('This matrix cant be transposed');
    }
    for (let j: number = 0; j < matrix[i].length; j++){
      transposed[j].push(matrix[i][j]);
    }
  }
  return transposed;
}

const getMatrixSum = (matrix1: number[][],
  matrix2: number[][]): number[][] => {
  const matrixSum: number[][] = [];
  for (let i: number = 0; i < matrix1.length; i++){
    if (matrix1[i].length !== matrix2[i].length) {
      throw new Error('The arrays are not the same size. Addition not possible');
    }

    matrixSum[i] = [];
    for (let j: number = 0; j < matrix1[i].length; j++){
      matrixSum[i][j] = matrix1[i][j] + matrix2[i][j];
    }
  }
  return matrixSum;
}

//16
const deleteRowsWithZero = (array: number[][]): number[][] => {
  for (let i: number = 0; i < array.length; i++){
    if (array[i].myIncludes(0)) {
      array.splice(i--, 1);      
    }
  }
  return array;
}

const deleteColumnWithZero = (array: number[][]): number[][] => {
  const deleteIndex: number[] = [];
  for (let i: number = 0; i < array.length; i++){
    for (let j: number = 0; j < array[i].length; j++){
      if (array[i][j] === 0) {
        if (!deleteIndex.myIncludes(j)) {
          deleteIndex.push(j);
        }
      }
    }
  }
  let count: number = 0;
  
  deleteIndex.mySort();
  for (let key of deleteIndex) {
    for (let i: number = 0; i < array.length; i++){
      array[i].splice(key + count, 1);
    }
    count--;
  }
  return array;
}

// 17
const takeActionOnMatrix = (matrix: number[][],
  direction: (value1: number, value2: number) => boolean,
  resultFunction: (number: number) => number): number => {
  let result: number = 0;
  for (let i: number = 0; i < matrix.length; i++){
    for (let j: number = 0; j < matrix[i].length; j++){
      if (direction(i, j)) {
        result += resultFunction(matrix[i][j]);
      }
    }
  }
  return result;
}

// 18
interface Fibonachi {
  start: number;
  end: number;
  current: number;
  prev: number;
  [Symbol.iterator](): {
    start: number;
    end: number;
    current: number;
    prev: number;
    nexNum: number;
    next: () => IteratorResult<number | undefined>;
  };
}

const fibonachiObject: Fibonachi = {
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
          }
        }
        return {
          value: undefined,
          done: true,
        }
      },
    }
  },
}

function* fibonachi(): IterableIterator<number> {
  let prev: number = 0;
  let current: number = 1;
  while (true) {
    let result: number = prev;
    prev = current;
    current = result + current;
    yield result;
  }
}

const fibonachiRecursion = (number: number): number => {
  if (number <= 1) {
    return number;
  }
  return fibonachiRecursion(number - 1) + fibonachiRecursion(number - 2);
}

const fibonachiMemoized = (function () {
  const memo: NumberObject = {};
  return function fibonachiMemo(number: number): number {
    if (number === 0 || number === 1) {
      return number;
    }
    if (number in memo) {
      return memo[number];
    }
    memo[number] = fibonachiMemo(number - 1) + fibonachiMemo(number - 2);
    return memo[number];
  }
})()

// 19
function* trafficLightGenerator(): IterableIterator<string> {
  while (true) {
    yield 'red';
    yield 'yellow';
    yield 'green';
    yield 'yellow';
  }
}

interface Traffic {
  color: string[];
  [Symbol.iterator](): {
    color: string[];
    index: number;
    next(): IteratorYieldResult<string>;
  };
}

const trafficIterator: Traffic = {
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
          }
        }
      },
    }
  },
}

// 20
const checkIsNegativeNumber = (number: number) => {
  return (number & (1 << 31)) === (1 << 31);
}

const getNumberOfBits = (number: number) => {
  let binaryNumber: string = toBinary((number >>> 0));
  let zeroes: number = 32;
  let units: number = 0;
  for (let num of binaryNumber) {
    if (num === '1') {
      units++;
    }
  }
  const result: { [key: number]: number } = {};
  result[0] = zeroes - units;
  result[1] = units;
  return result;
}

const bitwiseNotEasy = (number: number): number => {
  return -number - 1;
}

const bitwiseNot = (number: number): number => {
  let result: number = 0;
  for (let i = 0; i < 32; i++){
    if (((number >> i) & 1) !== 1) {
      result |= (1 << i);
    }
  }
  return result;
}