import keyInput from "./KeyInput.js";
import connect  from "./Connect.js";

// 1. Create a scene
const ratio = window.innerWidth / window.innerHeight;
const scene = new THREE.Scene();
// 2. Set the camera
const camera = new THREE.PerspectiveCamera( 75, ratio, 0.1, 1000 );
// 3. Set a Renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );
// 4. Set the Lights
const light = new THREE.AmbientLight(0x404040); // soft white light
// 5. Set the Directional Light
const dLight = new THREE.DirectionalLight(0xFFFFFF, 0.5);

light.add(dLight);
scene.add(light);

// Pick a random value from an array for the buildings
function pickRandom(array) {
	return array[Math.floor(Math.random() * array.length)];
}

const buildingColors = [
	0xef2d56,
	0x0ad3ff,
	0xff9f1c, 
	0xff80ed,
	0xffd700,
	0x40e0d0,
	0x800000,
	0x00ff7f
  ];
// Ground =>
const geometry = new THREE.BoxGeometry(50,0.1,50);
const material = new THREE.MeshPhongMaterial( { color: 0xffffff } );
const ground = new THREE.Mesh( geometry, material );
scene.add( ground );
camera.position.set(5,15,15);

function animate() {
	requestAnimationFrame( animate );
	if(keyInput.isPressed(38)) {
		camera.position.y += 0.05;
		camera.position.x += 0.05;
	}
	if(keyInput.isPressed(40)) {
		camera.position.y -= 0.05;
		camera.position.x -= 0.05;
	}
    camera.lookAt(ground.position);
	renderer.render( scene, camera );
}
animate();
// Rendering the scene => No need of this if it in calling animate() fucntion
// renderer.render(scene, camera);
connect.then((result) =>{
	console.log(result);
	result.buildings.forEach((b, index) => {
		if(index <= result.supply) {
			// Adding colors from array =>
			const color = pickRandom(buildingColors);
			const boxGeometry = new THREE.BoxGeometry(b.w, b.h, b.d);
			const boxMaterial = new THREE.MeshPhongMaterial( { color } );
			const box = new THREE.Mesh( boxGeometry, boxMaterial );		
			box.position.set(b.x, b.y, b.z);
			scene.add( box );
		}
		
	});

});



