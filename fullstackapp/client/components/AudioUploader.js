import React, { useState } from 'react';
import './AudioUploader.module.css';

const AudioUploader = () => {
    const [audioFile, setAudioFile] = useState(null);

    const handleFileChange = (e) => {
        setAudioFile(e.target.files[0]);
    };

    const handleUpload = () => {
        // Logic to handle audio file upload
        console.log(audioFile);
    };

    return (
        <div>
            <input type="file" accept="audio/*" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload Audio</button>
        </div>
    );
};

export default AudioUploader;
