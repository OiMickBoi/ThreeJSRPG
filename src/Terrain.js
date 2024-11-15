import * as THREE from 'three'; 

export class Terrain extends THREE.Mesh {
  constructor(width, height) {
    super();

    this.width = width;
    this.height = height;
    this.treeCount = 10; 


    this.createTerrain();
    this.createTrees();  
  }

  createTerrain() {
    if (this.terrain) {
      this.terrain.geometry.dispose();
      this.terrain.material.dispose();
    }
    const terrainMaterial = new THREE.MeshStandardMaterial({color: 0x50a000});
    const terrainGeometry = new THREE.PlaneGeometry(this.width, this.height);
    this.terrain= new THREE.Mesh(terrainGeometry, terrainMaterial);
    this.terrain.rotation.x = -Math.PI / 2;
    this.terrain.position.set(this.width / 2, 0, this.height / 2);
    this.add(this.terrain);
  }

  createTrees() {
    const treeRadius = 0.2;
    const treeHeight = 1;
    const treeGeometry = new THREE.ConeGeometry(treeRadius, treeHeight, 8);
    const treeMaterial = new THREE.MeshStandardMaterial({
      color: 0x305010,
      flatShading: true 
    });

    this.trees = new THREE.Group(); // a group is a collection of objects so we can group similar meshes
    this.add(this.trees);

    this.trees.clear();
    
    for (let i = 0; i < this.treeCount; i++) {
      const treeMesh = new  THREE.Mesh(treeGeometry, treeMaterial);
      treeMesh.rotation.x = Math.PI / 2;
      treeMesh.position.z = treeHeight / 2;

      this.trees.add(treeMesh);
    }
  }
  
}

// Terrain
//   - Terrain Mesh
//   - Terrain Group
//     - Tree 1
//     - Tree 2
//     - ... 
