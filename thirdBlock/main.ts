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

class BinaryTree<T>{
  data: T;
  left: BinaryTree<T>;
  right: BinaryTree<T>;

  constructor(data: T) {
    if (!((typeof data === 'number' && data === 0) || data)) {
      throw new Error('Insert new data');
    }
    this.data = data;
    this.left = null;
    this.right = null;
  }

  add(root: T): void {
    if (root < this.data) {
      if (!this.left) {
        this.left = new BinaryTree(root);
        return;
      }
      this.left.add(root);
      return;
    }

    if (!this.right) {
      this.right = new BinaryTree(root);
      return;
    }
    this.right.add(root);
  }

  find(data: T): BinaryTree<T> {
    if (this.data === data) {
      return this;
    }
    if (this.data < data) {
      if (this.right === null) {
        return null;
      }
      return this.right.find(data);
    }
    if (this.left === null) {
      return null;
    }
    return this.left.find(data);
  }

  delete(data: T): BinaryTree<T> {
    if (this.data < data) {
      if (this.right === null) {
        return this;
      }
      this.right = this.right.delete(data);
      return this;
    }
    if (this.data > data) {
      if (this.left === null) {
        return this;
      }
      this.left = this.left.delete(data);
      return this;
    }

    if (!this.right && !this.left) {
      return null;
    }
    if (this.right && !this.left) {
      return this.right;
    }
    if (!this.right && this.left) {
      return this.left;
    }

    let newNode: BinaryTree<T> = this.right;
    while (newNode.left) {
      newNode = newNode.left;
    }
    this.data = newNode.data;
    this.right = this.right.delete(newNode.data);
    return this;
  }
}