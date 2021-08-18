import chessRule from './ChessRule.js'


const canvas = document.getElementById('canvas')
let ctx = canvas.getContext("2d")


canvas.width = 720
canvas.height = 800

// 游戏中的状态
window.gameBeginFlagStatus = {}

function initGame() {
    map.drawScreen()
    // chessRule.red[0].moveRule()
}

class gameMap {
    constructor(gameScreen) {
        this.gameScreen = gameScreen
    }

    drawScreen() {
        ctx.lineWidth = 2
        ctx.strokeRect(20, 20, 680, 760)
        ctx.lineWidth = 2
        ctx.strokeRect(40, 40, 640, 720)

        this.initMap()

    }

    initMap() {
        this.drawXLine()
        this.drawHLine()
        this.drawALine()
        // a
        this.drawTLine(118, 198, true, false, false)
        this.drawTLine(597, 198, true, false, false)

        this.drawTLine(198, 277, true, false, false)
        this.drawTLine(358, 277, true, false, false)
        this.drawTLine(518, 277, true, false, false)

        this.drawTLine(38, 277, false, false, true)
        this.drawTLine(678, 277, false, true, false)
        // b
        this.drawTLine(118, 597, true, false, false)
        this.drawTLine(597, 597, true, false, false)

        this.drawTLine(198, 517, true, false, false)
        this.drawTLine(358, 517, true, false, false)
        this.drawTLine(518, 517, true, false, false)

        this.drawTLine(38, 517, false, false, true)
        this.drawTLine(678, 517, false, true, false)

        // this.drawCText()

        this.drawOLine()

        this.drawFlagItem()


    }

    drawXLine() {
        for (let i = 0; i < 8; i++) {
            ctx.beginPath()
            ctx.lineWidth = 2
            ctx.moveTo(40, (i + 1) * 80 + 40)
            ctx.lineTo(680, (i + 1) * 80 + 40)
            ctx.stroke()
            ctx.closePath()
        }
    }

    drawHLine() {
        for (let i = 0; i < 7; i++) {
            ctx.beginPath()
            ctx.lineWidth = 2
            ctx.moveTo((i + 1) * 80 + 40, 440)
            ctx.lineTo((i + 1) * 80 + 40, 760)
            ctx.stroke()
            ctx.closePath()
        }
    }

    drawALine() {
        for (let i = 0; i < 7; i++) {
            ctx.beginPath()
            ctx.lineWidth = 2
            ctx.moveTo((i + 1) * 80 + 40, 40)
            ctx.lineTo((i + 1) * 80 + 40, 360)
            ctx.stroke()
            ctx.closePath()
        }
    }

    drawCText() {
        ctx.fillStyle = 'block'
        ctx.font = '30px Arial'
        ctx.fillText('楚河', 173, 410)
        ctx.fillText('漢界', 490, 410)
    }

    drawTLine(x, y, all, l, r) {
        ctx.beginPath()
        if (all) {
            ctx.moveTo(x + 10, y + 10)
            ctx.lineTo(x + 10, y + 30)
            ctx.moveTo(x + 10, y + 10)
            ctx.lineTo(x + 30, y + 10)

            ctx.moveTo(x - 5, y - 3)
            ctx.lineTo(x - 5, y - 25)
            ctx.moveTo(x - 5, y - 3)
            ctx.lineTo(x - 25, y - 3)

            ctx.moveTo(x + 10, y - 3)
            ctx.lineTo(x + 10, y - 25)
            ctx.moveTo(x + 10, y - 3)
            ctx.lineTo(x + 30, y - 3)

            ctx.moveTo(x - 7, y + 10)
            ctx.lineTo(x - 7, y + 30)
            ctx.moveTo(x - 7, y + 10)
            ctx.lineTo(x - 25, y + 10)
        } else if (l) {
            ctx.moveTo(x - 5, y - 3)
            ctx.lineTo(x - 5, y - 25)
            ctx.moveTo(x - 5, y - 3)
            ctx.lineTo(x - 25, y - 3)

            ctx.moveTo(x - 7, y + 10)
            ctx.lineTo(x - 7, y + 30)
            ctx.moveTo(x - 7, y + 10)
            ctx.lineTo(x - 25, y + 10)
        } else if (r) {
            ctx.moveTo(x + 10, y - 3)
            ctx.lineTo(x + 10, y - 25)
            ctx.moveTo(x + 10, y - 3)
            ctx.lineTo(x + 30, y - 3)

            ctx.moveTo(x + 10, y + 10)
            ctx.lineTo(x + 10, y + 30)
            ctx.moveTo(x + 10, y + 10)
            ctx.lineTo(x + 30, y + 10)
        }
        ctx.stroke()
        ctx.closePath()
    }

    drawOLine() {

        ctx.beginPath()
        ctx.moveTo(280, 40)
        ctx.lineTo(440, 200)

        ctx.moveTo(440, 40)
        ctx.lineTo(280, 200)

        ctx.moveTo(280, 760)
        ctx.lineTo(440, 600)

        ctx.moveTo(440, 760)
        ctx.lineTo(280, 600)
        ctx.stroke()
        ctx.closePath()

    }

