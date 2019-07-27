import "@babel/polyfill"

import * as BABYLON from './babylon-module'

import * as slime from "../../file/slime/slime.js"

// Get the canvas DOM element
let canvas = document.getElementById('bobylonCanvas')
// Load the 3D engine
let engine = new BABYLON.Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true })
// CreateScene function that creates and return the scene

function createScene() {

    // This creates a basic Babylon Scene object (non-mesh)
    let scene = new BABYLON.Scene(engine)
    //Adding an Arc Rotate Camera
    let camera = new BABYLON.ArcRotateCamera("Camera", Math.PI / 2, Math.PI / 2, 15, new BABYLON.Vector3(0, 5, 0), scene)
    // target the camera to scene origin
    camera.setTarget(new BABYLON.Vector3(0, 5, 0));
    // attach the camera to the canvas
    camera.attachControl(canvas, false)
    //Adding a light
    let light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0, 5, 0), scene);
    light.diffuse = new BABYLON.Color3(0.9, 0.85, 0.8);
    light.specular = new BABYLON.Color3(1, 1, 1);
    light.groundColor = new BABYLON.Color3(0.4, 0.4, 0.5);

    BABYLON.SceneLoader.OnPluginActivatedObservable.addOnce(loader => {
        loader.animationStartMode = BABYLON.GLTFLoaderAnimationStartMode.NONE
    })
    let player1, player2
    BABYLON.SceneLoader.ImportMesh("", slime.Actor.url(), "", scene, (meshes, particleSystems, skeletons, animationGroups) => {
        console.log(skeletons)
        console.log(meshes)
        console.log(animationGroups)
        // meshes[0].position.x = 5
        // meshes[0].position.z = -2

        let animationGroup = animationGroups[0] //.start(false)
        player1 = new slime.Actor({ mesh: meshes[0], animationGroup: animationGroups[0] })

        BABYLON.SceneLoader.ImportMesh("", slime.Actor.url(), "", scene, (meshes, particleSystems, skeletons, animationGroups) => {
            console.log(skeletons)
            console.log(meshes)
            console.log(animationGroups)
            // meshes[0].position.x = 5
            // meshes[0].position.z = -2

            let animationGroup = animationGroups[0] //.start(false)
            player2 = new slime.Actor({
                mesh: meshes[0], animationGroup: animationGroups[0],
                keySet: { jump: "ArrowUp", squat: "ArrowDown", left: "ArrowLeft", right: "ArrowRight", attack: { small: "1", medium: "2", large: "3" } }
            })
            console.log(meshes[0].rotationQuaternion)

            // player2.mesh.rotate(BABYLON.Axis.Y, Math.PI, BABYLON.Space.LOCAL);

            console.log(meshes[0].rotationQuaternion)

            player1.mesh.position.x = 5
            player2.mesh.position.x = -5

            player1.setOpponent(player2)
            player2.setOpponent(player1)

            engine.runRenderLoop(() => {
                player1.tick()
            })
            engine.runRenderLoop(() => {
                player2.tick()
            })
            /*
            slime.action.attackFall._ = animationGroup.clone()
            slime.action.attackFall._.normalize(slime.action.attackFall.start / slime.fps, slime.action.attackFall.end / slime.fps)
    
            let loop = (actionKey) => {
                return () => {
                    setTimeout(() => {
                        slime.action[actionKey]._.stop()
                        slime.action[actionKey]._.start()
                        slime.action[actionKey]._.onAnimationEndObservable.addOnce(loop(actionKey))
                        console.log(1)
                    })
                }
            }
            slime.action.attackFall._.onAnimationEndObservable.addOnce(loop("attackFall"))
            slime.action.attackFall._.start()
            */
            // let forward = animationGroup.clone()
            // forward.normalize(slime.Actor.actionSet().normal.standForward[0].start / slime.fps, slime.Actor.actionSet().normal.standForward[0].end / slime.fps)
            // let backward = animationGroup.clone()
            // backward.normalize(slime.Actor.actionSet().normal.standBackward[0].start / slime.fps, slime.Actor.actionSet().normal.standBackward[0].end / slime.fps)
            // let faceTo = -1.5
            // forward.start(true)
            // engine.runRenderLoop(() => {
            //     if (meshes[0].position.x == -11) {
            //         faceTo = -1.5
            //         backward.stop()
            //         forward.start(true)
            //     } else if (meshes[0].position.x == 11) {
            //         faceTo = 1
            //         forward.stop()
            //         backward.start(true)
            //     }
            //     meshes[0].position.x -= 0.05 * faceTo
            // })
        }, null, null, ".glb")
    }, null, null, ".glb")

    // create a built-in "ground" shape;
    var ground = BABYLON.Mesh.CreateGround('ground1', 60, 20, 2, scene);

    return scene

}
// call the createScene function
let scene = createScene()
// run the render loop
engine.runRenderLoop(() => {
    scene.render()
})
// the canvas/window resize event handler
window.addEventListener('resize', () => {
    engine.resize()
})

window.onresize = (e) => {
    if (document.body.offsetWidth / document.body.offsetHeight > 1920 / 1080) {
        canvas.style = "height:100%"
    }
    else {
        canvas.style = "width:100%"
    }
}
if (document.body.offsetWidth / document.body.offsetHeight > 1920 / 1080) {
    canvas.style = "height:100%"
}
else {
    canvas.style = "width:100%"
}