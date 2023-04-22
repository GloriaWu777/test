import { readFile } from './readFile.js'
// import { setupCustomObject } from './setupCustomObject.js'
import * as THREE from 'three'
import Stats from 'three/addons/libs/stats.module.js';

// 全局变量声明
let container,spotlight,camera,renderer,scene;
let mesh, mesh2;
let sphere;
let stats;

init().then(animate);

// init
async function init(){
    
    container = document.createElement( 'div' );
	document.body.appendChild( container );
    
    // states用法？？？？？？
    stats = new Stats();
    stats.showPanel(1);
    container.appendChild( stats.dom );

    // 灯光
    spotlight = new THREE.SpotLight(0xFFFFFF);
    spotlight.position.set(-40, 40, -15);
    spotlight.castShadow = true;
    spotlight.shadow.mapSize = new THREE.Vector2(1024, 1024);
    spotlight.shadow.camera.far = 130;
    spotlight.shadow.camera.near = 40;

// 场景
    scene = new THREE.Scene();


// 几何体
    const spheregeometry = new THREE.SphereGeometry(20, 16, 8)
    const mat = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true})

    sphere = new THREE.Mesh(spheregeometry, mat)

    mesh = new THREE.Mesh(
        new THREE.SphereGeometry(100, 16, 8),
        new THREE.MeshBasicMaterial({color: 0xffffff, wireframe:true})
    )
    scene.add(mesh)

    mesh2 = new THREE.Mesh(
        new THREE.SphereGeometry(50, 16, 8),
        new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true})
    )
    scene.add(mesh2)

// 添加星点
    const geometry = new THREE.BufferGeometry();
    const vertices = [];

    for ( let i = 0; i < 10000; i ++ ) {

        vertices.push( THREE.MathUtils.randFloatSpread( 2000 ) ); // x
        vertices.push( THREE.MathUtils.randFloatSpread( 2000 ) ); // y
        vertices.push( THREE.MathUtils.randFloatSpread( 2000 ) ); // z

    }

    geometry.setAttribute( 'position', new THREE.Float32BufferAttribute( vertices, 3 ) );

    const particles = new THREE.Points( geometry, new THREE.PointsMaterial( { color: 0x888888 } ) );
    scene.add( particles );

// 相机
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 10000);
    camera.position.set( 200, 10, 1000 );
    camera.lookAt( mesh.position );

    const cameraHelper = new THREE.CameraHelper(camera)
    scene.add(cameraHelper)

// 渲染器
    renderer = new THREE.WebGL1Renderer({antialias:true});

    const renderWidth = window.innerWidth;
    const renderHeight = window.innerHeight - document.getElementById("input_container").offsetHeight;
    // renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setClearColor(new THREE.Color(0x000000))
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild( renderer.domElement );
    renderer.shadowMap.Enabled = true;
    renderer.autoClear = false;


    //相机跟随物体
    window.addEventListener('resize', onResize, false)
    console.log(mesh)
    stats.begin()
    renderer.render(scene, camera)
    stats.end()
}

// 调整窗口大小时 自适应比例尺寸
function onResize(){
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render(scene, camera)
}

// 球体动画
function animate() {
    requestAnimationFrame(animate);

//清除背景白色
    renderer.clear()
    // animating the cube
    sphere.rotation.x += 0.01;
    sphere.rotation.y += 0.01;
    sphere.rotation.z += 0.02;
// console.log(Date.now() * 0.0005)
    renderer.render(scene, camera);
    stats.update()
}
// animate();
// 读取文件数据
// var mouthOpens = readFile()