export interface TreeNewsOptions {
  autoStart?: boolean;
  autoReconnect?: boolean;
  autoReconnectTimeout?: number;
  apiKey?: string;
  debug?: boolean;
  onOpen?: (event: Event) => void;
  onError?: (event: Event) => void;
  onNews?: (news: News) => void;
  onMessage?: (event: MessageEvent) => void;
  onClose?: (event: CloseEvent) => void;
}

export interface News {
  _id: string;
  body?: string;
  coin?: string;
  icon?: string;
  info?: Info;
  link?: string;
  time: number;
  type?: string;
  image?: string;
  title: string;
  actions?: Action[];
  requireInteraction?: boolean;
  en?: string;
  url?: string;
  delay?: number;
  source?: string;
  symbols?: string[];
  firstPrice?: Record<string, number>;
  telegramId?: string;
}

export interface Info {
  isQuote: boolean;
  isReply: boolean;
  isRetweet: boolean;
  twitterId: string;
}

export interface Action {
  icon: string;
  title: string;
  action: string;
}
