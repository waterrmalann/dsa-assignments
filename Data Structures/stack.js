// Stacks: JavaScript Implementation (w/ Singly Linked List)

class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

class Stack {
    constructor() {
        // this.first and this.last refers to head and tail of a linked list,
        // that we are using underneath to implement this stack.
        this.first = null;
        this.last = null;
        this.size = 0;
    }
    
    push(value) {
        // Push value on top of the stack, ie: the first/head. Just like unshifting.
        let newNode = new Node(value);  // Create a new node that we will be pushing.
        if (!this.first) {
            // If we have an empty stack, first and last is the same new node.
            this.first = newNode;
            this.last = newNode;
        } else {
            // New node points to current first node.
            newNode.next = this.first;
            // First node is reassigned to be the new node.
            this.first = newNode;
        }
        // We increment size and return it.
        return ++this.size;
    }

    pop() {
        // Remove from top of the stack, ie: the first/head. Just like shifting.
        // If our stack is empty, underflow returns null.
        if (!this.first) return null;
        
        // We get a reference to the first node (to be popped)
        let popped = this.first;
        // First node is reassigned to the node after the one to be popped.
        this.first = popped.next;

        // Dereference the popped node so there are no stray connections.
        popped.next = null;
        // Decrement size.
        this.size--;

        if (this.size === 0) {
            // Edge case where we invalidate the last node if size is 0.
            this.last = null;
        }
        // Return the popped node.
        return popped;
    }

    toArray() {
        // Convert the stack into an array for better representation.
        let arr = [];
        let current = this.first;
        // Loop through the stack and push values to an array.
        while (current) {
            arr.push(current.value);
            current = current.next;
        }
        return arr;
    }
}