    drawFlagItem() {
        let selChessFlag = {
            stautus: false,
            obj: {},
            x: 0,
            y: 0
        }

        for (let item of chessRule.red) {
            for (let itemF in item.chessOpt) {
                // console.log(item.chessOpt[itemF])
                // 红方棋子样式
                const redGrd = ctx.createRadialGradient(item.chessOpt[itemF].x * 80 + 40, item.chessOpt[itemF].y * 80 + 40, 20, item.chessOpt[itemF].x * 80 + 40, item.chessOpt[itemF].y * 80 + 40, 30);
                redGrd.addColorStop(0, "#EE1616");
                redGrd.addColorStop(1, "#E97777");
                // 选中红方棋子样式
                const redGrdS = ctx.createRadialGradient(item.chessOpt[itemF].x * 80 + 40, item.chessOpt[itemF].y * 80 + 40, 20, item.chessOpt[itemF].x * 80 + 40, item.chessOpt[itemF].y * 80 + 40, 30);
                redGrdS.addColorStop(0, "#C1B76F");
                redGrdS.addColorStop(1, "#D1D7CB");


                if (item.chessOpt[itemF].isSelect) {
                    // 绘制可行路径帮助
                    selChessFlag.stautus = true
                    selChessFlag.obj = item
                    selChessFlag.x = item.chessOpt[itemF].x
                    selChessFlag.y = item.chessOpt[itemF].y

                    ctx.fillStyle = redGrdS;
                } else {
                    ctx.fillStyle = redGrd;
                }

                if (item.chessOpt[itemF].isAlive) {
                    ctx.beginPath()
                    ctx.arc(item.chessOpt[itemF].x * 80 + 40, item.chessOpt[itemF].y * 80 + 40, 30, 0, Math.PI * 2, true);
                    ctx.fill();
                    ctx.stroke()
                    ctx.closePath()

                    ctx.fillStyle = 'white'
                    ctx.font = '20px Arial'
                    ctx.fillText(item.text, item.chessOpt[itemF].x * 80 + 30, item.chessOpt[itemF].y * 80 + 50)
                }


                let vote = {}
                vote.id = `${item.text}${itemF}`
                vote.isAlive = item.chessOpt[itemF].isAlive
                vote.isColor = 'red'
                vote.x = item.chessOpt[itemF].x
                vote.y = item.chessOpt[itemF].y
                vote.xRange = {}
                vote.yRange = {}
                vote.xRange.l = item.chessOpt[itemF].x * 80 + 10
                vote.xRange.r = item.chessOpt[itemF].x * 80 + 70
                vote.yRange.t = item.chessOpt[itemF].y * 80 + 10
                vote.yRange.b = item.chessOpt[itemF].y * 80 + 70

                gameBeginFlagStatus[`${item.text}${itemF}`] = vote
                // gameBeginFlagStatus.push(vote)
            }
        }

        for (let item of chessRule.black) {
            for (let itemF in item.chessOpt) {
                // console.log(item.chessOpt[itemF])
                // 未选中黑棋样式
                const blackGrd = ctx.createRadialGradient(item.chessOpt[itemF].x * 80 + 40, item.chessOpt[itemF].y * 80 + 40, 20, item.chessOpt[itemF].x * 80 + 40, item.chessOpt[itemF].y * 80 + 40, 30);
                blackGrd.addColorStop(0, "#000004");
                blackGrd.addColorStop(1, "#817E69");
                // 已选中黑骑样式
                const blackGrdS = ctx.createRadialGradient(item.chessOpt[itemF].x * 80 + 40, item.chessOpt[itemF].y * 80 + 40, 20, item.chessOpt[itemF].x * 80 + 40, item.chessOpt[itemF].y * 80 + 40, 30);
                blackGrdS.addColorStop(0, "#817E69");
                blackGrdS.addColorStop(1, "#000004");

                if (item.chessOpt[itemF].isSelect) {
                    // 绘制可行路径帮助
                    selChessFlag.stautus = true
                    selChessFlag.obj = item
                    selChessFlag.x = item.chessOpt[itemF].x
                    selChessFlag.y = item.chessOpt[itemF].y

                    ctx.fillStyle = blackGrdS;
                } else {
                    ctx.fillStyle = blackGrd;
                }

                if (item.chessOpt[itemF].isAlive) {
                    ctx.beginPath();
                    ctx.arc(item.chessOpt[itemF].x * 80 + 40, item.chessOpt[itemF].y * 80 + 40, 30, 0, Math.PI * 2, true);
                    ctx.fill();
                    ctx.stroke()
                    ctx.closePath()

                    ctx.fillStyle = 'white'
                    ctx.font = '20px Arial'
                    ctx.fillText(item.text, item.chessOpt[itemF].x * 80 + 30, item.chessOpt[itemF].y * 80 + 50)
                }


                let vote = {}
                vote.id = `${item.text}${itemF}`
                vote.isAlive = item.chessOpt[itemF].isAlive
                vote.isColor = 'black'
                vote.x = item.chessOpt[itemF].x
                vote.y = item.chessOpt[itemF].y
                vote.xRange = {}
                vote.yRange = {}
                vote.xRange.l = item.chessOpt[itemF].x * 80 + 10
                vote.xRange.r = item.chessOpt[itemF].x * 80 + 70
                vote.yRange.t = item.chessOpt[itemF].y * 80 + 10
                vote.yRange.b = item.chessOpt[itemF].y * 80 + 70

                gameBeginFlagStatus[`${item.text}${itemF}`] = vote
                // gameBeginFlagStatus.push(vote)
            }
        }

        if (selChessFlag.stautus) {
            this.drawSelectPathHelp(selChessFlag.obj, selChessFlag.x, selChessFlag.y)
        }

    }

