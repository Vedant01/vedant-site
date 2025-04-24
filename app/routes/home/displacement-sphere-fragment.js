export default `
  uniform float time;
  uniform vec2 resolution;
  uniform vec2 textureFactor;
  uniform sampler2D texture1;
  uniform sampler2D texture2;
  uniform sampler2D disp;
  uniform float dispFactor;
  uniform float effectFactor;
  
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vPos;
  varying vec2 vCoordinates;
  varying float displacement;
  
  void main() {
    vec2 uv = gl_FragCoord.xy / resolution;
  
    float distanceToCenter = distance(gl_PointCoord, vec2(0.5));
    float strength = 0.05 / distanceToCenter - 0.1;
  
    vec4 color = vec4(1.0);
    float dist = length(gl_PointCoord - vec2(0.5));
    float alpha = 1.0 - smoothstep(0.45, 0.5, dist);
  
    gl_FragColor = vec4(color.rgb, alpha * 0.5);
  }
`; 