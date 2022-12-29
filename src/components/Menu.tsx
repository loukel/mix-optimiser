import SortButton from './SortButton';
import UploadButton from './UploadButton'

const Menu = () => {
  return ( 
    <div className="container flex justify-between w-52 mb-8">
      <UploadButton />
      <SortButton />
    </div>
  );
}
 
export default Menu;