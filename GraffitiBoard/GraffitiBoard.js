const cav = document.getElementById('canvas')
let ctx = cav.getContext('2d')

cav.width = window.innerWidth
cav.height = window.innerHeight - 4

let mouseStatus = false

// 画笔参数
let penColor = '#000000'
let font = 4

let point = []

function drawPic(x, y) {
    ctx.fillStyle = penColor
    ctx.beginPath()
    ctx.arc(x, y, font, 0, Math.PI * 2, true)
    ctx.fill()
}


window.addEventListener('mousedown', (e) => {
    mouseStatus = true
})

window.addEventListener('mousemove', (e) => {
    if (e.target.id !== 'canvas') return
    if (mouseStatus) {
        if (e.offsetX >= 0 && e.offsetX <= window.innerWidth && e.offsetY >= 0 && e.offsetY <= window.innerHeight) {
            console.log(1);
            let vote = {
                x: e.offsetX,
                y: e.offsetY
            }
            point.push(vote)
            drawPic(e.offsetX, e.offsetY)
        }
        // window.requestAnimationFrame()
    }
})

window.addEventListener('mouseup', (e) => {
    mouseStatus = false
    if (e.target.id !== 'canvas') return
    sendPoint(point)
    point = []
})

window.addEventListener('touchmove', (e) => {
    console.log(e.touches[0].clientY)
    if (e.touches[0].clientX >= 0 && e.touches[0].clientX <= window.innerWidth && e.touches[0].clientY >= 0 && e.touches[0].clientY <= window.innerHeight) {
        drawPic(e.touches[0].clientX, e.touches[0].clientY)
    }

})

window.addEventListener('touchend', () => {
    console.log('end')
})

document.getElementById('color').addEventListener('click', e => {
    if (e.target.getAttribute("data-color")) {
        let colors = document.querySelectorAll('.color-span')
        for (let i = 0; i < colors.length; i++) {
            colors[i].classList.remove('ac')
        }
        e.target.classList.add('ac')
        penColor = e.target.getAttribute("data-color")
    }
})

document.getElementById('thickness').addEventListener('click', e => {
    if (e.target.getAttribute("data-font")) {
        let fotns = document.querySelectorAll('.font-span')
        for (let i = 0; i < fotns.length; i++) {
            fotns[i].classList.remove('ac')
        }
        e.target.classList.add('ac')
        font = parseInt(e.target.getAttribute("data-font"))
    }
})

document.onselectstart = function () {
    return false;
}

function clearBtn() {
    ctx.clearRect(0, 0, cav.width, cav.height)
    socket.send(JSON.stringify({
        type: 'clear'
    }))
}

let socket, pongTimer

if ('WebSocket' in window) {
    initSocket();
} else {
    alert('浏览器不支持');
}

function initSocket() {
    // socket = new WebSocket('ws://47.109.17.168:8882/ping');
    socket = new WebSocket('ws://127.0.0.1:8882/ping');
    socket.onopen = function () {
        socket.send(JSON.stringify({
            type: "ping"
        }))
        keepLink();
    };
    socket.onmessage = function (evt) {
        console.log(JSON.parse(evt.data));
        var data = JSON.parse(evt.data);
        if (data.type === "clear") {
            ctx.clearRect(0, 0, cav.width, cav.height)
        } else {
            if (data.send) {
                ctx.clearRect(0, 0, cav.width, cav.height)
                for (let i = 0; i < data.send.length; i++) {
                    penColor = data.send[i].color
                    font = data.send[i].font
                    for (let j = 0; j < data.send[i].points.length; j++) {
                        drawPic(data.send[i].points[j].x, data.send[i].points[j].y)
                    }
                }
            }
        }
    };
    socket.onerror = function () {
        clearInterval(pongTimer);
        alert('链接已经断开');
    };
}

function keepLink() {
    pongTimer = setInterval(function () {
        socket.send(JSON.stringify({
            type: "ping"
        }))
    }, 10000);
}

function sendPoint(data) {
    socket.send(JSON.stringify({
        type: "draw",
        data: {
            font: font,
            color: penColor,
            points: data
        }
    }))
}