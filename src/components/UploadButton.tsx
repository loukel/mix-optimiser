import { useEffect, useRef, useState } from "react";

const UploadButton = () => {
  const ref = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<FileList | null>(null);

  useEffect(() => {
    if (ref.current !== null) {
      ref.current.setAttribute("directory", "");
      ref.current.setAttribute("webkitdirectory", "");
    }
  }, [ref])

  useEffect(() => {
    if (files !== null) {
      console.log(files);
    };
  }, [files])


  return ( 
    <>
      <input id='file-upload' type='file' hidden onChange={e => setFiles(e.target.files)} multiple ref={ref} />
      <button 
        className="btn btn-primary" 
        onClick={() => document.getElementById('file-upload')?.click()}
      >
        Upload
      </button>
    </>
  );
}
 
export default UploadButton;