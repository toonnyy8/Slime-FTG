import fs from 'fs'

export let fps = 60

export let action = {
    walk: {
        start: 1,
        end: 30,
        _: null
    },
    jumpUp: {
        start: 31,
        end: 40,
        _: null
    },
    jumpDown: {
        start: 41,
        end: 50,
        _: null
    },
    jumping: {
        start: 51,
        end: 70,
        _: null
    },
    stand: {
        start: 71,
        end: 110,
        _: null
    },
    attackLight: {
        start: 111,
        end: 130,
        _: null
    },
    attackMedium: {
        start: 131,
        end: 160,
        _: null
    },
    attackWeighty: {
        start: 161,
        end: 200,
        _: null
    },
    attackLightJump: {
        start: 201,
        end: 220,
        _: null
    },
    attackMediumJump: {
        start: 221,
        end: 260,
        _: null
    },
    attackWeightyJump: {
        start: 261,
        end: 320,
        _: null
    },
    crouch: {
        start: 321,
        end: 340,
        _: null
    },
    squat: {
        start: 341,
        end: 400,
        _: null
    },
    attackLightSquat: {
        start: 401,
        end: 440,
        _: null
    },
    attackMediumSquat: {
        start: 441,
        end: 480,
        _: null
    },
    attackWeightySquat: {
        start: 481,
        end: 540,
        _: null
    },
    attackFall: {
        start: 541,
        end: 560,
        _: null
    },
    fallToStand: {
        start: 561,
        end: 590,
        _: null
    }
}


export let url = URL.createObjectURL(new Blob([fs.readFileSync(__dirname + '../../../file/slime/slime.glb')]))

