var cav = document.getElementById('canvas');
var ctx = cav.getContext('2d');
cav.width = 840;
cav.height = 840;
/**
 * 角色数据
 * 1 白方 2 黑方 3 观众
 */
var currentRole;
// 当前是谁的回合
var currentRound;
var gobangData = [];
var initScreen = /** @class */ (function () {
    function initScreen(xLine, yLine, lineColor) {
        this.screenW = 780;
        this.screenH = 780;
        this.lineColor = '#000000';
        this.xLine = xLine;
        this.yLine = yLine;
        this.lineColor = lineColor ? lineColor : '#000000';
    }
    initScreen.prototype.drawScreen = function () {
        ctx.clearRect(0, 0, cav.width, cav.height);
        this.boundaryX = (840 - this.screenW) / 2;
        this.boundaryY = (840 - this.screenH) / 2;
        ctx.fillStyle = this.lineColor;
        ctx.strokeRect(this.boundaryX, this.boundaryY, this.screenW, this.screenH);
        this.drawX();
        this.drawY();
        this.drawPiece();
    };
    initScreen.prototype.drawX = function () {
        var xInterval = this.screenW / this.xLine;
        for (var i = 1; i < this.xLine; i++) {
            ctx.beginPath();
            ctx.moveTo(xInterval * i + this.boundaryX, this.boundaryY);
            ctx.lineTo(xInterval * i + this.boundaryX, this.screenH + this.boundaryY);
            ctx.stroke();
            ctx.closePath();
        }
    };
    initScreen.prototype.drawY = function () {
        var yInterval = this.screenH / this.yLine;
        for (var i = 1; i < this.yLine; i++) {
            ctx.beginPath();
            ctx.moveTo(this.boundaryX, yInterval * i + this.boundaryY);
            ctx.lineTo(this.screenW + this.boundaryX, yInterval * i + this.boundaryX);
            ctx.stroke();
            ctx.closePath();
        }
    };
    initScreen.prototype.drawPiece = function () {
        var radius = this.screenW / this.xLine * 0.4;
        var interval = this.screenW / this.xLine;
        for (var i = 0; i < gobangData.length; i++) {
            ctx.fillStyle = gobangData[i].color === 1 ? '#ffffff' : '#333333';
            ctx.beginPath();
            ctx.arc(interval * gobangData[i].x + this.boundaryX, interval * gobangData[i].y + this.boundaryY, radius, 0, Math.PI * 2, true);
            ctx.fill();
            ctx.closePath();
        }
    };
    initScreen.prototype.gameListener = function () {
        cav.addEventListener('click', this.gobangClickEvent.bind(this));
    };
    initScreen.prototype.gobangClickEvent = function () {
        var x = Math.round((arguments[0].offsetX + this.boundaryX) / (this.boundaryX * 2)) - 1;
        var y = Math.round((arguments[0].offsetY + this.boundaryY) / (this.boundaryY * 2)) - 1;
        // 是否是当前回合
        if (!currentRole)
            return;
        if (currentRole !== currentRound)
            return;
        // 是否有效走棋
        for (var i = 0; i < gobangData.length; i++) {
            if (gobangData[i].x === x && gobangData[i].y === y) {
                alert('无效走棋');
                return;
            }
        }
        socket.send(JSON.stringify({
            x: x,
            y: y,
            color: currentRole
        }));
        // let piece: Object = {
        //     color: currentRole,
        //     x,
        //     y
        // }
        // gobangData.push(piece)
        this.drawScreen();
    };
    return initScreen;
}());
var game = new initScreen(13, 13);
game.drawScreen();
game.gameListener();
var socket;
var pongTimer;
if ('WebSocket' in window) {
    initSocket();
}
else {
    alert('浏览器不支持');
}
function initSocket() {
    socket = new WebSocket('ws://47.109.17.168:8881/ping');
    socket.onopen = function () {
        socket.send('ping');
        keepLink();
    };
    socket.onmessage = function (evt) {
        console.log(JSON.parse(evt.data));
        var data = JSON.parse(evt.data);
        document.getElementById("userRole").innerHTML = data.role === 1 ? '白方' : data.role === 2 ? '黑方' : '观众';
        document.getElementById("userRound").innerHTML = data.round === 0 ? '未开始' : data.round === 1 ? '白方' : '黑方';
        if (data.msg) {
            // alert(data.msg)
        }
        currentRole = data.role;
        currentRound = data.round;
        gobangData = data.data;
        game.drawScreen();
    };
    socket.onerror = function () {
        clearInterval(pongTimer);
        alert('链接已经断开');
    };
}
function keepLink() {
    pongTimer = setInterval(function () {
        socket.send('ping');
    }, 10000);
}
function refresh() {
    var code = prompt("编码缺陷，重开麻烦：", "");
    if (code == null || code == "") {
    }
    else {
        currentRound = 0;
        currentRole = 0;
        fetch("http://47.109.17.168:8881/refresh?pwd=" + code)
            .then(function (response) { return response.json(); })
            .then(function (json) { return console.log(json); })["catch"](function (err) { return console.log('Request Failed', err); });
    }
}
