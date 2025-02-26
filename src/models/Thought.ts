import { Schema, model, Document } from 'mongoose';
import  reactionSchema  from './Reaction';


export interface IThought extends Document {
  thoughtText: string;
  createdAt: Date;
  username: string;
  reactions: [typeof reactionSchema]
  reactionCount: number;
}

const thoughtSchema = new Schema<IThought>({
  thoughtText: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 280,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  username: {
    type: String,
    required: true,
  },
  reactions: [reactionSchema],
},
{
  toJSON: {
    virtuals: true,
  },
  id: false,
});

thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

const Thought = model<IThought>('Thought', thoughtSchema);

export default Thought;