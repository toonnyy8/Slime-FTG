import "@babel/polyfill"

import fs from 'fs'

import * as BABYLON from './babylon-module'

let slime = fs.readFileSync(__dirname + '../../../file/slime.glb')

let url = {
    "slime": URL.createObjectURL(new Blob([slime]))
}

let loader = new BABYLON.GLTFFileLoader()

console.log()
// Get the canvas DOM element
let canvas = document.getElementById('bobylonCanvas')
// Load the 3D engine
let engine = new BABYLON.Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true })
// CreateScene function that creates and return the scene
function createScene() {

    // This creates a basic Babylon Scene object (non-mesh)
    let scene = new BABYLON.Scene(engine)
    //Adding a light
    let light = new BABYLON.HemisphericLight()

    //Adding an Arc Rotate Camera
    let camera = new BABYLON.ArcRotateCamera("Camera", 0, 0.8, 10, BABYLON.Vector3.Zero(), scene)
    camera.attachControl(canvas, false)

    let animationGroup
    BABYLON.SceneLoader.OnPluginActivatedObservable.addOnce(loader => {
        loader.animationStartMode = BABYLON.GLTFLoaderAnimationStartMode.NONE
    })

    BABYLON.SceneLoader.ImportMesh("", url["slime"], "", scene, (meshes, particleSystems, skeletons, animationGroups) => {
        console.log(animationGroups)
        animationGroup = animationGroups[0] //.start(false)

        animationGroup.start(true)
        animationGroup.goToFrame(0)
        animationGroup.pause()
    }, null, null, ".glb")

    let advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI")

    let panel = new BABYLON.GUI.StackPanel()
    panel.width = "220px"
    panel.rotation = 0
    panel.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT
    panel.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER
    advancedTexture.addControl(panel)

    panel.addControl(slider)

    let slider = new BABYLON.GUI.Slider()
    slider.minimum = 0
    slider.maximum = 10 / 24
    slider.value = 0
    slider.paddingTop = "10px"
    slider.height = "30px"
    slider.width = "200px"
    slider.color = "green"
    slider.onValueChangedObservable.add((value) => {
        animationGroup.goToFrame(value)
        animationGroup.pause()
        console.log(Math.floor(value * 24))
    })

    panel.addControl(slider)




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

