let selecao_1=0; let selecao_2=0; let selecao_3=0; 
let selecao_at_1=0; let selecao_at_2=0; let selecao_at_3=0; 
let user_img;

const nome=prompt("Qual seu nome?");

function select_item1(element){ 
    console.log(element)
    if (element.classList.contains("selecionado")){
        element.classList.remove("selecionado");
        return
    }
    if (selecao_1){
        selecao_1.classList.remove("selecionado");
    }
    element.classList.add("selecionado")
    selecao_at_1="ativado";
    selecao_1=element;
    button_activate()
}

function select_item2(element){ 
    console.log(element)
    if (element.classList.contains("selecionado")){
        element.classList.remove("selecionado");
        return
    }
    if (selecao_2){
        selecao_2.classList.remove("selecionado");
    }
    element.classList.add("selecionado")
    selecao_at_2="ativado";
    selecao_2=element;
    button_activate()
}

function select_item3(element){ 
    console.log(element)
    if (element.classList.contains("selecionado")){
        element.classList.remove("selecionado");
        return
    }
    if (selecao_3){
        selecao_3.classList.remove("selecionado");
    }
    element.classList.add("selecionado")
    selecao_at_3="ativado";
    selecao_3=element;
    button_activate()
}

function button_activate(){
    if (selecao_at_1==="ativado" && selecao_at_2==="ativado" && selecao_at_3==="ativado"){
        el_finish=document.querySelector(".button");
        el_finish.style.background='#404EED';
    }
}
function get_user_image(){
    user_img = document.querySelector("input").value;
}

function confirm_purchase(){
    get_user_image()
    alert("Compra confirmada! "+user_img)
}