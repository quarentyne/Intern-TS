Array.prototype.bubbleSort = function (callback) {
    if (typeof callback !== 'function') {
        callback = (element1, element2) => element1 > element2;
    }
    let length = this.length - 1;
    for (let i = 0; i < length; i++) {
        for (let j = 0; j < length - i; j++) {
            if (callback(this[j], this[j + 1])) {
                [this[j], this[j + 1]] = [this[j + 1], this[j]];
            }
        }
    }
    return this;
};
Array.prototype.insertionSort = function (callback) {
    if (typeof callback !== 'function') {
        callback = (element1, element2) => element1 > element2;
    }
    for (let i = 0; i < this.length; i++) {
        let j = i;
        while (j > 0 && callback(this[j - 1], this[j])) {
            [this[j], this[j - 1]] = [this[j - 1], this[j]];
            j--;
        }
    }
    return this;
};
console.log([1, 2, 43, 5321, 12, 3421].insertionSort((v1, v2) => v1 < v2));
