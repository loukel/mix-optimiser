import album from '../assets/portals.png';

interface SongProps {
  name: string;
  artists: string;
  bpm: number;
  songKey: string;
}

const Song = ({ name, artists, bpm, songKey }: SongProps) => {
  return ( 
    <div className="card bg-base-100 h-20 flex-row p-2 rounded-none shadow-xl mb-6 last:mb-0">
      <img src={album} className="m-0" />
      <div className="flex flex-col ml-4 grow text-left my-auto">
        <div>{name}</div>
        <div>{artists}</div>
      </div>
      <div className="flex flex-col ml-4 float-right w-16 my-auto">
        <div>{songKey}</div>
        <div>{bpm}bpm</div>
      </div>
    </div>
  )
}
 
export default Song;