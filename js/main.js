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
