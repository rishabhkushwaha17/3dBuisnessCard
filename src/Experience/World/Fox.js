import * as THREE from 'three'
import Experience from '../Experience.js'
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';

export default class Fox
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.time = this.experience.time
        this.debug = this.experience.debug
        this.touchableObjects=[];
        // Debug
        // if(this.debug.active)
        // {
        //     this.debugFolder = this.debug.ui.addFolder('fox')
        // }

        // Resource
        this.resource = this.resources.items.foxModel
console.log(this.resource);
        this.setModel()
        this.setLinks();
        this.setSocialLinks(new THREE.Vector3(10,0,0.1),"insta");
        this.setSocialLinks(new THREE.Vector3(10,4,0.1),"fb");
        this.setSocialLinks(new THREE.Vector3(10,-4,0.1),"x");
        this.experience.canvas.addEventListener("click", (e) => this.onMouseClick(e));
        this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();
        // this.setAnimation()
        
    }
    setModel()
    {
        
        const loader = new FontLoader();

        loader.load( 'https://threejs.org/examples/fonts/helvetiker_regular.typeface.json',( font )=> {
        
            const geometry = new TextGeometry( 'C H I C M I C', {
                font: font,
                size: 2,
                height: 0.5,             
            } );
            const textMaterial = new THREE.MeshBasicMaterial({ color: "#71706E" });
            let textMesh = new THREE.Mesh(geometry, textMaterial);
    
            // Position the text
            textMesh.position.set(-12, 2, 0);
    
            this.scene.add(textMesh)
        } );
    }
setLinks(){
    let geometry=new RoundedBoxGeometry(10,10,0.1,100,1);
    let material=new THREE.MeshBasicMaterial()
    let mesh=new THREE.Mesh(geometry,material);
    mesh.position.set(0,0,0.1)
    this.scene.add(mesh);
}
setSocialLinks=(position,name)=>{
    let geometry=new RoundedBoxGeometry(2,2,.1,100,1);
    let material=new THREE.MeshBasicMaterial()
    let mesh=new THREE.Mesh(geometry,material);
    mesh.position.set(position.x,position.y,position.z)
    mesh.name=name;
    this.touchableObjects.push(mesh)
    this.scene.add(mesh);
}
onMouseClick(event) {
    // Calculate mouse coordinates in normalized device coordinates (-1 to 1)
    this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    // Update the picking ray with the camera and mouse position
    this.raycaster.setFromCamera(this.mouse, this.experience.camera.instance);

    // Check for intersections between the ray and the mesh
    const intersects =this.raycaster.intersectObjects(this.touchableObjects);

    if (intersects.length > 0) {
        // Mesh was clicked
        this.open(intersects)
    
    }
        // this.interactiveMesh.material.color.set(0xff0000); // Change the color or perform any action
    }

open(intersects){
    switch(intersects[0].object.name){
        case "insta":
    window.location.href = "https://www.instagram.com/"
break;
case "fb":
    window.location.href = "https://www.fb.com/"
break;
case "x":
    window.location.href = "https://www.x.com/"
break;
}
}
    setAnimation()
    {
        this.animation = {}
        
        // Mixer
        this.animation.mixer = new THREE.AnimationMixer(this.model)
        
        // Actions
        this.animation.actions = {}
        
        this.animation.actions.idle = this.animation.mixer.clipAction(this.resource.animations[0])
        this.animation.actions.walking = this.animation.mixer.clipAction(this.resource.animations[1])
        this.animation.actions.running = this.animation.mixer.clipAction(this.resource.animations[2])
        
        this.animation.actions.current = this.animation.actions.idle
        this.animation.actions.current.play()

        // Play the action
        this.animation.play = (name) =>
        {
            const newAction = this.animation.actions[name]
            const oldAction = this.animation.actions.current

            newAction.reset()
            newAction.play()
            newAction.crossFadeFrom(oldAction, 1)

            this.animation.actions.current = newAction
        }

        // Debug
        // if(this.debug.active)
        // {
        //     const debugObject = {
        //         playIdle: () => { this.animation.play('idle') },
        //         playWalking: () => { this.animation.play('walking') },
        //         playRunning: () => { this.animation.play('running') }
        //     }
        //     this.debugFolder.add(debugObject, 'playIdle')
        //     this.debugFolder.add(debugObject, 'playWalking')
        //     this.debugFolder.add(debugObject, 'playRunning')
        // }
    }

    update()
    {
        // this.animation.mixer.update(this.time.delta * 0.001)
    }
}