// deepEqual 
const areArraysOfEqualLength = function (list1, list2) {
  if (!(Array.isArray(list1) && Array.isArray(list2))) {
    return false;
  }

  if (list1.length !== list2.length) {
    return false;
  }

  return true;
};

const deepEqual = function (list1, list2) {
  if (!areArraysOfEqualLength(list1, list2)) {
    return list1 === list2;
  }

  for (let index = 0; index < list1.length; index++) {
    if (!deepEqual(list1[index], list2[index])) {
      return false;
    }
  }
  return true;
};

exports.deepEqual = deepEqual;
