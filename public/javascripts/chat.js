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
  $(document).ready(function() {
    $('#message-button').on('click', function() {
      sendMessage();
    });
    $('#message-box').on('keypress', function(e) {
      if(e.which === 13)
        sendMessage();
    });
  });

  //Create a new peer object
  var peer = new Peer({
    host: location.hostname,
    port: location.port || (location.protocol === 'https:' ? 443 : 80),
    path: '/peerjs'
  });

  //Open a connection
  //Whenever a a new conenciton is opened, we are supplied with a unique id, which we use for connecting to other peers
  peer.on('open', function(id) {
    console.log('My peer ID is: ' + id);
  })
  //Handling a connection
  peer.on('connection', function(conn) {
    console.log('Connected');
  });

  navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

  function getVideo(callback) {
    navigator.getUserMedia({audio: true, video: true}, callback, function(error) {alert('An error occurred'); console.log(error);});
  }

  function onReceiveStream(stream, elementID){
    var video = $('#' + elementID + ' video')[0];
    video.src = window.URL.createObjectURL(stream);
    window.peer_stream = stream;
  }

  getVideo(function(stream) {
    window.localStream = stream;
    onReceiveStream(stream, 'my-camera');
  });

  function handleMessage(data) {
    $('#messages').append('<p>' + data + '</p>');
  }

  function sendMessage() {
    var text = $('#message-box').val();
    var data;
    handleMessage(text);
    $('#messages').scrollTop($('#messages')[0].scrollHeight)
    $('#message-box').val('');
  }


})();