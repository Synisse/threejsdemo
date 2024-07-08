import * as THREE from 'three'
import React, {useRef, useState} from 'react';
import { Canvas, useFrame, ThreeElements, useLoader} from '@react-three/fiber'
import { Stats, OrbitControls } from '@react-three/drei'
import { TextureLoader } from 'three/src/loaders/TextureLoader'

export default function MyApp() {
  function Box(props: ThreeElements['mesh']) {
    const ref = useRef<THREE.Mesh>(null!)
    const [hovered, hover] = useState(false)
    const [clicked, click] = useState(false)
    useFrame((state, delta) => (ref.current.rotation.x += delta))
    return (
      <mesh
        {...props}
        castShadow
        ref={ref}
        scale={clicked ? 1.5 : 1}
        onClick={(event) => click(!clicked)}
        onPointerOver={(event) => hover(true)}
        onPointerOut={(event) => hover(false)}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />

      </mesh>
    )
  }

  function Plane() {
    const colorMap = useLoader(TextureLoader, './textures/grass.jpg')
    colorMap.wrapS = THREE.RepeatWrapping;
    colorMap.wrapT = THREE.RepeatWrapping;
    colorMap.repeat.set(10000, 10000);
    return (
      <mesh rotation-x={Math.PI / 2} position={[0, -1, 0]} receiveShadow>
        <planeGeometry args={[20000, 20000]}/>
        <meshLambertMaterial map={colorMap} side={THREE.DoubleSide} />
      </mesh>
    )
  }

  function StandingBox(aProps: ThreeElements['mesh']) {
    return (
      <mesh {...aProps} receiveShadow castShadow>
        <boxGeometry></boxGeometry>
        <meshStandardMaterial color={0x00ff00}/>
      </mesh>
    )
  }

  function FloatingBall(aProps: ThreeElements['mesh']) {
    return (
      <mesh {...aProps} receiveShadow castShadow>
        <sphereGeometry></sphereGeometry>
        <meshStandardMaterial color={0xff0000}/>
      </mesh>
    )
  }

  return (
    <Canvas shadows>
      <color attach="background" args={[0xcce0ff]} />
      <ambientLight intensity={Math.PI / 4} castShadow />
      <spotLight castShadow position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI/8} />
      <pointLight castShadow position={[-10, -10, -10]} decay={0} intensity={Math.PI/8} />
      <Box position={[-2, 0, 0]} />
      <StandingBox position={[0, -0.5, 0]}/>
      <FloatingBall position={[1, 1, 0.25]}  scale={0.5}/>
      <FloatingBall position={[0.25, 0.5, 0.25]}  scale={0.25}/>
      <FloatingBall position={[1.75, 1.75, 0.25]}  scale={0.25}/>
      <Plane />
      <OrbitControls />
      <Stats />
    </Canvas>
  );
}
