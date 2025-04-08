const bettors = [
  "Chandler Cutrone", "Tanner King", "Eric Elliott", "Joe Efaw", "Ryan Hinerman",
  "Keaton Linger", "Foster Bates", "Ryan Elliott", "Chase Banker", "Tyler Phillips",
  "Corbin Sypult", "Maverick Myers", "Shawn Elliott"
];
const golfers = ['Scottie Scheffler', 'Rory McIlroy', 'Jon Rahm', 'Collin Morikawa', 'Ludvig Aberg', 'Xander Schauffele', 'Bryson DeChambeau', 'Justin Thomas', 'Hideki Matsuyama', 'Joaquin Niemann', 'Viktor Hovland', 'Brooks Koepka', 'Jordan Spieth', 'Patrick Cantlay', 'Tommy Fleetwood', 'Shane Lowry', 'Tyrrell Hatton', 'Will Zalatoris', 'Min Woo Lee', 'Cameron Smith', 'Russell Henley', 'Robert MacIntyre', 'Akshay Bhatia', 'Tony Finau', 'Corey Conners', 'Wyndham Clark', 'Jason Day', 'Sepp Straka', 'Sahith Theegala', 'Dustin Johnson', 'Sam Burns', 'Tom Kim', 'Adam Scott', 'Keegan Bradley', 'Harris English', 'Justin Rose', 'Denny McCarthy', 'Thomas Detry', 'Tiger Woods', 'Erik van Rooyen', 'Chris Kirk', 'Dean Burmester', 'Si Woo Kim', 'Lucas Glover', 'Adam Hadwin', 'Phil Mickelson', 'Patrick Reed', 'Talor Gooch', 'Francesco Molinari', 'Abraham Ancer'];
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
  const odds = golfers.map((g, i) => [g, "+1000"]); // Dummy odds for all
  const oddsList = document.getElementById("odds-board");
  odds.forEach(([name, odd]) => {
    const li = document.createElement("li");
    li.textContent = `${name}: ${odd}`;
    oddsList.appendChild(li);
  });
}

window.onload = function () {
  loadOdds();
  updateUI();
};