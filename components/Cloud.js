import * as THREE from '../three.module.js';

class Cloud {
    constructor() {
        this.cloudGroup = new THREE.Group();
        this.billboardPlanes = [];
        this.createCloudCluster();
    }

    createCloudCluster() {
        const cloudTexture = new THREE.TextureLoader().load('./grey-white-clouds.png');
        const layers = ['back', 'mid', 'front'];
        const layerSettings = {
            back:  { opacity: 0.5, color: 0xffffff },
            mid:   { opacity: 0.7, color: 0xf0f0f0 },
            front: { opacity: 0.9, color: 0xe0e0e0 }
        };
        const puffCount = 10 + Math.floor(Math.random() * 6); // 10-15 puffs per cloud
        for (let j = 0; j < puffCount; j++) {
            const layer = layers[j % layers.length];
            const { opacity, color } = layerSettings[layer];
            // Each puff is a group of 2-3 crossed planes
            const puffGroup = new THREE.Group();
            const numPlanes = 2 + Math.floor(Math.random() * 2); // 2 or 3 planes
            for (let k = 0; k < numPlanes; k++) {
                const material = new THREE.MeshLambertMaterial({
                    map: cloudTexture,
                    color: color,
                    transparent: true,
                    opacity: opacity,
                    depthWrite: false
                });
                const plane = new THREE.Mesh(
                    new THREE.PlaneGeometry(8, 5),
                    material
                );
                // First plane will billboard, others are fixed
                if (k > 0) {
                    plane.rotation.y = (k * Math.PI * 2) / numPlanes;
                }
                // Random scale for each plane
                const scale = 4 + Math.random() * 4;
                plane.scale.set(scale, scale, 1);
                puffGroup.add(plane);
                if (k === 0) {
                    // Only the first plane in each puff billboards
                    this.billboardPlanes.push(plane);
                }
            }
            // Random position within ellipsoid
            const x = (Math.random() - 0.5) * 8;
            const y = (Math.random() - 0.5) * 4;
            const z = (Math.random() - 0.5) * 4;
            puffGroup.position.set(x, y, z);
            puffGroup.userData.layer = layer;
            this.cloudGroup.add(puffGroup);
        }
    }

    // Only billboard the first plane of each puff
    billboardToCamera(camera) {
        this.billboardPlanes.forEach(plane => {
            plane.lookAt(camera.position);
        });
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