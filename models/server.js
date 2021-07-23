//Servidor de express
const express = require('express');
const http =  require('http');
const socketio = require('socket.io');
const path  = require('path');
const Sockets = require('./sockets');
const cors = require('cors');

class Server {
   constructor(){
      this.app  = express();;
      this.port = process.env.PORT;

      //Http server
      this.server = http.createServer(this.app);
      
      //Config sockets
      this.io = socketio(this.server, {cors: {
         origin: "*",
         methods: ["GET", "POST"]
       }});
   }

   middlewares(){
      // Desplegar el directorio publico
      this.app.use(express.static(path.resolve(__dirname , '../public')));

      //Cors
      this.app.use(cors());
   }

   configSockets(){
      new Sockets( this.io );
   }

   execute(){

      //Init middlewares
      this.middlewares();

      //Init Sockets
      this.configSockets();

      //Init Server
      this.server.listen(this.port, () =>{
         console.log('Server port:',this.port);
      } );
   }
}

module.exports = Server;