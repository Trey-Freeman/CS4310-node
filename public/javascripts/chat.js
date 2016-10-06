/*// Set RTC options.
var rtcOpts = {
    room: 'test-room'
  };
// call RTC module
var rtc = RTC(rtcOpts);
// A div element to show our local video stream
var localVideo = $('#l-video');
// A div element to show our remote video streams
var remoteVideo = $('#r-video');
// A contenteditable element to show our messages
var messageWindow = $('#messages');

// Bind to events happening on the data channel
function bindDataChannelEvents(id, channel, attributes, connection) {

  // Receive message
  channel.onmessage = function (evt) {
    messageWindow.innerHTML = evt.data;
  };

  // Send message
  messageWindow.onkeyup = function () {
    channel.send(this.innerHTML);
  };
}

// Start working with the established session
function init(session) {
  session.createDataChannel('chat');
  session.on('channel:opened:chat', bindDataChannelEvents);
}

// Display local and remote video streams
$(localVideo).append(rtc.local);
$(remoteVideo).append(rtc.remote);

// Detect when RTC has established a session
rtc.on('ready', init);*/

(function() {
  //Create a new peer object
  var peer = new Peer({key: 'zsbti8t1df91kyb9'});

  //Open a connection
  //Whenever a a new conenciton is opened, we are supplied with a unique id, whcihc we use for connecting to other peers
  peer.on('open', function(id) {
    console.log('My peer ID is: ' +id);
  })

  peer.on('connection', function(conn) {
    console.log('Connected');
  });

  var conn = peer.connect('');



})();