class Montagne{
    rochers = [];
    constructor(nbRochers, nbLignes) {
        var rocher;
        let largeur = canvas.width/nbRochers;
        let tmp = [];

        for (let i = 0; i < nbLignes; i++) {
            tmp = [];
            for (let j = 0; j < canvas.width; j+=largeur) {
                //hauteur de 20 -> i*20
                rocher = new Rocher(j,i*20,largeur,20,"RED");
                tmp.push(rocher);
            }
            this.rochers.push(tmp);
        }
    }
    draw()
    {
        for (let i = 0; i < this.rochers.length; i++) {
            for (let j = 0; j < this.rochers[i].length; j++) {
                drawRect(this.rochers[i][j].x,this.rochers[i][j].y, this.rochers[i][j].largeur, this.rochers[i][j].hauteur, this.rochers[i][j].couleur);
            }
        }
    }

    avalanche()
    {

    }
}