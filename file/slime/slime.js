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
    }
}
export let url = URL.createObjectURL(new Blob([fs.readFileSync(__dirname + '../../../file/slime/slime.glb')]))

