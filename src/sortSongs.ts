import { Song } from "./types";
import { camelotKeys } from "./utils/harmonicGraph";

// ['Bbm', 'Fm', 'Abm', 'Abm', 'Dbm', 'Am', 'Fm', 'Eb', 'Em', 'F#m', 'F', 'Cm']

const sortSongs = (songs: Song[]) => {
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
  // h: harmonic
  // k: key

  let hk1: string = camelotKeys.get(k1) || "";
  let hk2: string = camelotKeys.get(k2) || "";
  if (hk1 === hk2) return 0;

  const letterMap: Map<string, number> = new Map([
    ["A", 0],
    ["B", 1],
  ]);

  console.log(letterMap.get(hk1.slice(-1)))
  const hk1x: number = parseInt(hk1.slice(0, -1));
  const hk1y: number = letterMap.get(hk1.slice(-1))!;
  const hk2x: number = parseInt(hk2.slice(0, -1));
  const hk2y: number = letterMap.get(hk2.slice(-1))!;

  if (hk1y === -1 || hk2y === -1) throw new Error("Invalid key");

  const x: number = hk1x - hk2x;
  const y: number = hk1y - hk2y;

  return Math.sqrt(x*x + y*y);
}



export default sortSongs;