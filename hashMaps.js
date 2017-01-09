var HashMap = function(initialCapacity) {
    this.length = 0;
    this._slots = [];
    this._capacity = initialCapacity || 8;
    this._deleted = 0;
};
HashMap.MAX_LOAD_RATIO = 0.9;
HashMap.SIZE_RATIO = 3;

HashMap._hashString = function(string) {
    var hash = 5381;
    for (var i=0; i<string.length; i++) {
        hash = (hash << 5) + hash + string.charCodeAt(i);
        hash = hash & hash;
    }
    return hash >>> 0;
};

HashMap.prototype.get = function(key) {
  var index = this._findSlot(key);
  if (this._slots[index] === undefined) {
    throw new Error('Key error');
  }
  return this._slots[index].value;
}

HashMap.prototype.set = function(key, value) {
  var loadRatio = (this.length + this._deleted + 1) / this._capacity;
  if (loadRatio > HashMap.MAX_LOAD_RATIO) {
    this._resize(this._capacity * HashMap.SIZE_RATIO);
  }

  var index = this._findSlot(key);
  // once we find a valid index, we set the properties, then
  // increase length of array by 1
  this._slots[index] = {
    key: key,
    value: value,
    deleted: false
  };
  this.length++;
};

HashMap.prototype.remove = function(key) {
  var index = this._findSlot(key);
  var slot = this._slots[index];
  if (slot === undefined) {
    throw new Error('Key error');
  }
  slot.deleted = true;
  this.length--;
  this._deleted++;
};

HashMap.prototype._findSlot = function(key) {
  // Gives you the unique hashed integer
  var hash = HashMap._hashString(key);
  // Gives you starting place
  var start = hash % this._capacity; //5381 % 8 = 5

  for (var i = start; i<start +this._capacity; i++) {
    var index = i % this._capacity;
    var slot = this._slots[index];
    if (slot === undefined || slot.key == key) {
      return index;
    }
  }
}

HashMap.prototype._resize = function(size) {
  var oldSlots = this._slots;
  this._capacity = size;

  //Reset the length - it will get rebuilt as you add the items
  this.length = 0;
  this._deleted = 0;
  this._slots = [];
  for (var i=0; i<oldSlots.length; i++) {
    var slot = oldSlots[i];
    if (slot !== undefined) {
      this.set(slot.key, slot.value);
    }
  }
};


var myHash = new HashMap(10);
myHash.set("name", "Megan");
myHash.set("name", "Carlo");
myHash.set("city", "San Francisco");
myHash.remove("name");
myHash.remove("name");
console.log(myHash);
;
