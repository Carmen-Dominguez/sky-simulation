import * as THREE from '../three.module.js';
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

    setCloudColor(color, opacity) {
        this.clouds.children.forEach(cloudGroup => {
            cloudGroup.children.forEach(puffGroup => {
                puffGroup.children.forEach(plane => {
                    if (plane.material) {
                        plane.material.color.setHex(color);
                        plane.material.opacity = opacity;
                    }
                });
            });
        });
    }

    setCloudColorLayered(layerColors) {
        this.clouds.children.forEach(cloudGroup => {
            cloudGroup.children.forEach(puffGroup => {
                const layer = puffGroup.userData.layer || 'back';
                const { color, opacity } = layerColors[layer];
                puffGroup.children.forEach(plane => {
                    if (plane.material) {
                        plane.material.color.setHex(color);
                        plane.material.opacity = opacity;
                    }
                });
            });
        });
    }

    setCloudDensity(percent) {
        // Show/hide clouds based on percent (0-100)
        const visibleCount = Math.round(this.clouds.children.length * percent / 100);
        this.clouds.children.forEach((cloud, i) => {
            cloud.visible = i < visibleCount;
        });
    }
}

export default CloudSystem; 