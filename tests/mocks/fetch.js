const response = (() => {
  const json = () => ({
    result: [{ user: 'yosept', score: '0' },
      { score: '140', user: 'Josh' },
      { user: 'Joseph', score: '100' },
      { user: 'Javier', score: '200' },
      { user: 'yosept', score: '0' },
      { user: 'Jim', score: '150' },
      { user: 'Josh', score: '120' },
      { user: 'Josh', score: '130' },
      { user: 'plyr', score: '38' },
      { user: 'Josh', score: '150' },
      { score: '20', user: 'Saul' },
      { user: 'plyr', score: '108' },
      { user: 'plyr', score: '11' },
      { user: 'yosept', score: '0' },
    ],
  });

  return { json };
})();

class URLSearchParams {
  constructor() {
    this.data = {};
  }

  append(key, value) {
    this.data[key] = value;
  }
}

const onlineData = {
  results: [],
};

const fetch = (url, options = null) => new Promise((resolve, reject) => {
  if (options) {
    if (options.method === 'POST') {
      if (url === 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/LWWHqD0A5Z7ib3isiCmA/scores') {
        onlineData.results.push(options.body.data);
        resolve({
          result: 'Leaderboard score created correctly.',
        });
      } else {
        reject(new Error('something went wrong'));
      }
    }
  }
  if (url === 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/LWWHqD0A5Z7ib3isiCmA/scores') {
    resolve(response);
  } else {
    reject(new Error('wrong URI'));
  }
});

export { fetch, URLSearchParams, onlineData };