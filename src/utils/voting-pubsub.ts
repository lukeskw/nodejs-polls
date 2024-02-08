interface subscriberParams {
  pollOptionId: string
  votes: number
}

type Subscriber = ( params: subscriberParams ) => void

interface Channels {
  [key: string]: Subscriber[];
}

const channels: Channels = {};

function subscribe(pollId: string, subscriber: Subscriber) {
  if (!channels[pollId]) {
    channels[pollId] = [];
  }
  channels[pollId].push(subscriber);
}

function publish(pollId: string, message: subscriberParams) {
  if (!channels[pollId]) {
    return;
  }
  for (const subscriber of channels[pollId]) {
    subscriber(message);
  }
}

export const voting = {
  subscribe,
  publish
};
