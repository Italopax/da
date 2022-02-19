function createEle (type, conteudo, infos) {
    let newElement = document.createElement("p");
    if(type === "name"){
        let name = conteudo;
        name = name[0].toUpperCase() + name.substr(1);
        newElement.innerText = `Name: ${name}`;
    } else if(type === "height") {
        if(conteudo < 10){
            newElement.innerText = `Height: ${conteudo*10}cm`;
        } else{
            newElement.innerText = `Height: ${conteudo/10}m`;
        }
    } else if(type === "weight") {
        newElement.innerText = `Weight: ${conteudo}kg`;
    }
    infos.appendChild(newElement);
}

function clean (infos, boxImage) {
    infos.innerHTML = "";
    boxImage.style.backgroundImage = 'none';
}

function showInfos () {

    let input = document.querySelector("#valor");
    let inputValue = input.value;
    let image = document.querySelector(".image-pokemon")
    let infos = document.querySelector(".infos")
    let url = "https://pokeapi.co/api/v2/pokemon/";
    
    clean(infos, image);

    fetch(`${url}${inputValue}`)
        .then((res)=>{
            return res.json();
        }).then((data)=>{
            image.style.backgroundImage = `url(${data.sprites.other.dream_world.front_default})`;
            createEle("name", data.name, infos);
            createEle("height", parseFloat(data.height), infos);
            createEle("weight", parseFloat(data.weight)/10, infos);
        })
}

document.querySelector("#valor").addEventListener("keydown", function(e) {
    if(e.keyCode === 13) {    
        e.preventDefault();
        showInfos();
    }
});