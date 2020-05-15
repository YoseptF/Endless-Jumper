import LocalStorageMock from './mocks/localstorage';
import {
  setDOMUsername, getDOMUsername, setDOMLoading, setDOMleaderboard, deleteDOMLeaderboard,
} from '../src/packages/DOMInteractions';

global.localStorage = LocalStorageMock();

describe('DOMInteractions functions: ', () => {
  document.body.innerHTML = `
  <div class="dummy-selector"></div>
  <div class="usernameInput"></div>
  `;

  describe(
    'setDOMUsername | checks for a username in the localstorage'
    + 'then add an input to the screen',
    () => {
      test("if it doesn't find one, defaults to plyr ", () => {
        setDOMUsername();
        const { value } = document.querySelector('.usernameInput input');
        expect(value).toEqual('plyr');
      });
      test('if it finds one, it shows it in the form', () => {
        localStorage.setItem('username', 'joseph');
        setDOMUsername();
        const { value } = document.querySelector('.usernameInput input');
        expect(value).toEqual('joseph');
        localStorage.clear();
      });
    },
  );

  describe('getDOMUsername | Takes the value from the input in screen', () => {
    test("if it's empty it defaults to plyr", () => {
      document.querySelector('.usernameInput').innerHTML = `
      <input value=""></input>
      `;
      const value = getDOMUsername();

      expect(value).toEqual('plyr');
    });
    test("if it's not empty it uses the value", () => {
      document.querySelector('.usernameInput').innerHTML = `
      <input value="joseph"></input>
      `;
      const value = getDOMUsername();

      expect(value).toEqual('joseph');
    });
  });

  test('setDOMLoading | adds a loader to the selector', () => {
    setDOMLoading('.dummy-selector');
    const value = document.querySelector('.dummy-selector').innerHTML;

    expect(value).toEqual('<i class="fas fa-spinner fa-spin"></i>');
  });

  test('setDOMleaderboard | displays the list given on a table in the DOM', () => {
    const top = [
      {
        user: 'joseph',
        score: '100',
      },
      {
        user: 'jake',
        score: '200',
      },
      {
        user: 'jim',
        score: '300',
      },
      {
        user: 'geralt', // de Rivia
        score: '400',
      },
    ];
    setDOMleaderboard(top);
    const values = [];
    const domValues = document.querySelectorAll('td');
    values[0] = { user: domValues[0].innerHTML, score: domValues[1].innerHTML };
    values[1] = { user: domValues[2].innerHTML, score: domValues[3].innerHTML };
    values[2] = { user: domValues[4].innerHTML, score: domValues[5].innerHTML };
    values[3] = { user: domValues[6].innerHTML, score: domValues[7].innerHTML };

    expect(values).toEqual(top);
  });

  test('deleteDOMLeaderboard | deletes the leaderboard from the view', () => {
    document.querySelector('.usernameInput').innerHTML = 'something';
    deleteDOMLeaderboard();
    const value = document.querySelector('.usernameInput').innerHTML;

    expect(value).toEqual('');
  });
});