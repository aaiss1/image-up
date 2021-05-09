import { useState, useEffect } from 'react';
import { firebaseStorage, firebaseFirestore, timestamp } from "../firebase/config"
import axios from 'axios';
const port = process.env.PORT || 4000

const useStorage = (image) => {
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState(null);
    const [url, setUrl] = useState(null);

    useEffect(() => {
        //references
        const storageRef = firebaseStorage.ref(image.name);
        const collectionRef = firebaseFirestore.collection('images');

        storageRef.put(image).on('state_changed', (snap) => {
            let uploadPercent = (snap.bytesTransferred / snap.totalBytes) * 100;
            setProgress(uploadPercent);
        }, (err) => {
            setError(err);
        }, async () => {
            const imageUrl = await storageRef.getDownloadURL();
            const createdAt = timestamp();

            let labels = await axios.get('http://localhost:'+port+'/labels', { params: { imageUrl } });
            labels = labels.data;

            collectionRef.add({ url: imageUrl, createdAt, name: image.name, labels })
            setUrl(imageUrl);
        })
    }, [image])

    return { progress, url, error };
}

export default useStorage;