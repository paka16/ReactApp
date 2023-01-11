// dependencies
import mongoose from 'mongoose';
import 'dotenv/config';

// Connect based on the .env file parameters.
mongoose.connect(
    process.env.MONGODB_CONNECT_STRING,
    { useNewUrlParser: true }
);
const db = mongoose.connection;

// Confirm that the database has connected and print a message in the console.
db.once("open", (err) => {
    if(err){
        res.status(500).json({ error: 'Error 500: Could not connect to server!' });
    } else  {
        console.log('connection to MongoDB collection using Mongoose established.');
    }
});

// SCHEMA: exercise collection's schema.
// how the information will look like in the database.
const exerciseSchema = mongoose.Schema({
	name: { type: String, required: true }, // name of the exercise.
	reps: { type: Number, required: true }, // number of times (set) the exercise was done.
	weight: { type: Number, required: true }, // weight of the equipments used.
    unit: { type: String, required: true }, // the unit of mesaurement.
    date: { type: Date, required: true }, // the date the exercise was done on. 
});

// Compiling the model from the schema.
// uses the schema.
const Exercise = mongoose.model("Exercise", exerciseSchema);


// CREATE model
const createExercise = async (name, reps, weight, unit, date) => {
    const exercise = new Exercise({ 
        name: name, 
        reps: reps, 
        weight: weight,
        unit: unit,
        date: date, 
    });
    return exercise.save();
}


// RETRIEVE models 
// Retrieve based on a filter and return a promise - this is to return the whole collection.
const findExercise = async (filter) => {
    const finding = Exercise.find(filter);
    return finding.exec();
}

// Retrieve based on the ID and return a promise - to return using an id.
const findExerciseById = async (_id) => {
    const finding = Exercise.findById(_id);
    if (finding) {
        return finding;
    } else {
        throw ("Exercise could not be Found!")
    }
}


// DELETE model based on ID  
const deleteById = async (_id) => {
    const data = await Exercise.deleteOne({_id: _id});
    return data.deletedCount;
};


// REPLACE model 
const replaceExercise = async (_id, name, reps, weight, unit, date) => {
    const result = await Exercise.updateOne({_id: _id }, {
        name: name, 
        reps: reps, 
        weight: weight,
        unit: unit,
        date: date, 
    });
    return result.modifiedCount;
}



// Export to the controller file.
export { createExercise, findExercise, findExerciseById, replaceExercise, deleteById }