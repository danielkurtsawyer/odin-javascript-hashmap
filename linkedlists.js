// Nodes to store key-value pairs

class Node {
  constructor(key = null, value = null, nextNode = null){
    this._key = key;
    this._value = value;
    this._nextNode = nextNode;
  }

  get key(){
    return this._key;
  }

  get value() {
    return this._value;
  }

  get nextNode() {
    return this._nextNode;
  }

  set value(newValue) {
    this._value = newValue;
  }

  set nextNode(newNextNode){
    this._nextNode = newNextNode;
  }
}

class LinkedList {
  constructor(){
    this._head = null;
    this._tail = null;
    this._size = 0;
  }

  // adds a new node containing the key-value pair to the end of the list
  append(key, value) {
    // create a new Node with the value
    const node = new Node(key, value);
    // if the list is empty, set the head and the tail to the new node
    if(this._head === null){
      this._head = node;
      this._tail = node;
    } else {
      // if it's not empty
      // set the new node to be the next node of the old tail,
      this._tail.nextNode = node;
      // and then set the tail to be the new node
      this._tail = node;
    }
    
    // increment size
    this._size++;
  }

  // adds a new node containing the key-value pair to the start of the list
  prepend(key, value) {
    // create a new Node with the value
    const node = new Node(key, value);

    // if the list is empty, set the head and the tail to the new node
    if(this._head === null){
      this._head = node;
      this._tail = node;
    } else {
      // if it's not empty
      // set the current head to be the next node of the new node,
      node.nextNode = this._head;
      // and then set the head to be the new node
      this._head = node;
    }
    
    // increment size
    this._size++;
  }

  // returns the total number of nodes in the list
  get size() {
    return this._size;
  }

  // returns the first node in the list
  get head(){
    return this._head;
  }

  // returns the last node in the list
  get tail(){
    return this._tail;
  }

  // returns the node at the given index
  at(index) {
    if(index < 0 || index >=this._size){
      return null;
    } else {
      let n = 0;
      let tempNode = this._head;

      while(n < index){
        // move forward to the next node, which is at index 1
        tempNode = tempNode.nextNode;
        // increment counter
        n++;
      }

      // when the loop exits, n will be equal to the index we're looking for
      //      tempNode will also contain the node at that index
      // so we can just return tempNode
      return tempNode;
    }
  }

  // removes the last element from the list
  pop() {
    // case if there's nothing in the list
    if(this._size === 0){
      return null;
      // case if there's only one node in the list
    } else if(this._size === 1){
      // save the old head before removing it
      const tempNode = this._head;
      this._head = null;
      this._tail = null;
      this._size--;
      return tempNode;
      // 2 or more nodes
    } else {
      // save the old tail
      const tempNode = this._tail;
      // remove the old tail by unlinking it from the second to last node
      const newTail = this.at(this._size-2);
      newTail.nextNode = null;
      // make the second to last node the new tail
      this._tail = newTail;
      // decrement size
      this._size--;
      // return the old tail
      return tempNode;
    }
  }
  
  // returns true if the passed in key is in the list and otherwise returns false
  contains(key){
    // iterate throught the list and check each node's value attribute
    if(this._size === 0){
      // if there's nothing in the list, return false
      return false;
    } else {
      // create a temp variable to hold the pointer to the current node 
      let tempNode = this._head;
      // iterate through the links until move past the tail
      while(tempNode != null){
        // if the value held by the node matches the method argument, return true
        if(key === tempNode.key){
          return true;
        }
        // move to next node
        tempNode = tempNode.nextNode;
      }
      // if we make it here, the value was not found, so return false
      return false;
    }
  }

  // returns the value of the node containing key, or null if not found
  getValue(key){
     // iterate throught the list and check each node's value attribute
     if(this._size === 0){
      // if there's nothing in the list, return null
      return null;
    } else {
      // create a temp variable to hold the pointer to the current node 
      let tempNode = this._head;
      let index = 0;
      // iterate through the links until move past the tail
      while(tempNode != null){
        // if the key held by the node matches the method argument, return the index
        if(key === tempNode.key){
          return tempNode.value;
        }
        // move to next node
        tempNode = tempNode.nextNode;
        // increment index
        index++;
      }
      // if we make it here, the value was not found, so return null
      return null;
    }
  }

  // returns the index of the key in the linked list, or null if not found
  getIndex(key){
    // iterate throught the list and check each node's value attribute
    if(this._size === 0){
      // if there's nothing in the list, return null
      return null;
    } else {
      // create a temp variable to hold the pointer to the current node 
      let tempNode = this._head;
      let index = 0;
      // iterate through the links until move past the tail
      while(tempNode != null){
        // if the key held by the node matches the method argument, return the index
        if(key === tempNode.key){
          return index;
        }
        // move to next node
        tempNode = tempNode.nextNode;
        // increment index
        index++;
      }
      // if we make it here, the value was not found, so return null
      return null;
    }
  }

  // removes the node containing the key from the linked list
  // returns the node if successful
  // returns null if not found
  remove(key){
    // find the key's index
    const index = this.getIndex(key);
    // if an index is found, remove that index
    if(index){
      return this.removeAt(index);
      // else, return null
    } else {
      return null;
    }
  }

  // represents linked list objects as strings
  toString(){
    let string = '';
    if(this._size === 0){
      return 'null';
    } else {
      let tempNode = this._head;
      while(tempNode != null){
        string = string.concat(`( ${tempNode.value} ) -> `);
        tempNode = tempNode.nextNode;
      }
      return string.concat('null');
    }
  }

  // inserts a new node with the provided value at the given index
  insertAt(key, value, index){
    if(index < 0 || index>this._size){
      return
    }
 
    if(index === 0){
      this.prepend(key, value)
    } else if(index === this._size){
      this.append(key, value);
    } else {
      let currentNode = this._head;
      let previousNode = null;
      let n = 0;
      while(n < index){
        currentNode = currentNode.nextNode;
        if(n === 0){
          previousNode = this._head;
        } else {
          previousNode = previousNode.nextNode;
        }
        n++;
      }
      // at this point currentNode is set to the desired index to be inserted at
      // create a new node to be added, setting its next Node to be the currentNode
      const newNode = new Node(key, value, currentNode);
      // set the previousNode's nextNode to the newNode to complete the insertion
      previousNode.nextNode = newNode;
      // increment size
      this._size++;
    }
  }

  // removes the node at the given index
  removeAt(index){
    if(index < 0 || index > this._size - 1){
      console.log('not valid index');
      return null;
    }

    if(index === this._size-1){
      // if it's the last index, just use the pop method
      return this.pop();
    }
    else if(index === 0){
      // if it's the first index, removal logic isn't as complicated
      // only need to change the head to the second node
      const tempNode = this._head;
      this._head = this._head.nextNode;
      return tempNode;
    } else {
        // variables to hold node references
        let currentNode = this._head;
        let previousNode = null;
        // variable to track node index
        let n = 0;
        while(n < index){
          currentNode = currentNode.nextNode;
          if(n === 0){
            previousNode = this._head;
          } else {
            previousNode = previousNode.nextNode;
          }
          n++;
        }
        // at this point currentNode is set to the desired index to be deleted 
        // in order to delete the currentNode, we will set the previousNode's nextNode attribute to the currentNode's nextNode attribute
        // set the previousNode's nextNode to the newNode to complete the insertion
        previousNode.nextNode = currentNode.nextNode;
        return currentNode;
      }
   }

   // returns true if the linked list is empty
   isEmpty(){
    return this._size === 0;
   }
}

export {Node, LinkedList};