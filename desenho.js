window.onload = () => {
    window.addEventListener("resize", ajusteTela);
    const inputEmail = document.getElementById('email');
    const inputSenha = document.getElementById('senha');
    const canvas = document.getElementById('desenho');
    const ctx = canvas.getContext('2d');
    canvas.width = 350;
    canvas.height = 200;

    let digitando = false;
    let moverEsq = false;
    let moverCima = false;
    let moverBaixo = false;
    let anterior = 0;
    let atual = 0;
    let pupila = 5;
    let lado = 7.5;
    let altura = 1;
    let alturaBracoE = 0;
    let alturaBracoD = 0;
    let alturaMaoE = 0;
    let alturaMaoD = 0;
    let nuvens = [
        { x: 30, y: 50, largura: 20, altura: 0 },
        { x: 50, y: 50, largura: 20, altura: 0 },
        { x: 50, y: 30, largura: 20, altura: 0 },
        { x: 25, y: 50, largura: 20, altura: 0 },
        { x: 70, y: 30, largura: 20, altura: 0 },
    ]

    atualizar();

    function atualizar() {
        //background céu!
        ctx.fillStyle = 'lightblue';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        //controles!!
        controleOlhos();
        controleBracos();
        controleNuvens();

        //desenho
        desenhaNuvens();
        desenhaGravata();
        desenhaCorpo();
        desenhaOlhos();
        desenhaRoupa();
        mangaDireita();
        mangaEsquerda();
        desenhaBrancos();
        requestAnimationFrame(atualizar);
    }

    function controleOlhos() {
        if (!digitando) {
            if (moverEsq && lado < 18) {
                lado += 0.5;
                if (pupila < 8) pupila += 0.5;
            } else if (!moverEsq && lado > 7.5) {
                lado -= 0.5;
                if (pupila > 5) pupila -= 0.5;
            }
        }
        if (moverBaixo && altura > 3) altura -= 0.5;
        else if (!moverBaixo && altura < 5) altura += 0.5;
    }

    function controleNuvens() {
        nuvens.forEach(nuvem => {
            if (nuvem.x < canvas.width + 50) nuvem.x += 0.5;
            if (nuvem == nuvens[nuvens.length - 1]) {
                if (nuvem.x >= canvas.width / 2 + 50) {
                    nuvens.push({ x: -50, y: Math.floor(Math.random() * 120), largura: 20, altura: 0 });
                    nuvens.push({ x: -50, y: Math.floor(Math.random() * 120), largura: 20, altura: 0 });
                    nuvens.push({ x: -50, y: Math.floor(Math.random() * 120), largura: 20, altura: 0 });
                    nuvens.push({ x: -50, y: Math.floor(Math.random() * 120), largura: 20, altura: 0 });
                    nuvens.push({ x: -50, y: Math.floor(Math.random() * 120), largura: 20, altura: 0 });
                }
            }
        });
    }

    function desenhaNuvens() {
        //nuvens
        ctx.fillStyle = 'white';
        nuvens.forEach(nuvem => {
            ctx.beginPath();
            ctx.arc(nuvem.x, nuvem.y, nuvem.largura, nuvem.altura, 2 * Math.PI);
            ctx.fill();
        });
    }

    function controleBracos() {
        if (moverCima && alturaBracoE < 80) alturaBracoE += 2;
        else if (!moverCima && alturaBracoE > -25) alturaBracoE -= 2;

        if (moverCima && alturaBracoD < 80) alturaBracoD += 4;
        else if (!moverCima && alturaBracoD > -230) alturaBracoD -= 4;


        if (alturaBracoE < -25) alturaMaoE = 0;
        if (alturaBracoD < -229) alturaMaoD = 0;
    }

    function desenhaOlhos() {
        // olhos
        ctx.fillStyle = 'white';
        ctx.fillRect(canvas.width / 2 - 10 - lado, canvas.height / 2 - altura, 15, 15);
        ctx.fillRect(canvas.width / 2 + 10 - lado, canvas.height / 2 - altura, 15, 15);
        ctx.fillStyle = 'black';
        ctx.fillRect(canvas.width / 2 - 5 - lado, canvas.height / 2 + pupila - altura, 5, 5);
        ctx.fillRect(canvas.width / 2 + 14 - lado, canvas.height / 2 + pupila - altura, 5, 5);

        ctx.fillStyle = '#3D4B58';
        ctx.fillRect(canvas.width / 2 - 50, canvas.height / 2 + 25, 100, 100);
    }

    function desenhaCorpo() {
        ctx.fillStyle = 'black';
        ctx.fillRect(canvas.width / 2 - 25, canvas.height / 2 - 30, 50, 50);
        ctx.fillStyle = '#CDA197';
        ctx.fillRect(canvas.width / 2 - 25, canvas.height / 2 - 25, 50, 50);

        ctx.fillStyle = 'black';
        ctx.fillRect(canvas.width / 2 - 10, canvas.height / 2 + 12, 20, 5);

        ctx.beginPath();
        ctx.moveTo(canvas.width / 2 - lado, canvas.height / 2 - 15);
        ctx.lineTo(canvas.width / 2 - 25, canvas.height / 2 - 25);
        ctx.lineTo(canvas.width / 2 + lado, canvas.height / 2 - 25);
        ctx.fill();


        ctx.fillStyle = 'black';
        ctx.fillRect(canvas.width / 2 - 25, canvas.height / 2 + 20, 50, 10);
    }

    function desenhaRoupa() {
        //roupa
        ctx.fillStyle = '#5688B6';
        ctx.fillRect(canvas.width / 2 - 50, canvas.height / 2 + 25, 25, 100);
        ctx.fillRect(canvas.width / 2 + 25, canvas.height / 2 + 25, 25, 100);
        ctx.fillRect(canvas.width / 2 - 50, canvas.height / 2 + 80, 100, 20);
        ctx.beginPath();
        ctx.moveTo(canvas.width / 2 - 50, canvas.height / 2 + 25);
        ctx.lineTo(canvas.width / 2 - 75, canvas.height);
        ctx.lineTo(canvas.width / 2 - 50, canvas.height);
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(canvas.width / 2 + 50, canvas.height / 2 + 25);
        ctx.lineTo(canvas.width / 2 + 75, canvas.height);
        ctx.lineTo(canvas.width / 2 + 50, canvas.height);
        ctx.fill();
        ctx.fillStyle = '#3A566F';
        ctx.fillRect(canvas.width / 2 - 50, canvas.height / 2 + 50, 1, 80);
        ctx.fillRect(canvas.width / 2 + 50, canvas.height / 2 + 50, 1, 80);
    }

    function mangaDireita() {
        //manga direita
        ctx.fillStyle = '#496E8F';
        ctx.beginPath();
        ctx.moveTo(canvas.width / 2 + 35, canvas.height / 2 + 72);
        ctx.lineTo(canvas.width / 2 - 15, canvas.height + 25);
        ctx.lineTo(canvas.width / 2 + 25, canvas.height / 2 + 25);
        ctx.fill();
    }

    function mangaEsquerda() {
        //manga esquerda
        ctx.fillStyle = '#3D5C78';
        ctx.beginPath();
        ctx.moveTo(canvas.width / 2 - 35, canvas.height / 2 + 72);
        ctx.lineTo(canvas.width / 2 + 5, canvas.height);
        ctx.lineTo(canvas.width / 2 - 25, canvas.height / 2 + 25);
        ctx.fill();
    }

    function desenhaGravata() {
        //gravata
        ctx.fillStyle = '#232323';
        ctx.fillRect(canvas.width / 2 - 5, canvas.height / 2 + 20, 10, 10);
        ctx.beginPath();
        ctx.moveTo(canvas.width / 2, canvas.height / 2 + 25);
        ctx.lineTo(canvas.width / 2 - 10, canvas.height / 2 + 60);
        ctx.lineTo(canvas.width / 2, canvas.height / 2 + 70);
        ctx.lineTo(canvas.width / 2 + 10, canvas.height / 2 + 60);
        ctx.fill();
    }

    function desenhaBrancos() {
        //braços
        console.log(alturaBracoD, alturaMaoD);
        ctx.rotate(20 * Math.PI / 180);
        ctx.fillStyle = '#517EA8';
        ctx.fillRect(canvas.width / 2 - 15, canvas.height - 60 - alturaBracoE, 35, 120);

        ctx.fillStyle = '#CDA197';
        ctx.fillRect(canvas.width / 2 - 5, canvas.height - 60 - alturaBracoE - alturaMaoE, 25, 30);
        ctx.rotate(-20 * Math.PI / 180);

        ctx.rotate(-20 * Math.PI / 180);

        ctx.fillStyle = '#517EA8';
        ctx.fillRect(canvas.width / 2 - 45, canvas.height + (alturaBracoD * -0.3), 35, 110);

        ctx.fillStyle = '#CDA197';
        ctx.fillRect(canvas.width / 2 - 45, canvas.height + (alturaBracoD * -0.3) - alturaMaoD, 25, 30);

        ctx.rotate(20 * Math.PI / 180);
    }

    inputEmail.addEventListener("focusin", () => {
        atual = inputEmail.value.length;
        if (atual > 10 && anterior == 0) {
            lado = atual;
            pupila = 8;
        } else {
            moverEsq = true;
        }
        moverBaixo = true;
    });

    inputEmail.addEventListener("focusout", () => {
        moverEsq = false;
        moverBaixo = false;
        digitando = false;
        anterior = 0;
    });

    inputEmail.addEventListener("input", () => {
        let texto = inputEmail.value;
        atual = texto.length;
        digitando = true;
        if (atual > anterior) {
            if (lado > -7) lado -= atual / 20;
        } else {
            if (lado < 18) lado += atual / 20;
        }
        anterior = atual;
    });

    inputSenha.addEventListener("focusin", () => {
        moverCima = true;
        alturaMaoE = 30;
        alturaMaoD = 30;
    });

    inputSenha.addEventListener("focusout", () => {
        moverCima = false;
    });

    function ajusteTela() {
        let form = inputEmail.parentElement.parentElement;
        if (screen.width < 500) {
            form.style.width = "100%";
            form.style.height = "100%";
            canvas.style.width = "90%";
        } else {
            canvas.style.width = "90%";
            form.style.width = "400px";
            form.style.height = "400px";
        }
    }
}