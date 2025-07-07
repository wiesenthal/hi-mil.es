type RankedObject = {
  rank: number;
};

export function byRank<T extends RankedObject>(a: T, b: T) {
  return a.rank - b.rank;
}
