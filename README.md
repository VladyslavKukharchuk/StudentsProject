# StudentsProject

Repository for the implementation of the project described in
the [technical task](https://docs.google.com/document/d/1smlvEuArov1OVh3S1IOfy0A-nXYQb2F3TohCUPteiMI/edit?usp=sharing).

___

## Description of the project

### Description of functionality

Chat provides access to a simulated role-playing game. The user registers and selects any of the proposed classes. Then
he gets access to the general chat, where he can interact with other players at any time in any of the ways available to
the class.
The game has no goals, but the player can reduce the health of other players or avoid attacks. A player with depleted
health cannot act, but can respawn with full health at any time.
It is also possible to exchange regular messages, which are also displayed to all users.


### Available classes

- Warrior - can strike with a sword and defend with a shield.
    - Health - 200 hp
    - sword strike - takes away 50 hp
    - protection - ignores physical damage.
- Thief - can shoot a bow and run away.
    - Health - 100 hp
    - bow shot - takes away 25 hp
    - run away - invulnerability until it returns.
- Mage - can strike with fire and enchant.
    - Health - 80 hp
    - fireball - takes away 100hp
    - enchant - the selected enemy cannot use the ability.

### Types of interaction

All interactions occur through the WebSocket server. Messages are sent in json format. There are 4 ways of interaction
that are available to the user. Attack. Application of the ability. Renaissance. Chat message.

- Attack
  - available at any time if the character is alive (health is greater than 0);

- Ability
  - all abilities active for 30 seconds;

- Message
  - available if user character is alive;
  - When user entering the chat, he always sees the last 10 messages, previous messages are lost;

- Restore
  - available at any time if the character is dead (health is 0);

___

### Technologies used:

- NodeJs
- Express
- WS
- PostgreSQL
- MongoDB
- Redis

___

### Installation

#### 1. Copy the project code

- Open the folder where you want to place the project files.
- Execute the command `git clone https://github.com/VladyslavKukharchuk/StudentsProject.git`

#### 2. Install all project dependencies

- You need have **Node.js** installed to work with the project.
- To check if it is installed, run the command `node -v` in the console, if
  not [install it](https://nodejs.org/en/download/).
- To install project dependencies, open the project folder and run the `npm install` command in the console.

#### 3. Create databases

To work, you need connect to databases, you can connect to existing ones or use the instructions.

The **.env** file contains the configuration files of the project before running, you can change them as needed.

*If you are using existing databases, change the database parameters (port, host, database name and user data).

- Check if you have **Docker** on your computer, if not [install it](https://www.docker.com/).
- Go to the folder where the **docker-compose.yml** file is located.
- The **docker-compose.yml** file contains the configuration that will be used to start the databases, edit it as
  needed.
- Run the `docker-compose up` command, which will start the container with the databases.

#### 4. Migrations

Before starting the server, you should perform a data migration for **PostgreSQL**, the migration files are gathered in
the migrations folder.

- Run the command `npm run migrate:up` to start the migration.

#### 5. Run the project

Commands to run the project:

- `npm run start` - launch of the project;
- `npm run dev` - launching the project in development mode;

___

### API Specification

#### HTTP

**Login**

**POST** *http://HOST:PORT/api/users/login*

Receive

```JSON
  {
    "email": "user@gmail.com",
    "password": "123456"
  }
```

Return

```JSON
  {
    "accessToken": "JWT token",
    "user": {
      "id": 1,
      "username": "user",
      "email": "user@gmail.com",
      "class": 0
      }
  }
```

**Registration**

Receive

```JSON
  {
    "username": "user",
    "email": "user@gmail.com",
    "password": "123456",
    "duplicatePassword": "123456",
    "characterClass": 0
  }
```

Return

```JSON
    {
    "accessToken": "JWT token",
    "user": {
      "id": 1,
      "username": "user",
      "email": "user@gmail.com",
      "class": 0
      }
    }
```

**Updating user data**

Receive

```JSON
    {
      "username": "user1",
      "currentPassword": "123456",
      "newPassword": "1234567",
      "duplicatePassword": "1234567",
      "characterClass": 1
   }
```

Return

```JSON
    {
    "accessToken": "JWT token",
    "user": {
      "id": 1,
      "username": "user1",
      "email": "user@gmail.com",
      "class": 1
      }
    }
```

**Getting all classes**

Return all available classes

```JSON
[
  {
    "id": 0,
    "name": "Thief",
    "health": 100,
    "damage": 25,
    "attack_type": "Archery Shot",
    "ability": "Escape",
    "created_at": "2023-02-08T18:46:10.000Z",
    "updated_at": "2023-02-08T18:46:10.000Z"
  }
]
```

#### WS 

**Connection**

_ws://localhost:5000/?id=userID_

**Headers:**

**KEY:** Authorization 

**VALUE:** "Bearer JWT token"

JWT token validation


Checking the existence of a user with this id
```JSON
{
  "type": "error", 
  "message": "Your opponent is already dead, you can attack another!"
}
```

Return cache of last 10 messages from redis
```JSON
{
    "type": "previousMessages",
    "messages": [
        {
            "type": "message",
            "message": "Привіт"
        }
    ]
}
```

Return sessions of all active users
```JSON
{
    "type": "ollUsers",
    "users": [
        {
            "_id": 1,
            "username": "user1",
            "hp": 100,
            "statuses": []
        },
        {
            "_id": 2,
            "username": "user2",
            "hp": 80,
            "statuses": []
        },
        {
            "_id": 3,
            "username": "user3",
            "hp": 200,
            "statuses": []
        }
    ]
}
```

**Disconnection**



#### Event types:

- attack : 0
- ability : 1
- message : 2
- restore : 3

**Attack**

Receive:

```JSON
{
  "type": 0,
  "userId": 1
}
```  

Checking if the attack can be applied:

```JSON
{
  "type": "error", 
  "message": "Failed to Attack, maybe your target has already left the fight"
}
```

```JSON
{
  "type": "error", 
  "message": "The attack can only be used on enemies!"
}
```

```JSON
{
  "type": "error", 
  "message": "You are dead, if you want to continue the fight, first relive!"
}
```

```JSON
{
  "type": "error", 
  "message": "Your opponent is already dead, you can attack another!"
}
```

```JSON
{
  "type": "error", 
  "message": "The enemy in hiding, now impossible to attack him"
}
```

```JSON
{
  "type": "error", 
  "message": "The enemy is Defended, it is now impossible to attack him"
}
```

Return the modified session of the target user to all subscribers:

```JSON
{
    "type": "updatedUser",
    "userData": {
        "_id": 1,
        "username": "user1",
        "hp": 50,
        "statuses": []
    }
}
```

**Ability**

Receive

```JSON
{
  "type": 1,
  "userId": 3
}    
```  

Checking if the ability can be applied:

```JSON
{
  "type": "error", 
  "message": "Ability failed, your target may have already left the battle"
}
```

```JSON
{
  "type": "error", 
  "message": "You are dead, if you want to continue the fight, first relive!"
}
```

```JSON
{
  "type": "error", 
  "message": "Your opponent is already dead, you can attack another!"
}
```

```JSON
{
  "type": "error", 
  "message": "You have been enchanted, now you will not be able to use your abilities"
}
```

```JSON
{
  "type": "error", 
  "message": "The ability can only be used on yourself!"
}
```

```JSON
{
  "type": "error", 
  "message": "Your ability is still active, you can use it again after the effect ends"
}
```

```JSON
{
  "type": "error", 
  "message": "The ability can only be used on enemies!"
}
```

```JSON
{
  "type": "error", 
  "message": "The ability can only be used on yourself!"
}
```

```JSON
{
  "type": "error", 
  "message": "Your opponent has already been enchanted, you can use the ability on another!"
}
```

Return the modified session of the target user to all subscribers:

```JSON
{
    "type": "updatedUser",
    "userData": {
        "_id": 3,
        "username": "user3",
        "hp": 200,
        "statuses": [
            2
        ]
    }
}
```

Message

Receive

```JSON
{
  "type": 2, 
  "message": "Привіт"
}
```

Checking if the user can write messages:

```JSON
{
  "type": "error", 
  "message": "You are dead, if you want to write message, first relive!"
}
```

Sending a message to all subscribers:

```JSON
{
  "type": "message",
  "message": "Привіт"
}
```

Restore

Checking if the user needs to be restored:

```JSON
{
  "type": "error", 
  "message": "Your character is still alive, you can continue the battle!"
}
```

Return the modified session of the target user to all subscribers:

```JSON
{
    "type": "updatedUser",
    "userData": {
        "_id": 3,
        "username": "user3",
        "hp": 200,
        "statuses": [
            2
        ]
    }
}
```

___