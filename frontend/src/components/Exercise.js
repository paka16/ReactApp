import React from 'react';
import { VscError, VscWand } from "react-icons/vsc";

function Exercise({ exercise, onEdit, onDelete }) {
    return (
        <tr>
            <td><VscWand onClick={() => onEdit(exercise)} /></td>
            <td>{exercise.name}</td>
            <td>{exercise.reps}</td>
            <td>{exercise.weight}</td>
            <td>{exercise.unit}</td>
            <td>{exercise.date.substring(0,10)}</td>
            <td> <VscError onClick={() => onDelete(exercise._id)} /></td>
            
            
        </tr>
    );
}

export default Exercise;