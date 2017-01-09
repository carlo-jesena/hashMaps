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
