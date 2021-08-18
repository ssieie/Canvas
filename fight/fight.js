const cav = document.getElementById('canvas')
let ctx = cav.getContext('2d')

cav.width = 1000
cav.height = 400

function Fight(rH, bH) {
    this.rH = rH
    this.bH = bH

    this.jumpKeepTime = 500

    this.rP = {
        x: 40,
        y: 380,
        move: false,
        jump: false,
        direction: 0
    }

    this.pointSpeed = 5
    this.pointObj = []
}

Fight.prototype.drawHouse = function () {
    ctx.lineWidth = 3
    ctx.strokeStyle = "#000000"
    ctx.beginPath()
    ctx.moveTo(0, 0)
    ctx.lineTo(0, 400)
    ctx.lineTo(1000, 400)
    ctx.lineTo(1000, 0)
    ctx.stroke()
    ctx.closePath()
}

Fight.prototype.drawLife = function () {
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.strokeRect(10, 1, 102, 20)
    ctx.strokeRect(888, 1, 102, 20)
    ctx.closePath()

    ctx.lineWidth = 1
    ctx.strokeStyle = "#FF0000"
    for (let i = 1; i <= this.rH; i++) {
        ctx.beginPath()
        ctx.moveTo(10 + i, 1)
        ctx.lineTo(10 + i, 20)
        ctx.stroke()
        ctx.closePath()
    }
    for (let i = 1; i <= this.bH; i++) {
        ctx.beginPath()
        ctx.moveTo(990 - i, 1)
        ctx.lineTo(990 - i, 20)
        ctx.stroke()
        ctx.closePath()
    }
}

Fight.prototype.drawPerson = function () {
    ctx.lineWidth = 2
    ctx.beginPath()
    let hd
    if (this.rP.direction === 0 || this.rP.direction === 38) {
        hd = this.rP.x
    } else {
        hd = this.rP.direction === 39 ? this.rP.x % 2 === 0 ? this.rP.x + 5 : this.rP.x : this.rP.x % 2 === 0 ? this.rP.x - 5 : this.rP.x
    }

    ctx.arc(hd, this.rP.y - 14, 8, 0, 2 * Math.PI)
    ctx.arc(this.rP.x, this.rP.y, 14, 0, 2 * Math.PI)
    ctx.arc(this.rP.x + 5, this.rP.y + (this.rP.x % 2 === 0 ? 9 : 11), 6, 0, 2 * Math.PI)
    ctx.arc(this.rP.x - 5, this.rP.y + (this.rP.x % 2 === 0 ? 11 : 9), 6, 0, 2 * Math.PI)
    ctx.fill()
    ctx.closePath()
}

Fight.prototype.drawPoint = function () {
    for (let i = 0; i < this.pointObj.length; i++) {

        if (!this.pointObj[i].path) return this.pointObj.splice(i, 1)

        if (this.pointObj[i].path === 'l') {
            this.pointObj[i].x -= this.pointSpeed
        } else if (this.pointObj[i].path === 'r') {
            this.pointObj[i].x += this.pointSpeed
        }

        if (this.pointObj[i].x > 1000 || this.pointObj[i].x < 0) return this.pointObj.splice(i, 1)

        ctx.beginPath()
        ctx.arc(this.pointObj[i].x, this.pointObj[i].y, 3, 0, 2 * Math.PI)
        ctx.fill()
        ctx.closePath()
    }
}

Fight.prototype.render = function () {

    ctx.clearRect(0, 0, 1000, 400)
    this.drawHouse()
    this.drawLife()
    this.drawPerson()
    window.requestAnimationFrame(this.render.bind(this))
    if (this.rP.move) {
        switch (this.rP.direction) {
            case 37:
                if (this.rP.x > 18) this.rP.x -= 3
                break;
            case 38:
                if (!this.rP.jump) {
                    this.rP.jump = true
                    setTimeout(() => {
                        this.rP.jump = false
                    }, this.jumpKeepTime)
                }
                break;
            case 39:
                if (this.rP.x < 982) this.rP.x += 3
                break;
            default:
                break;
        }
    }

    if (this.rP.jump) {
        if (this.rP.y > 25) this.rP.y -= 3
    } else {
        if (this.rP.y < 380) this.rP.y += 4
    }

    if (this.pointObj.length) {
        this.drawPoint()
    }
}

Fight.prototype.personMove = function (direction, status) {
    if (![37, 38, 39, 32].includes(direction)) return
    if (direction === 32) {
        this.pointObj.push({
            x: this.rP.x,
            y: this.rP.y,
            path: this.rP.direction === 37 ? 'l' : this.rP.direction === 39 ? 'r' : false
        })
    } else {
        this.rP.move = status
        this.rP.direction = direction
    }

}


const fight = new Fight(50, 70)

fight.render()

document.addEventListener('keydown', (e) => {
    fight.personMove(e.keyCode, true)
})

document.addEventListener('keyup', (e) => {
    fight.personMove(e.keyCode, false)
})