export class Actor {
    constructor({ mesh, animationGroup, keySet = { jump: "w", squat: "s", left: "a", right: "d", attack: { small: "j", medium: "k", large: "l" } }, fps = 60 }) {
        this._fps = fps && !Number.isNaN(fps - 0) ? fps : this.fps
        this._actions = Actor.actionSet()
        this.keyBuffer = []
        this._mainState = "normal"
        this._detailState = "stand"
        this._mesh = mesh
        this._opponent = null
        this.keyDown = {
            jump: false,
            squat: false,
            left: false,
            right: false,
            attack: {
                small: false,
                medium: false,
                large: false
            }
        }
        let bindAction = (actionSetElements) => {
            let action = []
            for (let i = 0; i < actionSetElements.length; i++) {
                action[i] = animationGroup.clone()
                action[i].normalize(actionSetElements[i].start / this.fps, actionSetElements[i].end / this.fps)
            }
            return action
        }
        this._actions.normal.stand = bindAction(Actor.actionSet().normal.stand)
        this._actions.normal.stand[0].start(true)

        this._actions.normal.standForward = bindAction(Actor.actionSet().normal.standForward)
        this._actions.normal.standBackward = bindAction(Actor.actionSet().normal.standBackward)

        this._actions.normal.squat = bindAction(Actor.actionSet().normal.squat)
        this._actions.normal.squatForward = bindAction(Actor.actionSet().normal.squatForward)
        this._actions.normal.squatBackward = bindAction(Actor.actionSet().normal.squatBackward)

        this._actions.normal.jump = bindAction(Actor.actionSet().normal.jump)


        document.addEventListener('keydown', (event) => {
            // console.log(event.key)

            switch (event.key) {
                case keySet.right: {
                    if (!this.keyDown.right) {
                        if (this._mainState == "normal") {
                            this._detailState = "jump"
                        }
                        console.log("right")
                    }
                    this.keyDown.right = true
                    break;
                }
                case keySet.left: {
                    this.keyDown.left = true
                    console.log("left")
                    break;
                }
                case keySet.jump: {
                    this.keyDown.jump = true
                    console.log("jump")
                    break;
                }
                case keySet.squat: {
                    this.keyDown.squat = true
                    console.log("squat")
                    break;
                }
                case keySet.attack.small: {
                    this.keyDown.attack.small = true
                    console.log("attacksmall")
                    break;
                }
                case keySet.attack.medium: {
                    this.keyDown.attack.medium = true
                    console.log("attackmedium")
                    break;
                }
                case keySet.attack.large: {
                    this.keyDown.attack.large = true
                    console.log("attacklarge")
                    break;
                }
                default:
                    break;
            }
        }, false)
        document.addEventListener('keyup', (event) => {
            switch (event.key) {
                case keySet.right: {
                    if (this.keyDown.right) { }
                    this.keyDown.right = false
                    break;
                }
                case keySet.left: {
                    this.keyDown.left = false
                    console.log("left")
                    break;
                }
                case keySet.jump: {
                    this.keyDown.jump = false
                    console.log("jump")
                    break;
                }
                case keySet.squat: {
                    this.keyDown.squat = false
                    console.log("squat")
                    break;
                }
                case keySet.attack.small: {
                    this.keyDown.attack.small = false
                    console.log("attacksmall")
                    break;
                }
                case keySet.attack.medium: {
                    this.keyDown.attack.medium = false
                    console.log("attackmedium")
                    break;
                }
                case keySet.attack.large: {
                    this.keyDown.attack.large = false
                    console.log("attacklarge")
                    break;
                }
                default:
                    break;
            }
        }, false)


    }
    static actionSet() {
        return {
            normal: {
                stand: [{
                    start: 1,
                    end: 40,
                    atk: 0
                }],
                standForward: [{
                    start: 41,
                    end: 70,
                    atk: 0
                }],
                standBackward: [{
                    start: 71,
                    end: 100,
                    atk: 0
                }],
                jump: [{
                    start: 401,
                    end: 410,
                    atk: 0
                },
                {
                    start: 411,
                    end: 430,
                    atk: 0
                },
                {
                    start: 431,
                    end: 440,
                    atk: 0
                }
                ],
                squat: [{
                    start: 801,
                    end: 820,
                    atk: 0
                },
                {
                    start: 821,
                    end: 880,
                    atk: 0
                },
                {
                    start: 1101,
                    end: 1120,
                    atk: 0
                },
                ],
                squatForward: [{
                    start: 881,
                    end: 920,
                    atk: 0
                }],
                squatBackward: [{
                    start: 921,
                    end: 960,
                    atk: 0
                }]
            },
            attack: {
                stand: {
                    small: [{
                        start: 101,
                        end: 109,
                        atk: 100
                    }, {
                        start: 109,
                        end: 119,
                        atk: 0
                    }, {
                        start: 119,
                        end: 130,
                        atk: 0
                    }],
                    medium: [{
                        start: 131,
                        end: 150,
                        atk: 200
                    }, {
                        start: 150,
                        end: 160,
                        atk: 0
                    }, {
                        start: 160,
                        end: 170,
                        atk: 0
                    }],
                    large: [{
                        start: 171,
                        end: 197,
                        atk: 300
                    }, {
                        start: 197,
                        end: 207,
                        atk: 0
                    }, {
                        start: 207,
                        end: 220,
                        atk: 0
                    }]
                },
                jump: {
                    small: [{
                        start: 441,
                        end: 450,
                        atk: 150
                    }, {
                        start: 450,
                        end: 460,
                        atk: 0
                    }, {
                        start: 460,
                        end: 470,
                        atk: 0
                    }],
                    medium: [{
                        start: 471,
                        end: 493,
                        atk: 240
                    }, {
                        start: 493,
                        end: 510,
                        atk: 0
                    }],
                    large: [{
                        start: 511,
                        end: 555,
                        atk: 500
                    }, {
                        start: 555,
                        end: 570,
                        atk: 0
                    }],
                    fall: [{
                        start: 571,
                        end: 580,
                        atk: 50
                    }, {
                        start: 581,
                        end: 600,
                        atk: 50
                    }, {
                        start: 601,
                        end: 630,
                        atk: 0
                    }]
                },
                squat: {
                    small: [{
                        start: 961,
                        end: 970,
                        atk: 0
                    }, {
                        start: 970,
                        end: 985,
                        atk: 100
                    }, {
                        start: 985,
                        end: 1000,
                        atk: 0
                    }],
                    medium: [{
                        start: 1001,
                        end: 1018,
                        atk: 250
                    }, {
                        start: 1018,
                        end: 1030,
                        atk: 0
                    }, {
                        start: 1030,
                        end: 1040,
                        atk: 0
                    }],
                    large: [{
                        start: 1041,
                        end: 1058,
                        atk: 500
                    }, {
                        start: 1058,
                        end: 1071,
                        atk: 0
                    }, {
                        start: 1071,
                        end: 1100,
                        atk: 0
                    }]
                }
            },
            defense: {
                stand: [{
                    start: 221,
                    end: 230,
                    atk: 0
                }, {
                    start: 231,
                    end: 240,
                    atk: 0
                }],
                jump: [{
                    start: 631,
                    end: 640,
                    atk: 0
                }, {
                    start: 640,
                    end: 650,
                    atk: 0
                }],
                squat: [{
                    start: 1121,
                    end: 1130,
                    atk: 0
                }, {
                    start: 1130,
                    end: 1140,
                    atk: 0
                }]
            },
            hitRecover: {
                stand: {
                    small: [{
                        start: 241,
                        end: 250,
                        atk: 0
                    }, {
                        start: 250,
                        end: 260,
                        atk: 0
                    }],
                    medium: [{
                        start: 261,
                        end: 275,
                        atk: 0
                    }, {
                        start: 275,
                        end: 290,
                        atk: 0
                    }],
                    large: [{
                        start: 291,
                        end: 310,
                        atk: 0
                    }, {
                        start: 310,
                        end: 330,
                        atk: 0
                    }]
                },
                jump: {
                    large: [{
                        start: 651,
                        end: 680,
                        atk: 0
                    }, {
                        start: 680,
                        end: 700,
                        atk: 0
                    }]
                },
                squat: {
                    small: [{
                        start: 1141,
                        end: 1150,
                        atk: 0
                    }, {
                        start: 1150,
                        end: 1160,
                        atk: 0
                    }],
                    medium: [{
                        start: 1161,
                        end: 1175,
                        atk: 0
                    }, {
                        start: 1175,
                        end: 1190,
                        atk: 0
                    }],
                    large: [{
                        start: 1191,
                        end: 1210,
                        atk: 0
                    }, {
                        start: 1210,
                        end: 1230,
                        atk: 0
                    }]
                },
                reStand: [{
                    start: 1301,
                    end: 1330,
                    atk: 0
                }]
            }
        }
    }
    static url() {
        return URL.createObjectURL(new Blob([fs.readFileSync(__dirname + '../../../file/slime/slime2.glb')]))
    }
    get fps() {
        return this._fps || 60
    }
    get mesh() {
        return this._mesh
    }
    jump() {
        if (this._mainState == "normal") {
            this._detailState = "jump"
        }
    }
    squat() {
        if (this._mainState == "normal") {
            if (this._detailState != "jump") {
                this._detailState = "squat"
            }
        }
    }
    forward() {
        if (this._mainState == "normal") {
            if (this._detailState == "stand") {
                this._detailState = "standForward"
            } else if (this._detailState == "squat") {
                this._detailState = "squatForward"
            }
        }
    }
    backward() {
        if (this._mainState == "normal") {
            if (this._detailState == "stand") {
                this._detailState = "standBackward"
            } else if (this._detailState == "squat") {
                this._detailState = "squatBackward"
            }
        }
    }
    stopAnimation() {

    }
    tick() {
        if (this.mesh.position.x > 11) { this.mesh.position.x = 11 }
        if (this.mesh.position.x < - 11) { this.mesh.position.x = -11 }
        this._actions.normal.stand[0].start(true)
        switch (this.faceTo) {
            case "left": {
                // console.log(this.mesh.rotationQuaternion)
                if (this.mesh.rotationQuaternion.w != -1) {
                    this.mesh.rotate(BABYLON.Axis.Y, Math.PI / 3, BABYLON.Space.LOCAL);
                    console.log(this.mesh.rotationQuaternion)
                }
                // 
                break;
            }
            case "right": {
                // this.mesh.rotate(BABYLON.Axis.Y, 0, BABYLON.Space.LOCAL);

                break;
            }
            default:
                break;
        }
        console.log(this.faceTo)
    }
    setOpponent(opponent) {
        this._opponent = opponent
    }
    get opponent() {
        return this._opponent
    }
    get faceTo() {
        return this.opponent.mesh.position.x > this.mesh.position.x ? "left" : "right"
    }
}