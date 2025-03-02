import { Schema, Types } from 'mongoose';
// Reaction subdocument schema
const reactionSchema = new Schema({
    reactionId: {
        type: Types.ObjectId,
        default: () => new Types.ObjectId(),
    },
    reactionBody: {
        type: String,
        required: true,
        maxlength: 280,
    },
    username: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => timestamp.toLocaleString(),
    },
}, {
    toJSON: { getters: true },
    id: false,
});
export { reactionSchema };
