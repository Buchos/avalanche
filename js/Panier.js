class Panier{
    x;
    y;
    hauteur;
    largeur;
    couleur;

    constructor(x, y, largeur, hauteur, couleur)
    {
        this.x = x;
        this.y = y;
        this.hauteur = hauteur;
        this.largeur = largeur;
        this.couleur = couleur;
    }

    deplacement(event)
    {
        if(event.key == "ArrowLeft" && this.x >0)
        {
            this.x -= 15;
        }
        else if(event.key == "ArrowRight" && this.x+this.largeur <canvas.width)
        {
            this.x += 15;
        }
    }
}