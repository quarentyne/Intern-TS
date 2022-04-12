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
String.prototype.deleteSpaces = function () {
    return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
};
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
const getNumberAmoutRecursion = (number, count) => {
    count = count || 0;
    if (number > -10 && number < 10) {
        return ++count;
    }
    return getNumberAmoutRecursion(number / 10, count + 1);
};
const getNumberAmout = (number) => {
    let count = 0;
    for (count; number >= 1; count++) {
        number /= 10;
    }
    return count;
};
