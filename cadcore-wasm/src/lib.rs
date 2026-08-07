// descr: brige file cadcore and web assembly for compilation
use wasm_bindgen::prelude::*;
use serde::Serialize;

#[derive(Serialize)]
struct MeshData {
    vertices: Vec<f32>,
    indices: Vec<u32>,
}

#[wasm_bindgen]
pub struct WasmKernel {}

#[wasm_bindgen]
impl WasmKernel {

    #[wasm_bindgen(constructor)]
    pub fn new() -> WasmKernel {
        WasmKernel {}
    }


    #[wasm_bindgen(js_name = createBox)]
    pub fn create_box(
        &self,
        size: f32
    ) -> JsValue {

        let mesh = MeshData {
            vertices: vec![
                -size, -size, size,
                 size, -size, size,
                 size, size, size,
                -size, size, size,

                // black
                -size, -size, -size,
                size, -size, -size,
                size, size, -size,
                -size, size, -size,
            ],

            normals: vec![
                0.0, 0.0, 1.0,
                0.0, 0.0, 1.0,
                0.0, 0.0, 1.0,
                0.0, 0.0, 1.0,
            ],

            indices: vec![
                0,1,2,
                0,2,3,

                //back
                4,6,5,
                4,7,6,

                // left
                0,3,7,
                0,7,4,

                // right
                1,5,6,
                1,6,2,

                // top
                3,2,6,
                3,6,7,

                // bottom
                0,4,5,
                0,5,1,
            ],
        };

        serde_wasm_bindgen::to_value(&mesh).unwrap()
    }
}
