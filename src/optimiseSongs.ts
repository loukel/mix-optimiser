import { Song } from "./types";
import { camelotKeys } from "./utils/harmonicGraph";

// ['Bbm', 'Fm', 'Abm', 'Abm', 'Dbm', 'Am', 'Fm', 'Eb', 'Em', 'F#m', 'F', 'Cm']

const optimiseSongs = (songs: Song[]) => {
  const n = songs.length;
  let songMap: { [id: string]: [[id: string, distance :number]?] } = {};
  
  for (let i = 0; i < n; i++) {
    songMap[songs[i].id] = [];
  }

  for (let i = n-1; i > 0; i--) {
    for (let j = 0; j < i; j++) {
      const keyDistance: number = compareSongs(songs[i].key, songs[j].key);
      songMap[songs[i].id].push([songs[j].id, keyDistance]);
      songMap[songs[j].id].push([songs[i].id, keyDistance])
    }
  }
  return songMap;
};

const compareSongs = (k1: string, k2: string) => {
  // k: key
  // c: camelot (key has been converted to camelot)

  let ck1: string = camelotKeys.get(k1) || "";
  let ck2: string = camelotKeys.get(k2) || "";
  if (ck1 === ck2) return 0;

  const letterMap: Map<string, number> = new Map([
    ["A", 0],
    ["B", 1],
  ]);

  const ck1x: number = parseInt(ck1.slice(0, -1));
  const ck1y: number = letterMap.get(ck1.slice(-1))!;
  const ck2x: number = parseInt(ck2.slice(0, -1));
  const ck2y: number = letterMap.get(ck2.slice(-1))!;

  const x: number = ck1x - ck2x;
  const y: number = ck1y - ck2y;

  return Math.sqrt(x*x + y*y);
}



export default optimiseSongs;