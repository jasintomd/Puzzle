class Puzzle{
    constructor(){
        this.tamano = parseInt(prompt('Introduce tamaño de tablero'));
        this.casillas = new Array();
        this.tabla = document.getElementById("tablero");
        this.dibujar()
        this.seleccion=false;
     
    }
    
    
    dibujar(){
        var num = 1;
        for(var i=0; i<this.tamano; i++){
            var fila = this.tabla.insertRow(0);
            for(var j=0; j<this.tamano; j++){
                var columna = fila.insertCell(0);
                columna.innerHTML = num;
                columna.setAttribute("id", i+""+j)
                columna.onclick = this.seleccionaCasilla;
                num++;
                this.casillas.push(columna);
            }
        }
        this.desordenaTablero()
    }
    
    desordenaTablero(){
        for(var i=0; i<this.casillas.length; i+=2){
            var cosa = this.casillasAleatorias()
            var ind = this.casillas.indexOf(cosa[0]);
            var ind2 = this.casillas.indexOf(cosa[1]);
            this.casillas.splice(ind, 1, cosa[1]);
            this.casillas.splice(ind2, 1, cosa[0]);
        }
        this.vuelveaDibujar()
    }
    
    casillasAleatorias(){
        var ind1 = Math.floor(Math.random()*this.casillas.length);
        var ind2 = Math.floor(Math.random()*this.casillas.length);
        var casilla1 = this.casillas[ind1];
        var casilla2 = this.casillas[ind2];
        return [casilla1, casilla2]
    }
    
    vuelveaDibujar(){
        for(var n=0; n<this.casillas.length; n++){
            this.casillas[n].innerHTML = this.casillas.indexOf(this.casillas[n]);
            
        }
    }
    
    seleccionaCasilla(){
        if(juego.seleccion && juego.casillaCero(this) && juego.movimientoPermitido(this)){
            juego.cambiaCasilla(this);
            juego.seleccion = false;
        }else{
            juego.seleccion=this;
        }
    }
    
     casillaCero(casilla){
        if(juego.casillas.indexOf(casilla) == 0 || juego.casillas.indexOf(juego.seleccion) == 0){
            return true;

        }else{
            juego.seleccion = false;
            return false;
        }
        
    }
    
    movimientoPermitido(casilla){
        var ind = casilla.getAttribute("id");
        var ind2 = juego.seleccion.getAttribute("id");
        if(juego.sacaInd(ind2)[0] == juego.sacaInd(ind)[0] && juego.diferencia(juego.sacaInd(ind2)[1], juego.sacaInd(ind)[1]) == 1){
            return true
        } else if(juego.sacaInd(ind2)[1] == juego.sacaInd(ind)[1] && juego.diferencia(juego.sacaInd(ind2)[0], juego.sacaInd(ind)[0]) == 1){
            return true
        } else{
            return false
        }
    }
    
    sacaInd(indice){
        return [parseInt(indice[0]), parseInt(indice[1])]
    }
    
    diferencia(seleccionado, objetivo){
        return Math.abs(seleccionado - objetivo)
    }
    
    cambiaCasilla(casilla){
        var contenido = juego.seleccion.innerHTML;
        juego.seleccion.innerHTML = casilla.innerHTML;
        casilla.innerHTML = contenido;
        juego.cambiaLista(casilla)
    }
    
    cambiaLista(casilla){
        var ind = juego.casillas.indexOf(casilla);
        var ind2 = juego.casillas.indexOf(juego.seleccion);
        juego.casillas.splice(ind, 1, juego.seleccion);
        juego.casillas.splice(ind2, 1, casilla);
        if(juego.compruebaResultado()){
            document.getElementById("texto").innerHTML = '<h1>¡Enhorabuena! Has ganado la partida</h1>';
    }  
    }
    
    compruebaResultado(){
        
            for(var l=1; l<juego.casillas.length-1;l++){
                if(parseInt(juego.casillas[l].getAttribute("id")) < parseInt(juego.casillas[l-1].getAttribute("id"))){
                    return false
                } 
            }
            return true 
    }
}

window.onload = function(){
    juego = new Puzzle()
}