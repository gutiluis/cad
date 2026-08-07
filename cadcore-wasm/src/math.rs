// file: math.rs
// descr: functions belong to the Web assembly api layer in the lib.rs


pub fn sine(degrees: f64) -> f64 {
    degrees.to_radians().sin()
}

pub fn cosine(degrees: f64) -> f64 {
    degrees.to_radians().cos()
}

pub fn tangent(degrees: f64) -> f64 {
    degrees.to_radians().tan()
}
// inverse trigonometric functions
pub fn arcsine(value: f64) -> f64 {
    value.asin().to_degrees()
}

pub fn arccosine(value: f64) -> f64 {
    value.acos().to_degrees()
}

pub fn arctangent(value: f64) -> f64 {
    value.atan().to_degrees()
}
