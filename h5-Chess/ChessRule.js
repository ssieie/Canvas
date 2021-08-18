const chessRule = {
    red: [{
        text: '兵',
        chessOpt: [{
                x: 0,
                y: 3,
                isAlive: true,
                isSelect: false
            },
            {
                x: 2,
                y: 3,
                isAlive: true,
                isSelect: false
            }, {
                x: 4,
                y: 3,
                isAlive: true,
                isSelect: false
            }, {
                x: 6,
                y: 3,
                isAlive: true,
                isSelect: false
            }, {
                x: 8,
                y: 3,
                isAlive: true,
                isSelect: false
            }
        ],
        moveRule(x, y) {
            if (y < 5) { // 说明还在自家 不能横着走
                return [{
                    x: x,
                    y: y + 1
                }]
            } else if (y === 9) {
                if (x === 0) {
                    return [{
                        x: x + 1,
                        y: y
                    }]
                } else if (x === 8) {
                    return [{
                        x: x - 1,
                        y: y
                    }]
                }
            } else {
                if (x === 0) {
                    return [{
                        x: x + 1,
                        y: y
                    }, {
                        x: x,
                        y: y + 1
                    }]
                } else if (x === 8) {
                    return [{
                        x: x - 1,
                        y: y
                    }, {
                        x: x,
                        y: y + 1
                    }]
                }else{
                    return [{
                        x: x - 1,
                        y: y
                    }, {
                        x: x + 1,
                        y: y
                    }, {
                        x: x,
                        y: y + 1
                    }]
                }
            }
        }
    }, {
        text: '炮',
        chessOpt: [{
                x: 1,
                y: 2,
                isAlive: true,
                isSelect: false
            },
            {
                x: 7,
                y: 2,
                isAlive: true,
                isSelect: false
            }
        ],
        moveRule(x, y) {
            console.log(x, y)
        }
    }, {
        text: '车',
        chessOpt: [{
                x: 0,
                y: 0,
                isAlive: true,
                isSelect: false
            },
            {
                x: 8,
                y: 0,
                isAlive: true,
                isSelect: false
            }
        ],
        moveRule(x, y) {
            console.log(x, y)
        }
    }, {
        text: '马',
        chessOpt: [{
                x: 1,
                y: 0,
                isAlive: true,
                isSelect: false
            },
            {
                x: 7,
                y: 0,
                isAlive: true,
                isSelect: false
            }
        ],
        moveRule(x, y) {
            console.log(x, y)
        }
    }, {
        text: '相',
        chessOpt: [{
                x: 2,
                y: 0,
                isAlive: true,
                isSelect: false
            },
            {
                x: 6,
                y: 0,
                isAlive: true,
                isSelect: false
            }
        ],
        moveRule(x, y) {
            console.log(x, y)
        }
    }, {
        text: '仕',
        chessOpt: [{
                x: 3,
                y: 0,
                isAlive: true,
                isSelect: false
            },
            {
                x: 5,
                y: 0,
                isAlive: true,
                isSelect: false
            }
        ],
        moveRule(x, y) {
            console.log(x, y)
        }
    }, {
        text: '帅',
        chessOpt: [{
            x: 4,
            y: 0,
            isAlive: true,
            isSelect: false
        }],
        moveRule(x, y) {
            console.log(x, y)
        }
    }],


    black: [{
        text: '卒',
        chessOpt: [{
                x: 0,
                y: 6,
                isAlive: true,
                isSelect: false
            },
            {
                x: 2,
                y: 6,
                isAlive: true,
                isSelect: false
            }, {
                x: 4,
                y: 6,
                isAlive: true,
                isSelect: false
            }, {
                x: 6,
                y: 6,
                isAlive: true,
                isSelect: false
            }, {
                x: 8,
                y: 6,
                isAlive: true,
                isSelect: false
            }
        ],
        moveRule(x, y) {
            if (y > 4) { // 说明还在自家 不能横着走
                return [{
                    x: x,
                    y: y - 1
                }]
            } else {
                if (x === 0) {
                    return [{
                        x: x + 1,
                        y: y
                    }, {
                        x: x,
                        y: y - 1
                    }]
                } else if (x === 8) {
                    return [{
                        x: x - 1,
                        y: y
                    }, {
                        x: x,
                        y: y - 1
                    }]
                }else{
                    return [{
                        x: x - 1,
                        y: y
                    }, {
                        x: x + 1,
                        y: y
                    }, {
                        x: x,
                        y: y - 1
                    }]
                }
            }
        }
    }, {
        text: '砲',
        chessOpt: [{
                x: 1,
                y: 7,
                isAlive: true,
                isSelect: false
            },
            {
                x: 7,
                y: 7,
                isAlive: true,
                isSelect: false
            }
        ],
        moveRule(x, y) {
            console.log(x, y)
        }
    }, {
        text: '車',
        chessOpt: [{
                x: 0,
                y: 9,
                isAlive: true,
                isSelect: false
            },
            {
                x: 8,
                y: 9,
                isAlive: true,
                isSelect: false
            }
        ],
        moveRule(x, y) {
            console.log(x, y)
        }
    }, {
        text: '馬',
        chessOpt: [{
                x: 1,
                y: 9,
                isAlive: true,
                isSelect: false
            },
            {
                x: 7,
                y: 9,
                isAlive: true,
                isSelect: false
            }
        ],
        moveRule(x, y) {
            console.log(x, y)
        }
    }, {
        text: '象',
        chessOpt: [{
                x: 2,
                y: 9,
                isAlive: true,
                isSelect: false
            },
            {
                x: 6,
                y: 9,
                isAlive: true,
                isSelect: false
            }
        ],
        moveRule(x, y) {
            console.log(x, y)
        }
    }, {
        text: '士',
        chessOpt: [{
                x: 3,
                y: 9,
                isAlive: true,
                isSelect: false
            },
            {
                x: 5,
                y: 9,
                isAlive: true,
                isSelect: false
            }
        ],
        moveRule(x, y) {
            console.log(x, y)
        }
    }, {
        text: '将',
        chessOpt: [{
            x: 4,
            y: 9,
            isAlive: true,
            isSelect: false
        }],
        moveRule(x, y) {
            console.log(x, y)
        }
    }]
}


export default chessRule