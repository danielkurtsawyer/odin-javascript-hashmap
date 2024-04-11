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
    
  }

  //  takes one argument as a key and returns the value that is assigned to this key. If a key is not found, return null
  get(key){

  }

  // takes a key as an argument and returns true or false based on whether or not the key is in the hash map
  has(key){

  }

  // takes a key as an argument. If the given key is in the hash map, 
  // it should remove the entry with that key and return true. 
  // If the key isn’t in the hash map, it should return false.
  remove(key){

  }

  // returns the number of stored keys in the hash map
  length(){

  }

  // removes all entries in the hash map
  clear(){

  }

  // returns an array containing all the keys inside the hash map
  keys(){

  }

  // returns an array containing all the values
  values(){

  }

  // returns an array that contains each key, value pair. Example: [[firstKey, firstValue], [secondKey, secondValue]]
  entries(){

  }
}