    drawSelectPathHelp(obj, x, y) {
        let pathObj = obj.moveRule(x, y)
        for (let i = 0; i < pathObj.length; i++) {
            ctx.beginPath()
            ctx.arc(pathObj[i].x * 80 + 40, pathObj[i].y * 80 + 40, 15, 0, Math.PI * 2, true);
            ctx.fillStyle = "#EED311";
            ctx.fill();
            ctx.closePath()
        }
    }
}



canvas.addEventListener('click', (e) => {
    processCurrentPoint(e)
}, false);

// 保存点击棋子能够行走的坐标们
let lastTimeClickChessIndex = []
let correctPos = []

// 处理当前点击的坐标
function processCurrentPoint(e) {

    // 点击得到的基于棋盘的坐标

    let clickFlag = detectPos(e)

    if (clickFlag) {
        document.querySelector('.show').innerHTML = clickFlag.id
        console.log(clickFlag)

        setChessSclectStatus(clickFlag)

        console.log(chessRule)

    } else {
        clearSelStatus()

        let clickX = Math.round((e.offsetX + 40) / 80) - 1
        let clickY = Math.round((e.offsetY + 40) / 80) - 1
        let flag = verPosErr(clickX, clickY)
        console.log(lastTimeClickChessIndex)
        if (!!correctPos[0]) {
            if (flag) {
                chessRule[lastTimeClickChessIndex[0]][lastTimeClickChessIndex[1]].chessOpt[lastTimeClickChessIndex[2]].x = clickX
                chessRule[lastTimeClickChessIndex[0]][lastTimeClickChessIndex[1]].chessOpt[lastTimeClickChessIndex[2]].y = clickY
            } else {
                alert('错误的位置')
            }
        }

        lastTimeClickChessIndex = []
        correctPos = []
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    initGame()
}

// 检测坐标范围内是什么
function detectPos({
    offsetX,
    offsetY
}) {
    for (let index in gameBeginFlagStatus) {
        let xl = parseInt(gameBeginFlagStatus[index].xRange.l)
        let xr = parseInt(gameBeginFlagStatus[index].xRange.r)
        let yt = parseInt(gameBeginFlagStatus[index].yRange.t)
        let yb = parseInt(gameBeginFlagStatus[index].yRange.b)
        if (offsetX >= xl && offsetX <= xr && offsetY >= yt && offsetY <= yb) {
            if (gameBeginFlagStatus[index].isAlive) {
                return gameBeginFlagStatus[index]
            }
        }
    }
}

// 设置当期选择的棋子为选中状态,并保存能行动的坐标
function setChessSclectStatus(clickFlag) {
    for (let i = 0; i < chessRule.red.length; i++) {
        for (let j = 0; j < chessRule.red[i].chessOpt.length; j++) {
            chessRule.red[i].chessOpt[j].isSelect = false
            chessRule.black[i].chessOpt[j].isSelect = false

        }
        if (chessRule.red[i].text == clickFlag.id.split('')[0]) {

            lastTimeClickChessIndex[0] = 'red'
            lastTimeClickChessIndex[1] = i
            lastTimeClickChessIndex[2] = clickFlag.id.split('')[1]

            chessRule.red[i].chessOpt[clickFlag.id.split('')[1]].isSelect = true

            correctPos = chessRule.red[i].moveRule(clickFlag.x, clickFlag.y)
        }
        if (chessRule.black[i].text == clickFlag.id.split('')[0]) {

            lastTimeClickChessIndex[0] = 'black'
            lastTimeClickChessIndex[1] = i
            lastTimeClickChessIndex[2] = clickFlag.id.split('')[1]

            chessRule.black[i].chessOpt[clickFlag.id.split('')[1]].isSelect = true

            correctPos = chessRule.black[i].moveRule(clickFlag.x, clickFlag.y)
        }
    }
}

// 清除全部已选中状态
function clearSelStatus() {
    for (let i = 0; i < chessRule.red.length; i++) {
        for (let j = 0; j < chessRule.red[i].chessOpt.length; j++) {
            chessRule.red[i].chessOpt[j].isSelect = false
            chessRule.black[i].chessOpt[j].isSelect = false
        }
    }
}

// 校验坐标是否正确
function verPosErr(x, y) {
    if (!correctPos[0]) return

    for (let i = 0; i < correctPos.length; i++) {
        if (correctPos[i].x === x && correctPos[i].y === y) {
            return true
        }
    }
}



let map = new gameMap(null)

initGame()

console.log(gameBeginFlagStatus)