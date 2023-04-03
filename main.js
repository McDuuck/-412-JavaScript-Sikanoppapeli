const radios = document.getElementsByName('noppa');
const pelaajat = document.getElementById('pelaajat');
const lisaa_pelaaja = document.getElementById('lisaa');
const pisteet_maara = document.getElementById('pisteet');
const playerList = document.querySelector('header > p');
const pelaa_button = document.getElementById('pelaa');
const poisto_section = document.getElementById('poisto');
const peli_section = document.getElementById('peli');
const pyorayta = document.getElementById('pyorayta');
const ohjeet = document.getElementById('ohjeet');
const ohjeet_button = document.getElementById('ohjebutton');
const vaihda = document.getElementById('vaihda');
const triplat = document.getElementById('triplat');


ohjeet.style.display = 'none';
peli_section.style.display = 'none';
let pisteet = 100;
let pelaajatList = [];
let currentPlayerIndex = 0;

lisaa_pelaaja.addEventListener('click', function() {
  const playerName = pelaajat.value;
  const playerScore = 0; 
  const playerNameNode = document.createTextNode(playerName + ' (' + playerScore + ') - ');
  const span = document.createElement('span');
  span.appendChild(playerNameNode);
  playerList.appendChild(span);
  const newPlayer = { name: playerName, score: playerScore };
  pelaajatList.push(newPlayer);
});

for (const radio of radios) {
  radio.addEventListener('click', function() {
    console.log(radio.value);
  });
}

pelaa_button.addEventListener('click', function() {
  const pisteet_value = pisteet_maara.value;
  if (pisteet_value != '') {
    pisteet = pisteet_value;
  }

  const currentPlayerElement = document.getElementById('current-player');
  currentPlayerElement.textContent = `Nykyinen pelaaja: ${pelaajatList[currentPlayerIndex].name}`;

  poisto_section.style.display = 'none';
  peli_section.style.display = 'block';

  const selectedRadio = document.querySelector('input[name="noppa"]:checked');
  const numberOfDice = selectedRadio.value;
  
  const diceContainer = document.getElementById('dice-container');
  diceContainer.innerHTML = '';
  
  for (let i = 0; i < numberOfDice; i++) {
    const die = document.createElement('div');
    die.classList.add('die');
    diceContainer.appendChild(die);
  }

});

let kierros_pisteet = 0;
let rolledOne = false;
let firstRoll = null;
let doubleCounter = 0; 

function rollDice() {
  const ykkonen = document.getElementById('ykkonen');
  const radios = document.getElementsByName('noppa');
  let numDice = 2;
  for (const radio of radios) {
    if (radio.checked) {
      numDice = parseInt(radio.value);
      break;
    }
  }

  const diceContainer = document.getElementById('dice-container');
  diceContainer.innerHTML = '';
  let roundScore = 0;
  rolledOne = false;
  firstRoll = null;
  
  for (let i = 0; i < numDice; i++) {
    const result = Math.floor(Math.random() * 6) + 1;
    const die = document.createElement('div');
    die.classList.add('die');
    die.textContent = result;
    roundScore += result;
    if (result === 1) {
      rolledOne = true;
      ykkonen.textContent = 'Heitit 1:sen, vuoro seuraavalle';
    }
    if (firstRoll === null) {
      firstRoll = result;
    } else if (firstRoll === result && numDice === 2) {
      roundScore *= 2;
      doubleCounter++;
      console.log(doubleCounter) 
    }
    diceContainer.appendChild(die);
  }

  const roundScoreSection = document.getElementById('kierrosten_pisteet');
  kierros_pisteet += rolledOne ? 0 : roundScore;
  roundScoreSection.textContent = `Kierroksen pisteet: ${kierros_pisteet}`;
  if (rolledOne) {
    vaihda.click();
  }

  if (doubleCounter === 3) {
    triplat.textContent = 'Heitit 3 kertaa tuplat! Menetit vuorosi ja pisteesi :('
    kierros_pisteet = 0;
    vaihda.click(); 
    doubleCounter = 0; 
  }
}

vaihda.addEventListener('click', function() {
  const currentPlayer = pelaajatList[currentPlayerIndex];
  if (!rolledOne) {
    currentPlayer.score += kierros_pisteet;
  }
  doubleCounter = 0;
  kierros_pisteet = 0;
  rolledOne = false;
  currentPlayer.score += kierros_pisteet;
  kierros_pisteet = 0;
  const playerSpan = playerList.children[currentPlayerIndex];
  playerSpan.textContent = `${currentPlayer.name} (${currentPlayer.score}) - `;
  currentPlayerIndex = (currentPlayerIndex + 1) % pelaajatList.length;
  if (currentPlayer.score >= pisteet) {
    const winnerDiv = document.getElementById('winner');
    winnerDiv.textContent = `${currentPlayer.name} voitti!`;
    pyorayta.style.display = "none";
    vaihda.style.display = "none";
  
  } 
  const nextPlayer = pelaajatList[currentPlayerIndex];
  const roundScoreSection = document.getElementById('kierrosten_pisteet');
  const nextPlayerName = nextPlayer.name; 
  const currentPlayerElement = document.getElementById('current-player');
  roundScoreSection.textContent = 'Kierroksen pisteet:';
  currentPlayerElement.textContent = `Nykyinen pelaaja: ${nextPlayerName}`; 
  
});

pyorayta.addEventListener('click', function() {
  var triplat = document.getElementById('triplat');
  var ykkonen = document.getElementById('ykkonen');
  ykkonen.textContent = '';
  triplat.textContent = '';
  rollDice();
});

ohjeet_button.addEventListener('click', function() {
  if (ohjeet.style.display == 'none'){
    ohjeet.style.display = 'block';
  }
  else if (ohjeet.style.display == 'block'){
    ohjeet.style.display = 'none'
  }
  
})
