import { useState, useEffect } from 'react';
import { firebaseFirestore } from '../firebase/config';

const useFirestore = (collection) => {
    const [docs, setDocs] = useState([]);

    //every time an image is added, we run this
    useEffect(() => {
        const unsub = firebaseFirestore.collection(collection)
            .orderBy('createdAt', 'desc')
            .onSnapshot((snap) => {
                let docs = [];
                snap.forEach(doc => {
                    docs.push({...doc.data(), id: doc.id})
                })

                setDocs(docs);
            })
        
        return () => unsub();
    }, [collection])

    return { docs };
}

export default useFirestore;