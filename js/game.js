// select canvas element
const canvas = document.getElementById("game");

// getContext of canvas = methods and properties to draw and do a lot of thing to the canvas
const ctx = canvas.getContext("2d");
var panier;
var rochersTombes;
var montagne;
var nbVies;
var score;

var gamePaused = false;
window.onblur = userCheated;
window.onfocus = userCheated;
function pauseGame() {
	gamePaused = !gamePaused; // toggle the gamePaused value (false <-> true)

	if (!gamePaused) loop(); // restart loop
}
function userCheated() {
	// The user cheated by leaving this window (e.g opening another window)
	// Do something
	//    alert("You can't cheat!");
	pauseGame();
}

function initialiser() {
	panier = new Panier(
		canvas.width / 2 - 50,
		canvas.height - 10,
		100,
		10,
		"YELLOW"
	);
	montagne = new Montagne(32, 3, 20);
	rochersTombes = [];
	for (let i = 0; i < montagne.rochers.length; i++) {
		rochersTombes[i] = [];
	}
	nbVies = 3;
	score = 0;
}

//tests vide ligne
// for (let i = 0; i < montagne.rochers[2].length; i++) {
//     montagne.rochers[2][i].y = undefined;
// }

// draw a rectangle, will be used to draw paddles
function drawRect(x, y, w, h, color) {
	ctx.fillStyle = color;
	ctx.fillRect(x, y, w, h);
}

// draw text
function drawText(text, x, y) {
	ctx.fillStyle = "RGBa(255,0,0,0.5)";
	ctx.font = "40px fantasy";
	ctx.fillText(text, x, y);
}

function render() {
	drawRect(0, 0, canvas.width, canvas.height, "#000");
	drawRect(
		panier.x,
		panier.y,
		panier.largeur,
		panier.hauteur,
		panier.couleur
	);
	montagne.draw();
	drawText("score: " + score, 100, 100);
	drawText("vies: " + nbVies, 300, 100);
}

function update() {
	//montagne.randomRocher().tomber();
	// var rocher = montagne.rochers[2][10];
	// rocher.tomber();
	// if(rocher.collision(panier))
	// {
	//     rocher.detruire();
	//     alert('touché');
	// }
	// if(rocher.bottom() >= canvas.height)
	// {
	//     rocher.detruire();
	//     alert('perdu');
	// }
	// let ligne = montagne.rochers.length-1;
	// let random = Math.floor(Math.random() * montagne.rochers[ligne].length);
	// montagne.rochers[ligne][random].tomber(5);
	// if(montagne.rochers[ligne][random].y == ligne+1*montagne.hauteur)
	// {
	//     setTimeOut(montagne.rochers[ligne][random].tomber(), 1000);
	// }
}

function jeu() {
	if (gamePaused) {
		return;
	}
	render();
}
function avalanche() {
	if (gamePaused) {
		return;
	}
	let vitesse;
	for (let i = 0; i < montagne.rochers.length; i++) {
		vitesse = (montagne.rochers.length - i) * 2.5;
		for (let j = 0; j < montagne.rochers[i].length; j++) {
			if (rochersTombes[i][j]) {
				montagne.rochers[i][j].tomber(vitesse);
				if (montagne.rochers[i][j].collision(panier)) {
					score += 5;
				} else if (montagne.rochers[i][j].bottom() >= canvas.height) {
					montagne.rochers[i][j].detruire();
					nbVies--;
				}
			}
		}
	}
}

function faireTomber() {
	if (gamePaused) {
		return;
	}
	let ligne = choixLigne();

	let position = choixRocher(ligne);
	rochersTombes[ligne][position] = true;
}

function choixLigne() {
	if (gamePaused) {
		return;
	}
	let ligne = montagne.rochers.length - 1;
	for (let i = 0; i < montagne.rochers.length; i++) {
		if (montagne.ligneVide(ligne)) {
			ligne--;
		}
	}
	return ligne;
}
function choixRocher(ligne) {
	if (gamePaused) {
		return;
	}
	let random = Math.floor(Math.random() * montagne.rochers[ligne].length);
	if (montagne.rochers[ligne][random].y == ligne * montagne.hauteurRocher) {
		return random;
	}
	return choixRocher(ligne);
}

//déplacement du panier
document.body.addEventListener("keydown", function (event) {
	panier.deplacement(event);
});
function start() {
	initialiser();
	setInterval(faireTomber, 1500);
	setInterval(jeu, 1000 / 50);
	setInterval(avalanche, 1000 / 50);
}
start();
