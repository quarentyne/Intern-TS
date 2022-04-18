interface Function {
  myCall(context: String | Number | Boolean | Object, ...args: any): any;
  myBind(context: String | Number | Boolean | Object, ...args: any): any;
}

Function.prototype.myCall = function (context, ...args) {
  let insideObject: String | Number | Boolean | Object;

  if (typeof context === 'object' || typeof context === 'function') {
    insideObject = Object.create(context);
  }
  if (typeof context === 'number') {
    insideObject = new Number(context);
  }
  if (typeof context === 'string') {
    insideObject = new String(context);
  }
  if (typeof context === 'boolean') {
    insideObject = new Boolean(context);
  }
  
  const uniqElement = Symbol();
  insideObject[uniqElement] = this;
  const result = insideObject[uniqElement](...args);  
  delete insideObject[uniqElement];
  return result;
}

Function.prototype.myBind = function (context, ...rest) {
  const there = this;
  let insideObject: String | Number | Boolean | Object;

  if (typeof context === 'object' || typeof context === 'function') {
    insideObject = Object.create(context);
  }
  if (typeof context === 'number') {
    insideObject = new Number(context);
  }
  if (typeof context === 'string') {
    insideObject = new String(context);
  }
  if (typeof context === 'boolean') {
    insideObject = new Boolean(context);
  }

  return function (...args: any) {
    const uniqElement = Symbol();
    insideObject[uniqElement] = there;
    const result = insideObject[uniqElement](...rest, ...args);
    delete insideObject[uniqElement];
    return result;
  }
};

interface Array<T> {
  myFilter(callback: (value: T, index: number, array: Array<T>) => boolean): Array<T>;
  myMap(callback: (value: T, index: number, array: Array<T>) => T): Array<T>;
  myReduce(callback: (prevValue: T, currentValue: T,
    index: number, array: Array<T>) => T, accumulator?: T): T;
  myFind(callback: (value: T, index: number, array: Array<T>) => boolean): T | undefined;
  myForEach(callback: (value: T, index: number, array: Array<T>) => void): void;
}

Array.prototype.myFilter = function (callback) {
  const result = [];
  for (let i = 0; i < this.length; i++) {
    if (callback(this[i], i, this)) {
      result.push(this[i])
    }
  }
  return result;
}

Array.prototype.myMap = function (callback) {
  const result = [];
  for (let i = 0; i < this.length; i++) {
    result.push(callback(this[i], i, this));
  }
  return result;
};

Array.prototype.myReduce = function (callback, initialValue) {
  if (this.length === 0) {
    throw new Error('reduce of empty array with no initial value');
  }
  let accumulator = initialValue || 0;
  for (let i = 0; i < this.length; i++) {
    accumulator = callback(accumulator, this[i], i, this);
  }
  return accumulator;
};

Array.prototype.myFind = function (callback) {
  for (let i = 0; i < this.length; i++) {
    if (callback(this[i], i, this)) {
      return this[i];
    }
  }
  return undefined;
};

Array.prototype.myForEach = function (callback) {
  for (let i = 0; i < this.length; i++) {
    if (this[i] === undefined) {
      continue;
    }
    callback(this[i], i, this);
  }
};