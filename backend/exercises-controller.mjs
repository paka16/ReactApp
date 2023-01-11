// DO NOT IMPORT MONGOOSE.
import 'dotenv/config';
import express from 'express';
import * as exercises from './exercises-model.mjs';

const PORT = process.env.PORT;
const app = express();
app.use(express.json());

// validator for CREATE and UPDATE - makes sure all the params are there.
const validityChecker = (data) => {
    let valid = false;
    if (data.name !== undefined && typeof data.name === "string"){
        if (data.name.length > 0) {
            valid = true;
        } else {
            valid = false;
        }
    }
    if (data.reps !== undefined && typeof data.reps === "number"){
        if (data.reps > 0){
            valid = true;
        } else {
            valid = false;
        }
    }
    if (data.weight !== undefined && typeof data.weight === "number") {
        if (data.weight > 0) {
            valid = true;
        } else {
            valid = false;
        }
    } if (data.unit !== undefined){
        valid = true;        
    }
    if (data.date !== undefined){
        valid = true;
    }

    return valid;
}

// CREATE - using post - with no params 
app.post ('/exercises', (req,res) => { 
    const valid = validityChecker(req.body)
    if (valid) {
        exercises.createExercise(
            req.body.name, 
            req.body.reps, 
            req.body.weight,
            req.body.unit,
            req.body.date,
            )
            .then(exerciseObject => { 
                res.status(201).json(exerciseObject);
            })
            .catch(error => {
                console.log(error);
                res.status(400).json({ error: 'Invalid Request: Exercise Failed to create due to missing information.' });
            });
    } else {
        res.status(400).json({ error: 'Invalid Request: Exercise Failed to create due to missing information.' });
    }
        
});


// RETRIEVE controller 
// GET movies by ID - ID's the route param.

app.get('/exercises/:_id', (req, res) => {
    const exerciseId = req.params._id; // this is the id.
    exercises.findExerciseById(exerciseId)
        .then(exerciseObject => { 
            if (exerciseObject !== null) { // if the promise is resolved and returned successfully:
                res.status(200).json(exerciseObject);
            } else {
                res.status(404).json('Error 404 - Request Failed - Exercise Not Found.');
            }        
         })
        .catch(error => {
            res.status(404).json({ Error: `Error 404 - Exercise Not Found - ${error}` });
        });
});

// GET exercises filtered by id and collection only - no reps, weight, etc
// with no id, we can just return the whole collection.
app.get('/exercises', (req, res) => {
    let filter = {}; // should be empty for whole collection.
    exercises.findExercise(filter, '', 0)
        .then(exercises => {
            res.send(exercises);
        })
        .catch(error => {
            console.error(error);
            res.status(400).json({ Error: 'Request to retrieve documents failed - Collection may not exist.' });
        });

});

// DELETE Controller 
app.delete('/exercises/:_id', (req, res) => {
    exercises.deleteById(req.params._id)
        .then(deletedCount => {
            if (deletedCount === 1) {
                res.status(204).send();
            } else {
                // id does not exist:
                res.status(404).json('Exercise could not be deleted / Exercise not found');
            }
        })
        .catch(error => {
            console.error(error);
            res.status(404).send({ error: 'Request to delete a document failed' });
        });
});

// UPDATE controller 
app.put('/exercises/:_id', (req, res) => {
    const valid = validityChecker(req.body)
    if (valid) {
        exercises.replaceExercise(
            req.params._id, 
            req.body.name, 
            req.body.reps, 
            req.body.weight,
            req.body.unit,
            req.body.date,
        )
    
        .then(number => {
            if (number === 1) {
                res.json({ 
                    _id: req.params._id, 
                    name: req.body.name, 
                    reps: req.body.reps, 
                    weight: req.body.weight,
                    unit: req.body.unit,
                    date: req.body.date, 
                })
            } else {
                res.status(404).json({ Error: 'Exercise Could Not Be Updated Due to Invalid ID.' });
            }
        })
        .catch(error => {
            console.error(error);
            res.status(400).json({ Error: 'Request to update a document failed due to invalid input.' });
        });
    } else {
        res.status(404).json({ Error: 'Request to update a document failed.' });
    }
    
});


app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});