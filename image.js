import React from 'react';
import exercise from './components/photo/exercise.jpg';


function Image() {
    console.log(exercise);
    return (
        <div className='image'>
            <img src={exercise} alt="Running" height={200} width={200} />
        </div>
    );
}

export default Image;
