/* Game */

async function LoadImage(w, h, src) {

    return await new Promise((resolve, reject) => {
        const img = new Image(w, h);
        img.src = src;

        img.addEventListener('load', (event) => {
            resolve(img);
        });

        img.addEventListener('error', () => {
            reject();
        });
    });
};

(async () => {

    const player_texture = await LoadImage(64, 64, 'images/games/player.png');
    const missile_texture = await LoadImage(32, 32, 'images/games/missile.png');
    const asteroide_texture = await LoadImage(32, 32, 'images/games/asteroide.png');

    const player_scale = 2;
    const missile_scale = 2;
    const asteroide_scale = 2;

    const GameMenu = document.querySelector(".game-menu");
    const MessageGame = document.querySelector(".game-menu .message");
    const BtnStart = document.querySelector(".game-start");
    const canvas = document.querySelector(".game-engine");

    const BtnUp = document.querySelector(".mobile-game-controls .controls .up");
    const BtnDown = document.querySelector(".mobile-game-controls .controls .down");
    const BtnA = document.querySelector(".mobile-game-controls .controls .btn-a");


    if (canvas) {
        var UpdateLogicGameCache = undefined;
        const gameControls = {};
        const keyCodeMap = {};

        function CreateControl(button, callback) {
            let interval;
            button.addEventListener("mousedown", function(event) {
                interval = setInterval(() => callback(true), 10);
            });
            button.addEventListener("mouseup", function(event) {
                clearInterval(interval);
                callback(false);
            });
        }

        CreateControl(BtnUp, (click)=> gameControls.up = click);
        CreateControl(BtnDown,(click)=> gameControls.down = click);
        CreateControl(BtnA, (click)=> gameControls.btnA = click);

        canvas.height = canvas.width;

        BtnStart.addEventListener('click', () => {
            Game(true);
            GameMenu.classList.remove('show');
        });

        

        onkeydown = onkeyup = function (e) {
            keyCodeMap[e.keyCode] = e.type == 'keydown';
        };

    
        function Game(_IsStart) {

            document.body.style.overflowY = "hidden";

            const Player = {
                x: 0,
                y: 0,
                width: (player_scale * player_texture.width) / 2,
                height: (player_scale * player_texture.height) / 2,
                timeoutMissile: 0,
                dead: false
            };

            const missiles = [];
            const asteroides = [];

            var AsteroideSpawnTime = 0;
            var IsStart = _IsStart;

            if (canvas.getContext) {
                const context2d = canvas.getContext('2d');
                
                canvas.height = canvas.width;

                function intersect(a, b) {
                    return (
                        a.x < b.x + b.width &&
                        a.x + a.width > b.x &&
                        a.y < b.y + b.height &&
                        a.height + a.y > b.y
                    );
                };

                const UpdateLogicGame = () => {

                    /*=== Control ===*/
                    if (!Player.dead) {
                        if (keyCodeMap[38] || gameControls.up) {
                            if (Player.y > 0) {
                                Player.y = Player.y - 1 * 4;
                            }
                        }
                        else if (keyCodeMap[40] || gameControls.down) {
                            if (Player.y < canvas.height - ((player_scale * player_texture.width) /2)) {
                                Player.y = Player.y + 1 * 4;
                            }
                        }

                        if (Player.timeoutMissile <= 0) {
                            if (keyCodeMap[32] || gameControls.btnA) {
                                missiles.push({
                                    x: 5,
                                    y: Player.y + (Player.height / 2) - 
                                    ((missile_texture.width * missile_scale) / 2),

                                    width: missile_texture.width * missile_scale,
                                    height: missile_texture.height * missile_scale
                                });
                                Player.timeoutMissile = 100;
                            }
                        }
                        Player.timeoutMissile--;
                    };

                    /* === Asteroide Spawn Random ===*/
                    if (AsteroideSpawnTime <= 0) {

                        asteroides.push({
                            x: canvas.width,
                            y: (Math.random() * (canvas.height)) - (32 / 2),
                            width: asteroide_texture.width * asteroide_scale,
                            height: asteroide_texture.height * asteroide_scale
                        });

                        AsteroideSpawnTime = 30;

                        if (Player.color == "red") {
                            Player.color = "transparent";
                        };
                    };
                    AsteroideSpawnTime--;

                    /* === Asteroide Move rigth to left ===*/
                    for (var index = 0; index < asteroides.length; index++) {
                        var asteroide = asteroides[index];
                        if (asteroide !== undefined) {
                            if (asteroide.x < -50) {
                                delete asteroides[index];
                            };
                            asteroide.x = asteroide.x - 2;
                        };
                    };

                    /* === Missile Move left to rigth ===*/
                    for (var index = 0; index < missiles.length; index++) {
                        var missile = missiles[index];
                        if (missile !== undefined) {
                            if (missile.x > 500) {
                                delete missiles[index];
                            };
                            missile.x = missile.x + 3;
                        };
                    };

                    /* === Asteroide intersect player */
                    for (var index = 0; index < asteroides.length; index++) {
                        var asteroide = asteroides[index];
                        if (asteroide !== undefined) {
                            if (intersect(asteroide, Player)) {
                                Player.dead = true;
                                Player.color = "red";
                            };
                        };
                    };

                    /* === Missile intersect asteroide */
                    for (var Aindex = 0; Aindex < missiles.length; Aindex++) {
                        var missile = missiles[Aindex];
                        if (missile !== undefined) {
                            for (var Bindex = 0; Bindex < asteroides.length; Bindex++) {
                                var asteroide = asteroides[Bindex];
                                if (asteroide !== undefined) {
                                    if (intersect(asteroide, missile)) {
                                        delete missiles[Aindex];
                                        delete asteroides[Bindex];
                                    };
                                };
                            };
                        };
                    };
                };
                UpdateLogicGameCache = setInterval(UpdateLogicGame, 10);

                function Clear() {
                    context2d.clearRect(0, 0, canvas.width, canvas.height);
                    context2d.fillStyle = "rgb(31, 31, 31)";
                    context2d.fillRect(0, 0, canvas.width, canvas.height);
                };

                function FrameUpdate() {
                    Clear();

                    missiles.forEach((missile) => {
                        context2d.drawImage(
                            missile_texture,
                            0, 0,

                            missile_texture.width, missile_texture.height,

                            missile.x, missile.y,

                            missile_scale * missile_texture.width,
                            missile_scale * missile_texture.height,
                        );
                    });


                    if (!Player.dead) {
                        context2d.fillStyle = Player.color;
                        context2d.fillRect(0, Player.y, Player.width, Player.height);

                        context2d.drawImage(player_texture,
                            0, 0,
                            player_texture.width, player_texture.height,
                            0, Player.y,

                            player_scale * player_texture.width,
                            player_scale * player_texture.height,
                        );
                    }
                    else {
                        Clear();
                        IsStart = false;
                        clearInterval(UpdateLogicGameCache);
                        document.body.style.overflowY = "auto";
                        MessageGame.innerHTML = "Vous être mort !";
                        GameMenu.classList.add('show');
                        return
                    }

                    asteroides.forEach((asteroide) => {
                        context2d.drawImage(asteroide_texture,
                            0, 0,
                            asteroide_texture.width, asteroide_texture.height,
                            asteroide.x, asteroide.y,
                            asteroide_scale * asteroide_texture.width,
                            asteroide_scale * asteroide_texture.height,
                        );
                    });

                    if (IsStart)
                        requestAnimationFrame(FrameUpdate);
                };
                requestAnimationFrame(FrameUpdate);
            };
        };
    };
})();