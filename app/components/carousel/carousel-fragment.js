export default `
  uniform float time;
  uniform vec2 resolution;
  uniform vec2 textureFactor;
  uniform sampler2D texture1;
  uniform sampler2D texture2;
  uniform sampler2D disp;
  uniform float dispFactor;
  uniform float effectFactor;
  uniform vec4 resolution1;
  uniform vec4 resolution2;
  
  varying vec2 vUv;
  
  void main() {
    vec2 uv = vUv;
  
    vec4 disp = texture2D(disp, uv);
    vec2 distortedPosition = vec2(uv.x + dispFactor * (disp.r*effectFactor), uv.y);
    vec2 distortedPosition2 = vec2(uv.x - (1.0 - dispFactor) * (disp.r*effectFactor), uv.y);
  
    vec4 _texture = texture2D(texture1, distortedPosition);
    vec4 _texture2 = texture2D(texture2, distortedPosition2);
  
    vec4 finalTexture = mix(_texture, _texture2, dispFactor);
  
    gl_FragColor = finalTexture;
  }
`; 