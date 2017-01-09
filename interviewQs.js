// Write an algorithm to check whether any permutation of a string is a palindrome (a string which reads the same forwards and backwards). For example, "madam", "amadm" and "cllci" should all return true, whereas "caabl" and "aaxxis" should return false.

// convert each character in the string into a a key value pair in the object ({"h": 1, "e": 2, etc.)
// then we can loop through
// - set odd = 0, every time a value is odd then odd++
// - if more than 1 odd value, then return false
// - return true if it doesn't fulfill conditional

const palindrome = (string) => {
  const obj = {};
  let odd = 0;
  for (var i = 0; i<string.length; i++) {
    let word = string[i];
    if (obj[word] === undefined) {
      obj[word] = 1;
    }
    else {
      obj[word]++;
    }
  } console.log(obj)
  for (var key in obj) {
    if (obj[key] % 2 !== 0) {
      odd++;
    }
    if (odd > 1) {
      return false;
    }
  }
  return true;

}
 palindrome('shjdkbkhwb')

//Write an algorithm to group a list of words into anagrams.
//For example, if the input was ['east', 'cars', 'acre', 'arcs', 'teas', 'eats', 'race'],
//the output should be: [['east', 'teas', 'eats'], ['cars', 'arcs'], ['acre', 'race']].

var swap = function (array, pos1, pos2) {
  var temp = array[pos1];
  array[pos1] = array[pos2];
  array[pos2] = temp;

};

var results = [];

function heapsPermute (array, n) {
  n = n || array.length; // set n default to array.length
  if (n === 1) {
    var joined = array.join("");
    results.push(joined);
    return results;
  } else {
    for (var i = 1; i <= n; i++) {

      heapsPermute(array, n - 1);
      if (n % 2) {
        var j = 1;
      } else {
        var j = i;
      }
      swap(array, j - 1, n - 1); // -1 to account for javascript zero-indexing
    }
  }
}

const groupAnagrams = array => {
  let originalMap = {};
  let permutations;
  let input;
  let temp = [];
  let finalResults = [];

  array.forEach(function (word) {
    originalMap[word] = 0;
  });


  for (var i = 0; i<array.length; i++) {
    let word = array[i];
    temp = [];
    results = [];
    if (originalMap[word] === 0) {
      input = array[i].split("");
      heapsPermute(input);
      permutations = results;

      for (var key in originalMap) {
        if (permutations.includes(key)) {
          originalMap[key] = 1;
          temp.push(key);
        }
      }
      finalResults.push(temp);
    }
  }

  return finalResults;

}

groupAnagrams(['east', 'cars', 'acre', 'arcs', 'teas', 'eats', 'race']);
