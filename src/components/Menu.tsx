import OptimiseButton from './OptimiseButton';
import UploadButton from './UploadButton'

const Menu = () => {
  return ( 
    <div className="container flex justify-between w-52 mb-8">
      <UploadButton />
      <OptimiseButton />
    </div>
  );
}
 
export default Menu;