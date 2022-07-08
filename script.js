let selecao_1=0; let selecao_2=0; let selecao_3=0; 
let selecao_at_1=0; let selecao_at_2=0; let selecao_at_3=0; 
const urlAPI="https://mock-api.driven.com.br/api/v4/shirts-api/shirts"
const n_last_request=10;

const nome=prompt("Qual seu nome?");
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
    if (selecao_at_1!==0 && selecao_at_2!==0 && selecao_at_3!==0){
        el_finish=document.querySelector(".button");
        el_finish.style.background='#404EED'; 
    }
}
function get_user_image(){
    user_img = document.querySelector("input").value;
    return user_img
}

function create_object(){
    user_img=get_user_image();
    cloth_model={
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
    promise.then(wite_request);
    promise.catch(show_error)
}

function confirm_purchase(){
    let cloth_model=create_object();
    post_object(cloth_model);
    update_last_requests();
}

function wite_request(response){
    console.log(response)
    if (response.status===422){
        alert("Ops, não conseguimos processar sua encomenda!22")
    }
    else if (response.status===201){
        alert("Compra confirmada!")
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
    for (let i=response.data.length-n_last_request; i<response.data.length; i++){
        create_request_div(prev_request_div,response.data[i]);
    }
}

function create_request_div(parent_div,request_object){

    let div_id=request_object.id;
    let img_src=request_object.image;
    let subtitle=request_object.owner;
    console.log(request_object)

    // Create main div
    let div = document.createElement("div");
    div.id = div_id ;
    div.className = "pedido_legenda";
    parent_div.appendChild(div);  

    // Create image div
    let sub_div = document.createElement("div");
    sub_div.className = "pedido";
    div.append(sub_div);

    // Create image
    let el_img = document.createElement("img");
    el_img.className = "pedido";
    sub_div.appendChild(el_img);
    el_img.src=img_src;

    console.log(subtitle)
    // Create subtitle div inside main div
    div.innerHTML+=`<p class="bold">Criador:</p> ${subtitle}`
}