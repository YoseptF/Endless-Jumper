import 'regenerator-runtime'

const compare = (a, b) => {
  const userA = parseInt(a.score);
  const userB = parseInt(b.score);

  let comparison = 0;
  if (userA < userB) {
    comparison = 1;
  } else if (userA > userB) {
    comparison = -1;
  }
  return comparison;
}

const getTopScores = async () => {
  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };

  try {
    let response = await fetch("https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/LWWHqD0A5Z7ib3isiCmA/scores", requestOptions)
    let json = await response.json()
    let sorted = json.result.sort(compare)
    sorted.splice(10)
    return sorted
  }
  catch{
    //something
  }
}

const setNewScore = async (user, score) => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

  var urlencoded = new URLSearchParams();
  urlencoded.append("user", user);
  urlencoded.append("score", score);

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: urlencoded,
    redirect: 'follow'
  };

  try {
    const response = await fetch("https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/LWWHqD0A5Z7ib3isiCmA/scores", requestOptions)
    const result = await response.text()
    console.log(user, score);
    console.log(result);
  }
  catch{
    //doSomething
  }
}

export { getTopScores, setNewScore }