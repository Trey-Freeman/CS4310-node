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
				if (stream) {
					window.localStream = stream;
					//display the stream in the local camera video elements
					onReceiveStream(stream, 'my-camera');
				}	
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
		if(ismobile() || issafari() || isie() || isedge()) {
			alert('Video not allowed');
			return;
		}
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

	// store navigator properties to use later
    var appVersion = (navigator && navigator.appVersion || '').toLowerCase();
    var userAgent = (navigator && navigator.userAgent || '').toLowerCase();
    var vendor = (navigator && navigator.vendor || '').toLowerCase();

    // is current device android?
    isandroid = function() {
        return /android/.test(userAgent);
    };

    // is current device android phone?
    isandroidPhone = function() {
        return /android/.test(userAgent) && /mobile/.test(userAgent);
    };

    // is current device android tablet?
    isandroidTablet = function() {
        return /android/.test(userAgent) && !/mobile/.test(userAgent);
    };

    // is current device blackberry?
    isblackberry = function() {
        return /blackberry/.test(userAgent) || /bb10/.test(userAgent);
    };

    // is current browser chrome?
    // parameter is optional
    ischrome = function(range) {
        var match = /google inc/.test(vendor) ? userAgent.match(/(?:chrome|crios)\/(\d+)/) : null;
        return match !== null && compareVersion(match[1], range);
    };

    // is current device desktop?
    isdesktop = function() {
        return isnot.mobile() && isnot.tablet();
    };

    // is current browser edge?
    // parameter is optional
    isedge = function(range) {
        var match = userAgent.match(/edge\/(\d+)/);
        return match !== null && compareVersion(match[1], range);
    };

    // is current browser firefox?
    // parameter is optional
    isfirefox = function(range) {
        var match = userAgent.match(/(?:firefox|fxios)\/(\d+)/);
        return match !== null && compareVersion(match[1], range);
    };

    // is current browser internet explorer?
    // parameter is optional
    isie = function(range) {
        var match = userAgent.match(/(?:msie |trident.+?; rv:)(\d+)/);
        return match !== null && compareVersion(match[1], range);
    };

    // is current device ios?
    isios = function() {
        return isiphone() || isipad() || isipod();
    };

    // is current device ipad?
    // parameter is optional
    isipad = function(range) {
        var match = userAgent.match(/ipad.+?os (\d+)/);
        return match !== null && compareVersion(match[1], range);
    };

    // is current device iphone?
    // parameter is optional
    isiphone = function(range) {
        // avoid false positive for Facebook in-app browser on ipad;
        // original iphone doesn't have the OS portion of the UA
        var match = isipad() ? null : userAgent.match(/iphone(?:.+?os (\d+))?/);
        return match !== null && compareVersion(match[1] || 1, range);
    };

    // is current device ipod?
    // parameter is optional
    isipod = function(range) {
        var match = userAgent.match(/ipod.+?os (\d+)/);
        return match !== null && compareVersion(match[1], range);
    };

    // is current operating system linux?
    islinux = function() {
        return /linux/.test(appVersion);
    };

    // is current operating system mac?
    ismac = function() {
        return /mac/.test(appVersion);
    };

    // is current device mobile?
    ismobile = function() {
        return isiphone() || isipod() || isandroidPhone() || isblackberry() || iswindowsPhone();
    };

    // is current browser opera?
    // parameter is optional
    isopera = function(range) {
        var match = userAgent.match(/(?:^opera.+?version|opr)\/(\d+)/);
        return match !== null && compareVersion(match[1], range);
    };

    // is current browser phantomjs?
    // parameter is optional
    isphantom = function(range) {
        var match = userAgent.match(/phantomjs\/(\d+)/);
        return match !== null && compareVersion(match[1], range);
    };

    // is current browser safari?
    // parameter is optional
    issafari = function(range) {
        var match = userAgent.match(/version\/(\d+).+?safari/);
        return match !== null && compareVersion(match[1], range);
    };

    // is current device tablet?
    istablet = function() {
        return isipad() || isandroidTablet() || iswindowsTablet();
    };

    // is current device supports touch?
    istouchDevice = function() {
        return !!document && ('ontouchstart' in freeSelf ||
            ('DocumentTouch' in freeSelf && document instanceof DocumentTouch));
    };

    // is current operating system windows?
    iswindows = function() {
        return /win/.test(appVersion);
    };

    // is current device windows phone?
    iswindowsPhone = function() {
        return iswindows() && /phone/.test(userAgent);
    };

    // is current device windows tablet?
    iswindowsTablet = function() {
        return iswindows() && isnot.windowsPhone() && /touch/.test(userAgent);
    };

        // build a 'comparator' object for various comparison checks
    var comparator = {
        '<': function(a, b) { return a < b; },
        '<=': function(a, b) { return a <= b; },
        '>': function(a, b) { return a > b; },
        '>=': function(a, b) { return a >= b; }
    }

    // helper function which compares a version to a range
    function compareVersion(version, range) {
        var string = (range + '');
        var n = +(string.match(/\d+/) || NaN);
        var op = string.match(/^[<>]=?|/)[0];
        return comparator[op] ? comparator[op](version, n) : (version == n || n !== n);
    }
})();