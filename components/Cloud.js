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
            opacity: 0.6
        });

        // Create a cluster of spheres for each cloud
        const sphereCount = 5 + Math.floor(Math.random() * 4); // 5-8 spheres per cloud
        for (let j = 0; j < sphereCount; j++) {
            const cloud = new THREE.Mesh(cloudGeometry, cloudMaterial);
            
            // Random offset within the cloud cluster
            const offset = 1.5;
            cloud.position.x = (Math.random() - 0.5) * offset;
            cloud.position.y = (Math.random() - 0.5) * offset;
            cloud.position.z = (Math.random() - 0.5) * offset;
            
            // Random scale for each sphere in the cloud
            const scale = 0.8 + Math.random() * 1.2;
            cloud.scale.set(scale, scale, scale);
            
            this.cloudGroup.add(cloud);
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