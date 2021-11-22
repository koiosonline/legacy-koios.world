import {useEffect, useRef, useState} from "react";
import world1 from '../assets/data/threejs/world.json';
import world2 from '../assets/data/threejs/world2.json';
import world3 from '../assets/data/threejs/world3.json';
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";


const World = (props: any) => {
  const [world, setWorld] = useState<any>(null)

  //Ref for the div to place the world into
  const mountRef = useRef(null);

  //Switch to select world state based on different json objects
  const handleWorldSelection = (selectedWorld: any) => {
    switch(selectedWorld) {
      case 1:
        setWorld(world1)
        break;
      case 2:
        setWorld(world2)
        break;
      case 3:
        setWorld(world3)
        break;
    }
  }

  useEffect(() => {

    //cleanup ref
    const cleanUpRef = mountRef

    //World selection function
    handleWorldSelection(props.world);

    //Threejs init after worldState has been set
    if (world != null) {
      //Default setup
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera( 75, mountRef.current.clientWidth/mountRef.current.clientHeight, 0.1, 1000 );
      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      const loader = new THREE.ObjectLoader();
      const controls = new OrbitControls( camera, renderer.domElement );

      //Size and pixel radius settings
      renderer.setSize( mountRef.current.clientWidth, mountRef.current.clientHeight );
      renderer.setPixelRatio(window.devicePixelRatio);

      //Change size of canvas on window resize
      window.addEventListener('resize', () => {
        renderer.setSize( mountRef.current.clientWidth, mountRef.current.clientHeight );
      })

      //Render the domElement to the div
      mountRef.current.appendChild( renderer.domElement );

      //Project settings
      const project = world.project;
      if ( project.vr !== undefined ) renderer.xr.enabled = project.vr;
      if ( project.shadows !== undefined ) renderer.shadowMap.enabled = project.shadows;
      if ( project.shadowType !== undefined ) renderer.shadowMap.type = project.shadowType;
      if ( project.toneMapping !== undefined ) renderer.toneMapping = project.toneMapping;
      if ( project.toneMappingExposure !== undefined ) renderer.toneMappingExposure = project.toneMappingExposure;
      if ( project.physicallyCorrectLights !== undefined ) renderer.physicallyCorrectLights = project.physicallyCorrectLights;

      //Directional lighting
      const directionalLight = new THREE.DirectionalLight( 0xffffff, 7 );
      directionalLight.position.set( 5, 10, 5 );
      scene.add( directionalLight );

      //Ambient lighting
      const ambientLight = new THREE.AmbientLight( 0x820fc9, 1.5 );
      scene.add( ambientLight );

      //Parsing the objects to the scene
      const objects = loader.parse( world.scene );
      scene.add( objects );

      //Select all different objects
      const sphere = scene.getObjectByName('Sphere');
      const torus1 = scene.getObjectByName('Torus1');
      const torus2 = scene.getObjectByName('Torus2');
      const torus3 = scene.getObjectByName('Torus3');
      const torus4 = scene.getObjectByName('Torus4');

      //Atmosphere shaders
      const Shaders = {
        'earth': {
          uniforms: {
            'texture': {
              type: 't',
              value: null
            }
          },
          vertexShader: [
            'varying vec3 vNormal;',
            'varying vec2 vUv;',
            'void main() {',
            'gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );',
            'vNormal = normalize( normalMatrix * normal );',
            'vUv = uv;',
            '}'
          ].join('\n'),
          fragmentShader: [
            'uniform sampler2D texture;',
            'varying vec3 vNormal;',
            'varying vec2 vUv;',
            'void main() {',
            'vec3 diffuse = texture2D( texture, vUv ).xyz;',
            'float intensity = 1.05 - dot( vNormal, vec3( 0.0, 0.0, 1.0 ) );',
            'vec3 atmosphere = vec3( 1.0, 1.0, 1.0 ) * pow( intensity, 3.0 );',
            'gl_FragColor = vec4( diffuse + atmosphere, 1.0 );',
            '}'
          ].join('\n')
        },
        'atmosphere': {
          uniforms: {},
          vertexShader: [
            'varying vec3 vNormal;',
            'void main() {',
            'vNormal = normalize( normalMatrix * normal );',
            'gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );',
            '}'
          ].join('\n'),
          fragmentShader: [
            'varying vec3 vNormal;',
            'void main() {',
            'float intensity = pow( 0.8 - dot( vNormal, vec3( 0, 0, 1.0 ) ), 12.0 );',
            'gl_FragColor = vec4( 1.0, 1.0, 1.0, 1.0 ) * intensity;',
            '}'
          ].join('\n')
        }
      };

      //Atmosphere geometry
      const geometry = new THREE.SphereGeometry(1, 64, 32);

      //Atmosphere
      const atmosphereMaterial = new THREE.ShaderMaterial({
        uniforms: THREE.UniformsUtils.clone(Shaders['atmosphere'].uniforms),
        vertexShader: Shaders['atmosphere'].vertexShader,
        fragmentShader: Shaders['atmosphere'].fragmentShader,
        side: THREE.BackSide,
        blending: THREE.AdditiveBlending,
        transparent: true
      });
      const atm = new THREE.Mesh(geometry, atmosphereMaterial);

      if (window.innerWidth <= 429) {
        atm.scale.set(1.125, 1.125, 1.125);
      } else {
        atm.scale.set(1.275, 1.275, 1.275);
      }
      scene.add(atm);

      //Transparent background of renderer
      renderer.setClearColor(0x000000, 0);

      //Default camera position
      camera.position.set( 0, 0, 2 );

      //Camera position viewport
      if (window.innerWidth < 400) {
        camera.position.set( 0, 0, 3 );
      }
      controls.update();

      //Animation function
      const animate = () => {
        requestAnimationFrame( animate );
        if (window.innerWidth < 400) {
          controls.enablePan = false;
          controls.enableRotate = false
        }
        controls.enableZoom = false;
        controls.panSpeed = 0.25;
        controls.rotateSpeed = 0.25;
        controls.target.set( 0, 0, 0 )

        if (sphere) {
          sphere.rotation.y += 0.001
          sphere.rotation.z = 0.15
        }

        if (torus1) {
          torus1.rotation.z += 0.0075
          torus1.rotation.y = 1
          torus1.rotation.x = 1.75
        }

        if (torus2) {
          torus2.rotation.z += 0.015
          torus2.rotation.y = -0.5
          torus2.rotation.x = 5
        }

        if (torus3) {
          torus3.rotation.z += 0.02
          torus3.rotation.y = -1
          torus3.rotation.x = -5
        }

        if (torus4) {
          torus4.rotation.z += 0.005;
          torus4.rotation.y = -2
          torus4.rotation.x = -0.25
        }

        renderer.render( scene, camera );
      };

      animate();

      return () => cleanUpRef.current.removeChild(renderer.domElement);
    }
  });

  return (
    <div className={'world-container'}>
      <div ref={mountRef} style={{overflow: 'hidden'}} className={'world-container__world'}>

      </div>
    </div>
  )
}

export default World;
