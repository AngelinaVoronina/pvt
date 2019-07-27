let btn=document.getElementById("1");
btn.addEventListener("click", function(){
    startGame();
},false);

function startGame() {
    console.log("1");
    window.location="#game";
    document.body.outerHTML=templateBodyGame;
    document.head.outerHTML=temlateHeadGame;
}

function removeAllAttrs(element) {
    for (let i= element.attributes.length; i-->0;)
        element.removeAttributeNode(element.attributes[i]);
}

