const bettors = [
  "Chandler Cutrone", "Tanner King", "Eric Elliott", "Joe Efaw", "Ryan Hinerman",
  "Keaton Linger", "Foster Bates", "Ryan Elliott", "Chase Banker", "Tyler Phillips",
  "Corbin Sypult", "Maverick Myers", "Shawn Elliott"
];

const golfers = [
  "Scottie Scheffler", "Rory McIlroy", "Jon Rahm", "Collin Morikawa", "Ludvig Åberg",
  "Xander Schauffele", "Bryson DeChambeau", "Justin Thomas", "Brooks Koepka",
  "Hideki Matsuyama", "Jordan Spieth", "Viktor Hovland", "Tommy Fleetwood",
  "Patrick Cantlay", "Joaquín Niemann", "Shane Lowry", "Tyrrell Hatton",
  "Will Zalatoris", "Min Woo Lee", "Cameron Smith", "Russell Henley",
  "Robert MacIntyre", "Akshay Bhatia", "Tony Finau", "Corey Conners",
  "Wyndham Clark", "Jason Day", "Sepp Straka", "Sahith Theegala", "Dustin Johnson",
  "Sam Burns", "Tom Kim", "Adam Scott", "Keegan Bradley", "Harris English",
  "Justin Rose", "Denny McCarthy", "Thomas Detry", "Tiger Woods", "Erik van Rooyen",
  "Chris Kirk", "Dean Burmester", "Si Woo Kim", "Lucas Glover", "Adam Hadwin",
  "Phil Mickelson", "Patrick Reed", "Talor Gooch", "Francesco Molinari", "Abraham Ancer"
];

const odds = {
  "Scottie Scheffler": "+400",
  "Rory McIlroy": "+650",
  "Jon Rahm": "+1300",
  "Collin Morikawa": "+1800",
  "Ludvig Åberg": "+2200",
  "Xander Schauffele": "+1800",
  "Bryson DeChambeau": "+2000",
  "Justin Thomas": "+2500",
  "Brooks Koepka": "+3000",
  "Hideki Matsuyama": "+3000",
  "Jordan Spieth": "+3500",
  "Viktor Hovland": "+4000",
  "Tommy Fleetwood": "+4000",
  "Patrick Cantlay": "+4000",
  "Joaquín Niemann": "+4000",
  "Shane Lowry": "+3500",
  "Tyrrell Hatton": "+5500",
  "Will Zalatoris": "+6000",
  "Min Woo Lee": "+4500",
  "Cameron Smith": "+6000",
  "Russell Henley": "+4000",
  "Robert MacIntyre": "+5500",
  "Akshay Bhatia": "+5500",
  "Tony Finau": "+5500",
  "Corey Conners": "+5000",
  "Wyndham Clark": "+7000",
  "Jason Day": "+7000",
  "Sepp Straka": "+7500",
  "Sahith Theegala": "+5500",
  "Dustin Johnson": "+9000",
  "Sam Burns": "+7000",
  "Tom Kim": "+9000",
  "Adam Scott": "+12000",
  "Keegan Bradley": "+16000",
  "Harris English": "+17000",
  "Justin Rose": "+10000",
  "Denny McCarthy": "+28000",
  "Thomas Detry": "+16000",
  "Tiger Woods": "+14000",
  "Erik van Rooyen": "+18000",
  "Chris Kirk": "+16000",
  "Dean Burmester": "+20000",
  "Si Woo Kim": "+15000",
  "Lucas Glover": "+12000",
  "Adam Hadwin": "+15000",
  "Phil Mickelson": "+17000",
  "Patrick Reed": "+13000",
  "Talor Gooch": "+15000",
  "Francesco Molinari": "+15000",
  "Abraham Ancer": "+15000"
};

let draftOrder = [...bettors, ...bettors.slice().reverse()];
let picks = JSON.parse(localStorage.getItem("picks")) || {};
let currentTurn = Object.keys(picks).length;

function updateUI() {
  document.getElementById("pick-board").innerHTML = "";
  for (let i = 0; i < draftOrder.length; i++) {
    const name = draftOrder[i];
    const golfer = picks[i] || "(waiting...)";
    const li = document.createElement("li");
    li.textContent = `${name}: ${golfer}`;
    document.getElementById("pick-board").appendChild(li);
  }

  if (currentTurn < draftOrder.length) {
    document.getElementById("current-turn").textContent = `Current Turn: ${draftOrder[currentTurn]}`;
    if (!picks[currentTurn]) {
      showPickForm();
    } else {
      document.getElementById("pick-form").style.display = "none";
    }
  } else {
    document.getElementById("current-turn").textContent = "Draft complete.";
    document.getElementById("pick-form").style.display = "none";
  }

  const yourPickList = Object.entries(picks)
    .filter(([k, v]) => draftOrder[k] === draftOrder[currentTurn])
    .map(([k, v]) => `<p>You picked: ${v}</p>`)
    .join("");
  document.getElementById("your-picks").innerHTML = yourPickList;
}

function showPickForm() {
  const select = document.getElementById("golfer-select");
  select.innerHTML = "";
  const pickedGolfers = Object.values(picks);
  golfers.forEach(golfer => {
    if (!pickedGolfers.includes(golfer)) {
      const option = document.createElement("option");
      option.value = golfer;
      option.textContent = golfer;
      select.appendChild(option);
    }
  });
  document.getElementById("pick-form").style.display = "block";
}

function makePick() {
  const pick = document.getElementById("golfer-select").value;
  picks[currentTurn] = pick;
  localStorage.setItem("picks", JSON.stringify(picks));
  currentTurn++;
  updateUI();
}

function loadOdds() {
  const oddsList = document.getElementById("odds-board");
  oddsList.innerHTML = "";
  Object.keys(odds).forEach(golfer => {
    const li = document.createElement("li");
    li.textContent = `${golfer}: ${odds[golfer]}`;
    oddsList.appendChild(li);
  });
}

window.onload = function () {
  loadOdds();
  updateUI();
};
