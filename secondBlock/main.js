Function.prototype.myCall = function (context, ...args) {
    let insideObject;
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
};
Function.prototype.myBind = function (context, ...rest) {
    const there = this;
    let insideObject;
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
    return function (...args) {
        const uniqElement = Symbol();
        insideObject[uniqElement] = there;
        const result = insideObject[uniqElement](...rest, ...args);
        delete insideObject[uniqElement];
        return result;
    };
};
let user = {
    firstName: "Вася",
    sayHi() {
        console.log(`Привет, ${this.firstName}!`);
    }
};
let sayHi = user.sayHi.myBind(user); // (*)
sayHi(); // Привет, Вася!
