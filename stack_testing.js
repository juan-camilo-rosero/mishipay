import {StackArray, StaticArray} from "./data_structures.js";

export function testStaticArray(n) {
    const arr = new StaticArray(n);
    console.time("pushBack arreglo estático");
    for (let i = 0; i < n; i++) {
        arr.insert(Math.floor(Math.random() * 1000) + 1);
    }
    console.timeEnd("pushBack arreglo estático");
    
    console.time("popBack arreglo estático");
    for (let i = 0; i < n; i++) {
        arr.remove(arr.length - 1);
    }
    console.timeEnd("popBack arreglo estático");
}
    
export function testStack(n) {
    const arr = new StackArray(n);
    console.time("pushBack pila");
    for (let i = 0; i < n; i++) {
        arr.push(Math.floor(Math.random() * 1000) + 1);
    }
    console.timeEnd("pushBack pila");

    console.time("popBack pila");
    for (let i = 0; i < n; i++) {
        arr.pop();
    }
    console.timeEnd("popBack pila");
}

export function testing() {
    console.log("10.000 datos");
    testStaticArray(10000)
    testStack(10000)
    console.log("100.000 datos");
    testStaticArray(100000)
    testStack(100000)
    console.log("1'000.000 datos");
    testStaticArray(1000000)
    testStack(1000000)
    console.log("10'000.000 datos");
    testStaticArray(10000000)
    testStack(10000000)
    console.log("100'000.000 datos");
    testStaticArray(100000000)
    testStack(100000000)
}