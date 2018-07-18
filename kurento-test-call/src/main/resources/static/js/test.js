var ws = new WebSocket('wss://' + location.host + '/groupcall');
var room
var participants = new Array(1)

ws.onopen = function () {
  let msg = {id: 'getRoom'}
  sendMessage(msg)
}
ws.onmessage = function (ev) {
  let parsedMessage = JSON.parse(ev.data)
  console.log('onMessage:', parsedMessage)
  switch (parsedMessage.id) {
    case 'getRoom':
      room = parsedMessage.room
      debugger
      for (let i = 0 ; i < participants.length; i ++) {
        let joinMessage = {
          id: 'joinRoom',
          name: i,
          room: room
        }
        sendMessage(joinMessage)
      }
      break
    case 'existingParticipants':
      onExistingParticipants(parsedMessage);
      break;

  }
}
function onExistingParticipants(msg) {
  var constraints = {
    audio : true,
    video : {
      mandatory : {
        maxWidth : 320,
      }
    }
  };

  var participant = new Participant(name);
  participants[name] = participant;
  var video = participant.getVideoElement();

  var options = {
    localVideo: video,
    mediaConstraints: constraints,
    onicecandidate: participant.onIceCandidate.bind(participant)
  }
  participant.rtcPeer = new kurentoUtils.WebRtcPeer.WebRtcPeerSendonly(options,
    function (error) {
      if(error) {
        return console.error(error);
      }
      this.generateOffer (participant.offerToReceiveVideo.bind(participant));
    });

  msg.data.forEach(receiveVideo);
}

function sendMessage(msg) {
  console.log("Will send:", msg)
  ws.send(JSON.stringify(msg))
}