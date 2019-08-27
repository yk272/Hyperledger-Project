const {
  Message,
  EventFilter,
  EventList,
  FilterType,
  EventSubscription,
  ClientEventsSubscribeRequest,
  ClientEventsSubscribeResponse
} = require("sawtooth-sdk/protobuf");
const { Stream } = require("sawtooth-sdk/messaging/stream");
const { TextDecoder, TextEncoder } = require("text-encoding/lib/encoding");

const Url = "tcp://validator:4004";
let myStream = new Stream(Url);

// returns the subscription request status
function checkStatus(response) {
  let msg = "";
  if (response.status === 0) {
    msg = "subscription : OK";
  } else if (response.status === 1) {
    msg = "subscription : GOOD ";
  } else {
    msg = "subscription failed !";
  }
  return msg;
}

function getEventsMessage(message) {
  // Write your event handling code here
  let eventlist = EventList.decode(message.content).events;
  eventlist.map(event => {
    if (event.eventType == "Agency/AddProduct") {
      console.log(event);
    }
  });
}

function EventSubscribe(Url) {
  const AgencyAdd = EventSubscription.create({
    eventType: "Agency/AddProduct"
  });

  const subsc_request = ClientEventsSubscribeRequest.encode({
    subscriptions: [AgencyAdd]
  }).finish();

  myStream.connect(() => {
    myStream
      .send(Message.MessageType.CLIENT_EVENTS_SUBSCRIBE_REQUEST, subsc_request)
      .then(response => {
        return ClientEventsSubscribeResponse.decode(response);
      })
      .then(decoded_resp => {
        console.log(checkStatus(decoded_resp));
      });
    myStream.onReceive(getEventsMessage);
  });
}

EventSubscribe(Url);
