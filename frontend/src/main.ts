import * as THREE from "three";
import init, { WasmKernel } from "cadcore-wasm";

await init();

const kernel = new WasmKernel();

// refactor
function trigonometricCalculator(
    inputId: string,
    buttonId: string,
    resultId: string,
    calculation: (value: number) => number,
    name: string
) {
    const input =
        document.getElementById(inputId) as HTMLInputElement;
    const button =
        document.getElementById(buttonId) as HTMLButtonElement;
    const result =
        document.getElementById(resultId)!;
    button.addEventListener("click", () => {
        const value = Number(input.value);

        const calculationResult = calculation(value);

        result.textContent = calculationResult.toString();

        console.log(
            `${name}(${value}) = ${calculationResult}`
        );
    });
}

trigonometricCalculator(
    "sineAngle",
    "calculateSine",
    "sineResult",
    // kernel from rust
    (value) => kernel.sine(value),
    "sine"
);

trigonometricCalculator(
    "cosineAngle",
    "calculateCosine",
    "cosineResult",
    (value) => kernel.cosine(value),
    "cosine"
);

trigonometricCalculator(
    "tangentAngle",
    "calculateTangent",
    "tangentResult",
    (value) => kernel.tangent(value),
    "tangent"
);

trigonometricCalculator(
    "arcsineValue",
    "calculateArcsine",
    "arcsineResult",
    (value) => kernel.arcsine(value),
    "arcsine"
);

trigonometricCalculator(
    "arccosineValue",
    "calculateArccosine",
    "arccosineResult",
    (value) => kernel.arccosine(value),
    "arccosine"
);

trigonometricCalculator(
    "arctangentValue",
    "calculateArctangent",
    "arctangentResult",
    (value) => kernel.arctangent(value),
    "arctangent"
);


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
