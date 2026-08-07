// file: lib.rs
// descr: WASM interface. brige file cadcore and web assembly for compilation. library api



use wasm_bindgen::prelude::*;
// import mod.rs module with functions for api
mod math;
use serde::Serialize;

#[derive(Serialize)]
struct MeshData {
    vertices: Vec<f32>,
    indices: Vec<u32>,
}

#[wasm_bindgen]
pub struct WasmKernel {}


// public API. server is frontend
#[wasm_bindgen]
impl WasmKernel {

    #[wasm_bindgen(constructor)]
    pub fn new() -> WasmKernel {
        WasmKernel {}
    }

    // trigonometric functions. will become API
    #[wasm_bindgen(js_name = sine)]
    pub fn sine(&self, degrees: f64) -> f64 {
        math::sine(degrees)
    }
    #[wasm_bindgen(js_name = cosine)]
    pub fn cosine(&self, degrees: f64) -> f64 {
        math::cosine(degrees)
    }
    #[wasm_bindgen(js_name = tangent)]
    pub fn tangent(&self, degrees: f64) -> f64 {
        math::tangent(degrees)
    }
    #[wasm_bindgen(js_name = arcsine)]
    pub fn arcsine(&self, value: f64) -> f64 {
        math::arcsine(value)
    }
    #[wasm_bindgen(js_name = arccosine)]
    pub fn arccosine(&self, value: f64) -> f64 {
        math::arccosine(value)
    }
    #[wasm_bindgen(js_name = arctangent)]
    pub fn arctangent(&self, value: f64) -> f64 {
        math::arctangent(value)
    }

    // should become any figure
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
