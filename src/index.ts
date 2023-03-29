/* eslint-disable no-console */

import type { News, TreeNewsOptions } from './types';

const WEBSOCKET_ENDPOINT = 'wss://news.treeofalpha.com/ws';

class TreeNews {
  private ws?: WebSocket;
  private options: TreeNewsOptions;

  private isDisposed = false;

  constructor(options: TreeNewsOptions) {
    this.options = options;
    this.options.autoReconnect =
      options.autoReconnect === undefined ? true : options.autoReconnect;

    if (this.options.autoStart) {
      this.start();
    }
  }

  start = () => {
    this.isDisposed = false;
    this.ws = new WebSocket(WEBSOCKET_ENDPOINT);
    this.ws.addEventListener('open', this.onOpen);
    this.ws.addEventListener('close', this.onClose);
    this.ws.addEventListener('message', this.onMessage);
    this.ws.addEventListener('error', this.onError);
  };

  stop = () => {
    this.isDisposed = true;
    this.ws?.close?.();
  };

  private onMessage = (event: MessageEvent) => {
    if (this.options.debug) {
      console.log(`[TreeNews] message: ${event.data}`);
    }

    if (this.options.onMessage) {
      this.options.onMessage(event.data);
    }

    try {
      const json = JSON.parse(event.data);
      if ('_id' in json && 'title' in json && 'time' in json) {
        if (this.options.onNews) {
          this.options.onNews(json as News);
        }
      }
    } catch (error) {
      if (this.options.debug) {
        console.error(`[TreeNews] error parsing message`);
        console.error(error);
      }

      if (this.options.onError) {
        this.options.onError(error as Event);
      }
    }
  };

  private onOpen = (event: Event) => {
    if (this.options.debug) {
      console.log(`[TreeNews] connected`);
    }

    if (this.options.apiKey) {
      this.ws?.send?.(`login ${this.options.apiKey}`);
    }

    if (this.options.onOpen) {
      this.options.onOpen(event);
    }
  };

  private onError = (error: Event) => {
    if (this.options.debug) {
      console.error(`[TreeNews] error`);
      console.error(error);
    }

    if (this.options.onError) {
      this.options.onError(error);
    }
  };

  private onClose = (event: CloseEvent) => {
    if (this.options.debug) {
      console.log(`[TreeNews] disconnected`);
    }

    if (this.options.autoReconnect && !this.isDisposed) {
      const timeout = this.options.autoReconnectTimeout || 1;

      this.ws?.removeEventListener?.('open', this.onOpen);
      this.ws?.removeEventListener?.('close', this.onClose);
      this.ws?.removeEventListener?.('message', this.onMessage);
      this.ws?.removeEventListener?.('error', this.onError);
      this.ws = undefined;

      if (this.options.debug) {
        console.log(`[TreeNews] reconnecting in ${timeout} second`);
      }

      setTimeout(() => {
        if (this.options.debug) {
          console.log(`[TreeNews] reconnecting`);
        }

        this.start();
      }, timeout * 1000);
    }

    if (this.options.onClose) {
      this.options.onClose(event);
    }
  };
}

export { TreeNews };
