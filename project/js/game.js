let objBalls = [];
let objCells = [[], [], [], [], [], [], [], []];
let sec=5;
let min=0;
let oneMin = 60 * 1;

function clearSVG() {
    let svg=document.getElementsByTagName('svg')[0];
    while (svg.lastChild) {
        svg.removeChild(svg.lastChild);
    }
    let d = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    d.setAttributeNS(null, 'x', '0');
    d.setAttributeNS(null, 'y', '0');
    d.setAttributeNS(null, 'width', '374');
    d.setAttributeNS(null, 'height', '498');
    d.setAttributeNS(null, 'style', 'fill: #555566; stroke: white; stroke-width: 5;');
    d.setAttributeNS(null, 'id', 'areaP');
    svg.appendChild(d);
}

function startGame() {
    sec=5;
    min=0;
    oneMin= 60 * 1;
    clearSVG();

    let active;
    let colors = ["blue", "red", "purple", "yellow", "green"];
    let ballId = 100;
    let score=0;
    let r=document.getElementById("score");
    r.innerText=0;

    function Ball(x, y, color, id, cell) {
        let self = this;
        self.x = x;
        self.y = y;
        self.color = color;
        self.r = "26";
        self.id = id;
        self.status = false;
        self.objCell = cell;
        self.drawBalls = function () {
            let d = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            d.setAttributeNS(null, 'cx', String(self.x));
            d.setAttributeNS(null, 'cy', '0');
            d.setAttributeNS(null, 'r', self.r);
            d.setAttributeNS(null, 'style', 'fill: ' + self.color + ';');
            d.setAttributeNS(null, 'id', self.id);
            let par = document.getElementsByTagName("svg")[0];
            par.appendChild(d);
            let anim = document.createElementNS("http://www.w3.org/2000/svg", "animate");
            anim.setAttributeNS(null, 'attributeName', "cy");
            anim.setAttributeNS(null, "from", "0");
            anim.setAttributeNS(null, "to", String(self.y));
            anim.setAttributeNS(null, "dur", "0.8s");
            anim.setAttributeNS(null, "begin", "indefinite");
            anim.setAttributeNS(null, "fill", "freeze");
            anim.setAttribute("repeatCount", "1");
            d.appendChild(anim);
            d.addEventListener("click", function () {
                active = self.id;
            });
            anim.beginElement();
        };

        self.move = function (side) {
            let animateTag;
            let b = document.getElementById(self.id);
            if (side === "left") {
                animateTag = b.firstChild;
                b.setAttributeNS(null, 'cy', self.y);
                animateTag.setAttributeNS(null, 'attributeName', "cx");
                animateTag.setAttributeNS(null, "from", self.x);
                animateTag.setAttributeNS(null, "dur", "400ms");
                self.x -= 62;
                b.setAttributeNS(null, 'cx', String(self.x));
                animateTag.setAttributeNS(null, "to", self.x);
                animateTag.beginElement();
            }
            if (side === "right") {
                animateTag = b.firstChild;
                b.setAttributeNS(null, 'cy', self.y);
                animateTag.setAttributeNS(null, 'attributeName', "cx");
                animateTag.setAttributeNS(null, "from", self.x);
                animateTag.setAttributeNS(null, "dur", "400ms");
                self.x += 62;
                b.setAttributeNS(null, 'cx', String(self.x));
                animateTag.setAttributeNS(null, "to", self.x);
                animateTag.beginElement();
            }
            if (side === "up") {
                animateTag = b.firstChild;
                animateTag.setAttributeNS(null, 'attributeName', "cy");
                animateTag.setAttributeNS(null, "from", self.y);
                animateTag.setAttributeNS(null, "dur", "400ms");
                self.y -= 62;
                b.setAttributeNS(null, 'cy', String(self.y));
                animateTag.setAttributeNS(null, "to", self.y);
                animateTag.beginElement();
            }
            if (side === "down") {
                animateTag = b.firstChild;
                animateTag.setAttributeNS(null, 'attributeName', "cy");
                animateTag.setAttributeNS(null, "from", self.y);
                animateTag.setAttributeNS(null, "dur", "400ms");
                self.y += 62;
                b.setAttributeNS(null, 'cy', String(self.y));
                animateTag.setAttributeNS(null, "to", self.y);
                animateTag.beginElement();
            }
        };
        self.getStatus = function () {
            return self.status;
        };
        self.setStatus = function (status) {
            self.status = status;
        };
        self.getId = function () {
            return self.id;
        };
        self.getPosition = function () {
            return [self.x, self.y];
        };
        self.getColor = function () {
            return self.color;
        };
        self.getCell = function () {
            return self.objCell;
        };
        self.setCell = function (cell) {
            self.objCell = cell;
        }
    }

    function Cell(x, y, id, w, h) {
        let self = this;
        self.x = x;
        self.y = y;
        self.w = w;
        self.h = h;
        self.id = id;
        self.objBall = " ";
        self.xBall = self.x + 31;
        self.yBall = self.y + 31;
        self.fill = false;
        self.drawCell = function () {
            let pos = document.createElementNS("http://www.w3.org/2000/svg", "rect");
            pos.setAttributeNS(null, 'x', String(self.x));
            pos.setAttributeNS(null, 'y', String(self.y));
            pos.setAttributeNS(null, 'width', String(self.w));
            pos.setAttributeNS(null, 'height', String(self.h));
            pos.setAttributeNS(null, 'style', 'stroke:#444455; fill:none');
            pos.setAttributeNS(null, 'id', self.id);
            let par = document.getElementsByTagName("svg")[0];
            par.appendChild(pos);
        };
        self.check = function () {
        };
        self.getFill = function () {
            return self.fill;
        };
        self.setFill = function (fill) {
            self.fill = fill;
        };
        self.getBallPosition = function () {
            return [self.xBall, self.yBall];
        };
        self.setBall = function (ball) {
            self.objBall = ball;
        };
        self.getBall = function () {
            return self.objBall;
        };
        self.getId = function () {
            return self.id;
        }
    }

    function addListeners() {
        objBalls.forEach(function (ball) {
            let element = document.getElementById(ball.getId());
            element.addEventListener("click", function () {
                pressBall(ball);
            }, false)
        })
    }

    function addListenerForOne(ball) {
        let element = document.getElementById(ball.getId());
        element.addEventListener("click", function () {
            pressBall(ball);
        }, false)
    }

    function highlightCell(id) {
        let cellId = "";
        for (let i = 0; i < objBalls.length; i++) {
            if (id === objBalls[i].getId()) {
                cellId = objBalls[i].getCell().getId();
            }
        }
        let element = document.getElementById(cellId);
        element.setAttributeNS(null, "style", 'stroke:white; stroke-width:3; stroke-dasharray:3%; fill:none');
    }

    function unhighlightCell(id) {
        let cellId = "";
        for (let i = 0; i < objBalls.length; i++) {
            if (id === objBalls[i].getId()) {
                cellId = objBalls[i].getCell().getId();
            }
        }
        let element = document.getElementById(cellId);
        element.setAttributeNS(null, "style", 'stroke:#444455; fill:none');
    }

    async function pressBall(mainBall) {
        let firstCheck = true;
        let activeBall = "";
        let st = "";
        objBalls.forEach(function (ball) {
            if (ball.getStatus() === true) {
                activeBall = ball;
                highlightCell(activeBall.getId());
                firstCheck = false;
            }
        });
        if (firstCheck === true) {
            mainBall.setStatus(true);
            highlightCell(mainBall.getId());
            return 0;
        }
        if (mainBall === activeBall) {
            return 0;
        } else {
            if (activeBall.getStatus() === true && mainBall.getPosition()[0] - 62 === activeBall.getPosition()[0] &&
                mainBall.getPosition()[1] === activeBall.getPosition()[1]) {
                mainBall.move("left");
                activeBall.move("right");
                unhighlightCell(activeBall.getId());
                unhighlightCell(mainBall.getId());
                changeLink(mainBall, activeBall);
                activeBall.setStatus(false);
                let check = await startDestroy();

                if (check === false) {
                    mainBall.move("right");
                    activeBall.move("left");
                    changeLink(mainBall, activeBall);
                }
                activeBall = "";
                return 0;
            } else if (activeBall.getStatus() === true && mainBall.getPosition()[0] + 62 === activeBall.getPosition()[0] &&
                mainBall.getPosition()[1] === activeBall.getPosition()[1]) {
                mainBall.move("right");
                activeBall.move("left");
                unhighlightCell(activeBall.getId());
                unhighlightCell(mainBall.getId());
                changeLink(mainBall, activeBall);
                activeBall.setStatus(false);
                let check = await startDestroy();
                if (check === false) {
                    mainBall.move("left");
                    activeBall.move("right");
                    unhighlightCell(activeBall.getId());
                    unhighlightCell(mainBall.getId());
                    changeLink(mainBall, activeBall);
                }
                activeBall = "";
                return 0;
            } else if (activeBall.getStatus() === true && mainBall.getPosition()[0] === activeBall.getPosition()[0] &&
                mainBall.getPosition()[1] - 62 === activeBall.getPosition()[1]) {
                mainBall.move("up");
                activeBall.move("down");
                unhighlightCell(activeBall.getId());
                unhighlightCell(mainBall.getId());
                changeLink(mainBall, activeBall);
                activeBall.setStatus(false);
                let check = await startDestroy();
                if (check === false) {
                    mainBall.move("down");
                    activeBall.move("up");
                    unhighlightCell(activeBall.getId());
                    unhighlightCell(mainBall.getId());
                    changeLink(mainBall, activeBall);
                }
                activeBall = "";
                return 0;
            } else if (activeBall.getStatus() === true && mainBall.getPosition()[0] === activeBall.getPosition()[0] &&
                mainBall.getPosition()[1] + 62 === activeBall.getPosition()[1]) {
                mainBall.move("down");
                activeBall.move("up");
                unhighlightCell(activeBall.getId());
                unhighlightCell(mainBall.getId());
                changeLink(mainBall, activeBall);
                activeBall.setStatus(false);

                let check = await startDestroy();
                if (check === false) {
                    mainBall.move("up");
                    activeBall.move("down");
                    unhighlightCell(activeBall.getId());
                    unhighlightCell(mainBall.getId());
                    changeLink(mainBall, activeBall);
                }
                activeBall = "";
                return 0;
            } else {
                mainBall.setStatus(true);
                activeBall.setStatus(false);
                unhighlightCell(activeBall.getId());
                highlightCell(mainBall.getId());
                activeBall = "";
                return 0;
            }
        }
    }

    //меняет местами ссылки шар-ячейка, ячейка-шар
    function changeLink(main, active) {
        let temp = main;
        let temp2 = main.getCell();

        main.getCell().setBall(active);
        main.setCell(active.getCell());
        active.getCell().setBall(temp);
        active.setCell(temp2);
    }

    //проверка 3 в ряд (вертикаль и горизонталь)
    function checkInLine() {
        let arrBalls = [];
        let arrCells = [];
        let deleted = false;
        for (let i = 0; i < 8; i++) {
            let color = objCells[i][0].getBall().getColor();
            for (let j = 0; j < 6; j++) {
                if (color === objCells[i][j].getBall().getColor()) {
                    color = objCells[i][j].getBall().getColor();
                    arrBalls.push(objCells[i][j].getBall());
                    arrCells.push(objCells[i][j]);
                } else {
                    if (arrBalls.length >= 3) {
                        destroy(arrBalls, arrCells);
                        deleted = true;
                    }
                    arrBalls = [objCells[i][j].getBall()];
                    arrCells = [objCells[i][j]];
                    color = objCells[i][j].getBall().getColor();
                }
            }
            if (arrBalls.length >= 3) {
                destroy(arrBalls, arrCells);
                deleted = true;
            }
            arrBalls = [];
            arrCells = [];
        }
        //вертикаль
        for (let i = 0; i < 6; i++) {
            let color = objCells[i][0].getBall().getColor();
            for (let j = 0; j < 8; j++) {
                if (objCells[j][i].getFill() !== false) {
                    if (color === objCells[j][i].getBall().getColor()) {
                        color = objCells[j][i].getBall().getColor();
                        arrBalls.push(objCells[j][i].getBall());
                        arrCells.push(objCells[j][i]);
                    } else {
                        if (arrBalls.length >= 3) {
                            destroy(arrBalls, arrCells);
                            deleted = true;
                        }
                        arrBalls = [objCells[j][i].getBall()];
                        arrCells = [objCells[j][i]];
                        color = objCells[j][i].getBall().getColor();
                    }
                }
            }
            if (arrBalls.length >= 3) {
                destroy(arrBalls, arrCells);
                deleted = true;
            }
            arrBalls = [];
            arrCells = [];
        }
        return deleted;
    }

    function destroy(balls, cells) {
        let d = "";
        for (let i = 0; i < balls.length; i++) {
            d = document.getElementById(balls[i].getId());
            d.remove();
            score+=10;
            cleanStorage(balls[i]);
        }
        for (let i = 0; i < cells.length; i++) {
            cells[i].setFill(false);
        }
        let r=document.getElementById("score");
        r.innerText=score;
    }

    async function fall() {
        while (checkField() === true) {
            for (let i = 0; i < 6; i++) {
                if (objCells[0][i].getFill() === false) {
                    objBalls.push(new Ball(objCells[0][i].getBallPosition()[0], objCells[0][i].getBallPosition()[1], colors[Math.round(getRandomArbitary(0, 4))], ballId, objCells[0][i]));
                    objBalls[objBalls.length - 1].drawBalls();
                    objCells[0][i].setBall(objBalls[objBalls.length - 1]);
                    objCells[0][i].setFill(true);
                    ballId++;
                    addListenerForOne(objBalls[objBalls.length - 1])

                }
            }
            for (let i = 1; i < 8; i++) {
                for (let j = 0; j < 6; j++) {
                    if (objCells[i][j].getFill() === false) {
                        objCells[i - 1][j].getBall().move("down");
                        // await timeout(200);
                        objCells[i - 1][j].getBall().setCell(objCells[i][j]);
                        objCells[i][j].setBall(objCells[i - 1][j].getBall());
                        objCells[i][j].setFill(true);
                        objCells[i - 1][j].setFill(false);
                    }

                }
                //await timeout(80); // будут падать по одному
                // задержка 0.5с тут для плавности вертикали
            }


        }
    }

    //фун-я проверяет поле, если есть хотя бы 1 пустая ячейка возвращ. true
    function checkField() {
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 6; j++) {
                if (objCells[i][j].getFill() === false) {
                    return true;
                }
            }
        }
        return false;
    }

    //функция очистки objBalls от удаленных шаров
    function cleanStorage(element) {
        let position = 0;
        while (objBalls[position] !== element) {
            position++;
        }
        objBalls.splice(position, 1);
    }

    async function startDestroy() {
        await timeout(1000);
        let check = await checkInLine();
        let mainCheck = check;

        while (check === true) {
            await timeout(1000);
            await fall();
            await timeout(1000);
            check = await checkInLine();
            await timeout(1000);
        }
        if (mainCheck === false) {
            return false
        } else {
            return true
        }
    }

    function timeout(ms) {
        return new Promise(res => setTimeout(res, ms))
    }

    function getRandomArbitary(min, max) {
        return Math.random() * (max - min) + min;
    }

    function pageLoad() {
        let x = 2;
        let y = 2;
        let w = 60;
        let h = 60;
        let id = 0;
        let counter = 0;

        for (let i = 0; i < 8; i++) {
            x = 2;
            for (let j = 0; j < 6; j++) {
                objCells[i][j] = new Cell(x, y, id, w, h);
                objCells[i][j].drawCell();
                objBalls[counter] = new Ball(objCells[i][j].getBallPosition()[0], objCells[i][j].getBallPosition()[1], colors[Math.round(getRandomArbitary(0, 4))], ballId, objCells[i][j]);
                objBalls[counter].drawBalls();
                objCells[i][j].setBall(objBalls[counter]);
                objCells[i][j].setFill(true);
                x += 62;
                counter++;
                id++;
                ballId++;
            }
            y += 62;
        }
        startDestroy();
        addListeners();
    }


    pageLoad();
}



