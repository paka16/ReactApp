import React, { useState } from 'react';
import { useHistory } from "react-router-dom";

export const CreateExercisePage = () => {
    // state variables

    const [name, setName]       = useState('');
    const [reps, setReps]         = useState('');
    const [weight, setWeight] = useState('');
    const [unit, setUnit] = useState('lbs');
    const [date, setDate] = useState('');
    
    const history = useHistory();

    const createExercise = async () => {
        const newExercise = { name, reps, weight, unit, date };
        const response = await fetch('/exercises', {
            method: 'post',
            body: JSON.stringify(newExercise),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if(response.status === 201){
            alert("Successful: New Exercise Was Added!");
        } else {
            alert(`Unsuccessful: Could Not Create New Exercise - Status Code = ${response.status}`);
        }
        history.push("/");
        // this will return the user back to home page "/".
    };


    return (
        <>
        <article>
            <h2>Increase Your Progress!</h2>
            <p>This page is where users will track their exercising progress. 
                They will add the name of the exercise completed, reps, weight, unit used, as well as, date the exercise was completed on.
                The information recorded on this page will appear on the main home page once submitted.</p>
            <form onSubmit={(e) => { e.preventDefault();}}>
                <fieldset>
                    <legend>Which exercise are you adding?</legend>
                    <label for="name">Name of the Exercise:</label>
                    <input
                        type="text" required
                        placeholder="Exercise Name"
                        value={name}
                        onChange={e => setName(e.target.value)} 
                        id="name" 
                        minLength="1"/>
                    
                    <label for="reps">Number of Reps:</label>
                    <input
                        type="number" required
                        value={reps}
                        placeholder="Number of Reps Completed"
                        onChange={e => setReps(e.target.value)} 
                        id="reps" 
                        min="1"/>

                    <label for="weight">Weights Used for Exercise:</label>
                    <input
                        type="number" required
                        placeholder="Weight Used"
                        value={weight}
                        onChange={e => setWeight(e.target.value)} 
                        id="weight" 
                        min="1"/>
                    
                    <label for="unit">Unit:</label>
                    <select 
                    type="text" required
                    placeholder='Unit of Measurement'
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
        

                    <label for="date">Date Completed On:</label>
                    <input
                        type="date" required
                        placeholder="Date Exercise Completed On"
                        value={date}
                        onChange={e => setDate(e.target.value)} 
                        id="date" />

                    <label for="submit">
                    <button
                        type="submit"
                        onClick={createExercise}
                        id="submit"
                    >Create!</button></label>
                </fieldset>
                </form>
            </article>
        </>
    );
}

export default CreateExercisePage;