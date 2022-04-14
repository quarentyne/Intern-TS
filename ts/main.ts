interface Array<T> {
  myFilter(callback: (value: T) => boolean | T): Array<T>;
  mySort(): Array<T>;
  myIncludes(element: T): boolean;
}

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
}

Array.prototype.myFilter = function (callback) {
  const result: Array<any> = [];
  for (let i = 0; i < this.length; i++){
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
  const wordsArray: Array<string> = [];
  let word: string = '';

  for (let i = 0; i < this.length; i++){
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

//1
const checkIsAnagramm = (firstString: string, secondString: string): boolean => {
  firstString = firstString.deleteSpaces().toLowerCase();
  secondString = secondString.deleteSpaces().toLowerCase();
  if (firstString.length !== secondString.length) {
    return false;
  }

  const firstArray: Array<string> = [];
  const secondArray: Array<string> = [];

  for (let word of firstString) {
    firstArray.push(word);
  }
  for (let word of firstString) {
    secondArray.push(word);
  }
  firstArray.mySort();
  secondArray.mySort();
  for (let i = 0; i < firstArray.length; i++){
    if (firstArray[i] !== secondArray[i]) {
      return false;
    }
  }
  return true;
}

//3
const getNumberAmoutRecursion = (number: number, count?: number): number => {
  count = count || 0;
  if (number > -10 && number < 10) {
    return ++count;
  }
  return getNumberAmoutRecursion(number / 10, ++count);
}

const getNumberAmout = (number: number): number => {
  let count: number = 0;
  for (count; number >= 1; count++){
    number /= 10;
  }
  return count;
}

//4
const checkIsPalindrom = (string: string): boolean => {
  for (let i = 0; i < string.length; i++){
    if (string[i] !== string[string.length - 1 - i]) {
      return false;
    }
  }
  return true;
}

//5
const getCountUniqWords = (string: string): number => {
  string = string.deleteSpaces().toLowerCase().replace(/[,?!()\.]/g, '');
  const stringWords: Array<string> = string.mySplit(' ').myFilter(value => value);
  const result: Array<string> = [];
  for (let word of stringWords) {
    if (!result.myIncludes(word)) {
      result.push(word);
    }
  }
  return result.length;
}

//6
const getWordsCount = (string: string): object => {
  string = string.deleteSpaces().toLowerCase().replace(/[,?!()\.]/g, '');
  const stringWords: Array<string> = string.mySplit(' ').myFilter(value => value);
  const wordCount: object = {};
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
    let halfPerimeter: number = this.getPerimeter() / 2;
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
  let halfPerimeter: number = this.getPerimeter() / 2;  
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
const getFactorialMemo = (function () {
  const memory: object = {};
  return function recursionFact(number: number): number {
    if (number === 0) {
      return 1;
    }
    if (!memory[number]) {
      memory[number] = recursionFact(number - 1);
    }
    return number * memory[number];
  }
})

const getFactorialCycle = (number: number): number => {
  let result: number = 1;
  for (let i = 1; i <= number; i++){
    result *= i;
  }
  return result;
}

// 9
const getSummFromArrayRecursion = (array: Array<number>,
  callback: (value: number) => boolean, result?: number, index?: number): number => {
  result = result || 0;
  index = index || 0;
  if (index >= array.length) {
    return result;
  }
  if (callback(array[index])) {
    result += array[index];
  }
  return getSummFromArrayRecursion(array, callback, result, ++index);
}

const getSummFromArray = (array: Array<number>, callback: (value: number) => boolean): number => {
  let result: number = 0;
  for (let i = 0; i < array.length; i++){
    if (callback(array[i])) {
      result += array[i];
    }
  }
  return result;
}

// 10
const getElemsCount = (array: Array<number>, callback: (value: number) => boolean): number => {
  let count: number = 0;
  for (let number of array) {
    if (callback(number)) {
      count++
    }
  }
  return count;
}
