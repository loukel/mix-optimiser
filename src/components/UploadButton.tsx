import { useEffect, useRef, useState } from "react";

const UploadButton = () => {
  var jsmediatags = (window as any).jsmediatags;
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
      for (let i = 0; i < files.length; i++) {
        console.log(jsmediatags.read(files[i], {
          onSuccess: function(tag: any) {
            console.log(tag);
          },
          onError: function(error: any) {
            console.log(error);
          }
        }));
      }
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