import React from 'react';
import { useHistory } from "react-router-dom";
import { useState } from 'react';

export const EditExercisePage = ({ exercise }) => {
    
    const [name, setName]       = useState(exercise.name);
    const [reps, setReps]         = useState(exercise.reps);
    const [weight, setWeight] = useState(exercise.weight);
    const [unit, setUnit] = useState(exercise.unit);
    const [date, setDate] = useState(exercise.date.toLocaleString("en-US").substring(0,10));
    
    const history = useHistory();

    const editExercise = async () => {
        const response = await fetch(`/exercises/${exercise._id}`, {
            method: 'PUT',
            body: JSON.stringify({ 
                name: name, 
                reps: reps, 
                weight: weight,
                unit: unit,
                date: date,
            }),
            headers: {'Content-Type': 'application/json',},
        });

        if (response.status === 200) {
            alert("Successfully edited the Excerise!");
        } else {
            const error = await response.json();
            alert(`Failed to update Exercise. Status Code: ${response.status}. ${error.Error}`);
        }
        history.push("/");
    }

    return (
        <>
        <article>
            <h2>Edit Your Exercise Progress:</h2>
            <p>This is a page to edit your previous logs in the case you made an error when recording your accomplisment on the Create Page. 
                You'll be able to edit all the inputs: Name, Reps, Weight, Unit, and Date if needed. 
                The update will not happen if you keep the information the same.</p>
            <form onSubmit={(e) => { e.preventDefault();}}>
                <fieldset>
                    <legend>New Exercise Log?</legend>
                    <label for="name">Exercise Name</label>
                    <input
                        type="text" required
                        value={name}
                        onChange={e => setName(e.target.value)} 
                        id="name" 
                        minLength="1"/>
                    
                    <label for="reps">Reps</label>
                    <input
                        type="number" required
                        value={reps}
                        onChange={e => setReps(e.target.value)} 
                        id="reps"
                        min="1" />

                    <label for="weight">Weights Used</label>
                    <input
                        type="number" required
                        value={weight}
                        onChange={e => setWeight(e.target.value)} 
                        id="weight"
                        min="1" />
                    
                    <label for="unit">Unit:</label>
                    <select 
                    type="text" required
                    value={unit}
                    onChange={e => setUnit(e.target.value)} 
                    id="unit"
                    >
                        <option value="kgs">kgs</option>
                        <option value="lbs">lbs</option>
                        <option value="miles">miles</option>
                        <option value="other">other</option>
                        <option value="no unit">no unit</option>
                    </select>

                    <label for="date">Date</label>
                    <input
                        type="date" required
                        value={date}
                        onChange={e => setDate(e.target.value)} 
                        id="date" />
                
                    <label for="submit">
                    <button
                        onClick={editExercise}
                        id="submit"
                    >Update New Info!</button></label>
                </fieldset>
                </form>
            </article>
        </>
    );
}
export default EditExercisePage;