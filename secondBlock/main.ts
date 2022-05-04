type PossibleTypes = String | Number | Boolean | Object | Function;

interface Function {
  myCall<T>(context: PossibleTypes, ...args: T[]): T;
  myBind<T>(context: PossibleTypes, ...rest: T[]):
    (...args: T[]) => Function;
}

Function.prototype.myCall = function (context, ...args) {
  let insideObject: PossibleTypes;

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
  
  const uniqElement: unique symbol = Symbol();
  insideObject[uniqElement] = this;
  const result = insideObject[uniqElement](...args);  
  delete insideObject[uniqElement];
  return result;
}

Function.prototype.myBind = function (context, ...rest) {
  const there: Function = this;
  let insideObject: PossibleTypes;

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
    const uniqElement: unique symbol = Symbol();
    insideObject[uniqElement] = there;
    const result = insideObject[uniqElement](...rest, ...args);
    delete insideObject[uniqElement];
    return result;
  }
};

interface Array<T> {
  myFilter(callback: (value: T, index?: number, array?: Array<T>) => boolean): Array<T>;
  myMap(callback: (value: T, index?: number, array?: Array<T>) => T): Array<T>;
  myReduce(callback: (prevValue: T, currentValue: T,
    index?: number, array?: Array<T>) => T): T;
  myFind(callback: (value: T, index?: number, array?: Array<T>) => boolean): T | undefined;
  myForEach(callback: (value: T, index?: number, array?: Array<T>) => void): void;
}

Array.prototype.myFilter = function (callback) {
  const result = [];
  for (let i: number = 0; i < this.length; i++) {
    if (callback(this[i], i, this)) {
      result.push(this[i])
    }
  }
  return result;
}

Array.prototype.myMap = function (callback) {
  const result = [];
  for (let i: number = 0; i < this.length; i++) {
    result.push(callback(this[i], i, this));
  }
  return result;
};

Array.prototype.myReduce = function (callback) {
  if (this.length === 0) {
    throw new Error('reduce of empty array with no initial value');
  }
  let result = this[0];
  for (let i: number = 1; i < this.length; i++) {    
    result = callback(result, this[i], i, this);
  }
  return result;
};

Array.prototype.myFind = function (callback) {
  for (let i: number = 0; i < this.length; i++) {
    if (callback(this[i], i, this)) {
      return this[i];
    }
  }
  return undefined;
};

Array.prototype.myForEach = function (callback) {
  for (let i: number = 0; i < this.length; i++) {
    if (this[i] === undefined) {
      continue;
    }
    callback(this[i], i, this);
  }
};