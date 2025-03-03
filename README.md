# Social Network API

**Table of Contents**

* [Description](#description)
* [Features](#features)
* [Installation](#installation)
* [Usage](#usage)
    * [User Routes](#user-routes)
    * [Thought Routes](#thought-routes)
* [Walkthrough Video](#walkthrough-video)
* [Screenshots](#screenshots)
* [Bonus Feature](#bonus-feature)
* [Contributing](#contributing)
* [License](#license)

## Description

This project implements a RESTful API for a social network platform using Express.js, MongoDB, and Mongoose. The API allows users to create and manage user profiles, post thoughts, react to thoughts, and manage friends lists.

## Features

* **User Management:**
    * Create, read, update, and delete users.
    * Add and remove friends from a user's friend list.
* **Thought Management:**
    * Create, read, update, and delete thoughts.
    * Add reactions to thoughts.
* **Data Validation:**
    * Ensures data integrity with Mongoose schema validation.
* **Virtual Properties:**
    * `friendCount` for users.
    * `reactionCount` for thoughts.
* **Timestamp Formatting:**
    * Uses getter methods to format timestamps for display.

## Installation

1.  **Clone the repository:**

    ```bash
    git clone [https://github.com/your-username/social-network-api.git](https://github.com/your-username/social-network-api.git)
    ```

2.  **Install dependencies:**

    ```bash
    cd social-network-api
    npm install
    ```

3.  **Configure MongoDB:**

    * Ensure you have MongoDB installed and running.
    * Update the MongoDB connection string in `config/connection.js`.

4.  **Start the server:**

    ```bash
    npm start
    ```

## Usage

The API endpoints are documented below. You can use tools like Insomnia or Postman to test the API.

### User Routes

| Method | Endpoint                             | Description                                   |
| :----- | :----------------------------------- | :-------------------------------------------- |
| GET    | `/api/users`                         | Get all users                                 |
| GET    | `/api/users/:userId`                  | Get a single user by ID                       |
| POST   | `/api/users`                         | Create a new user                             |
| PUT    | `/api/users/:userId`                  | Update a user by ID                           |
| DELETE | `/api/users/:userId`                  | Delete a user by ID                           |
| POST   | `/api/users/:userId/friends/:friendId` | Add a friend to a user's friend list          |
| DELETE | `/api/users/:userId/friends/:friendId` | Remove a friend from a user's friend list       |

### Thought Routes

| Method | Endpoint                    | Description                          |
| :----- | :-------------------------- | :----------------------------------- |
| GET    | `/api/thoughts`              | Get all thoughts                       |
| GET    | `/api/thoughts/:thoughtId`   | Get a single thought by ID             |
| POST   | `/api/thoughts`              | Create a new thought                   |
| PUT    | `/api/thoughts/:thoughtId`   | Update a thought by ID                 |
| DELETE | `/api/thoughts/:thoughtId`   | Delete a thought by ID                 |
| POST   | `/api/thoughts/:thoughtId/reactions` | Add a reaction to a thought          |
| DELETE | `/api/thoughts/:thoughtId/reactions/:reactionId` | Delete a reaction from a thought |

## Walkthrough Video

[Link to your walkthrough video]

## Screenshots



## Bonus Feature

* **Delete User's Thoughts:** When a user is deleted, all their associated thoughts are also deleted.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)

### Questions

Contact me for any further questions;
- Github: [github.com/rvrutan](https://github.com/rvrutan)
- Email: [rutanroni@gmail.com](mailtorutanroni@gmail.com)
