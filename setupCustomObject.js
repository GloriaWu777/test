
import * as THREE from 'three'


export default function setupCustomObject(){
    console.log("this is a self-defined sth")
    THREE.FixedBoxGeometry = function(width, segments){
        THREE.Geometry.call(this);
        this.width = width;
        this.segments = segments;

        var boxGeometry = new THREE.BoxGeometry(
            this.width,
            this.width,
            this.width,
            this.segments,
            this.segments
        );

        this.vertices = boxGeometry.vertices;
        this.faces = boxGeometry.faces;
        this.faceVertexUvs = boxGeometry.faceVertexUvs;
    }

    THREE.FixedBoxGeometry.prototype = Object.create(THREE.Geometry.prototype);
    console.log("this is a self-defined sth")
}

// setupCustomObject()