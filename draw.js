import { readFile } from './readFile.js'
import * as THREE from 'three'


var spotlight = new THREE.SpotLight(0xFFFFFF);
spotlight.position.set(-40, 40, -15);
spotlight.castShadow = true;
spotlight.shadow.mapSize = new THREE.Vector2(1024, 1024);
spotlight.shadow.camera.far = 130;
spotlight.shadow.camera.near = 40;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 0.1, 1000);
camera.position.set( 200, 10, 100 );
camera.lookAt( scene.position );

const renderer = new THREE.WebGL1Renderer();
renderer.setClearColor(new THREE.Color(0x000000))
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
renderer.shadowMap.Enabled = true;

const geometry = new THREE.SphereGeometry( 1, 60, 60 );
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const sphere = new THREE.Mesh( geometry, material );
sphere.position.set(2, 4, 2)
scene.add( sphere );

//resizing the window
window.addEventListener('resize', onResize, false)
function onResize(){
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// camera.updateMatrix();

function animate() {
    requestAnimationFrame(animate);

    // animating the cube
    sphere.rotation.x += 0.01;
    sphere.rotation.y += 0.01;
    sphere.rotation.z += 0.02;

    renderer.render(scene, camera);
}
animate();

var mouthOpens = readFile()