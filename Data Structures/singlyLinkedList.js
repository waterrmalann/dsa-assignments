// Singly Linked List: JavaScript Implementation (w/ Tail)

class Node {
    constructor(val) {
        this.value = val; // store the value of the node.
        this.next = null; // store the address to the next node.
    }
}

class SinglyLinkedList {
    constructor() {
        // Initialize with an empty head and tail.
        this.head = null;
        this.tail = null;
        this.length = 0;
    }

    push(value) {
        // Add an element to the end of the list.
        let newNode = new Node(value);
        if (!this.head) {
            // If the list is empty.
            // Both the head and the tail are the new node.
            this.head = newNode;
            this.tail = this.head;
        } else {
            // Otherwise, we redirect the tail towards new node.
            this.tail.next = newNode;
            // Update the tail of the list as well.
            this.tail = newNode;
        }
        // Increase the length of the list and return the list.
        this.length++;
        return this;
    }

    pop() {
        // Remove an element from the end of the list.
        // If we have an empty list, we return undefined.
        if (!this.head) return undefined;
        // We have to loop until the second-last element.
        let current = this.head; // starting from the head
        let secondLast = current;
        while (current.next) {
            // As long as current node has a next node.
            secondLast = current; // store second-last node
            current = current.next; // move current pointer up
        }
        // Make the second last node point to null.
        secondLast.next = null;
        // Update the tail of the list.
        this.tail = secondLast;
        this.length--;
        if (this.length === 0) {
            // If we end up with an empty list, invalidate the head and tail.
            this.head = null;
            this.tail = null;
        }
        // Return the popped element.
        return current;
    }

    unshift(value) {
        // Add an element to the start of the list. 
        let newNode = new Node(value);
        if (!this.head) {
            // If our list is empty, head and tail are equal to new node.
            this.head = newNode;
            this.tail = this.head;
        } else {
            // Make the new node point towards the current head.
            newNode.next = this.head;
            // Update current head.
            this.head = newNode;
        }
        // Increase the list length and return the list.
        this.length++;
        return this;
    }

    shift() {
        // Remove an element from the start of the list.
        let removed = this.head;
        this.head = removed.next;
        this.length--;
        if (this.length === 0) {
            // If our list is empty, we invalidate the tail.
            // The head would automatically be null.
            this.tail = null;
        }
        return removed;
    }

    get(index) {
        // Get an element by index.
        if (index < 0 || index >= this.length) return null;
        let counter = 0; // Need to start at first index.
        let current = this.head // and from the head.
        while (counter !== index) {
            // Run a loop until counter equals target index.
            current = current.next; // Advance the node.
            counter++; // Increment counter
        }
        return current;
    }

    set(index, value) {
        // Set an element by index.
        // Get the element by index since we have a this.get()
        let node = this.get(index);
        if (node) {
             // Assuming our target node is not null.
            node.value = value;
            return true;
        }
        // Otherwise we return false because nothing was set.
        return false;
    }

    insert(index, value) {
        // Insert an element into index position.
        if (index < 0 || index > this.length) return false;
        if (index === 0) return !!this.unshfit(value);
        if (index === this.length) return !!this.push(value);

        // Get the element right before our target node.
        let nodeBefore = this.get(index - 1);
        let pointTo = nodeBefore.next; // The node to point our new node at.
        // Create a new node.
        let newNode = new Node(value);
        nodeBefore.next = newNode; // Node before target node should point to new node.
        newNode.next = pointTo; // New node needs to point at displaced node.
        this.length++; // Increment length
        return true;
    }

    remove(index) {
        // Remove an element from index position.
        if (index < 0 || index >= this.length) return false;
        if (index === 0) return !!this.shift();
        if (index === this.length - 1) return !!this.pop();

        // Grab the element before our target.
        let nodeBefore = this.get(index - 1);
        let removedNode = nodeBefore.next; // Node to remove.
        nodeBefore.next = removedNode.next; // Redirect the arrows to skip the index.
        this.length--; // Decrement length as we removed an element.
        return true;
    }

    reverse() {
        // Reverse the list in place.
        // We need three pointers: current, previous, and next.
        let prev = null;
        let current = this.head;
        while (current) {
            // Run the loop until the end of the list.
            let next = current.next; // Store the next node.
            current.next = prev; // Point the current node back.
            prev = current; // Advance the previous node.
            current = next; // Advance the current node.
        }
        // Let's swap the head and tail.
        [this.head, this.tail] = [this.tail, this.head];
        return true;
    }

    toArray() {
        // Print the list (represented as an array)
        let arr = [];
        let current = this.head;
        while (current) {
            arr.push(current.value);
            current = current.next;
        }
        return arr;
    }
}