"use strict";
document.body.onload = () => {
    let nombreUsuario;
    const nombreUsuarioPh = document.getElementById('usuario-nombre-ph');
    const divUser = document.getElementById('user-cards');
    const divPc = document.getElementById('cpu-cards');
    const userConPh = document.querySelector('#user-container small');
    const pcConPh = document.querySelector('#pc-container small');
    const btnNew = document.getElementById('btn-new');
    const btnCard = document.getElementById('btn-card');
    const btnStop = document.getElementById('btn-stop');
    var cont = 0;
    var contpc = 0;
    var mazoBarajado = [];
    const crearImagen = (carta) => {
        const imagen = document.createElement('img');
        imagen.src = 'assets/img/cards/' + (carta === null || carta === void 0 ? void 0 : carta.key) + ".png";
        imagen.className = 'gcard';
        return imagen;
    };
    const iniciarPartida = () => {
        do {
            nombreUsuario = prompt('Escribe el nombre');
        } while (nombreUsuario == null || !/^[A-Za-z]{2,}$/.test(nombreUsuario));
        nombreUsuario = nombreUsuario.charAt(0).toUpperCase().concat(nombreUsuario.substring(1).toLowerCase());
        if (nombreUsuarioPh != null) {
            nombreUsuarioPh.innerText = nombreUsuario;
        }
        cont = 0;
        contpc = 0;
        pcConPh.innerText = contpc + "";
        userConPh.innerText = contpc + "";
        mazoBarajado = barajaMazo(generarMazo());
        if (divPc) {
            if (divPc.childElementCount > 1) {
                while (divPc.lastChild) {
                    divPc.removeChild(divPc.lastChild);
                    if (divPc.childElementCount == 1) {
                        break;
                    }
                }
            }
        }
        if (divUser) {
            if (divUser.childElementCount > 1) {
                while (divUser.lastChild) {
                    divUser.removeChild(divUser.lastChild);
                    if (divUser.childElementCount == 1) {
                        break;
                    }
                }
            }
        }
        console.log(mazoBarajado);
    };
    const generarMazo = () => {
        const numeros = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
        const figuras = ['C', 'D', 'H', 'S'];
        const mazo = [];
        /*
        for( let i = 0; i <numeros.length; i++  ){
        for( let j = 0; j <figuras.length; j++  ){
            mazo.push(numeros[i]+figuras[j])
        }
        }
        */
        for (let numero of numeros) {
            for (let figura of figuras) {
                mazo.push({ key: numero + figura, value: calcularValorCarta(numero) });
            }
        }
        return mazo;
    };
    const jugarpc = () => {
        if (cont > 21) {
            const cartaPc = mazoBarajado.pop();
            if (cartaPc) {
                const imagenPc = crearImagen(cartaPc);
                divPc === null || divPc === void 0 ? void 0 : divPc.appendChild(imagenPc);
                contpc += cartaPc === null || cartaPc === void 0 ? void 0 : cartaPc.value;
                pcConPh.innerText = contpc + "";
                alert('MAQUINA GANADORA');
            }
        }
        else {
            do {
                const cartaPc = mazoBarajado.pop();
                if (cartaPc) {
                    const imagenPc = crearImagen(cartaPc);
                    divPc === null || divPc === void 0 ? void 0 : divPc.appendChild(imagenPc);
                    contpc += cartaPc === null || cartaPc === void 0 ? void 0 : cartaPc.value;
                    pcConPh.innerText = contpc + "";
                }
            } while (contpc < cont);
            setTimeout(() => {
                if (contpc > 21) {
                    alert('Usuario ganador');
                }
                else if (cont == contpc) {
                    alert('EMPATE!!!!!');
                }
                else {
                    alert('Maquina ganadora');
                }
            }, 30);
        }
    };
    btnStop === null || btnStop === void 0 ? void 0 : btnStop.addEventListener('click', () => {
        jugarpc();
    });
    btnCard === null || btnCard === void 0 ? void 0 : btnCard.addEventListener('click', () => {
        const carta = mazoBarajado.pop();
        if (carta) {
            const imagen = crearImagen(carta);
            divUser === null || divUser === void 0 ? void 0 : divUser.appendChild(imagen);
            cont += carta === null || carta === void 0 ? void 0 : carta.value;
            userConPh.innerText = cont + "";
            if (cont > 21) {
                btnCard.setAttribute('disabled', "");
                jugarpc();
            }
            console.log(carta);
        }
    });
    btnNew === null || btnNew === void 0 ? void 0 : btnNew.addEventListener('click', () => {
        btnCard === null || btnCard === void 0 ? void 0 : btnCard.removeAttribute('disabled');
        iniciarPartida();
    });
    const calcularValorCarta = (numero) => {
        // var valorCarta:number = 0;
        /*
            if(numero == 'A'){
                valorCarta = 11;
            }else if(numero=='J' || numero=='Q' || numero=='K'){
                valorCarta = 10;
            }else{
        
                valorCarta = parseInt(numero);
            }
        */
        switch (numero) {
            case 'A': return 11;
            case 'J': return 10;
            case 'Q': return 10;
            case 'K': return 10;
            default: return Number.parseInt(numero);
        }
    };
    const barajaMazo = (mazo) => {
        return mazo.sort((a, b) => Math.random() - 0.5);
    };
    //console.log(barajaMazo(mazo))
};
