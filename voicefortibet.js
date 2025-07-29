let tenzin;
let tenzinImg, LhamoImg, sonamImg, chipImg;
let currentLevel = 1;
let levelComplete = false;
let wires = [];
let wiresCollected = 0;

let friends = [];
let chip;
let score = 0;
let message = "";

function preload() {
  tenzinImg = loadImage("tenzin.png");
  LhamoImg = loadImage("Lhamo.png");
  sonamImg = loadImage("sonam.png");
  chipImg = loadImage("chip.png");
}

function setup() {
  createCanvas(600, 400);
  if (currentLevel === 1) {
    setupLevel1();
  } else if (currentLevel === 2) {
    setupLevel2();
  }
}

function draw() {
  if (currentLevel === 1) {
    drawLevel1();
    // Remove automatic transition for better control
  } else if (currentLevel === 2) {
    drawLevel2();
  }
}

function setupLevel1() {
  tenzin = createVector(50, height / 2);
  friends = [
    { x: 150, y: 100, collected: false, name: "Sonam", location: "Exile – Dharamsala", message: "I'm ready to help share our stories from exile." },
    { x: 250, y: 200, collected: false, name: "Lhamo", location: "Inside Tibet – Gyantse", message: "This truth must reach the world, even if they watch me." }
  ];
  chip = { x: 500, y: 300, collected: false };
  score = 0;
  levelComplete = false;
}
function drawLevel1() {
  background(230);
  image(tenzinImg, tenzin.x, tenzin.y, 80, 80);
  moveTenzin();

  // Draw and collect friends
  for (let i = 0; i < friends.length; i++) {
    let f = friends[i];
    if (!f.collected) {
      if (f.name === "Sonam") {
        image(sonamImg, f.x, f.y, 70, 80);
      } else if (f.name === "Lhamo") {
        image(LhamoImg, f.x, f.y, 80, 80);
      }
      if (dist(tenzin.x, tenzin.y, f.x, f.y) < 25) {
        f.collected = true;
        score++;
        message = `${f.name} (${f.location}): ${f.message}`;
        setTimeout(() => { message = ""; }, 4000);
      }
    }
  }

  // Draw and collect the chip only after both friends are found
  if (score === friends.length && !chip.collected) {
    image(chipImg, chip.x, chip.y, 40, 40);
    if (dist(tenzin.x, tenzin.y, chip.x, chip.y) < 25) {
      chip.collected = true;
      levelComplete = true; // Ensure this is only set once
      message = "The chip is secured. The digital resistance begins.";
    }
  }

  // Display messages
  if (message !== "") {
    fill(0);
    textSize(14);
    text(message, 40, height - 30);
  }

  fill(0);
  textSize(16);
  text("Allies Connected: " + score + " / " + friends.length, 20, 30);

  // Show completion message with transition prompt
  if (levelComplete) {
    fill(0, 150, 0);
    textSize(18);
    textAlign(CENTER);
    text("Voices of Tibet: Level 1 Complete!", width / 2, height / 2);
    text("You've gathered your friends and the chip!", width / 2, height / 2 + 30);
    text("Click to continue to Level 2.", width / 2, height / 2 + 60);
    textAlign(LEFT);
  }
}



function mousePressed() {
  if (levelComplete && currentLevel === 1) {
    currentLevel = 2;
    setup();
  }
}

function setupLevel2() {
  // Example setup for wires
  wires = [
    { x: 100, y: 150, collected: false },
    { x: 300, y: 250, collected: false },
    // Add more wires if needed
  ];
  // Setup for level 2 can include new friends, obstacles, or goals
  tenzin.x = 50;
  tenzin.y = height / 2;
  // Initialize any new objects or variables for level 2
  score = 0;
  levelComplete = false;
}

function drawLevel2() {
  background(200); // Different background for distinction

  // Draw Tenzin
  image(tenzinImg, tenzin.x, tenzin.y, 80, 80);
  moveTenzin();

  // Draw and collect wires
  for (let i = 0; i < wires.length; i++) {
    let wire = wires[i];
    if (!wire.collected) {
      fill(150, 75, 0); // Wire color
      ellipse(wire.x, wire.y, 20, 20); // Change shape as desired

      if (dist(tenzin.x, tenzin.y, wire.x, wire.y) < 25) {
        wire.collected = true;
        wiresCollected++;
        message = "Wire collected!";
        setTimeout(() => { message = ""; }, 2000); // Optional feedback
      }
    }
  }

  // Display message if any
  if (message !== "") {
    fill(0);
    textSize(14);
    text(message, 40, height - 30);
  }

  // Display wire collection progress
  fill(0);
  textSize(16);
  text("Wires Collected: " + wiresCollected + " / " + wires.length, 20, 30);
}
let coins = []; // Array to store coin objects
let coinsCollected = 0; // To keep track of collected coins

function setupLevel2() {
  tenzin.x = 50;
  tenzin.y = height / 2;

  wires = [
    { x: 100, y: 150, collected: false },
    { x: 300, y: 250, collected: false },
  ];

  coins = [
    { x: 200, y: 100, collected: false },
    { x: 400, y: 300, collected: false },
    // Add more coins as desired
  ];

  score = 0;
  wiresCollected = 0;
  coinsCollected = 0;
  levelComplete = false;
}
function drawLevel2() {
  background(200);

  // Draw Tenzin
  image(tenzinImg, tenzin.x, tenzin.y, 80, 80);
  moveTenzin();

  // Draw and collect wires
  for (let i = 0; i < wires.length; i++) {
    let wire = wires[i];
    if (!wire.collected) {
      fill(150, 75, 0);
      ellipse(wire.x, wire.y, 20, 20);

      if (dist(tenzin.x, tenzin.y, wire.x, wire.y) < 25) {
        wire.collected = true;
        wiresCollected++;
        message = "Wire collected!";
        setTimeout(() => { message = ""; }, 2000);
      }
    }
  }

  // Draw and collect coins
  for (let i = 0; i < coins.length; i++) {
    let coin = coins[i];
    if (!coin.collected) {
      fill(255, 215, 0); // Gold color for coins
      ellipse(coin.x, coin.y, 15, 15); // Coin size

      if (dist(tenzin.x, tenzin.y, coin.x, coin.y) < 25) {
        coin.collected = true;
        coinsCollected++;
        message = "Coin collected!";
        setTimeout(() => { message = ""; }, 2000);
      }
    }
  }

  // Display wire and coin collection progress
  fill(0);
  textSize(16);
  text("Wires Collected: " + wiresCollected + " / " + wires.length, 20, 30);
  text("Coins Collected: " + coinsCollected + " / " + coins.length, 20, 50);
}
function moveTenzin() {
  if (keyIsDown(LEFT_ARROW)) tenzin.x -= 2;
  if (keyIsDown(RIGHT_ARROW)) tenzin.x += 2;
  if (keyIsDown(UP_ARROW)) tenzin.y -= 2;
  if (keyIsDown(DOWN_ARROW)) tenzin.y += 2;
  tenzin.x = constrain(tenzin.x, 0, width);
  tenzin.y = constrain(tenzin.y, 0, height);
}

// Show completion message with transition prompt
  if (levelComplete) {
    fill(0, 150, 0);
    textSize(18);
    textAlign(CENTER);
    text("Voices of Tibet: Level 2 Complete!", width / 2, height / 2);
    text("You've gathered your friends and the chip!", width / 2, height / 2 + 30);
    text("Click to continue to Level 3.", width / 2, height / 2 + 60);
    textAlign(LEFT);
  }

