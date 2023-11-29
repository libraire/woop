/**
 * name: EditDistance
 * usage: Count the minimum edit distance of two words
 * args: No
 **/

function editDistance(text) {
  let array = text.split("\n");
  if (array.length !== 2) {
    return "Need two lines of word";
  }
  const minDistance = function (word1, word2) {
    let j;
    let i;
    const rlen = word2.length + 1;
    const clen = word1.length + 1;
    let dp = new Array(rlen)
      .fill(Number.MAX_SAFE_INTEGER)
      .map((_) => new Array(clen).fill(Number.MAX_SAFE_INTEGER));

    for (i = 0; i < rlen; i++) {
      dp[i][0] = i;
    }

    for (j = 0; j < clen; j++) {
      dp[0][j] = j;
    }

    for (i = 1; i < rlen; i++) {
      for (j = 1; j < clen; j++) {
        const del = 1 + dp[i - 1][j];
        let add = 1 + dp[i][j - 1];
        let rep = 1 + dp[i - 1][j - 1];
        let min = Math.min(Math.min(del, add), rep);
        if (word2[i - 1] === word1[j - 1]) {
          dp[i][j] = Math.min(min, dp[i - 1][j - 1]);
        } else {
          dp[i][j] = min;
        }
      }
    }
    return dp[rlen - 1][clen - 1];
  };

  return "Edit Distance is :" + minDistance(array[0], array[1]);
}
