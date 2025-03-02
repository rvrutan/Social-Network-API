import mongoose from "mongoose";
import { User, Thought } from "../models/index.js";
import { reactionSchema } from "../models/Reaction.js";

const seedData = async () => {
  // Connect to MongoDB
  await mongoose.connect('mongodb://localhost:27017/socialNetworkDB');

  try {
    // Clear existing data
    await User.deleteMany({});
    await Thought.deleteMany({});

    // Create sample users
    const users = await User.insertMany([
      { username: 'john_doe', email: 'john_doe@example.com', thoughts: [], friends: [] },
      { username: 'jane_doe', email: 'jane_doe@example.com', thoughts: [], friends: [] },
      { username: 'alice_wonder', email: 'alice_wonder@example.com', thoughts: [], friends: [] },
      { username: 'bob_builder', email: 'bob_builder@example.com', thoughts: [], friends: [] },
      { username: 'charlie_brown', email: 'charlie_brown@example.com', thoughts: [], friends: [] },
    ]);

    // Create sample thoughts
    const thoughts = await Thought.insertMany([
      { thoughtText: "This is John's thought.", username: users[0].username, reactions: [] },
      { thoughtText: "This is Jane's thought.", username: users[1].username, reactions: [] },
      { thoughtText: "This is Alice's thought.", username: users[2].username, reactions: [] },
      { thoughtText: "This is Bob's thought.", username: users[3].username, reactions: [] },
      { thoughtText: "This is Charlie's thought.", username: users[4].username, reactions: [] },
    ]);

    // Add reactions to thoughts
    thoughts[0].reactions.push({ reactionBody: "Great thought, John!", username: users[1].username });
    thoughts[1].reactions.push({ reactionBody: "Nice thought, Jane!", username: users[0].username });
    thoughts[2].reactions.push({ reactionBody: "Interesting, Alice!", username: users[3].username });
    thoughts[3].reactions.push({ reactionBody: "Good point, Bob!", username: users[4].username });
    thoughts[4].reactions.push({ reactionBody: "Awesome, Charlie!", username: users[2].username });

    // Save thoughts with reactions
    await Promise.all(thoughts.map(thought => thought.save()));

    // Associate thoughts with users
    users[0].thoughts.push(thoughts[0]._id);
    users[1].thoughts.push(thoughts[1]._id);
    users[2].thoughts.push(thoughts[2]._id);
    users[3].thoughts.push(thoughts[3]._id);
    users[4].thoughts.push(thoughts[4]._id);

    // Add friends to users
    users[0].friends.push(users[1]._id, users[2]._id);  // John adds Jane and Alice
    users[1].friends.push(users[0]._id, users[3]._id);  // Jane adds John and Bob
    users[2].friends.push(users[0]._id, users[4]._id);  // Alice adds John and Charlie
    users[3].friends.push(users[1]._id);                // Bob adds Jane
    users[4].friends.push(users[2]._id);                // Charlie adds Alice

    // Save users with thoughts and friends
    await Promise.all(users.map(user => user.save()));

    console.log('Database seeded successfully with 5 users, 5 thoughts, and 5 reactions.');
    process.exit(0);
  } catch (err) {
    console.error('Error seeding the database', err);
    process.exit(1);
  }
};

seedData();