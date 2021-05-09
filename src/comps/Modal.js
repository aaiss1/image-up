import React from 'react';
import { motion } from 'framer-motion';
import useFirestore from '../hooks/useFirestore';

const Modal = ({ selectedImg, setSelectedImg }) => {

    const { docs } = useFirestore('images');
    let labels = [];

    docs.forEach(doc => {
        if(doc.url === selectedImg) {
            labels = doc.labels;
            labels = labels.join(", ");
        }
    })

    console.log("Hi", selectedImg)
    const handleClick = (e) => {
        if(e.target.classList.contains('backdrop')) {
            setSelectedImg(null);
        }
    }

    return (
        <motion.div className="backdrop" onClick={handleClick}
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
        >
            <motion.img src={selectedImg} alt="full size" 
             initial={{ y: "-100vh" }}
             animate={{ y: 0 }}
            />

            {<motion.p
            initial={{ y: "-100vh" }}
            animate={{ y: 0 }}
            >Labels: {labels}</motion.p>}

        </motion.div>
    )

}

export default Modal;