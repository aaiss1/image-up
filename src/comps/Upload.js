import React, { useState } from 'react';
import ProgressBar from './ProgressBar';

const UploadForm = () => {
    const [file, setFile] = useState(null);
    const [error, setError] = useState(null);
    const imageTypes = ['image/png', 'image/jpeg'];

    const uploadImage = (e) => {
        
        let image = e.target.files[0];

        if(image && imageTypes.includes(image.type)) {
            setFile(image);
            setError(null);
        } else {
            setFile(null);
            setError("Please select an image file (png or jpeg).");
        }
    }

    return (
      <form>
          <label>
            <input type="file" onChange={uploadImage} />
            <span>+</span>
          </label>
          <div className="output">
              { error && <div className="error">{ error }</div> }
              { file && <div>{ file.name }</div>}
              { file && <ProgressBar file={ file } setFile={ setFile } /> }
          </div>
      </form>  
    )
}

export default UploadForm;