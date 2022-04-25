interface Array<T> {
  bubbleSort: (callback?: (element1: T, element2: T) => boolean) => Array<T>;
  insertionSort: (callback?: (element1: T, element2: T) => boolean) => Array<T>;
}

Array.prototype.bubbleSort = function (callback) {
  if (typeof callback !== 'function') {
    callback = (element1, element2) => element1 > element2;
  }
  let length: number = this.length - 1;

  for (let i: number = 0; i < length; i++){
    for (let j: number = 0; j < length - i; j++){
      if (callback(this[j], this[j + 1])) {
        [this[j], this[j + 1]] = [this[j + 1], this[j]];
      }
    }
  }
  return this;
}

Array.prototype.insertionSort = function (callback) {
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
