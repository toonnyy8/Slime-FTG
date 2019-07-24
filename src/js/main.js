import "@babel/polyfill"

import * as BABYLON from './babylon-module'

import * as slime from "../../file/slime/slime.js"

console.log(slime)

// Get the canvas DOM element
let canvas = document.getElementById('bobylonCanvas')
// Load the 3D engine
let engine = new BABYLON.Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true })
// CreateScene function that creates and return the scene
function createScene() {

    // This creates a basic Babylon Scene object (non-mesh)
    let scene = new BABYLON.Scene(engine)
    //Adding an Arc Rotate Camera
    let camera = new BABYLON.ArcRotateCamera("Camera", Math.PI / 2, Math.PI / 2, 10, new BABYLON.Vector3(0, 0, 0), scene)
    // target the camera to scene origin
    camera.setTarget(BABYLON.Vector3.Zero());
    // attach the camera to the canvas
    camera.attachControl(canvas, false)
    //Adding a light
    let light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0, 5, 0), scene);

    let animationGroup
    BABYLON.SceneLoader.OnPluginActivatedObservable.addOnce(loader => {
        loader.animationStartMode = BABYLON.GLTFLoaderAnimationStartMode.NONE
    })
    BABYLON.SceneLoader.ImportMesh("", slime.url, "", scene, (meshes, particleSystems, skeletons, animationGroups) => {
        console.log(skeletons)
        console.log(meshes)
        console.log(animationGroups)
        animationGroup = animationGroups[0] //.start(false)

        slime.action.stand._ = animationGroup.clone()
        slime.action.stand._.normalize(slime.action.stand.start / slime.fps, slime.action.stand.end / slime.fps)

        slime.action.jumping._ = animationGroup.clone()
        slime.action.jumping._.normalize(slime.action.jumping.start / slime.fps, slime.action.jumping.end / slime.fps)

        slime.action.attackLight._ = animationGroup.clone()
        slime.action.attackLight._.normalize(slime.action.attackLight.start / slime.fps, slime.action.attackLight.end / slime.fps)

        slime.action.attackMedium._ = animationGroup.clone()
        slime.action.attackMedium._.normalize(slime.action.attackMedium.start / slime.fps, slime.action.attackMedium.end / slime.fps)

        slime.action.attackWeighty._ = animationGroup.clone()
        slime.action.attackWeighty._.normalize(slime.action.attackWeighty.start / slime.fps, slime.action.attackWeighty.end / slime.fps)

        slime.action.attackLightJump._ = animationGroup.clone()
        slime.action.attackLightJump._.normalize(slime.action.attackLightJump.start / slime.fps, slime.action.attackLightJump.end / slime.fps)

        slime.action.attackMediumJump._ = animationGroup.clone()
        slime.action.attackMediumJump._.normalize(slime.action.attackMediumJump.start / slime.fps, slime.action.attackMediumJump.end / slime.fps)

        slime.action.attackWeightyJump._ = animationGroup.clone()
        slime.action.attackWeightyJump._.normalize(slime.action.attackWeightyJump.start / slime.fps, slime.action.attackWeightyJump.end / slime.fps)

        slime.action.crouch._ = animationGroup.clone()
        slime.action.crouch._.normalize(slime.action.crouch.start / slime.fps, slime.action.crouch.end / slime.fps)

        slime.action.squat._ = animationGroup.clone()
        slime.action.squat._.normalize(slime.action.squat.start / slime.fps, slime.action.squat.end / slime.fps)

        slime.action.attackLightSquat._ = animationGroup.clone()
        slime.action.attackLightSquat._.normalize(slime.action.attackLightSquat.start / slime.fps, slime.action.attackLightSquat.end / slime.fps)

        slime.action.attackMediumSquat._ = animationGroup.clone()
        slime.action.attackMediumSquat._.normalize(slime.action.attackMediumSquat.start / slime.fps, slime.action.attackMediumSquat.end / slime.fps)

        slime.action.attackWeightySquat._ = animationGroup.clone()
        slime.action.attackWeightySquat._.normalize(slime.action.attackWeightySquat.start / slime.fps, slime.action.attackWeightySquat.end / slime.fps)

        slime.action.attackFall._ = animationGroup.clone()
        slime.action.attackFall._.normalize(slime.action.attackFall.start / slime.fps, slime.action.attackFall.end / slime.fps)

        slime.action.fallToStand._ = animationGroup.clone()
        slime.action.fallToStand._.normalize(slime.action.fallToStand.start / slime.fps, slime.action.fallToStand.end / slime.fps)

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
        slime.action.attackFall._.onAnimationEndObservable.addOnce(loop("fallToStand"))
        slime.action.attackFall._.start()
    }, null, null, ".glb")

    // create a built-in "ground" shape;
    // var ground = BABYLON.Mesh.CreateGround('ground1', 6, 6, 2, scene);

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

