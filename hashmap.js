import {Node, LinkedList} from './linkedlists.js';

class HashMap{
  constructor(){
    this._capacity = 16; 
    this._loadFactor = .75;
    this._keys = 0;
    this._buckets = [];

    // initialize the starting buckets array with empty linked lists
    for(let i = 0; i < this._capacity; i++){
      this._buckets[i] = new LinkedList();
    }
  }

  hash(key) {
    let hashCode = 0;
       
    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this._capacity;
    }
 
    return hashCode;
  } 

  // takes two arguments, the first is a key and the second is a value that is assigned to this key
  set(key, value){
    // process the key into a hashCode number
    const hashCode = this.hash(key);

    // if it is a new key, then we will add a new node
    if(!this.has(key)){
      // add the key-value pair to the bucket's linked list
      this._buckets[hashCode].append(key, value);
      // increment the number of keys stored in the hashMap
      this._keys++;
    } else{
      // if we are overwriting an existing key, then we will simply update the value attribute of the node containing that key
      this._buckets[hashCode].updateValue(key, value);
      // keys don't need to be updated because we aren't adding a new node
    }

    // check to see if the load factor threshold has been surpassed
    if(this._keys / this._capacity > this._loadFactor){
      // if the load factor has been surpassed, then we will grow the buckets array
      console.log(this._keys / this._capacity);
      this.grow();
    }
  }

  // grows the bucket size by a factor of two, redistributing the entries stored in the old buckets array
  grow(){
    // create a new bucket array
    // initalize each index as an empty linked list - the array will be double the size (2*capacity)
    const newBuckets = [];
    // initialize the starting buckets array with empty linked lists
    for(let i = 0; i < this._capacity*2; i++){
      newBuckets[i] = new LinkedList();
    }

    // retrieve all the key-value pairs with entries()
    const entries = this.entries();

    // now that we have the entries, set the buckets for the hashmap object to the new, twice as large, empty buckets array
    this._buckets = newBuckets;
    // set the new capacity to double the old capacity
    this._capacity *= 2;
    // since we are now adding back to an empty list double the length, set keys back to 0 
    // if we don't do this, then our calculation when comparing the load factor will be faulty and result in unneccesary growth
    this._keys = 0;

    // iterate through the array of key-value pairs
    entries.forEach((entry) => {
      // set the key value pairs in the new buckets array
      // entries are stored as [key, value]
      this.set(entry[0], entry[1])
    })
  } 


  //  takes one argument as a key and returns the value that is assigned to this key. If a key is not found, return null
  get(key){
    return this._buckets[this.hash(key)].getValue(key);
  }

  // takes a key as an argument and returns true or false based on whether or not the key is in the hash map
  has(key){
    return this._buckets[this.hash(key)].contains(key);
  }

  // takes a key as an argument. If the given key is in the hash map, 
  // it should remove the entry with that key and return true. 
  // If the key isn’t in the hash map, it should return false.
  remove(key){
    const removedNode = this._buckets[this.hash(key)].remove(key);
    // the linked list remove() function returns the node, or null if the key is not found
    if(removedNode){
      // if we got a node removed, decrement the number of keys
      this._keys--;
      // return true for success
      return true;
    } else{
      // if we got null, then the removal was unsuccessful
      return false;
    }
  }

  // returns the number of stored keys in the hash map
  length(){
    return this._keys;
  }

  // removes all entries in the hash map
  clear(){
    // get a list of all the keys
    const keys = this.keys();
    // remove each key
    keys.forEach((key) => this.remove(key));
  }

  // returns an array containing all the keys inside the hash map
  keys(){
    const keys = [];
    this._buckets.forEach((list) => keys.push(...list.keys()));
    return keys;
  }

  // returns an array containing all the values
  values(){
    const values = [];
    this._buckets.forEach((list) => values.push(...list.values()));
    return values;
  }

  // returns an array that contains each key, value pair. Example: [[firstKey, firstValue], [secondKey, secondValue]]
  entries(){
    const keys = this.keys();
    const values = this.values();
    const entries = [];
    for(let i = 0; i<keys.length; i++){
      entries.push([keys[i], values[i]]);
    }
    return entries;
  }
}

const map = new HashMap();
map.set('firstName', 'Daniel');
console.log(map.length());
console.log(map._buckets);

map.set('lastName', 'Sawyer');
console.log(map.length());
console.log(map._buckets);

console.log(map.get('firstName'));
console.log(map.get('lastName'));
console.log(map.get('middleName'));

console.log(map.has('firstName'));
console.log(map.has('lastName'));
console.log(map.has('middleName'));

map.set('lastName', 'Kurt');
console.log(map.length());
console.log(map._buckets);

map.remove('lastName');
console.log(map.length());
console.log(map._buckets);

map.set('lastName', 'Sawyer');
map.set('middleName', 'Kurt');
console.log(map.keys());
console.log(map.values());
console.log(map.entries());
map.clear();
console.log(map.entries());


// testing bucket growth
for(let i = 0; i < 12; i++){
  map.set(`key${i}`, `value${i}`);
}

console.log(map._capacity);
console.log(map._buckets);

map.set('key12', 'value12');
console.log(map._capacity);
console.log(map._buckets);
console.log(map.entries());

map.clear();
console.log(map.entries());