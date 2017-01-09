var HashMap = function(initialCapacity) {
  this.length = 0;
  this._slots = [];
  this._deleted = 0;
  this._capacity = initialCapacity || 8;
}
HashMap.MAX_LOAD_RATIO = .9;
HashMap.SIZE_RATIO = 3;

HashMap._hashString = function(string) {
  var hash = 5381;
  for (var i=0; i<string.length; i++) {
    hash = (hash << 5) + hash + string.charCodeAt(i);
    hash = hash & hash;
  }
  return hash >>> 0;
}

HashMap.prototype.get = function(key) {
  var index = this._findSlot(key); 

  if (this._slots[index] === undefined) {
    throw new Error ("Key error");
  }

  return this._slots[index].value; 
}

HashMap.prototype.set = function(key, value) {
  var loadRatio = (this.length + this._deleted + 1) / this._capacity; 

  if (loadRatio > HashMap.MAX_LOAD_RATIO) {
    this._resize(this._capacity * HashMap.SIZE_RATIO)
  }

  var index = this._findSlot(key);

  this._slots[index] = {
    key,
    value, 
    deleted: false
  }

  this.length++; 
}

