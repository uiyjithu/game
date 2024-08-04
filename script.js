// Basic setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Player
const playerGeometry = new THREE.BoxGeometry(1, 1, 1);
const playerMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const player = new THREE.Mesh(playerGeometry, playerMaterial);
scene.add(player);
player.position.y = 0.5;

// Enemies
const enemyGeometry = new THREE.BoxGeometry(1, 1, 1);
const enemyMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const enemy = new THREE.Mesh(enemyGeometry, enemyMaterial);
scene.add(enemy);
enemy.position.set(5, 0.5, -10);

// Bullets
const bullets = [];
const bulletGeometry = new THREE.SphereGeometry(0.1, 8, 8);
const bulletMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });

// Controls
const controls = {
    forward: false,
    backward: false,
    left: false,
    right: false,
    shoot: false
};

document.addEventListener('keydown', (event) => {
    if (event.code === 'ArrowUp') controls.forward = true;
    if (event.code === 'ArrowDown') controls.backward = true;
    if (event.code === 'ArrowLeft') controls.left = true;
    if (event.code === 'ArrowRight') controls.right = true;
    if (event.code === 'Space') controls.shoot = true;
});

document.addEventListener('keyup', (event) => {
    if (event.code === 'ArrowUp') controls.forward = false;
    if (event.code === 'ArrowDown') controls.backward = false;
    if (event.code === 'ArrowLeft') controls.left = false;
    if (event.code === 'ArrowRight') controls.right = false;
    if (event.code === 'Space') controls.shoot = false;
});

// Movement
function updatePlayer() {
    if (controls.forward) player.position.z -= 0.1;
    if (controls.backward) player.position.z += 0.1;
    if (controls.left) player.position.x -= 0.1;
    if (controls.right) player.position.x += 0.1;
}

// Shooting
function shoot() {
    if (controls.shoot) {
        const bullet = new THREE.Mesh(bulletGeometry, bulletMaterial);
        bullet.position.set(player.position.x, player.position.y, player.position.z);
        scene.add(bullet);
        bullets.push(bullet);
        controls.shoot = false;
    }
}

// Update loop
function animate() {
    requestAnimationFrame(animate);

    updatePlayer();
    shoot();

    bullets.forEach((bullet) => {
        bullet.position.z -= 0.2;
        if (bullet.position.z < -10) {
            scene.remove(bullet);
            bullets.splice(bullets.indexOf(bullet), 1);
        }
    });

    renderer.render(scene, camera);
}

camera.position.z = 5;
animate();
