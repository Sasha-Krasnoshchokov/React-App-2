# PoC of a Personal Project Management Tool

**DEMO** [https://easyman.onrender.com/]
  - you should wait some time while the app connects to the server (refresh page)

## Local launch

  1. Clone
  ```$ git clone https://github.com/Sasha-Krasnoshchokov/React-App-2.git```

  2. Install dependencies:
   - *client*: open a terminal and type ```$ cd React-App-2/``` then ```$ cd client``` and then ```$ npm install```
   - *server*: open a new terminal and type ```$ cd React-App-2/``` then ```$ cd server/``` and then ```$ npm install```

   3. Running the client app (you should be in the * */client* * directory) ```$ npm run start```
      
   4. Running the server app (you should be in the * */server* * directory)
  - *using docker* ```$ docker compose up --build```
  - *development in the watch mode*
      1. open the .env file and make changes according to the comments
      2. open the docker-compose.yml file and make changes according to the comments
      3. launch the postgres db in the docker using command ```$ docker compose up --build```
      4. launch the server using the command ```$ npm run start:dev```
      
