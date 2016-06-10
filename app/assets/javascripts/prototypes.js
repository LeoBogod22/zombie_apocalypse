String.prototype.capitalize = function () {
  return this[0].toUpperCase() + this.slice(1);
};

Array.prototype.swapAt = function (index1, index2) {
  if (index2 === undefined) {
    index2 = this.length - 1;
  }

  var elementAtIndex1 = this[index1];
  this[index1] = this[index2];
  this[index2] = elementAtIndex1;
  return this;
};
