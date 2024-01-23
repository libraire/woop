/**
 * name: Random List
 * usage: Select item from list randomly
 * args: No
 **/

function randomList(text) {
    function randomGenerate(min, max) {
      return Math.round(Math.random() * (max - min) + min, 0);
    }
  
    if (text.length == 0) {
      return "Input the text list";
    }

    let array = text.split("\n");
    var index = randomGenerate(0,array.length)
    return array[index]
  }
  