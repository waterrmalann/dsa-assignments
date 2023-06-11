// Hashtable Implementation in JavaScript (uses Open Addressing with Linear Probing)

class Hashtable {
    constructor(size = 53) {
        // Initialize an array of given size.
        // Since we're using open addressing, the array should be sufficiently large.
        this.table = new Array(size);
        this.size = size;
    }

    hash(key) {
        // Calculate the hash for a given key by adding up the ASCII values.
        let total = 0;
        // We clamp the loop at 50 to achieve a quasi-constant time hashing.
        for (let i = 0; i < Math.min(key.length, 50); i++) {
            // Add each character code to the total.
            total += key.charCodeAt(i);
        }
        // Multiply it with 31 (a prime number, which has few common factors) for uniformity.
        // and clamp it down to the array size using `% this.size` to get our index.
        return (total * 31) % this.size;
    }


    probe(key, attempt = 0) {
        // linear probe with a key and an attempt
        return (this.hash(key) + attempt) % this.size;
    }

    findSpace(key) {
        // find an available array index to put the key
        // Generate the first index for the given key.
        let index = this.probe(key);
        let attempt = 1;
        // Run the loop for as long as the index has content and we haven't exhausted the array.
        while (this.table[index]) {
            // Generate the next probe index.
            index = this.probe(key, attempt);
            // Increment attempt/index count.
            attempt++;
            if (attempt >= this.size) {
                // If we have exhausted the array, we don't have space.
                return -1;
            }
        }
        return index;
    }

    lookup(key) {
        // lookup a given key from the array and return index
        let attempt = 0;
        // Generate the first index.
        let index = this.probe(key, attempt);
        // Run the loop until,
        // - we find the key
        // - array size exhausted
        // - we stumble upon a null value (that's not empty)
        while (attempt < this.size) {
            index = this.probe(key, attempt);
            if (!this.table[index] && this.table[index] !== false) {
                // If the index is null but not empty (deleted),
                // we can break the loop early.
                break;
            }
            if (this.table[index] && this.table[index]?.[0] === key) {
                // If the index has content and key is equal,
                // we return the index position.
                return index;
            }
            attempt++;
        }

        // We return -1 to signify no element found.
        return -1;
    }

    get(key) {
        // get a value by key
        // We look up the index of the key.
        let index = this.lookup(key);
        if (index !== -1) {
            // If a valid index is found, return the value.
            return this.table[index][1];
        }
        // otherwise, return null.
        return null;
    }

    set(key, value) {
        // set/edit a key, value pair.
        // check if the key already exists
        let index = this.lookup(key);
        if (index !== -1) {
            // simply edit the value
            this.table[index][1] = value;
            return true;
        }

        // otherwise, set the new pair.
        index = this.findSpace(key);
        if (index !== -1) {
            // if we have avilable space, store the key,value pair.
            this.table[index] = [key, value];
            return true;
        }

        // couldn't set.
        return false;
    }

    delete(key) {
        // delete a key, value pair.
        // get the index of the pair
        let index = this.lookup(key);
        if (index !== -1) {
            // simply set the pair to false.
            this.table[index] = false;
            return true;
        }
        // couldn't delete because of no entry
        return false;
    }

    keys() {
        // Return the list of keys as an array.
        let _keys = new Set();
        for (let pair of this.table) {
            if (pair) {
                // We add to a set to avoid duplicates.
                _keys.add(pair[0]);
            }
        }
        // and finally convert it to an array before returning.
        return [..._keys];
    }

    values() {
        // Return the list of values as an array.
        let _values = new Set();
        for (let pair of this.table) {
            if (pair) {
                _values.add(pair[1]);
            }
        }
        return [..._values];;
    }
}