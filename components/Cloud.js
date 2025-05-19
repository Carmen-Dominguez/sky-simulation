import * as THREE from '../three.module.js';

class Cloud {
    constructor() {
        this.cloudGroup = new THREE.Group();
        this.createCloudCluster();
    }

    createCloudCluster() {
        const cloudGeometry = new THREE.SphereGeometry(2, 8, 8);
        const cloudMaterial = new THREE.MeshBasicMaterial({
            color: 0xffffff,
            transparent: true,
            opacity: 0.8
        });

        const layers = ['back', 'mid', 'front'];
        const sphereCount = 5 + Math.floor(Math.random() * 4); // 5-8 spheres per cloud
        for (let j = 0; j < sphereCount; j++) {
            // Clone material for each sphere
            const sphere = new THREE.Mesh(cloudGeometry, cloudMaterial.clone());
            // Random offset within the cloud cluster
            const offset = 1.5;
            sphere.position.x = (Math.random() - 0.5) * offset;
            sphere.position.y = (Math.random() - 0.5) * offset;
            sphere.position.z = (Math.random() - 0.5) * offset;
            // Random scale for each sphere in the cloud
            const scale = 0.8 + Math.random() * 1.2;
            sphere.scale.set(scale, scale, scale);
            // Assign a layer type
            const layer = layers[j % layers.length];
            sphere.userData.layer = layer;
            this.cloudGroup.add(sphere);
        }
        // Random rotation for the entire cloud cluster
        this.cloudGroup.rotation.x = Math.random() * Math.PI;
        this.cloudGroup.rotation.y = Math.random() * Math.PI;
        this.cloudGroup.rotation.z = Math.random() * Math.PI;
    }

    setPosition(radius, theta, phi) {
        this.cloudGroup.position.x = radius * Math.sin(phi) * Math.cos(theta);
        this.cloudGroup.position.y = radius * Math.sin(phi) * Math.sin(theta);
        this.cloudGroup.position.z = radius * Math.cos(phi);
    }

    getMesh() {
        return this.cloudGroup;
    }
}

export default Cloud; 