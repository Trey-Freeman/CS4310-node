(function() {
	var socket;
	var room;
	var user;

	$(document).ready(function() {
		//Set the username retreived from the hidden elements containing this user's username
		user = $('#hidden-username').attr('data-val')
		
		//initialize our socket
		socket = io.connect();
		
		//Add user upon connection
		socket.on('connect', function() {
			socket.emit('addUser', {user: user});
		});

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

		//If the user joined/created a room successfully, do animation
		socket.on('joined', function(data) {
			socket.emit('list-user', {
				room,
				user: user
			});
			console.log(data);
			/* Get video from webcam */
			getVideo(function(stream) {
				window.localStream = stream;
				//display the stream in the local camera video elements
				onReceiveStream(stream, 'my-camera');
			});
			console.log('joined');

			//For sanity
			room = data.room;
		    $('#join-view').slideUp(1000, function() {
		    	$('#chat-view').slideDown(1000);
		    });

		    //Create a new peer object
			peer = new Peer(user, {
				host: location.hostname,
				port: location.port || (location.protocol === 'https:' ? 443 : 80),
				path: '/peerjs',
				debug: 3
			});

			//Open a connection
			//Whenever a a new conenciton is opened, we are supplied with a unique id, which we use for connecting to other peers
			peer.on('open', function(id) {
				console.log('My peer ID is: ' + id);
			})

			//variable to generate a unique video id (only using this now for testing until I find some better alternative)
			var id = 0;

			//On receiving a call, answer the call and stream our local stream
			//added their content to a new video element
			peer.on('call', function(call) {
				console.log('Receiving Call');
				call.answer(window.localStream);
				var videoDivId = "video-" + id;
				$('#vid-streams').append("<div id='" + videoDivId + "' class='camera col-md-4 col-md-offset-2'><video></video></div>");
				id++;
				console.log('finished receiving call');
				/*call.on('stream', function(stream) {
					console.log('streaming');
					onReceiveStream(stream, videoDivId);
				});*/
			});
			//Handling a connection
			/*peer.on('connection', function(conn) {
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
			});*/
			console.log(data);
			//Connect to all the users in the current room
			data.users.forEach(function(roomUser) {
				console.log(roomUser);
				console.log(peer);
				$('#user-list').append('<li>' + roomUser + '</li>');
				var call = peer.call(roomUser, window.localStream);
				console.log(call);
			}); 
		});
		//If the user received a message, then show that message
		socket.on('message', function(data) {
			handleMessage(data);
			console.log('Incoming message:', data);
		});

		socket.on('list-user', function(newUser) {
			$('#user-list').append('<li>' + newUser + '</li>');
		});

		socket.on('failed login', function() {
			$('#invalid-password-message').show();
		});
	});

	navigator.mediagetUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

	/* Tell the navigator to get user's webcam feed (video and audio included) */
	function getVideo(callback) {
		//navigator.mediaDevices.getUserMedia({audio: true, video: true}).then(callback).catch(function(error){alert('An error occured'); console.log(error);});
		navigator.getUserMedia({audio: true, video: true}, callback, function(error) {alert('Camera is inaccessible'); console.log(error);});
	}

	/* What to do when a user starts receiving a stream (local or remote)
	* Display it to the video object for the given video element */
	function onReceiveStream(stream, elementID){
		var video = $('#' + elementID + ' video')[0];
		video.src = window.URL.createObjectURL(stream);
	}

	function handleMessage(data) {
		$('#messages').append('<p>' + data + '</p>');
		$('#messages').scrollTop($('#messages')[0].scrollHeight);
	}

	function sendMessage() {
		var text = "<span class='username-span'>" + user + ": </span>" + $('#message-box').val();
		var data;
		$('#message-box').val('');
		socket.emit('message', {room: room, user: user, message: text});
	}

  /* Testing socket.io stuff */


})();