let selecao_1=0; let selecao_2=0; let selecao_3=0; 
let selecao_at_1=0; let selecao_at_2=0; let selecao_at_3=0; 
const urlAPI="https://mock-api.driven.com.br/api/v4/shirts-api/shirts"
const n_last_request=10;

let nome=prompt("Qual seu nome?");
while (!nome){
    nome=prompt("Qual seu nome?");
}
update_last_requests()


function select_item1(element){ 
    if (element.classList.contains("selecionado")){
        element.classList.remove("selecionado");
        return
    }
    if (selecao_1){
        selecao_1.classList.remove("selecionado");
    }
    element.classList.add("selecionado")
    selecao_at_1=element.id;
    selecao_1=element;
    button_activate()
}

function select_item2(element){ 
    if (element.classList.contains("selecionado")){
        element.classList.remove("selecionado");
        return
    }
    if (selecao_2){
        selecao_2.classList.remove("selecionado");
    }
    element.classList.add("selecionado")
    selecao_at_2=element.id;
    selecao_2=element;
    button_activate()
}

function select_item3(element){ 
    if (element.classList.contains("selecionado")){
        element.classList.remove("selecionado");
        return
    }
    if (selecao_3){
        selecao_3.classList.remove("selecionado");
    }
    element.classList.add("selecionado")
    selecao_at_3=element.id;
    selecao_3=element;
    button_activate()
}

function button_activate(){
    el_finish=document.querySelector(".button");
    if (selecao_at_1!==0 && selecao_at_2!==0 && selecao_at_3!==0){
        el_finish.style.background='#404EED'; 
        el_finish.disabled=false;
    }
    else{
        el_finish.style.background='#C4C4C4'; 
        el_finish.disabled=true;
    }
}
function get_user_image(){
    user_img = document.querySelector("input").value;
    return user_img
}

function clear_state(){
    document.querySelector("input").value="";
    const selecionados=document.querySelectorAll(".selecionado");
    for(let item of selecionados){
        item.classList.remove("selecionado");
    }
    selecao_at_1=0; selecao_at_2=0; selecao_at_3=0; 
    button_activate()
    
}

function create_object(){
    user_img=get_user_image();
    let cloth_model={
        "model": selecao_at_1 ,
        "neck": selecao_at_2,
        "material": selecao_at_3,
        "image": user_img,
        "owner": nome,
        "author":nome,
    };
    console.log(cloth_model)
    return cloth_model
}


function post_object(cloth_object) {
    const promise = axios.post(urlAPI, cloth_object);
    console.log(cloth_object)
    promise.then(wite_request);
    promise.catch(show_error)
}

function confirm_purchase(){
    let cloth_model=create_object();
    post_object(cloth_model);
}

function wite_request(response){
    if (response.status===422){
        alert("Ops, não conseguimos processar sua encomenda!22")
    }
    else if (response.status===201){
        alert("Compra confirmada!")
        update_last_requests();
        clear_state()
    }
}

function show_error(){
    alert("Ops, não conseguimos processar sua encomenda!")
}

function update_last_requests(){
    const promise = axios.get(urlAPI);
    promise.then(write_recent_requests);
}

function write_recent_requests(response){
    prev_request_div=document.querySelector(".lista_pedidos");
    prev_request_div.innerHTML="";
    for (let i=response.data.length-n_last_request; i<response.data.length; i++){
        create_request_div(prev_request_div,response.data[i]);
    }
}

function create_request_div(parent_div,request_object){

    let div_id=request_object.id;

    let model=request_object.model;
    let neck=request_object.neck;
    let material=request_object.material;

    let img_src=request_object.image;
    let subtitle=request_object.owner;
 
    div_id=[model,neck,material].join('_');
    console.log(div_id)
    parent_div.innerHTML+=`<div class='pedido_legenda' id=${div_id}  onclick=confirm_request(this)>
        <div class='pedido'>
            <img src=${img_src}>
        </div>
        <p class="bold">Criador:</p> ${subtitle}
    </div>`;
}

function confirm_request(element){
    console.log(element);
    let id_info=element.id;
    let id_info_array=id_info.split('_'); // array [model,neck,material]
    let author=element.lastChild.textContent
    author=author.substring(1, author.length - 5);
    let img_src=element.querySelector("img").src
    
    user_confirmation=confirm("Você quer mesmo este item?");
    console.log(id_info_array)
    if (user_confirmation){
        let cloth_model={
            "model": id_info_array[0] ,
            "neck": id_info_array[1],
            "material": id_info_array[2],
            "image": img_src,
            "owner": nome,
            "author":author,
        };
        console.log(cloth_model)
        post_object(cloth_model)
    }


}