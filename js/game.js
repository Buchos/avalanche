// select canvas element
const canvas = document.getElementById("game");

// getContext of canvas = methods and properties to draw and do a lot of thing to the canvas
const ctx = canvas.getContext("2d");

function getRandomInt(max) {
	return Math.floor(Math.random() * max);
}

var panier = new Panier(
	canvas.width / 2 - 50,
	canvas.height - 10,
	100,
	10,
	"YELLOW"
);
var montagne = new Montagne(32, 3);
// draw a rectangle, will be used to draw paddles
function drawRect(x, y, w, h, color) {
	ctx.fillStyle = color;
	ctx.fillRect(x, y, w, h);
}

// draw text
function drawText(text, x, y) {
	ctx.fillStyle = "#FFF";
	ctx.font = "75px fantasy";
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
}
var randomInt = getRandomInt(montagne.rochers[0].length);

function update() {
	var fallingRock = montagne.rochers[2][randomInt];

	fallingRock.tomber();
	if (fallingRock.collision(panier)) {
		alert("touché");
		update();
	} else if (fallingRock.bottom() > canvas.height) {
		alert("perdu");
		fallingRock.detruire();
	}
}

function jeu() {
	render();
	update();
}

function test() {
	alert("keypressed");
}
//déplacement du panier
document.body.addEventListener("keydown", function (event) {
	panier.deplacement(event);
});
function start() {
	setInterval(jeu, 1000 / 50);
}
start();
