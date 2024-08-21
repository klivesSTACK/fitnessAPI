const Workout = require('../models/Workout');

// add workout endoint
module.exports.addWorkout =  (req, res) => {

    // instantite new workout
    let newWorkout = new Workout({
        userId: req.user.id,
        name: req.body.name,
        duration: req.body.duration
    });

    // scan workout database
    Workout.findOne({ name: req.body.name, userId: req.user.id }).then(workoutExist => {
        // if workout name already exist in database
        if(workoutExist){
            return res.status(409).send({ message: 'Workout already listed'})
        // if no workout name exist in database. create and save the newly created workout
        }else {
            return newWorkout.save().then(workout => {
                res.status(201).send({workout})
            }).catch(err => errorHandler(err, req, res));
        }
    })

} 

// get workout endpoint
module.exports.getMyWorkouts = (req, res) => {

    //scan and fine all workout in database
    Workout.find({ userId: req.user.id }).then(result => {
        //return response from database
        return res.status(200).send({ workouts: result})
    }).catch(err => errorHandler(err, req, res));
}

// updated workout endpoint
module.exports.updateWorkout = (req, res ) => {

    //deconstructing
    const { name, duration } = req.body;

    // initialize 
    const id = req.params.workoutId;


    let updatedWorkout = {
        name: name,
        duration: duration
    }

    // scan the database and update
    Workout.findByIdAndUpdate( id, updatedWorkout, { new: true} )
    .then(result => {
        // if successfull
        if(result){
            return res.status(200).send({
                message: 'Workout updated successfully',
                updatedWorkout: result
            })
        // if not
        }else {
            res.status(404).send({ message: 'Workout not found'})
        }
    }).catch(err => errorHandler(err, req, res));

}

// delete workout enpoint
module.exports.deleteWorkout = (req, res) => {

    // initialize 
    const id = req.params.workoutId;

    // Scan and delete workout in database
    Workout.findByIdAndDelete(id, {new: true}).then( deleted =>{

        // if success
        if(deleted){
            return res.status(200).send({ message: 'Workout deleted sucessfully'})
        //if not
        }else {
            return res.status(400).send({ message: 'No workout found'})
        }
    })

}

// workout status endpoint
module.exports.completeWorkoutStatus = ( req, res ) => {

    const id = req.params.workoutId;

    Workout.findByIdAndUpdate( id, { status: 'completed' }, { new: true}).then( completed => {
        if(completed){
            return res.status(200).send({ 
                message: 'Workout status updated successfully',
                updatedWorkout: completed
            })
        }else {
            return res.status(400).send({ message: 'Workout status updating failed'});
        }
    })

}