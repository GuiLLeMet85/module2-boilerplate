# App name

Brick Manager

## Description

This is a project developed by Dani Pérez and Guillem Baracco as the project for the second module at Ironhack. 

With Brick Manager the user can check the information about each brick or Lego Set in the house (prev added). If the user has been registered in the app, may be add, modify or delete the information.

---

## Wireframes
![](docs/wireframe-brick-manager.png)

---
Hello Marina
good bie Marina

## Instructions

When cloning the project, change the <code>sample.env</code> for an <code>.env</code> with the values you consider:
```js
PORT=3000
MONGO_URL='mongodb://localhost/dbName'
SESSION_SECRET='SecretOfYourOwnChoosing'
NODE_ENV='development'
```
Then, run:
```bash
npm install
```
To start the project run:
```bash
npm run start
```

---

## User stories (MVP)

What can the user do with the app?
- User can sign up and create and account
- User can login
- User can log ou
- User can create ...

## User stories (Backlog)

- User can upload a profile picture
- User can ...

---

## Models



User:

```js
const userSchema = new Schema(
  {
    username: {
      type: String,
      trim: true,
      required: [true, 'Username is required.'],
      unique: true
    },
    email: {
      type: String,
      required: [true, 'Email is required.'],
      unique: true,
      lowercase: true,
      trim: true
    },
    usertype: {
        type: String,
        requiered: true,
    }
    profilepicture: {
        type: String,
        requiered: true,
    }
    hashedPassword: {
      type: String,
      required: [true, 'Password is required.']
    }
  }
);

const brick = new Schema(
  {
    brickname: {
      type: String,
      trim: true,
      required: [true, 'brick name is required.'],
      unique: true
    },
    quantity: {
      type: Number,
      required: [true, 'Quantity is required.'],
      
    },
    picture: {
      type: String   
    },
    color: {
       type: String,
       required: [true, 'Color is required.'], 
    },
    setId: {
        type: String
    }
    ,
    status: {
        status: String,
        required: [true, 'Color is required.']
    },
    boxId: {
        status: String,
        required: [true, 'box ID is required.']
    }
    
}
);  

const set = new Schema(
  {
    setname: {
      type: String,
      trim: true,
      required: [true, 'brick name is required.'],
      unique: true
    },
    quantity: {
      type: Number,
      required: [true, 'Quantity is required.'],
      
    },
    picture: {
      type: String   
    },
    brickId: {
        type: String
    }  
}  
);

const box = new Schema(
  {
    boxname: {
      type: String,
      trim: true,
      required: [true, 'brick name is required.'],
      unique: true
    },
    brickId: {
        type: String
    }
    picture: {
      type: String   
    }    
  }
);

```

---

## Routes

| Name  | Method | Endpoint    | Protected | Req.body            | Redirects |
|-------|--------|-------------|------|---------------------|-----------|
| Home  | GET   | /           | No   |                     |           |
| Login | GET    | /auth/login | No |                      |           |
| Login | POST | /auth/login   | No | { email, password }  | /         |
| Signup | GET    | /auth/signup | No |                      |           |
| Signup | POST | /auth/signup   | No | { username, email, password }  | /auth/login  |
| New movie  | GET    | /movies/new | Yes |                      |           |
| New movie | POST | /movies/new   | Yes | { title, cast, genre }  | /movies/:movieId   |

---

| Name  | Method | Endpoint    | Protected | Req.body            | Redirects |
|-------|--------|-------------|------|---------------------|-----------|
| Home  | GET   | /           | No   |                     |           |
| Login | GET    | /auth/login | No |                      |           |
| Login | POST | /auth/login   | No | { email, password }  | /         |
| Signup | GET    | /auth/signup | No |                      |           |
| Signup | POST | /auth/signup   | No | { username, email, password }  | /auth/login  |
| New brick  | GET    | /bricks/new | Yes |                      |           |
| New brick | POST | /bricks/new   | Yes | { title, cast, genre }  | /bricks/:brickId   |
| New set  | GET    | /sets/new | Yes |                      |           |
| New set | POST | /sets/new   | Yes | { title, cast, genre }  | /sets/:setId   |
| New box  | GET    | /sets/new | Yes |                      |           |
| New box | POST | /sets/new   | Yes | { title, cast, genre }  | /box/:boxId   |
​




## Useful links

- [Github Repo](https://github.com/alebausa/module2-boilerplate)
- [Deployed version]()
- [Presentation slides](https://www.slides.com)


