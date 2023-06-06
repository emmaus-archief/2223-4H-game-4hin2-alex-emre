/* Game opdracht
   Informatica - Emmauscollege Rotterdam
   Template voor een game in JavaScript met de p5 library

   Begin met dit template voor je game opdracht,
   voeg er je eigen code aan toe.
 */

/*
 * instellingen om foutcontrole van je code beter te maken 
 */
///<reference path="p5.global-mode.d.ts" />
"use strict"

/* ********************************************* */
/* globale variabelen die je gebruikt in je game */
/* ********************************************* */

var aantal = 0;
var punt = 0;

const SPELEN = 1;
const GAMEOVER = 2;
const UITLEG = 3;

var spelStatus = UITLEG;
const NAAR_LINKS = 65;
const naar_links = 37;
const NAAR_RECHTS = 68;
const naar_rechts = 39;
const RECHTDOOR = 87;
const rechtdoor = 38;
const ACHTERUIT = 83;
const achteruit = 40;

var BORDER_X_LEFT = 400;
var BORDER_X_RIGHT = 900;
var BORDER_Y_TOP = 200;
var BORDER_Y_BOTTOM = 650;
var SPELERGROOTTE = 50;


var spelerX = 600; // x-positie van speler
var spelerY = 600; // y-positie van speler
var snelheidspeler = 5;
var appelX = 500;
var appelY = 500;

/* ********************************************* */
/* functies die je gebruikt in je game           */
/* ********************************************* */

/**
 * Updatet globale variabelen met posities van speler, vijanden en kogels
 */

var beweegAlles = function() {
  // speler
  if (keyIsDown(NAAR_LINKS)) {
    spelerX = spelerX - snelheidspeler;
  }
  if (keyIsDown(naar_links)) {
    spelerX = spelerX - snelheidspeler;
  }
  if (keyIsDown(NAAR_RECHTS)) {
    spelerX = spelerX + snelheidspeler;
  }
  if (keyIsDown(naar_rechts)) {
    spelerX = spelerX + snelheidspeler;
  }
  if (keyIsDown(RECHTDOOR)) {
    spelerY = spelerY - snelheidspeler;
  }
  if (keyIsDown(rechtdoor)) {
    spelerY = spelerY - snelheidspeler;
  }
  if (keyIsDown(ACHTERUIT)) {
    spelerY = spelerY + snelheidspeler;
  }
  if (keyIsDown(achteruit)) {
    spelerY = spelerY + snelheidspeler;
  }
  
  // vijand

  // kogel
};

/**
 * Checkt botsingen
 * Verwijdert neergeschoten dingen
 * Updatet globale variabelen punten en health
 */
var verwerkBotsing = function() {
  // botsing speler tegen appel
  if (spelerX - appelX < 50 &&
    spelerX - appelX > -50 &&
    spelerY - appelY < 50 &&
    spelerY - appelY > -50) {
    punt = punt + 1;
    appelX = random(400, 800)
    console.log('punt');
  }
  // botsing speler tegen speelveld


  // update punten en health

};

/**
 * Tekent spelscherm
 */
var tekenAlles = function() {
  // achtergrond
  fill("red");
  rect(0, 0, 1280, 720);
  stroke('white');

   
  // border van het speelveld
  rect(400, 200, 500, 500)



  // appel
  fill('green')
  rect(appelX - 25, appelY - 25, 50, 50);
  fill('black');
  ellipse(appelX, appelY, 10, 10);


  // speler
  fill("white");
  rect(spelerX - 25, spelerY - 25, 50, 50);
  fill("black");
  ellipse(spelerX, spelerY, 10, 10);

  // punten en health
  textSize(30);
  fill('white');
  text("score:"+ punt , 100, 100);


};

/**
 * return true als het gameover is
 * anders return false
 */

var checkGameOver = function() {
  if (spelerX < BORDER_X_LEFT + SPELERGROOTTE / 2) {
    return true;
  }
  if (spelerY < BORDER_Y_TOP + SPELERGROOTTE / 2) {
    return true;
  }
  if (spelerX > BORDER_X_RIGHT - SPELERGROOTTE / 2) {
    return true;
  }
  if (spelerY > BORDER_Y_BOTTOM + SPELERGROOTTE / 2) {
    return true;
  }
  // check of HP 0 is , of tijd op is, of ...
  return false;
};

/* ********************************************* */
/* setup() en draw() functies / hoofdprogramma   */
/* ********************************************* */

/**
 * setup
 * de code in deze functie wordt één keer uitgevoerd door
 * de p5 library, zodra het spel geladen is in de browser
 */
function setup() {
  // Maak een canvas (rechthoek) waarin je je speelveld kunt tekenen
  createCanvas(1280, 720);

  // Kleur de achtergrond blauw, zodat je het kunt zien
  background('blue');
}

/**
 * draw
 * de code in deze functie wordt 50 keer per seconde
 * uitgevoerd door de p5 library, nadat de setup functie klaar is
 */
function draw() {
  if (spelStatus === SPELEN) {
    beweegAlles();
    verwerkBotsing();
    tekenAlles();
    if (checkGameOver()) {
      spelStatus = GAMEOVER;
    }
    console.log('spelen');
  }
  if (spelStatus === GAMEOVER) {
    // teken game-over scherm
    console.log('game over');
    textSize(50);
    fill('white');
    text('game over, druk op spatie om opnieuw te gaan', 100, 175);
    if (keyIsDown(32)) { // spatie
      spelStatus = UITLEG;
    }
  }
  if (spelStatus === UITLEG) {
    // teken uitleg scherm
    console.log('uitleg');
    textSize(50);
    fill('red');
    rect(0, 0, 1280, 720);
    fill('white');
    text('druk op enter', 100, 100);
    if (keyIsDown(13)) { // enter
      spelerX = 600;
      spelerY = 600;
      spelStatus = SPELEN;
    }
  }
}
