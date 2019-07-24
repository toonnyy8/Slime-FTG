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

