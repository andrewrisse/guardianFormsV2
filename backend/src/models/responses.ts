import mongoose from 'mongoose';

const responseSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  response: { type: Number, required: true }
});

const responsesSchema = new mongoose.Schema({
  responses: {type: [responseSchema], required: true, default: []},
  ownerId: {type: String, required: true}
});

export default mongoose.models.Responses || mongoose.model('Responses', responsesSchema);
