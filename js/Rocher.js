class Rocher{
    x;
    y;
    hauteur;
    largeur;
    couleur;
    isDestroyed;

    constructor(x, y, largeur, hauteur, couleur)
    {
        this.x = x;
        this.y = y;
        this.hauteur = hauteur;
        this.largeur = largeur;
        this.couleur = couleur;
        this.isDestroyed = false;
    }

    bottom()
    {
        return this.y+this.hauteur;
    }
    top()
    {
        return this.y;
    }
    left()
    {
        return this.x;
    }
    right()
    {
        return this.x+ this.largeur;
    }
    tomber(vitesse)
    {

        this.y += vitesse;
    }

    chute(vitesse)
    {
        setInterval(this.tomber(vitesse),1000/50);
    }

    collision(panier)
    {
        if((this.left() <= (panier.x +panier.largeur)) && (this.right()>= panier.x) && (this.bottom()>= panier.y) && (this.top()<= panier.y+panier.hauteur))
        {
            this.detruire();
            return true;
        }

        return false;
    }
    detruire()
    {
        this.y = undefined;
    }
}