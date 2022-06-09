class Montagne{
    rochers = [];
    hauteurRocher;
    constructor(nbRochers, nbLignes, hauteurRocher) {
        var rocher;
        let largeur = canvas.width/nbRochers;
        this.hauteurRocher = hauteurRocher;
        let tmp = [];

        for (let i = 0; i < nbLignes; i++) {
            tmp = [];
            for (let j = 0; j < canvas.width; j+=largeur) {
                //exemple: hauteur de 20 -> i*20
                rocher = new Rocher(j,i*hauteurRocher,largeur,hauteurRocher,"BLUE");
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


    // A MODIFIER / ! \
    randomRocher()
    {

        var rand = Math.floor(Math.random() * this.rochers[0].length);
        let ligne = this.rochers.length-1; // dernière ligne
        do
        {
            rand = Math.floor(Math.random() * this.rochers[0].length);
            if(this.ligneVide(ligne) && ligne == 0)
            {

                return;

            }
            if(this.ligneVide(ligne) && ligne >0)
            {
                ligne -=1;

            }
            if(!this.ligneVide(ligne) && ligne >=0)
            {
                if(this.rochers[ligne][rand].y != ligne+1*20)
                {
                    return this.rochers[ligne][rand];
                }
            }
        }
        while(!this.ligneVide(ligne) && ligne != 0);
    }


    ligneVide(ligne)
    {
        for (let i = 0; i < this.rochers[ligne].length; i++) {
            // if(!(this.rochers[ligne][i].y == this.nbLignes()*20))
            // return false;
            if(this.rochers[ligne][i].y == this.hauteurRocher * ligne)
            return false;
        }
        return true;
    }
}