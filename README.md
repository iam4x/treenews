# TreeNews

> An universal JavaScript client of [TreeNews](https://news.treeofalpha.com/) WebSocket
>
> Written in TypeScript with definitions typings

## Installation

- `$ npm install --save @iam4x/treenews`

If you are working in a node.js/server environment, you need to install [ws](https://www.npmjs.com/package/ws) package as well:

- `$ npm install --save ws`

## How to / Usage

Simple example:

```ts
import { TreeNews } from '@iam4x/treenews';

const treeNews = new TreeNews({
  onNews: (news) => console.log(JSON.stringify(news, null, 4));
});

// connect to websocket
treeNews.start();

// close connection to websocket
treeNews.stop();
```

## Options

```ts
{
  autoReconnect?: boolean; // default: true
  autoReconnectTimeout?: number; // default: to 1 second (in seconds)
  autoStart?: boolean;
  apiKey?: string;
  debug?: boolean;
  onOpen?: (event: Event) => void;
  onError?: (event: Event) => void;
  onNews?: (news: News) => void;
  onMessage?: (event: MessageEvent) => void;
  onClose?: (event: CloseEvent) => void;
}
```

## Donations

If you found this project interesting or useful, create accounts with my referral links:

- [Bybit](https://partner.bybit.com/b/iam4x) [Up to $30,000 deposit bonus - no KYC required]
- [Binance](https://accounts.binance.com/en/register?ref=KOLLSXK0)

Or buy me a coffee with a crypto donation:

- ETH/BSC/MATIC: `0xFF2da578C73bC694fd767A1CC77160002C2003E6`

## Changelog

### v1.0.0 - (03/29/2023)

- Initial release

## Contributions & Pull Requests

Feel free to create issues, PRs and start a discussion ❤️
