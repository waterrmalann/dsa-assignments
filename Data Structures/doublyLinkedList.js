// Doubly Linked List: Simple JavaScript Implementation

class Node {
    constructor(value) {
        // We have one value cell.
        this.value = value;
        // We need two address pointers (forward and backwards)
        this.next = null;
        this.prev = null;
    }
}

class DoublyLinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }

    push(value) {
        // Append a value to the list.
        let newNode = new Node(value);
        if (!this.head) {
            // If our list is empty, both head and tail are new.
            this.head = newNode;
            this.tail = this.head;
        } else {
            // New node points back at current tail.
            newNode.prev = this.tail;
            // Current tail points ahead at new node.
            this.tail.next = newNode;
            // Current tail is now new node.
            this.tail = newNode;
        }
        // Increment length, return list itself.
        this.length++;
        return this;
    }

    unshift(value) {
        // Prepend a value to the list.
        let newNode = new Node(value);
        if (!this.head) {
            // If our list is empty, same process.
            this.head = newNode;
            this.tail = this.head;
        } else {
            // New node points at current head.
            newNode.next = this.head;
            // Current head points back at new node.
            this.head.prev = newNode;
            // Current head is now new node.
            this.head = newNode;
        }
        // Increment length, return list itself.
        this.length++;
        return this;
    }

    pop() {
        // Remove an element from the end of the list.
        // Empty list returns undefined.
        if (!this.head) return undefined;
        // Get the current tail (waiting to be removed)
        let popped = this.tail;
        // Change current tail to be one before current tail.
        this.tail = popped.prev;
        // Change next of current tail to be null.
        this.tail.next = null;
        // Dereference previous of popped.
        popped.prev = null;

        // Decrement length, return popped.
        this.length--;
        return popped;
    }

    shift() {
        // Remove an element from the beginninf of the list.
        // Empty list returns undefined;
        if (!this.head) return undefined;
        // Get the current head (waiting to be removed)
        let shifted = this.head;
        // Change head to next of the current head.
        this.head = shifted.next;
        // Dereference the next of the shifted node.
        shifted.next = null;

        // Decrement length, return shifted.
        this.length--;
        return shifted;
    }

    get(index) {
        if (index < 0 || index >= this.length) return null;

        // A little optimization we can do is,
        // check if the index < half of the length of the list
        // if so we can start from the start, else from the end
        // Sort of makes it O(n/2) which is still O(n)
        let current;
        if (index <= this.length / 2) {
            let indexCount = 0;
            current = this.head;
            while (indexCount !== index) {
                current = current.next;
                indexCount++;
            }
        } else {
            let indexCount = this.length - 1;
            current = this.tail;
            while (indexCount !== index) {
                current = current.prev;
                indexCount--;
            }
        }
        return current;
    }

    set(index, value) {
        // Grab the node at the index position.
        let node = this.get(index);
        // If that is a valid node, change the value.
        if (node) {
            node.value = value;
            return true;
        }
        return false;
    }

    insert(index, value) {
        if (index < 0 || index > this.length) return false;
        if (index === 0) return !!this.unshift(value);
        if (index === this.length) return !!this.push(value);

        // Create a new node.
        let newNode = new Node(value);
        // Get the node before insertion space.
        let nodeBefore = this.get(index - 1);
        // Get the node after insertion space.
        let nodeAfter = nodeBefore.next;

        // Point the node before insertion space towards new node.
        nodeBefore.next = newNode;
        // Point the new node at node after insertion space.
        newNode.next = nodeAfter;
        // Point backwards as well.
        nodeAfter.prev = newNode;
        newNode.prev = nodeBefore;

        // Increment length
        this.length++;
        return true;
    }

    remove(index) {
        if (index < 0 || index >= this.length) return undefined;
        if (index === 0) return this.shift();
        if (index === this.length - 1) return this.pop();

        // Get the node before target node.
        let nodeBefore = this.get(index - 1);
        // Get target node.
        let targetNode = nodeBefore.next;
        // Get the node after target node.
        let nodeAfter = targetNode.next;

        // Point the node before at node after.
        nodeBefore.next = nodeAfter;
        // Point back from there.
        nodeAfter.prev = nodeBefore;

        // Deference next and prev from target node.
        targetNode.next = null, targetNode.prev = null;

        // Decrement length, return removed.
        this.length--;
        return targetNode;
    }

    toArray() {
        // Represent the linked list as an array.
        let arr = [];
        let current = this.head;
        while (current) {
            arr.push(current.value);
            current = current.next;
        }
        return arr;
    }
}