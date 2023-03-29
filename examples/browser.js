import { TreeNews } from '@iam4x/treenews';

const treeNews = new TreeNews({
  autoStart: true,
  autoReconnect: true,
  apiKey: '118c3d61231260asad752856af08fsdiorcf63c3d04ba3f837bee4417b0881149e',
  onOpen: () => {
    console.log('Connected to Tree News');
  },
  onClose: () => {
    console.log('Disconnected from Tree News');
  },
  onNews: (news) => {
    console.log(JSON.stringify(news, null, 4));
  },
  onError: (error) => {
    console.error(error);
  },
});

// stop the connection after 10 seconds
// it wont reconnect even if autoReconnect is set to true
setTimeout(() => {
  treeNews.stop();
}, 10000);
