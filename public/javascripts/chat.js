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
	var socket = io.connect();
	var room;
	var user;

	$(document).ready(function() {
		user = $('#hidden-username').attr('data-val')
		//On click, submit to socketio t0 join a room
		$('#submit').on('click', function() {
			console.log('joining');
			room = $('#room-name').val()
			socket.emit('room', {room: room,
				user: user,
				password: $('#room-password').val()});
		});

		//If message button is clicked, then send the message
		$('#message-button').on('click', function() {
			sendMessage();
		});

		//If user clicks enter while typing message, then send message
		$('#message-box').on('keypress', function(e) {
			if(e.which === 13)
				sendMessage();
		});
	});

	//If the user joined/created a room successfully, do animation
	socket.on('joined', function(data) {
		//For sanity
		room = data.room;
	    $('#join-view').slideUp(1000, function() {
	    	$('#chat-view').slideDown(1000);
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
			//Possibly send video here
			conn.send(getVideo(function(stream) {
				return stream;
			}));
			//What to do when receiving a video
			conn.on('data', function(data) {
				$('#vid-streams').append("<video id='" + conn.id + "'class='col-md-4 col-md-offset-2'></video>");
				onReceiveStream(data, conn.id);
			});
		});
		console.log(data);
		//Connect to all the users in the current room
		data.users.forEach(function(roomUser) {
			console.log(roomUser);
			peer.connect(roomUser);
		}); 
	});
	//If the user received a message, then show that message
	socket.on('message', function(data) {
		handleMessage(data);
		console.log('Incoming message:', data);
	});

	socket.on('failed login', function() {
		$('#invalid-password-message').show();
	});

	navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

	/* Tell the navigator to get user's webcam feed (video and audio included) */
	function getVideo(callback) {
		navigator.getUserMedia({audio: true, video: true}, callback, function(error) {alert('An error occurred'); console.log(error);});
	}

	/* What to do when a user starts receiving a stream (local or remote)
	* Display it to the video object for the given video element */
	function onReceiveStream(stream, elementID){
		var video = $('#' + elementID + ' video')[0];
		video.src = window.URL.createObjectURL(stream);
		window.peer_stream = stream;
	}

	/* Get video from webcam */
	getVideo(function(stream) {
		window.localStream = stream;
	//display the stream in the local camera video elements
	onReceiveStream(stream, 'my-camera');
	});

	function handleMessage(data) {
		$('#messages').append('<p>' + data + '</p>');
		$('#messages').scrollTop($('#messages')[0].scrollHeight);
	}

	function sendMessage() {
		var text = $('#message-box').val();
		var data;
		$('#message-box').val('');
		socket.emit('message', {room: room, user: user, message: text});
	}

  /* Testing socket.io stuff */


})();