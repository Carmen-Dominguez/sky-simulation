class Sky {
    constructor(scene) {
        this.scene = scene;
        this.createSky();
    }

    createSky() {
        const skyGeometry = new THREE.SphereGeometry(500, 32, 32);
        const skyMaterial = new THREE.MeshBasicMaterial({
            color: 0x87CEEB,
            side: THREE.BackSide
        });
        this.sky = new THREE.Mesh(skyGeometry, skyMaterial);
        this.scene.add(this.sky);
    }
}

export default Sky; 