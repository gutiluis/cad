import * as THREE from "three";
import init, { WasmKernel } from "cadcore-wasm";

await init();

const kernel = new WasmKernel();

// sine input function
const sineInput =
    document.getElementById("sineAngle") as HTMLInputElement;
const sineButton =
    document.getElementById("calculateSine") as HTMLButtonElement;
const sineResult =
    document.getElementById("sineResult")!;
sineButton.addEventListener("click", () => {
    const degrees = Number(
        sineInput.value
    );
    const result = kernel.sine(
        degrees
    );
    sineResult.textContent =
        result.toString();
    console.log(
        `sin(${degrees}) = ${result}`
    );
});

const cosineInput =
    document.getElementById("cosineAngle") as HTMLInputElement;
const cosineButton =
    document.getElementById("calculateCosine") as HTMLButtonElement;
const cosineResult =
    document.getElementById("cosineResult")!;
cosineButton.addEventListener("click", () => {
    const degrees = Number(
        cosineInput.value
    );
    const result = kernel.cosine(
        degrees
    );
    cosineResult.textContent =
        result.toString();
    console.log(
        `cosine(${degrees}) = ${result}`
    );
});


const tangentInput =
    document.getElementById("tangentAngle") as HTMLInputElement;

const tangentButton =
    document.getElementById("calculateTangent") as HTMLButtonElement;

const tangentResult =
    document.getElementById("tangentResult")!;

tangentButton.addEventListener("click", () => {
    const degrees = Number(tangentInput.value);

    const result = kernel.tangent(degrees);

    tangentResult.textContent = result.toString();

    console.log(`tangent(${degrees}) = ${result}`);
});


// ARCSINE
const arcsineInput =
    document.getElementById("arcsineValue") as HTMLInputElement;

const arcsineButton =
    document.getElementById("calculateArcsine") as HTMLButtonElement;

const arcsineResult =
    document.getElementById("arcsineResult")!;

arcsineButton.addEventListener("click", () => {
    const value = Number(arcsineInput.value);

    const result = kernel.arcsine(value);

    arcsineResult.textContent = result.toString();

    console.log(`arcsine(${value}) = ${result}`);
});


// ARCCOSINE
const arccosineInput =
    document.getElementById("arccosineValue") as HTMLInputElement;

const arccosineButton =
    document.getElementById("calculateArccosine") as HTMLButtonElement;

const arccosineResult =
    document.getElementById("arccosineResult")!;

arccosineButton.addEventListener("click", () => {
    const value = Number(arccosineInput.value);

    const result = kernel.arccosine(value);

    arccosineResult.textContent = result.toString();

    console.log(`arccosine(${value}) = ${result}`);
});


// ARCTANGENT
const arctangentInput =
    document.getElementById("arctangentValue") as HTMLInputElement;

const arctangentButton =
    document.getElementById("calculateArctangent") as HTMLButtonElement;

const arctangentResult =
    document.getElementById("arctangentResult")!;

arctangentButton.addEventListener("click", () => {
    const value = Number(arctangentInput.value);

    const result = kernel.arctangent(value);

    arctangentResult.textContent = result.toString();

    console.log(`arctangent(${value}) = ${result}`);
});




// -----------------------------------------------------
// Scene
// -----------------------------------------------------

const container = document.getElementById("canvas-container")!;

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x222222);

// -----------------------------------------------------
// Camera
// -----------------------------------------------------

const camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

camera.position.set(0, 0, 50);
camera.lookAt(0, 0, 0);

// -----------------------------------------------------
// Renderer
// -----------------------------------------------------

const renderer = new THREE.WebGLRenderer({
    antialias: true,
});

renderer.setSize(
    window.innerWidth,
    window.innerHeight
);

container.appendChild(renderer.domElement);

// -----------------------------------------------------
// Lights
// -----------------------------------------------------

scene.add(
    new THREE.AmbientLight(0xffffff, 0.7)
);

const light = new THREE.DirectionalLight(
    0xffffff,
    1
);

light.position.set(20, 20, 20);

scene.add(light);

// -----------------------------------------------------
// Create geometry from WASM
// -----------------------------------------------------

const meshData = kernel.createBox(10);

console.log(meshData);

const geometry = new THREE.BufferGeometry();

geometry.setAttribute(
    "position",
    new THREE.BufferAttribute(
        new Float32Array(meshData.vertices),
        3
    )
);

geometry.setIndex(meshData.indices);

// Let Three.js compute normals
geometry.computeVertexNormals();

geometry.computeBoundingSphere();

// -----------------------------------------------------
// Material
// -----------------------------------------------------

const material = new THREE.MeshStandardMaterial({
    color: 0x4f46e5
});

// For debugging, you can use:
//
// const material = new THREE.MeshBasicMaterial({
//     color: 0x4f46e5,
//     wireframe: true,
// });

// -----------------------------------------------------
// Mesh
// -----------------------------------------------------

const cadMesh = new THREE.Mesh(
    geometry,
    material
);

scene.add(cadMesh);

// -----------------------------------------------------
// Slider
// -----------------------------------------------------

const slider =
    document.getElementById("radiusSlider") as HTMLInputElement;

const radiusValue =
    document.getElementById("radiusVal")!;

slider.addEventListener("input", () => {

    const size = Number(slider.value);

    radiusValue.textContent = slider.value;

    const meshData = kernel.createBox(size);

    geometry.setAttribute(
        "position",
        new THREE.BufferAttribute(
            new Float32Array(meshData.vertices),
            3
        )
    );

    geometry.setIndex(meshData.indices);

    geometry.computeVertexNormals();

    geometry.attributes.position.needsUpdate = true;

});

// -----------------------------------------------------
// Animation
// -----------------------------------------------------

function animate() {

    requestAnimationFrame(animate);

    cadMesh.rotation.x += 0.01;
    cadMesh.rotation.y += 0.01;

    renderer.render(scene, camera);

}

animate();

// -----------------------------------------------------
// Resize
// -----------------------------------------------------

window.addEventListener("resize", () => {

    camera.aspect =
        window.innerWidth /
        window.innerHeight;

    camera.updateProjectionMatrix();

    renderer.setSize(
        window.innerWidth,
        window.innerHeight
    );

});
