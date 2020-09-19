import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({ imageURL, boundingBox }) => {
    return (
        <div className='ma' style={{ display: 'flex', justifyContent: 'center' }}>
            <div className='absolute mt2'>
                <img id='inputimage' alt='' src={imageURL} width='500' height='auto' />
                <div className='bounding-box'
                    style={{ top: boundingBox.topRow, bottom: boundingBox.bottomRow, left: boundingBox.leftCol, right: boundingBox.rightCol }}>
                </div>
            </div>
        </div>
    );
}

export default FaceRecognition;