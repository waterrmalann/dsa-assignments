// Queue: JavaScript Implementation (w/ Singly Linked List)

class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

class Queue {
    constructor() {
        // this.first and this.last is equivalent to the head and tail of linked list.
        this.first = null;
        this.last = null;
        this.size = 0;
    }

    enqueue(value) {
        // Add to the queue. We push to the linked list.
        let newNode = new Node(value);
        if (!this.first) {
            // If queue is empty, first and last are the same.
            this.first = newNode;
            this.last = newNode;
        } else {
            // We add to the end of the queue.
            this.last.next = newNode;
            this.last = newNode;
        }
        // Increment the size and return it.
        return ++this.size;
    }

    dequeue() {
        // Remove from the beginning of the queue. We shift from the linked list.
        // If our queue is empty, we return null.
        if (!this.first) return null;

        let dequeued = this.first;
        this.first = dequeued.next;

        // Disconnect any stray pointers.
        dequeued.next = null;
        // Decrement size and return dequeued element.
        this.size--;
        if (this.size === 0) {
            // Edge case where queue is empty, we invalidate this.last.
            this.last = null;
        }
        return dequeued;
    }

    toArray() {
        // Utility function to convert the queue into an array for better representation.
        let arr = [];
        let current = this.first;
        while (current) {
            arr.push(current.value);
            current = current.next;
        }
        return arr;
    }
}