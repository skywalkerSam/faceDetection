# Backend server for [face-detection](https://github.com/skywalkerSam/face-detection)

### To setup `postgresql` database for the project, [go to the database section...](https://github.com/skywalkerSam/Introduction-To-Web-Development/tree/main/Introduction-To-Databases)
### Here's the link to the `deployment` of [face-detection-backend](https://github.com/skywalkerSam/face-detection-backend)


## Some guidelines...
- Edit database configurations under `server.js`
- Enter your Clarifai PAT and username inside `controllers/image.js`
- Using `gRPC` instead of REST


## Server Specifications:
- Express.js
- bcrypt
- postgreSQL
- Knex.js


## Tools:
- DBeaver
- Postman
- VS Code


## Install nodemon
```shell
npm i nodemon
```

## Put this under `"scripts"` in `package.json` to use nodemon as default

```json
"start": "nodemon server.js"
```

## Start the server
```shell
npm start
```


## Until next time...

# ;)
