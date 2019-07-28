import fs from 'fs'

import * as BABYLON from "babylonjs"

export class Actor {
    constructor({ mesh, animationGroup, keySet = { jump: "w", squat: "s", left: "a", right: "d", attack: { small: "j", medium: "k", large: "l" } }, fps = 60 }) {
        this._fps = fps && !Number.isNaN(fps - 0) ? fps : this.fps
        this._actions = Actor.actionSet()
        this.keyBuffer = []
        this._mainState = "normal"
        this._detailState = "stand"
        this._state = { chapter: "normal", section: "stand", subsection: "main", subsubsection: 0 }
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
        this.vector = BABYLON.Vector3.Zero()
        this._preFaceTo = null

        Object.keys(this._actions).forEach(chapter => {
            Object.keys(this._actions[chapter]).forEach(section => {
                Object.keys(this._actions[chapter][section]).forEach(subsection => {
                    this._actions[chapter][section][subsection].forEach((anim, index, animsArray) => {
                        animsArray[index] = animationGroup.clone()
                        // console.log(`${chapter}:${section}:${subsection}:${index}`)
                        animsArray[index].normalize(Actor.actionSet()[chapter][section][subsection][index].start / this.fps, Actor.actionSet()[chapter][section][subsection][index].end / this.fps)
                    })
                    switch (chapter) {
                        case "normal": {
                            switch (section) {
                                case "squat": {
                                    switch (subsection) {
                                        case "main": {
                                            this._actions[chapter][section][subsection][0].onAnimationEndObservable.add(() => {
                                                this._state.subsubsection = 1
                                            })
                                            break;
                                        }
                                        default:
                                            break;
                                    }
                                    break;
                                    break;
                                }
                                default:
                                    break;
                            }
                            break;
                        }
                        default:
                            break;
                    }

                })
            })
        })
        document.addEventListener('keydown', (event) => {
            // console.log(event.key)
            switch (event.key) {
                case keySet.right: {
                    if (!this.keyDown.right) {
                        if (this._state.chapter == "normal") {
                            if (this._state.section == "stand" || this._state.section == "squat") {
                                this._state.subsection = this.faceTo == "right" ? "forward" : "backward"
                                this.keyDown.right = true
                            }
                        }
                    }
                    break;
                }
                case keySet.left: {
                    if (!this.keyDown.left) {
                        if (this._state.chapter == "normal") {
                            if (this._state.section == "stand" || this._state.section == "squat") {
                                this._state.subsection = this.faceTo == "left" ? "forward" : "backward"
                                this.keyDown.left = true
                            }
                        }
                    }
                    break;
                }
                case keySet.jump: {
                    if (!this.keyDown.jump) {
                        if (this._state.chapter == "normal") {
                            this._state.section = "jump"
                            this.keyDown.jump = true
                            this.vector.y = 0.5
                            this.mesh.position.y += 0.01
                        }
                    }
                    break;
                }
                case keySet.squat: {
                    if (!this.keyDown.squat) {
                        if (this._state.chapter == "normal") {
                            if (this._state.section != "jump") {
                                this._state.section = "squat"
                                this.keyDown.squat = true
                            }
                        }
                    }
                    break;
                }
                case keySet.attack.small: {
                    this.keyDown.attack.small = true
                    break;
                }
                case keySet.attack.medium: {
                    this.keyDown.attack.medium = true
                    break;
                }
                case keySet.attack.large: {
                    this.keyDown.attack.large = true
                    break;
                }
                default:
                    break;
            }
        }, false)
        document.addEventListener('keyup', (event) => {
            switch (event.key) {
                case keySet.right: {
                    if (this.keyDown.right) {
                        this._state.subsection = "main"
                    }
                    this.keyDown.right = false
                    break;
                }
                case keySet.left: {
                    if (this.keyDown.left) {
                        this._state.subsection = "main"
                    }
                    this.keyDown.left = false
                    break;
                }
                case keySet.jump: {
                    this.keyDown.jump = false
                    break;
                }
                case keySet.squat: {
                    if (this.keyDown.squat) {
                        this._state.section = "stand"
                    }
                    this.keyDown.squat = false
                    break;
                }
                case keySet.attack.small: {
                    this.keyDown.attack.small = false
                    break;
                }
                case keySet.attack.medium: {
                    this.keyDown.attack.medium = false
                    break;
                }
                case keySet.attack.large: {
                    this.keyDown.attack.large = false
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
                stand: {
                    main: [{
                        start: 1,
                        end: 40,
                        atk: 0
                    }],
                    forward: [{
                        start: 41,
                        end: 70,
                        atk: 0
                    }],
                    backward: [{
                        start: 71,
                        end: 100,
                        atk: 0
                    }]
                },
                jump: {
                    main: [{
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
                    }]
                },
                squat: {
                    main: [{
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
                    }],
                    forward: [{
                        start: 881,
                        end: 920,
                        atk: 0
                    }],
                    backward: [{
                        start: 921,
                        end: 960,
                        atk: 0
                    }]
                }
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
                stand: {
                    main: [{
                        start: 221,
                        end: 230,
                        atk: 0
                    }, {
                        start: 231,
                        end: 240,
                        atk: 0
                    }]
                },
                jump: {
                    main: [{
                        start: 631,
                        end: 640,
                        atk: 0
                    }, {
                        start: 640,
                        end: 650,
                        atk: 0
                    }]
                },
                squat: {
                    main: [{
                        start: 1121,
                        end: 1130,
                        atk: 0
                    }, {
                        start: 1130,
                        end: 1140,
                        atk: 0
                    }]
                }
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
                reStand: {
                    main: [{
                        start: 1301,
                        end: 1330,
                        atk: 0
                    }]
                }
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
        Object.keys(this._actions).forEach((chapter => {
            Object.keys(this._actions[chapter]).forEach((section => {
                Object.keys(this._actions[chapter][section]).forEach((subsection => {
                    if (`${chapter}:${section}:${subsection}` != `${this._state["chapter"]}:${this._state["section"]}:${this._state["subsection"]}`) {
                        this._actions[chapter][section][subsection].forEach(anim => {
                            anim.stop()
                        })
                    } else { }
                }))
            }))
        }))

    }
    tick() {
        // console.log(this._detailState)
        this.stopAnimation()
        this._actions[this._state.chapter][this._state.section][this._state.subsection][0].start(true)
        if (`${this._state["chapter"]}:${this._state["section"]}:${this._state["subsection"]}` == "normal:stand:main") {
            this.vector = BABYLON.Vector3.Zero()
        }
        switch (this._state.chapter) {
            case "normal": {
                switch (this._state.section) {
                    case "stand": {
                        break;
                    }
                    case "squat": {
                        break;
                    }
                    case "jump": {
                        if (this.mesh.position.x <= 0) {
                            this.mesh.position.x = 0
                            this._state.section = "stand"
                        }
                        break;
                    }
                    default:
                        break;
                }
                break;
            }

            default:
                break;
        }



        if (this.keyDown.left) {
            this.vector.x = this.faceTo == "left" ? 0.1 : 0.075
        }
        if (this.keyDown.right) {
            this.vector.x = this.faceTo == "right" ? -0.1 : -0.075
        }
        if (this.keyDown.squat) {
            this.vector.x *= 0.5
        }
        if (this.mesh.position.y > 0) {
            this.vector.y -= 0.02
        } else {
            this.mesh.position.y = 0
            this.vector.y = 0
        }
        this.mesh.position = this.mesh.position.add(this.vector)

        if (this.mesh.position.x > 11) { this.mesh.position.x = 11 }
        if (this.mesh.position.x < - 11) { this.mesh.position.x = -11 }



        if (this.faceTo != this._preFaceTo) {
            if (this._state.chapter == "normal" && this._state.section != "jump") {
                if (this.faceTo == "left") {
                    this.mesh.rotationQuaternion = new BABYLON.Vector3(0, 0, 0).toQuaternion()
                } else {
                    this.mesh.rotationQuaternion = new BABYLON.Vector3(0, Math.PI, 0).toQuaternion()
                }
            }
            switch (this._state.subsection) {
                case "forward": {
                    this._state.subsection = "backward"
                    break;
                }
                case "backward": {
                    this._state.subsection = "forward"
                    break;
                }
                default: {
                    break;
                }
            }
            // switch (this._state.chapter) {
            //     case "normal": {
            //         switch (this._state.section) {
            //             case "stand": {
            //                 switch (this._state.subsection) {
            //                     case "forward": {
            //                         this._state.subsection = "backward"
            //                         break;
            //                     }
            //                     case "backward": {
            //                         this._state.subsection = "forward"
            //                         break;
            //                     }
            //                     default: {
            //                         break;
            //                     }
            //                 }
            //                 break;
            //             }
            //             case "squat": {

            //                 break;
            //             }
            //             case "jump": {
            //                 break;
            //             }
            //             default: {
            //                 break;
            //             }
            //         }
            //         break;
            //     }

            //     default: {
            //         break;
            //     }
            // }
        }
        this._preFaceTo = this.faceTo

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