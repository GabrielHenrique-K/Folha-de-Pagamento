    var button = document.getElementById("button");
    const one =  document.getElementById("card2");
    console.log(card);
    console.log(button);

//-------- Esta parte é para fazer aparecer e desaparecer o card com as infos da folha de pagamento --------//
button.addEventListener("click" , function() {
    
    var b = document.getElementsByTagName("body")[0]
    b.style = "background-image:url(https://thumbs.gfycat.com/ElementaryAnimatedBarebirdbat-size_restricted.gif)"
    var card = document.getElementById("card");
    if (card.style.display === "block") {
    } else {
        one.append(card); //adicionei append para mover a card 1 para o lugar da suposta card2
    }

    var card1 = document.getElementById("card1")
    if (card.style.display === "") {
        card1.style.display = "block";
    } else {
        card1.style.display = "none";
    }

    //tirei a var card2 para usar a mesma na primeira instancia
    
    
    //----------------------------- Aqui já entra a parte dos calculos ------------------------------//

    var salarioBruto = document.getElementById('salario').value
    var dependentes = document.getElementById('depen').value

    var inss = 0;
    
    // Esta parte se refere a fazer o calculo do inss de acordo com o sálario colocado 
    switch(true){
        case salarioBruto <= 1212.00:
            inss = Math.round(1212.00 * 0.075 * 100) / 100 
            break
        case salarioBruto <= 2427.35:
            inss = Math.round(2427.35 * 0.09 * 100) / 100 
            break
        case salarioBruto <= 3641.03:
            inss = Math.round(3641.03 * 0.12 * 100) / 100 
            break
        case salarioBruto <= 7087.22:
            inss = Math.round(7087.22 * 0.14 * 100) / 100 
            break
        default:
            inss = Math.round(7087.22 * 0.14 * 100) / 100 
        break
    }
    // Aqui é para fazer o calculo de dependentes (filhos e tals)
    if(dependentes != 0){
        var salarioBaseIR = salarioBruto - inss - (dependentes * 189.59)
    }

    // Esta parte é para calcular o IRRF (Imposto)
    switch(true){
        case salarioBaseIR <= 1903.98:
            var irrf = 0
            break
        case salarioBaseIR <= 2826.65: 
            var irrf = Math.round((salarioBaseIR / 100 * 7.5 - 142.80) * 100) / 100
            break
        case salarioBaseIR <= 3751.05:
            var irrf = Math.round((salarioBaseIR / 100 * 15  - 354.80) * 100) / 100 
            break
        case salarioBaseIR <= 4664.68:
            var irrf = Math.round((salarioBaseIR / 100 * 22.5 - 636.13) * 100) / 100 
            break
        case salarioBaseIR > 4664.68:
            var irrf = Math.round((salarioBaseIR / 100 * 27.5  - 869.36) * 100) / 100 
            break
        default:
        break
    } 

    //--- ------ tentativa de mandar os valores dessas variáveis para o html para ser exibida no site ----------//
    document.getElementById('salarioT').innerHTML = salarioBruto
    document.getElementById('depen').innerHTML = dependentes
    document.getElementById('colaboracao').innerHTML = inss
    document.getElementById('imposto').innerHTML = irrf
    document.getElementById('base').innerHTML = salarioBaseIR
    document.getElementById('liquido').innerHTML = salarioLiquido

    /* ------ Aqui a intenção é conseguir saber se foi selecionado que a pessoa precisa de vale transporte --------
    ----------------------- para assim ser feito o calculo caso ela tenha solicitado o vale ---------------------*/
    var vale = checkbox(salarioBruto)
    document.getElementById('transporte').innerHTML = vale
    var salarioLiquido = Math.round((salarioBruto - inss - irrf - vale) * 100) / 100
    document.getElementById('liquido').innerHTML = salarioLiquido
    
});

function checkbox(salarioBruto){
    let checkbox = document.getElementById('checkbox');
    var vale = ""
    if(checkbox.checked) {
        vale = Math.round((salarioBruto * 0.06 ) * 100) / 100
    }
    return vale;
}

    var btnLimpar = document.getElementById("reset1");

    btnLimpar.addEventListener("click", function() {

       salario.value = "";
       depen.value = "";
       salarioT.innerHTML= "";
       colaboracao.innerHTML = "";
       imposto.innerHTML = "";
       base.innerHTML = "";
       liquido.innerHTML = "";
    
    });