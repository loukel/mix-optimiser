import Song from "./Song";

const SongList = () => {
  return ( 
    <div className="card w-2/4 shadow-xl bg-base-300 rounded-none">
      <Song name="Timewarp (Dimension Remix)" artists="Sub Focus, Dimension" bpm={174} songKey="3A"/>
      <Song name="Timewarp (Dimension Remix)" artists="Sub Focus, Dimension" bpm={174} songKey="3A"/>
    </div>
   );
}
 
export default SongList;