function finish() {
    objCells=[[], [], [], [], [], [], [], []];
    objBalls=[];
    storeInfo();
}

function startTimer(duration) {
    let display = document.querySelector('#time');
    let minTimer = duration, minutes, seconds;

    let inter = setInterval(function () {
        let visualTimer = document.getElementById('visual-timer');
        visualTimer.classList.add("height-change");

        minutes = parseInt(minTimer / 60);
        seconds = parseInt(minTimer % 60);

        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (--minTimer < 0) {
            clearInterval(inter);
            finish();
            document.getElementById("b_start").style.display = 'block';
        }

    }, 1000);
}

function refresh()
{
    sec--;
    if(sec==-1){sec=59; min=min-1;}
    else{min=min;}
    if(sec<=9){sec="0" + sec;}
    time=(min<=9 ? "0"+min : min) + ":" + sec;
    if(document.getElementById){timer.innerHTML=time;}
    inter=setTimeout("refresh()", 1000);
    if(min==0 && sec==0){
        sec="00";
        clearInterval(inter);
        finish();
        document.getElementById("b_start").style.display = 'block';
    }
}

function addListnerToBtn() {
    let button = document.getElementById("b_start");
    button.addEventListener("click", function () {
        startGame();
        //refresh();
        startTimer(oneMin);
        document.getElementById("b_start").style.display = 'none';
    }, false)
}
