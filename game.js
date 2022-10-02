const canva = document.getElementById('cvs');
const ctx = canva.getContext('2d');
canva.style.backgroundColor = "green";

// recupere la hauteur de largeur de l'écrant est definit le canvas
var cW = document.body.clientWidth;
var cH = document.body.clientHeight;

// Recupere la taille de la div 
let div = document.querySelector('div').getBoundingClientRect().height
// soustrait la hauteur de la div par rapport a lecran
cH -= div;

// recuprere le <p> 
let paragraphe = document.querySelector('p')

// definit la taille du canva
cH = (Math.floor(cH/20))*20
cW = (Math.floor(cW/20))*20
canva.setAttribute("height" , cH)
canva.setAttribute("width" , cW)

// position de départ
//var x =100;
//var y = 0;
let x = cW / 2
let y = cH / 2

// verifie si y est un multiple de 20
if(!Number.isInteger(y / 20)){
    let dif = y % 20;
    y -= dif;
}
// taille du snack
var t = 20;
//ctx.fillRect(x, y, t,t)
let X = 20;
let Y = 0;
// vitesse 
let vitesse = 250
let score = 0

var snake = [[x - 40, y],[x -20 , y ],[x,y]]
var pomme = []

for(i=0 ;i < snake.length ; i++)
{
    ctx.fillStyle = 'blue'
    ctx.fillRect(snake[i][0], snake[i][1], t,t)
}

document.addEventListener("keydown" , direction);
function direction(e)
{
    //console.log(e.keyCode)
    // Droite > 39 || gauche > 37 || haut > 38 || bas > 40
    switch (e.keyCode) {
        case 32:
            lunch()
            break;
        case 39:
            //draw(+t,+0)
            return X=t , Y=0
        break;
        case 37:
            //draw(-t,+0)
            return X = -t , Y=0
        break;
        case 38:
            //draw(+0,-t)
            return X = 0 , Y = -t
        break;
        case 40:
            //draw(+0,+t)
            return X = 0 , Y = +t
        break;
        default:
            break;
    }
}


function draw()
{

    if(!pomme.length){nourriture()}
    //if(!pomme.length){setTimeout(function(){nourriture()}, 900)} 

    // efface le snak
    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = 'blue'
        ctx.clearRect(snake[i][0],snake[i][1],t,t)
        
    }
    // supprime le premier element
    snake.shift()

    x+=X
    y+=Y

    // ajoute a la fin du tableau
    snake.push([x,y])

    if(x == pomme[0] && y == pomme[1]){eat()}
    // parcourt le tableau pour desiner le snak
    for (let i = 0; i < snake.length; i++) {
        ctx.fillRect(snake[i][0],snake[i][1],t,t)  
        
    }

    gameOver()
}

function gameOver()
{

    let bool = false;

    let snakeL = snake.length 
    // si le carrer sort de la zone
    if(x < 0 || x >= cW || y < 0 || y >= cH){
        bool = true;
    }

    for (let i = 0; i <snakeL -1; i++) {
        if(snake[i][0] == snake[snakeL -1][0] && snake[i][1] == snake[snakeL -1][1])
        {
            bool = true;
        }

        if(bool)
        {
            clearInterval(i1)
            var conf = confirm(`score = ${score} \n Voulez vous recommencer ?`)
            alert(conf)
            if(conf){
                document.location.reload(true)
            }else {window.close()}

            break;
        }
    }
    //console.log(snakeL)

}

function lunch()
{
 i1 = setInterval(function(){draw()},vitesse)  
}

function eat()
{
    console.log("eat")
    snake.unshift([snake[0][0],snake[0][1]])
    pomme = []
    vitesse-=10
    clearInterval(i1)
    lunch()
    score+=20

    paragraphe.innerText = `score : ${score}`;
}

function nourriture()
{
    let nH = (Math.floor(Math.random()*(cH/20)))*20
    let nW = (Math.floor(Math.random()*(cW/20)))*20
    pomme = [nW,nH]


    setTimeout(function(){
        ctx.fillStyle = 'red'
        ctx.fillRect(nW,nH,t,t)},800)
}
