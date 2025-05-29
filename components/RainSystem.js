import * as THREE from '../three.module.js';

class RainSystem {
    constructor(scene) {
        this.scene = scene;
        this.rainGroup = new THREE.Group();
        this.scene.add(this.rainGroup);
        this.rainDrops = [];
        this.isRaining = false;
        this.createRain();
    }

    createRain() {
        const rainCount = 1000;
        const lineLength = 4; // Length of each raindrop line

        for (let i = 0; i < rainCount; i++) {
            // Random position in a sphere around the camera
            const radius = 100 + Math.random() * 50;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(Math.random() * 2 - 1);
            
            const x = radius * Math.sin(phi) * Math.cos(theta);
            const y = radius * Math.sin(phi) * Math.sin(theta);
            const z = radius * Math.cos(phi);

            // Create a line geometry for each raindrop
            const geometry = new THREE.BufferGeometry();
            const positions = new Float32Array([
                x, y, z,           // Start point
                x, y - lineLength, z  // End point
            ]);
            geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

            // Create material for the line
            const material = new THREE.LineBasicMaterial({
                color: 0xaaaaaa,
                transparent: true,
                opacity: 0.6
            });

            // Create the line and add it to the groupf
            const line = new THREE.Line(geometry, material);
            line.userData.velocity = 0.5 + Math.random() * 0.5;
            this.rainDrops.push(line);
            this.rainGroup.add(line);
        }

        this.rainGroup.visible = false;
    }

    update() {
        if (!this.isRaining) return;

        this.rainDrops.forEach(line => {
            const positions = line.geometry.attributes.position.array;
            
            // Move the line downward
            positions[1] -= line.userData.velocity;
            positions[4] -= line.userData.velocity;
            
            // Reset the line if it falls below a certain point
            if (positions[1] < -100) {
                const radius = 100 + Math.random() * 50;
                const theta = Math.random() * Math.PI * 2;
                const phi = Math.acos(Math.random() * 2 - 1);
                
                positions[0] = radius * Math.sin(phi) * Math.cos(theta);
                positions[1] = radius * Math.sin(phi) * Math.sin(theta);
                positions[2] = radius * Math.cos(phi);
                
                positions[3] = positions[0];
                positions[4] = positions[1] - 2; // lineLength
                positions[5] = positions[2];
            }
            
            line.geometry.attributes.position.needsUpdate = true;
        });
    }

    setRainIntensity(intensity) {
        // intensity should be 0-100
        this.isRaining = intensity > 0;
        this.rainGroup.visible = this.isRaining;
        
        if (this.isRaining) {
            // Adjust rain opacity based on intensity
            const opacity = 0.3 + (intensity / 100) * 0.4;
            this.rainDrops.forEach(line => {
                line.material.opacity = opacity;
                // Adjust rain speed based on intensity
                line.userData.velocity = 0.5 + (intensity / 100) * 1.5;
            });
        }
    }
}

export default RainSystem; 