import * as THREE from 'three'
import * as XLSX from 'xlsx'
// read data from files

// function readWorkbookFromRemoteFle(url, callback){
//     var xhr = new XMLHttpRequest();
//     xhr.open('get',url,true);
//     xhr.responseType = 'arraybuffer';
//     xhr.onload = function(e){
//         if(xhr.status == 200) {
//             var data = new Uint8Array(xhr.response)
//             var workbook = XLSX.read(data,{type:'array'})
//             if(callback) callback(workbook)
//         }
//     }
//     xhr.send();
// }
// readWorkbookFromRemoteFle('data/hrv.xlsx')

// const wb = XLSX.readFile('./data/hrv.xlsx')
// var sheetNames = wb.SheetNames;
//             var worksheet  = wb.Sheets[sheetNames[0]];
//             for (let i = 0; i < sheetNames.length; i++){
//                 console.log(worksheet[i].v)
//             }



const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45,window.innerWidth/window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
// renderer.setClearColor(new THREE.Color(0X000000));

// const xxx = document.getElementById('xx')

const geometry =  new THREE.BoxGeometry(1,1,1);
const material = new THREE.MeshBasicMaterial({color:0x00ff00});
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.z = 5;

// render the scene
function animate() {
    requestAnimationFrame(animate);

    // animating the cube
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    renderer.render(scene, camera);
}


animate();

