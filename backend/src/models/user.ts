import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide a name'],
    },
    email: {
        type: String,
        required: [true, "Please provide an email"],
    }
})

export default mongoose.models.User || mongoose.model('User', userSchema)
