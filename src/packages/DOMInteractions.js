const gyroscopePlayerMovement = (plyr) => {
  if (window.DeviceOrientationEvent) {
    window.addEventListener('deviceorientation', event => {
      if (event.gamma < -3) {
        plyr.setVelocityX(event.gamma * 0.4);
      }
      if (event.gamma > 3) {
        plyr.setVelocityX(event.gamma * 0.4);
      }
    }, true);
  }
};

const setDOMUsername = (Xpos = null, Ypos = null, message = null) => {
  const username = localStorage.getItem('username');
  const userShown = username === null ? 'plyr' : username;
  const usernameInput = `
  <div class="inputBox" ${Xpos ? `style="left:${Xpos}%;top:${Ypos || 0}%;transform:translate(-${Xpos}%,-${Ypos || 0}%);"` : ''}>
    <label>${message || ''}</label>
    <input type="text" placeholder="Enter your username" value="${userShown}" pattern="[A-Za-z0-9]+"></input>
  </div>
  `;

  document.querySelector('.usernameInput').innerHTML = usernameInput;
};

const getDOMUsername = () => {
  let username = document.querySelector('.usernameInput input').value;
  username = username === '' ? 'plyr' : username;
  localStorage.setItem('username', username);
  document.querySelector('.usernameInput').innerHTML = '';
  return username;
};

const setDOMLoading = (selector) => {
  document.querySelector(selector).innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
};

const setDOMleaderboard = (top) => {
  const leaderBoardsWrapper = document.querySelector('.usernameInput');
  let ScoresTr = '';
  top.forEach(val => {
    ScoresTr += `
    <tr>
      <td>${val.user}</td>
      <td>${val.score}</td>
    </tr>
    `;
  });
  leaderBoardsWrapper.innerHTML = `
  <table>
    <thead>
      <tr>
        <th colspan ="2">Top 10</th>
      </tr>
      <tr>
        <th>User</th>
        <th>Score</th>
      </tr>
    </thead>
    <tbody>
      ${ScoresTr}
    </tbody>
  </table>
  `;
};

const deleteDOMLeaderboard = () => {
  document.querySelector('.usernameInput').innerHTML = '';
};

const setDOMAlert = (message) => {
  const alert = `
    <span>${message}</span>
  `;

  const mainAlert = document.querySelector('.mainAlert');

  mainAlert.innerHTML = alert;

  setTimeout(() => {
    document.querySelector('.mainAlert span').classList.add('hidden');
  }, 1500);
};

export {
  setDOMAlert,
  gyroscopePlayerMovement,
  setDOMUsername,
  getDOMUsername,
  setDOMleaderboard,
  deleteDOMLeaderboard,
  setDOMLoading,
};