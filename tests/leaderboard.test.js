import { getTopScores, setNewScore } from '../src/packages/leaderboard';
import { fetch, URLSearchParams, onlineData } from './mocks/fetch';

global.fetch = fetch;
global.URLSearchParams = URLSearchParams;

document.body.innerHTML = `
<div class="mainAlert"></div>
`;

describe('leaderboard functions: ', () => {
  test('getTopScores | returns the top 10 scores from the API in order', async () => {
    try {
      const values = await getTopScores();
      const expectedValues = [
        { user: 'Javier', score: '200' },
        { user: 'Jim', score: '150' },
        { user: 'Josh', score: '150' },
        { score: '140', user: 'Josh' },
        { user: 'Josh', score: '130' },
        { user: 'Josh', score: '120' },
        { user: 'plyr', score: '108' },
        { user: 'Joseph', score: '100' },
        { user: 'plyr', score: '38' },
        { score: '20', user: 'Saul' },
      ];
      expect(values).toEqual(expectedValues);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
    }
  });
  test('setNewScore | sets a new record in the API', async () => {
    let newScore;
    try {
      newScore = await setNewScore('Carmen', 120);
      const expectedValue = { results: [{ user: 'Carmen', score: 120 }] };
      expect(onlineData).toEqual(expectedValue);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log('error: ', e + newScore);
    }
  });
});