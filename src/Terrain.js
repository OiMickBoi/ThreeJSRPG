import * as THREE from 'three';

export class Terrain extends THREE.Mesh {
  constructor(width, height) {
    super();

    this.width = width;
    this.height = height;
    this.treeCount = 10;
    this.rockCount = 20;
    this.bushCount = 20;

    this.createTerrain();
    this.createTrees();
    this.createRocks();
    this.createBushes();
  }

  createTerrain() {
    if (this.terrain) {
      this.terrain.geometry.dispose();
      this.terrain.material.dispose();
      this.remove(this.terrain);
    }
    const terrainMaterial = new THREE.MeshStandardMaterial({
      color: 0x50a000
    });


    const terrainGeometry = new THREE.PlaneGeometry(
      this.width,
      this.height,
      this.width,
      this.height
    );
    this.terrain = new THREE.Mesh(terrainGeometry, terrainMaterial);
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
      const treeMesh = new THREE.Mesh(treeGeometry, treeMaterial);
      treeMesh.position.set(
        Math.floor(this.width * Math.random() + 0.5),
        treeHeight / 2,
        Math.floor(this.height * Math.random() + 0.5)
      );

      this.trees.add(treeMesh);
    }
  }

  createRocks() {
    const minRockRadius = 0.1;
    const maxRockRadius = 0.3;
    const minRockHeight = 0.5;
    const maxRockHeight = 0.8;

    const rockMaterial = new THREE.MeshStandardMaterial({
      color: 0xb0b0b0,
      flatShading: true
    });

    this.rocks = new THREE.Group(); // a group is a collection of objects so we can group similar meshes
    this.add(this.rocks);

    this.rocks.clear();

    for (let i = 0; i < this.rockCount; i++) {
      const radius = minRockRadius + (Math.random() * (maxRockRadius - minRockRadius));
      const height = minRockHeight + (Math.random() * (maxRockHeight - minRockHeight));
      const rockGeometry = new THREE.SphereGeometry(radius, 6, 5);
      const rockMesh = new THREE.Mesh(rockGeometry, rockMaterial);
      rockMesh.position.set(
        Math.floor(this.width * Math.random() + 0.5),
        0,
        Math.floor(this.height * Math.random() + 0.5)
      );

      //rockMesh.scale
      rockMesh.scale.y = height;
      this.rocks.add(rockMesh);
    }
  }


  createBushes() {
    const minBushRadius = 0.1;
    const maxBushRadius = 0.3;
    const minBushHeight = 0.5;
    const maxBushHeight = 0.8;

    const bushMaterial = new THREE.MeshStandardMaterial({
      color: 0x80a040,
      flatShading: true
    });

    this.bushs = new THREE.Group(); // a group is a collection of objects so we can group similar meshes
    this.add(this.bushs);

    this.bushs.clear();

    for (let i = 0; i < this.bushCount; i++) {
      const radius = minBushRadius + (Math.random() * (maxBushRadius - minBushRadius));
      const height = minBushHeight + (Math.random() * (maxBushHeight - minBushHeight));
      const bushGeometry = new THREE.SphereGeometry(radius, 8, 8);
      const bushMesh = new THREE.Mesh(bushGeometry, bushMaterial);
      bushMesh.position.set(
        Math.floor(this.width * Math.random() + 0.5),
        0,
        Math.floor(this.height * Math.random() + 0.5)
      );

      //bushMesh.scale
      bushMesh.scale.y = height;
      this.bushs.add(bushMesh);
    }
  }

}

// Terrain
//   - Terrain Mesh
//   - Terrain Group
//     - Tree 1
//     - Tree 2
//     - ... 
