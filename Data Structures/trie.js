// An implementation of a Trie Data Structure
// - All letters are assumed to be lowercase english alphabets.

class Node {
    constructor(value) {
        // We store a character as the value.
        this.value = value;
        // A marker for if the node signifies an end of a word.
        this.isEndofWord = false;
        // The 26 (lowercase alphabet) children node links.
        this.children = new Array(26);
    }
}

class Trie {
    constructor() {
        // We init an empty root node.
        this.root = new Node('');
    }

    // Insert a word, character-by-character into the Trie.
    insert(word) {
        let current = this.root;
        // We loop through all the characters of the word.
        for (let i = 0; i < word.length; i++) {
            // Grab the array index for the character.
            let charIndex = word.charCodeAt(i) - 97;
            // If an element does not exist at our index.
            if (!current.children[charIndex]) {
                // We place the new node there for the letter.
                current.children[charIndex] = new Node(word[i]);
            }
            // We advance the current pointer.
            current = current.children[charIndex];
        }
        // We mark the final node as end of word.
        current.isEndofWord = true;
    }
    
    // Helper function to get the node at the end of a word.
    _getNode(word) {
        // If we have an empty string, we return the root value.
        if (word === '') return this.root;
        let current = this.root;
        // We loop through all the characters.
        for (let i = 0; i < word.length; i++) {
            // Grab the array index for the character.
            let charIndex = word.charCodeAt(i) - 97;
            // If an element does not exist at our index.
            if (!current.children[charIndex]) {
                return null;
            }
            // Otherwise, we advance the current pointer.
            current = current.children[charIndex];
        }
        // Return the last node we safely encountered.
        return current;
    }

    // Determine whether we have anything that starts with a word in our Trie.
    startsWith(word) {
        // Call our helper function to get the node(?) at the end of the word.
        let node = this._getNode(word);
        // We coerce it into a boolean and return that.
        return !!node;
    }

    // Return whether a word exists in our Trie or not.
    search(word) {
        // Call our helper function get the last node(?) at the end of the word.
        let node = this._getNode(word);
        // We have to make sure the node is not null, but also that the node is an end of word.
        return (node && node.isEndofWord);
    }

    // Return all the words from our Trie.
    allWords(starting = '') {
        // Figure out where we should start, by default we start from the root.
        let startingNode = this._getNode(starting);
        // Create an array to hold the words.
        let words = [];
        // Call the helper function from the root, 
        // given an empty string to construct and `words` array to push to.
        this._findAllWords(startingNode, starting, words);
        // Return the words array.
        return words;
    }

    _findAllWords(node, prefix, words) {
        // As long as the node exists.
        if (node) {
            // If the node is an end of the word,
            if (node.isEndofWord) {
                // We push the prefix to the array.
                words.push(prefix);
            }

            // Loop over the children of the the node.
            for (let i = 0; i < node.children.length; i++) {
                // If the node exists.
                if (node.children[i]) {
                    // Recursively call the function on the child, by adding to the prefix.
                    this._findAllWords(node.children[i], prefix + node.children[i].value, words);
                }
            }
        }
    }
}