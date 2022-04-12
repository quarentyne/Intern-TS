interface Array<T> {
  // myFilter(callback: any): Array<T>;
  mySort(): Array<T>;
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

// Array.prototype.myFilter = function (callback) {
//   const result: Array<any> = [];
//   for (let i = 0; i < this.length; i++){
//     if (callback(this[i])) {
//       result.push(this[i]);
//     }
//   }
//   return result;
// }

interface String {
  deleteSpaces(): string;
}
String.prototype.deleteSpaces = function () {
  return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');  
}


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
