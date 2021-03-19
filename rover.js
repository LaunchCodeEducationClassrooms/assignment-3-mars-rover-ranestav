class Rover {
   constructor(position) {
     this.position = position;
     this.mode = 'NORMAL';
     this.generatorWatts = 110;
   }

   receiveMessage(message) {
     
     let results = [];

     for (let i = 0; i < message.commands.length; i++) {
       if (message.commands[i].commandType === 'STATUS_CHECK') {
         results.push({completed: true, roverStatus: {mode: this.mode, generatorWatts: this.generatorWatts, position: this.position}})
       } else if (message.commands[i].commandType === 'MODE_CHANGE'){
           results.push({completed: true});
           this.mode = message.commands[i].value;
       } else if (message.commands[i].commandType === 'MOVE') {
           if (this.mode === 'LOW_POWER') {
             results.push({completed: false});
           } else {
               results.push({completed: true});
               this.position += message.commands[i].value;
           }
       } else {
           results.push(message.commands[i]);
       }
     }

     return {
       message: message.name,
       results: results
     };
   }
}

module.exports = Rover;





/*constructor(position)
position is a number representing the rover's position.
Sets this.position to position
Sets this.mode to 'NORMAL'
Sets default value for generatorWatts to 110
*/

/*receiveMessage(message)
message is a Message object
Returns an object containing at least two properties:
message: the name of the original Message object
results: an array of results. Each element in the array is an object that corresponds to one Command in message.commands.
*/