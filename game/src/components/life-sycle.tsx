/**
 * rules
 * 誕生
 * 死んでいるセルに隣接する生きたセルがちょうど3つあれば、次の世代が誕生する。
 * 生存
 * 生きているセルに隣接する生きたセルが2つか3つならば、次の世代でも生存する。
 * 過疎
 * 生きているセルに隣接する生きたセルが1つ以下ならば、過疎により死滅する。
 * 過密
 * 生きているセルに隣接する生きたセルが4つ以上ならば、過密により死滅する。
 */
export function next(
  lives: boolean[][],
  rowPosition: number,
  columnPosition: number
) {
  const isLive = lives[rowPosition][columnPosition];
  const neighbors = getNeighbors(lives, rowPosition, columnPosition);
  if (isLive) {
    // survival
    const liveNeighbors = neighbors.filter((n) => n).length;
    if (liveNeighbors === 2 || liveNeighbors === 3) {
      return true;
    }

    // underpopulation
    if (liveNeighbors <= 1) {
      return false;
    }

    // overpopulation
    if (liveNeighbors >= 4) {
      return false;
    }
  }
  return neighbors.filter((n) => n).length === 3;
}

function getNeighbors(
  lives: boolean[][],
  rowPosition: number,
  columnPosition: number
): boolean[] {
  const neighbors: boolean[] = [];
  for (let i = rowPosition - 1; i <= rowPosition + 1; i++) {
    for (let j = columnPosition - 1; j <= columnPosition + 1; j++) {
      if (i === rowPosition && j === columnPosition) {
        continue;
      }
      if (i < 0 || i >= lives.length) {
        continue;
      }
      if (j < 0 || j >= lives[i].length) {
        continue;
      }
      neighbors.push(lives[i][j]);
    }
  }
  return neighbors;
}
