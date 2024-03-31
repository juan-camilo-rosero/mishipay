// Clase que simula un arreglo estático de longitud n

export class StackArray {
    constructor(n) {
        this.N = n // Longitud máxima del arreglo estático
        this.top = 0 // Tope de la pila
        this.sarray = new Array(n) // Arreglo estático de longitud n
    }

    // Verifica si la pila está vacía
    empty() {
        return this.top <= 0
    }

    // Verifica si la pila está llena
    full() {
        return this.top >= this.sarray.length
    }

    // Elimina y devuelve el elemento en la parte superior de la pila
    pop() {
        if (this.empty())
            throw new Error("Stack is empty")
        this.top--
        return this.sarray[this.top]
    }

    // Agrega un elemento a la parte superior de la pila
    push(item) {
        if (this.full())
            throw new Error("Stack is full")
        this.sarray[this.top++] = item;
    }
}

// Clase que simula un arreglo estático

export class StaticArray {
    constructor(size) {
        this.array = new Array(size) // Arreglo estático de tamaño fijo
        this.size = size // Tamaño máximo del arreglo
        this.length = 0 // Longitud actual del arreglo
    }

    // Verifica si el arreglo está vacío
    empty() {
        return this.length == 0
    }

    // Verifica si el arreglo está lleno
    full() {
        return this.length == this.size
    }

    // Agrega un elemento al final del arreglo
    insert(item) {
        if (this.full())
            throw new Error("Array is full")
        this.array[this.length] = item
        this.length++ 
    }

    // Elimina el elemento en el índice especificado
    remove(index) {
        if (index < 0 || index >= this.length)
            throw new Error("Index out of bounds")
        for (let i = index; i < this.length - 1; i++) {
            this.array[i] = this.array[i + 1]
        }
        this.length--
    }

    // Obtiene el elemento en el índice especificado
    get(index) {
        if (index < 0 || index >= this.length)
            throw new Error("Index out of bounds")
        return this.array[index]
    }

    // Asigna un nuevo valor al elemento en el índice especificado
    set(index, item) {
        if (index < 0 || index >= this.length)
            throw new Error("Index out of bounds")
        this.array[index] = item
    }

    // Intercambia los elementos en los índices especificados
    swap(index1, index2) {
        if (index1 < 0 || index1 >= this.length || index2 < 0 || index2 >= this.length)
            throw new Error("Index out of bounds")

        const temp = this.array[index1]
        this.array[index1] = this.array[index2]
        this.array[index2] = temp
    }
}
