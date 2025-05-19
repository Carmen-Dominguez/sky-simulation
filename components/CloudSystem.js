import Cloud from './Cloud.js';

class CloudSystem {
    constructor(scene) {
        this.scene = scene;
        this.clouds = new THREE.Group();
        this.scene.add(this.clouds);
        this.createClouds();
    }

    createClouds() {
        const cloudCount = 30;
        const radius = 100;

        for (let i = 0; i < cloudCount; i++) {
            const cloud = new Cloud();
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(Math.random() * 2 - 1);
            cloud.setPosition(radius, theta, phi);
            this.clouds.add(cloud.getMesh());
        }
    }

    update() {
        this.clouds.rotation.y += 0.0005;
        this.clouds.rotation.x += 0.0002;
    }
}

export default CloudSystem; 