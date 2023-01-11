import React from 'react';
import ExerciseList from '../components/ExerciseList';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Image from '../image.js';

function HomePage({ setExercise }) {
    // Use the history for updating
    const history = useHistory();

    // Use state to bring in the data
    const [exercises, setExercises] = useState([]);
    // "exercises" - state variable.

    // RETRIEVE the list of movies - GOES INTO TABLE???
    const loadExercises = async () => {
        const response = await fetch('/exercises');
        // fetching from the REST endpoint
        // once the promise resolves, we get a response object which is apart of the fetch api - not apart of express.
        const exercises = await response.json();
        // returns the body of a json object - returned by rest api?
        setExercises(exercises);
    } 
    

    // UPDATE a movie
    const onEditExercise = async exercise => {
        setExercise(exercise);
        history.push("/edit-exercise");
    }


    // DELETE a movie  
    const onDeleteExercise = async _id => {
        const response = await fetch(`/exercises/${_id}`, { method: 'DELETE' });
        if (response.status === 204) {
            const result = await fetch('/exercises');
            const exercises = await result.json();
            setExercises(exercises);
        } else {
            console.error(`Failed to delete exercise with _id = ${_id}, status code = ${response.status}`)
        }
    }

    // LOAD the movies
    useEffect(() => {
        loadExercises();
    }, []);

    // DISPLAY the movies
    return (
        <>
            <article>
                <h2>Your Progress:</h2>
                <p>This page will display the exercise progress of the user.
                    The first column of the table will allow the user to edit their log.
                    The following columns will record details of the exercise completed. 
                    The final column will allow the user to delete the inserted row of information.
                </p>
                <Image/>
                <ExerciseList 
                    exercises={exercises} 
                    onEdit={onEditExercise} 
                    onDelete={onDeleteExercise} 
                />
            </article>
        </>
    );
}

export default HomePage;