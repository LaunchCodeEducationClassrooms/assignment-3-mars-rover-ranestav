const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function() {

it("constructor sets position and default values for mode and generatorWatts", function() {
    let rover = new Rover(87000);
    expect(rover.position).toEqual(87000);
    expect(rover.mode).toEqual('NORMAL');
    expect(rover.generatorWatts).toEqual(110);
  });

it("response returned by receiveMessage contains name of message", function() {
    let rover = new Rover(2000);
    let commands = [new Command('Mode_Change', 'LOW_POWER'), new Command ('STATUS_CHECK')];
    let message = new Message('This is a test message.', commands);
    let response = rover.receiveMessage(message);
    expect(response.message).toEqual('This is a test message.');
  });

it("response returned by receiveMessage includes two results if two commands are sent in the message", function() {
    let rover = new Rover(2000);
    let commands = [new Command('Mode_Change', 'LOW_POWER'), new Command ('STATUS_CHECK')];
    let message = new Message('Two Commands.', commands);
    let response = rover.receiveMessage(message);
    expect(response.results.length).toEqual(2);
  });

  it("responds correctly to status check command", function() {
    let commands = [new Command('STATUS_CHECK')];
    let message = new Message('Test message for test 10', commands);
    let rover = new Rover(1500);
    let response = rover.receiveMessage(message);
    expect(response.results).toEqual([{completed: true, roverStatus: {mode: 'NORMAL', generatorWatts: 110, position: 1500}}]);
  });

  it("responds correctly to mode change command", function() {
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER')];
    let message = new Message('Test message for test 11', commands);
    let rover = new Rover(22000);
    let response = rover.receiveMessage(message);
    expect(response.results).toEqual([{completed: true}]);
    expect(rover.mode).toEqual('LOW_POWER');
  });

  it("responds with false completed value when attempting to move in LOW_POWER mode", function() {
    let commands = [new Command('MOVE')];
    let message = new Message('Test message for test 12', commands);
    let rover = new Rover(32,000);
    rover.mode = 'LOW_POWER';
    let response = rover.receiveMessage(message);
    expect(response.results).toEqual([{completed: false}])
  });

  it('responds with position for move command', function() {
    let commands = [new Command('MOVE', 14000)];
    let message = new Message('Test message for test 13', commands);
    let rover = new Rover(22000);
    let response = rover.receiveMessage(message);
    expect(rover.position).toEqual(14000);
  });

  // 7 tests here!

});


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