// Hashtable Implementation in JavaScript (uses Separate Chaining with Singly Linked Lists)

class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

class LinkedEntries {
    // An implementation of a Singly Linked List to keep the entries of a hashtable.
    
    constructor() {
        this.head = null;
        this.tail = null;
    }

    push(value) {
        // Create a new node.
        let newNode = new Node(value);
        if (!this.head) {
            // If our linked list does not contain a head,
            // head and tail is the same, new node.
            this.head = newNode;
            this.tail = newNode;
        } else {
            // Otherwise point the tail at the new node.
            this.tail.next = newNode;
            // And make the new node, the new tail.
            this.tail = newNode;
        }
        // Return an instance of the linked list.
        return this;
    }

    keys() {
        // Grab only the keys from the list as an array.
        let arr = [];
        let current = this.head;
        // Loop through the list.
        while (current) {
            // Push the 0th-index (key) to the array.
            arr.push(current.value[0]);
            current = current.next;
        }
        // Return the array.
        return arr;
    }

    values() {
        // Grab only the values from the list as an array.
        let arr = [];
        let current = this.head;
        // Loop through the list.
        while (current) {
            // Push the 1st-index (value) to the array.
            arr.push(current.value[1]);
            current = current.next;
        }
        return arr;
    }

    getByKey(key) {
        // Get a value by supplied key.
        let current = this.head;
        while (current) {
            // Loop through the array to find a pair with the key.
            if (current.value[0] === key) {
                // Return the node.
                return current;
            }
            current = current.next;
        }
        // If not found, return null.
        return null;
    }

    toArray() {
        // Convert the list to an array (for representation).
        let arr = [];
        let current = this.head;
        while (current) {
            arr.push(current.value);
            current = current.next;
        }
        return arr;
    }
}

class Hashtable {
    constructor(size = 53) {
        // Construct an array of a fixed size,
        // we use a prime number for more uniform distribution.
        // Don't ask me why.
        this.keyMap = new Array(size);
    }

    _hash(key) {
        // Hashes a key and returns an array slot.
        let total = 0;
        const MAGIC_PRIME = 31; // used for more randomness
        for (let i = 0; i < Math.min(key.length, 50); i++) {
            // Summation of the unicode values of the string, clamped to array length.
            total = (total + key.charCodeAt(i) * MAGIC_PRIME) % this.keyMap.length;
        }
        return total;
    }

    set(key, value) {
        // Set key, value pair.
        let index = this._hash(key); // calculate an array index from the key

        // If we have a node with the [key, value] pair.
        let node = this.keyMap[index]?.getByKey(key); 
        if (node) {
            // Just change its value
            node.value[1] = value;
            return;
        }
        
        if (!this.keyMap[index]) {
            // If there are no entries at that index, create a new linked list there.
            this.keyMap[index] = new LinkedEntries();
        }
        // Push an array [key, value] to the linked list.
        this.keyMap[index].push([key, value]);
    }

    get(key) {
        // Get value by key.
        let index = this._hash(key); // calculate the array index to get from
        if (!this.keyMap[index]) return null;  // if nothing there, return null

        let node = this.keyMap[index].getByKey(key);  // Get the list node.
        if (node) {
            return node.value[1];
        }
        return null;
    }

    keys() {
        // Return the keys of the hashtable as an array.
        let arr = [];
        for (let element of this.keyMap) {
            if (element) {
                arr.push(...element.keys());
            }
        }
        return arr;
    }

    values() {
        // Return the values of the hashtable as an array.
        // Does not account for duplicated values.
        let arr = [];
        for (let element of this.keyMap) {
            if (element) {
                arr.push(...element.values());
            }
        }
        return arr;
    }
}