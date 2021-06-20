function lastDigit(as) {
  if (as.length == 0) return 1;
  if (as.length == 1) return as[0] % 10;
  
  // Since it is just the first digit times itself over and over, we get the 
  // last digit of the first number and apply the pattern
  let digit = as[0] < 20 ? as[0] : as[0] % 20 + 20;
  let r = rotations(as.slice(1));
  
  return Math.pow(digit, r < 4 ? r : r % 4 + 4) % 10
}

// Get the number of 'rotations' caused by some array recursively
function rotations(as) {
  // Get the first digit 
  let digit = as[0] < 20 ? as[0] : as[0] % 20 + 20;
  
  // Base case: the array only has 1 element, return a smaller version
  if(as.length == 1) return digit;

  // and get the number of rotations caused by the rest of the array
  let r = rotations(as.slice(1));

  // Then return an equivalent power that is the result of digit ^ r
  return Math.pow(digit, r < 4 ? r : r % 4 + 4)
}