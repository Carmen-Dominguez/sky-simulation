import * as THREE from '../three.module.js';

class Cloud {
    constructor() {
        this.cloudGroup = new THREE.Group();
        this.createCloudCluster();
    }

    createCloudCluster() {
        const cloudGeometry = new THREE.SphereGeometry(4, 16, 16);
        const alphaMap = new THREE.TextureLoader().load('./grey-white-clouds.jpg');
        const material = new THREE.MeshLambertMaterial({
            color: 0xffffff,
            alphaMap: alphaMap,
            transparent: true,
            opacity: 0.85
        });

        const layers = ['back', 'mid', 'front'];
        const sphereCount = 15 + Math.floor(Math.random() * 6); // 10-15 spheres per cloud

        for (let j = 0; j < sphereCount; j++) {
            const sphere = new THREE.Mesh(cloudGeometry, material.clone());

            // Place each sphere randomly within a compact ellipsoid
            const x = (Math.random() - 0.5) * 8; // wider spread in x
            const y = (Math.random() - 0.5) * 4; // less spread in y
            const z = (Math.random() - 0.5) * 4; // less spread in z
            sphere.position.set(x, y, z);

            // Random scale, but not too large
            const scale = 2 + Math.random() * 1.2;
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