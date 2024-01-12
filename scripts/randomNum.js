/**
 * name: Random Number
 * usage: Current timestamp
 * args: No
 **/

function randomNum(text) {
  function randomGenerate(min, max) {
    return Math.round(Math.random() * (max - min) + min, 0);
  }

  if (text.length == 0) {
    return "Input the random range ${min}-${max}, e.g. 0-100";
  }

  const rangeArr = text.split("-");
  var min = +rangeArr[0];
  var max = +rangeArr[1];

  if (isNaN(min)) min = 0;
  if (isNaN(max)) max = 1000000;

  return randomGenerate(min, max);
}
