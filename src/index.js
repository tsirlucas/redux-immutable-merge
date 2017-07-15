const isObject = (val) => {
    if (val === null) {
        return false;
    }
    return ( (typeof val === 'function') || (typeof val === 'object') );
};

const isArray = (val) => val.length >= 0;

const isPrimitive = (val) => !isObject(val) && !isArray(val);

const shallowEqual = (a, b) => {
    for (let key in a) if (a[key] !== b[key]) return false;
    for (let key in b) if (!(key in a)) return false;
    return true;
};

const arrayEqual = (item1, item2) => {
    if (isPrimitive(item1) || isPrimitive(item2)) {
        return item1 === item2;
    }

    return shallowEqual(item1, item2);
};

Object.prototype.merge = function (object) {
    if (shallowEqual(this, object)) {
        return this;
    }

    return {...this, ...object}
};

Array.prototype.merge = function (array) {
    if (this.length !== array.length) return [...this, ...array];

    for (let key in array) {
        if (!arrayEqual(this[key], array[key])) return [...this, ...array];
    }

    return this;
};