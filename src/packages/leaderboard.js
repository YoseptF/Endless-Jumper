import 'regenerator-runtime';

const compare = (a, b) => {
  const userA = parseInt(a.score, 10);
  const userB = parseInt(b.score, 10);

  let comparison = 0;
  if (userA < userB) {
    comparison = 1;
  } else if (userA > userB) {
    comparison = -1;
  }
  return comparison;
};

const getTopScores = async () => {
  const requestOptions = {
    method: 'GET',
    redirect: 'follow',
  };

  try {
    const response = await fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/LWWHqD0A5Z7ib3isiCmA/scores', requestOptions);
    const json = await response.json();
    const sorted = json.result.sort(compare);
    sorted.splice(10);
    return sorted;
  } catch (e) {
    return e;
  }
};

const setNewScore = async (user, score) => {
  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');

  const urlencoded = new URLSearchParams();
  urlencoded.append('user', user);
  urlencoded.append('score', score);

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: urlencoded,
    redirect: 'follow',
  };

  try {
    const response = await fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/LWWHqD0A5Z7ib3isiCmA/scores', requestOptions);
    response.text();
  } catch (e) {
    // doSomething
  }
};

export { getTopScores, setNewScore };