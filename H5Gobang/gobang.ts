
const cav = <HTMLCanvasElement>document.getElementById('canvas')
const ctx = cav.getContext('2d')

cav.width = 840
cav.height = 840

/**
 * 角色数据
 * 1 白方 2 黑方 3 观众
 */

let currentRole: number

// 当前是谁的回合

let currentRound: number

let gobangData: Array<any> = []

class initScreen {
    screenW: number = 780
    screenH: number = 780

    xLine: number
    yLine: number
    lineColor: string = '#000000'

    boundaryX: number
    boundaryY: number


    constructor(xLine: number, yLine: number, lineColor?: string) {
        this.xLine = xLine
        this.yLine = yLine
        this.lineColor = lineColor ? lineColor : '#000000'
    }

    drawScreen(): void {
        ctx.clearRect(0, 0, cav.width, cav.height);

        this.boundaryX = (840 - this.screenW) / 2
        this.boundaryY = (840 - this.screenH) / 2
        ctx.fillStyle = this.lineColor
        ctx.strokeRect(this.boundaryX, this.boundaryY, this.screenW, this.screenH)

        this.drawX()
        this.drawY()

        this.drawPiece()

    }

    drawX(): void {
        let xInterval: number = this.screenW / this.xLine
        for (let i = 1; i < this.xLine; i++) {
            ctx.beginPath()
            ctx.moveTo(xInterval * i + this.boundaryX, this.boundaryY)
            ctx.lineTo(xInterval * i + this.boundaryX, this.screenH + this.boundaryY)
            ctx.stroke()
            ctx.closePath()
        }
    }

    drawY(): void {
        let yInterval: number = this.screenH / this.yLine
        for (let i = 1; i < this.yLine; i++) {
            ctx.beginPath()
            ctx.moveTo(this.boundaryX, yInterval * i + this.boundaryY);
            ctx.lineTo(this.screenW + this.boundaryX, yInterval * i + this.boundaryX);
            ctx.stroke()
            ctx.closePath()
        }
    }

    drawPiece(): void {
        let radius: number = this.screenW / this.xLine * 0.4

        let interval: number = this.screenW / this.xLine

        for (let i = 0; i < gobangData.length; i++) {
            ctx.fillStyle = gobangData[i].color === 1 ? '#ffffff' : '#333333'
            ctx.beginPath()
            ctx.arc(interval * gobangData[i].x + this.boundaryX, interval * gobangData[i].y + this.boundaryY, radius, 0, Math.PI * 2, true)
            ctx.fill()
            ctx.closePath()
        }
    }

    gameListener(): void {
        cav.addEventListener('click', this.gobangClickEvent.bind(this))
    }

    gobangClickEvent(): void {

        let x: number = Math.round((arguments[0].offsetX + this.boundaryX) / (this.boundaryX * 2)) - 1
        let y: number = Math.round((arguments[0].offsetY + this.boundaryY) / (this.boundaryY * 2)) - 1

        // 是否是当前回合
        if (!currentRole) return
        if (currentRole !== currentRound) return

        // 是否有效走棋
        for (let i = 0; i < gobangData.length; i++) {
            if (gobangData[i].x === x && gobangData[i].y === y) {
                alert('无效走棋')
                return
            }
        }

        socket.send(JSON.stringify({
            x,
            y,
            color: currentRole
        }))

        // let piece: Object = {
        //     color: currentRole,
        //     x,
        //     y
        // }

        // gobangData.push(piece)

        this.drawScreen()

    }
}

let game = new initScreen(13, 13)

game.drawScreen()

game.gameListener()


let socket: WebSocket
let pongTimer: any

if ('WebSocket' in window) {
    initSocket()
} else {
    alert('浏览器不支持')
}

function initSocket() {
    socket = new WebSocket('ws://127.0.0.1:8888/ping')
    socket.onopen = () => {
        socket.send('ping')
        keepLink()
    }
    socket.onmessage = (evt) => {
        console.log(JSON.parse(evt.data));
        let data = JSON.parse(evt.data)
        document.getElementById("userRole").innerHTML = data.role === 1 ? '白方' : data.role === 2 ? '黑方' : '观众'
        document.getElementById("userRound").innerHTML = data.round === 0 ? '未开始' : data.round === 1 ? '白方' : '黑方'
        if (data.msg) {
            // alert(data.msg)
        }

        currentRole = data.role
        currentRound = data.round

        gobangData = data.data
        game.drawScreen()
    }
    socket.onerror = () => {
        clearInterval(pongTimer)
        alert('链接已经断开')
    }
}

function keepLink() {
    pongTimer = setInterval(() => {
        socket.send('ping')
    }, 10000);
}

function refresh() {
    let code = prompt("编码缺陷，重开麻烦：", "");
    if (code == null || code == "") {
    } else {
        currentRound = 0
        currentRole = 0
        fetch(`http://127.0.0.1:8888/refresh?pwd=${code}`)
            .then(response => response.json())
            .then(json => console.log(json))
            .catch(err => console.log('Request Failed', err));
    }
}