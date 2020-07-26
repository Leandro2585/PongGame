let ctx, player1_y, player2_y, player1_points, player2_points
let ball_y_orientation, ball_x_orientation, ball_x, ball_y
const h=500, w=800, player_w=20, player_h=200, player1_x = 10, player2_x = w - player_w - 10

let player1_key, player2_key
document.addEventListener("keydown",function(ev){
    // keyCode 87 = w, keycode 83 = s
    if(ev.keyCode == 87 || ev.keyCode == 83){
        player1_key = ev.keyCode
    }
    // keycode 38 = arrowUp, keycode 40 = arrowDown
    else if(ev.keyCode== 38 || ev.keyCode==40)
        player2_key = ev.keyCode
})

function setup(){
    const canvas = document.getElementById("canvas")
    ctx = canvas.getContext("2d")

    // inicializa as posições y do player1 e do player2 para metade da tela
    player1_y = player2_y = (h / 2) - (player_h/2)

    // inicializa os pontos dos jogadores como 0
    player1_points = 0
    player2_points = 0

    //define um intervalo de 60 fps para o loop
    setInterval(loop,1000/60)

    initBall()
}

function loop(){
  //Verifica se a bola está colidindo com o barra do player 1
   if(ball_x >= player1_x && ball_x <= player1_x + 10 && ball_y >= player1_y && ball_y <= player1_y + player_h){
       ball_x_orientation = 1
   }
   //Verifica se a bola está colidindo com o barra do player 2
   else if(ball_x >= player2_x && ball_x <= player2_x + 10 && ball_y >= player2_y && ball_y <= player2_y + player_h){
       ball_x_orientation = -1
   }

   // verifica se a bola bateu no chão ou no teto
   if(ball_y + 10 >= h || ball_y <= 0) ball_y_orientation *= -1

   //move a bola no eixo X e Y
   ball_x += 5 * ball_x_orientation
   ball_y += 5 * ball_y_orientation

   if(ball_x+10 > w) {
        player1_points++
        initBall()
    }
    else if(ball_x < 0){
        player2_points ++
        initBall()
    }

    if(player1_key == 87 && player1_y > 0){
        player1_y -= 10
    }else if(player1_key == 83 && player1_y + player_h < h){
        player1_y += 10
    }

    if(player2_key == 38 && player2_y > 0){
        player2_y -= 10
    }else if(player2_key == 40 && player2_y + player_h < h){
        player2_y += 10
    }

    draw()
}

function initBall(){
    console.log(`${player1_points} VS ${player2_points}`)
    ball_y_orientation = Math.pow(2, Math.floor( Math.random() * 2 )+1) - 3
    ball_x_orientation = Math.pow(2, Math.floor( Math.random() * 2 )+1) - 3
    ball_x = w / 2 -10
    ball_y = h / 2 -10
}

function draw(){
    // fundo
    drawRect(0,0,w,h,"#44475a")
    // player 1
    drawRect(player1_x, player1_y, player_w, player_h, "#6272a4")
    // player 2
    drawRect(player2_x, player2_y, player_w, player_h, "#50fa7b")
    // barra lateral
    drawRect(w/2 -5,0,5,h)
    // bola
    drawRect(ball_x, ball_y, 10, 10)

    writePoints()
}

function drawRect(x,y,w,h,color="#f8f8f2"){
    ctx.fillStyle = color
    ctx.fillRect(x,y,w,h)
    ctx.fillStyle = "#44475a"
}

function writePoints(){
    ctx.font = "50px serif";
    ctx.fillStyle = "#f8f8f2";
    // w/4 = 1/4 da tela = metade da tela do player 1
    ctx.fillText(player1_points, w/4, 50);
    // 3*(w/4) = 3/4 da tela = metade da tela do player 2
    ctx.fillText(player2_points, 3*(w/4), 50);
}

setup()
