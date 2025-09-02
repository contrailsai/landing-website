"use client";

import React from "react";
import { useEffect, useRef, useState } from "react";
import { Color, Scene, Fog, PerspectiveCamera, Vector3 } from "three";
import { useThree, Canvas, extend } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import countries from "@/data/globe.json";
// import { ArcWithIcon } from "./ArcWithIcon";

// Replace static import with dynamic import to avoid SSR issues
// ThreeGlobe will be loaded only on client side

declare module "@react-three/fiber" {
    interface ThreeElements {
        threeGlobe: any; // Simplified type to avoid conflicts
    }
}

const RING_PROPAGATION_SPEED = 3;
const aspect = 1.2;
const cameraZ = 300;

type Position = {
    order: number;
    startLat: number;
    startLng: number;
    endLat: number;
    endLng: number;
    arcAlt: number;
    color: string;
    type: string;
};

export type GlobeConfig = {
    pointSize?: number;
    globeColor?: string;
    showAtmosphere?: boolean;
    atmosphereColor?: string;
    atmosphereAltitude?: number;
    emissive?: string;
    emissiveIntensity?: number;
    shininess?: number;
    polygonColor?: string;
    ambientLight?: string;
    directionalLeftLight?: string;
    directionalTopLight?: string;
    pointLight?: string;
    arcTime?: number;
    arcLength?: number;
    rings?: number;
    maxRings?: number;
    initialPosition?: {
        lat: number;
        lng: number;
    };
    autoRotate?: boolean;
    autoRotateSpeed?: number;
    opacity?: number; // Added for explicit opacity control
};

interface WorldProps {
    globeConfig: GlobeConfig;
    data: Position[];
}

// Sample data for content transfer and moderation
const sampleData = [
    {
        order: 1,
        startLat: 40.7128, //USA
        startLng: -74.0060,
        endLat: 51.5074, // UK
        endLng: -0.1278,
        arcAlt: 0.1,
        color: "#2530FF",
        type: "email",
    },
    {
        order: 2,
        startLat: 35.6762, // JAPAN
        startLng: 139.6503,
        endLat: 37.7749, // USA-2
        endLng: -122.4194,
        arcAlt: 0.1,
        color: "#2530FF",
        type: "document",
    },
    {
        order: 3,
        startLat: 19.0760, // INDIA
        startLng: 72.8777,
        endLat: 31.2304, // CHINA
        endLng: 121.4737,
        arcAlt: 0.1,
        color: "#2530FF",
        type: "media",
    },
    {
        order: 4,
        startLat: 55.7558, // FRANCE
        startLng: 37.6173,
        endLat: 48.8566, // POLAND
        endLng: 2.3522,
        arcAlt: 0.1,
        color: "#2530FF",
        type: "malicious",
    },
    {
        order: 5,
        startLat: 33.8688, // JAPAN
        startLng: 151.2093,
        endLat: 1.3521, // SINGAPORE
        endLng: 103.8198,
        arcAlt: 0.1,
        color: "#2530FF",
        type: "email",
    },

    {
        order: 6,
        startLat: 22.3193,  // CHINA
        startLng: 114.1694,
        endLat: 28.6139,  // INDIA
        endLng: 77.2090,
        arcAlt: 0.1,
        color: "#2530FF",
        type: "malicious"
    },
    {
        order: 7,
        startLat: 39.9042, // RUSSIA
        startLng: 116.4074,
        endLat: 35.6762, // JAPAN
        endLng: 139.6503,
        arcAlt: 0.1,
        color: "#2530FF",
        type: "malicious"
    },
    {
        order: 8,
        startLat: 48.8566,  // FRANCE
        startLng: 2.3522,
        endLat: 40.7128,  // USA
        endLng: -74.0060,
        arcAlt: 0.1,
        color: "#2530FF",
        type: "document"
    },
    {
        order: 9,
        startLat: 37.7749, // USA-2
        startLng: -122.4194,
        endLat: 51.5074, // UK
        endLng: -0.1278,
        arcAlt: 0.2,
        color: "#FF3025",
        type: "email"
    },
    {
        order: 10,
        startLat: 31.2304, // CHINA
        startLng: 121.4737,
        endLat: 33.8688,  // JAPAN
        endLng: 151.2093,
        arcAlt: 0.1,
        color: "#2530FF",
        type: "media"
    }
];

// We'll initialize and extend ThreeGlobe on the client side only
let ThreeGlobeClass: any = null;

export function Globe({ globeConfig, data }: WorldProps): React.ReactElement {
    const globeRef = useRef<any | null>(null);
    const [isInitialized, setIsInitialized] = useState(false);

    const defaultProps = {
        pointSize: 1,
        atmosphereColor: "#ffffff", // Default, overridden by globeConfig if provided
        showAtmosphere: true,
        atmosphereAltitude: 0.1,
        polygonColor: "rgba(2, 83, 228)",
        globeColor: "rgba(255,255,255,0.7)",
        emissive: "#0253E4",
        emissiveIntensity: 0.4,
        shininess: 30,
        arcTime: 2000,
        arcLength: 0.9,
        rings: 1,
        maxRings: 3,
        ...globeConfig,
    };

    // Load ThreeGlobe on the client side only
    useEffect(() => {
        if (typeof window !== 'undefined' ) {
            // Import ThreeGlobe dynamically
            import('three-globe').then(module => {
                ThreeGlobeClass = module.default;
                // Extend after import
                extend({ ThreeGlobe: ThreeGlobeClass });
                setIsInitialized(true);
            });
        }
        // Add this cleanup function
        return () => {
            if (globeRef.current) {
                console.log("GLOBE CLEANUP IN PROGRESS")
                // Dispose of the globe object
                globeRef.current.ringsData([]); // Clear any rings
                globeRef.current.arcsData([]); // Clear any arcs
                globeRef.current.pointsData([]); // Clear any points
                // Note: The ThreeGlobe object itself doesn't have a simple dispose method,
                // but clearing its data helps. The real cleanup is at the Canvas level.

                // This part is for clearing up the dynamic import reference
                // to allow re-initialization
                ThreeGlobeClass = null;
            }
        };
    }, []);

    useEffect(() => {
        if (!globeRef.current || !ThreeGlobeClass) return;

        // Configure globe material
        const globeMaterial = globeRef.current.globeMaterial() as any;
        globeMaterial.color = new Color("#ffffff");
        globeMaterial.transparent = true;
        globeMaterial.opacity = 0.7; // Set opacity to 0.7 as requested
        globeMaterial.emissive = new Color("#0253E4");
        globeMaterial.emissiveIntensity = 0.4;
        globeMaterial.shininess = 100;

        // Use an empty string instead of null for globeImageUrl
        // This removes the texture but avoids the error
        globeRef.current.globeImageUrl('');
    });

    useEffect(() => {
        if (!globeRef.current || !data || !isInitialized || !ThreeGlobeClass) return; // Ensure initialized

        const validCountries = countries && countries.features && Array.isArray(countries.features)
            ? countries.features
            : [];

        // Set up globe visualization
        globeRef.current
            .hexPolygonsData(validCountries)
            .hexPolygonResolution(3)
            .hexPolygonMargin(0.2)
            .showAtmosphere(defaultProps.showAtmosphere)
            .atmosphereColor(defaultProps.atmosphereColor)
            .atmosphereAltitude(defaultProps.atmosphereAltitude)
            .hexPolygonColor(() => "rgba(10, 83, 228, 1)"); // Landmasses remain blue

        globeRef.current
            .arcsData(data)
            .arcStartLat((d: Position) => d.startLat * 1)
            .arcStartLng((d: Position) => d.startLng * 1)
            .arcEndLat((d: Position) => d.endLat * 1)
            .arcEndLng((d: Position) => d.endLng * 1)
            .arcColor((e: Position) => e.color)
            .arcAltitude((e: Position) => e.arcAlt * 1)
            .arcStroke(() => [0.32, 0.28, 0.5][Math.round(Math.random() * 2)])
            .arcDashLength(defaultProps.arcLength)
            .arcDashInitialGap((e: Position) => e.order * 0.2)
            .arcDashGap(2)
            .arcDashAnimateTime(() => defaultProps.arcTime);

        let points = [];

        for (let i = 0; i < data.length; i++) {
            const arc = data[i];
            points.push({
                size: defaultProps.pointSize,
                order: arc.order,
                color: arc.color,
                lat: arc.startLat,
                lng: arc.startLng,
            });
            points.push({
                size: defaultProps.pointSize,
                order: arc.order,
                color: arc.color,
                lat: arc.endLat,
                lng: arc.endLng,
            });
        }

        const filteredPoints = points.filter(
            (v, i, a) =>
                a.findIndex((v2) => v2.lat === v.lat && v2.lng === v.lng) === i
        );

        globeRef.current
            .pointsData(filteredPoints)
            .pointColor((e: any) => e.color)
            .pointsMerge(true)
            .pointAltitude(0.01)
            .pointRadius(0.5);

        globeRef.current
            .ringsData([])
            .ringColor(() => defaultProps.polygonColor)
            .ringMaxRadius(defaultProps.maxRings)
            .ringPropagationSpeed(RING_PROPAGATION_SPEED)
            .ringRepeatPeriod(
                (defaultProps.arcTime * defaultProps.arcLength) / defaultProps.rings,
            );
    }, [isInitialized, data, defaultProps]); // Added defaultProps as a dependency object

    useEffect(() => {
        if (!globeRef.current || !data || data.length === 0 || !isInitialized) return; // Ensure initialized

        const interval = setInterval(() => {
            if (!globeRef.current) return;

            const newNumbersOfRings = genRandomNumbers(
                0,
                data.length,
                Math.floor((data.length * 1) / 5),
            );

            const ringsData = data
                .filter((d, i) => newNumbersOfRings.includes(i))
                .map((d) => ({
                    lat: d.startLat,
                    lng: d.startLng,
                    color: d.color,
                }));

            globeRef.current.ringsData(ringsData)
                .ringColor((ring: any) => ring.color || defaultProps.polygonColor)
                .ringMaxRadius(defaultProps.maxRings)
                .ringPropagationSpeed(RING_PROPAGATION_SPEED)
                .ringRepeatPeriod(
                    (defaultProps.arcTime * defaultProps.arcLength) / defaultProps.rings
                );
        }, 2000);

        return () => {
            clearInterval(interval);
        };
    }, [isInitialized, data]); // More specific dependencies

    return (
        <group>
            {isInitialized && ThreeGlobeClass && (
                <>
                    <primitive object={new ThreeGlobeClass()} ref={globeRef} />
                    {/* {data.map((arc, index) => (
                        <ArcWithIcon
                            key={index}
                            arcData={arc}
                            globeRef={globeRef}
                            arcDashAnimateTime={defaultProps.arcTime}
                            arcDashLength={defaultProps.arcLength}
                            arcDashInitialGap={0.2}
                            arcDashGap={0.8}
                            globeRadius={100}
                        />
                    ))} */}
                </>
            )}
        </group>
    );
}

export function WebGLRendererConfig() {
    const { gl, size } = useThree();

    useEffect(() => {
        gl.setPixelRatio(window.devicePixelRatio);
        gl.setSize(size.width, size.height);
        gl.setClearColor(0xffaaff, 0);
    }, []);

    return null;
}

export function World(props: WorldProps) {
    const { globeConfig } = props;

    return (
        <Canvas
            camera={{
                fov: 50,
                aspect: aspect,
                near: 180,
                far: 1800,
                position: [0, 0, cameraZ]
            }}
        >
            <WebGLRendererConfig />
            <ambientLight color={globeConfig.ambientLight} intensity={1} />
            {/* <directionalLight
                color={globeConfig.directionalLeftLight}
                position={new Vector3(-400, 100, 400)}
            /> */}
            {/* <directionalLight
                color={globeConfig.directionalTopLight}
                position={new Vector3(-200, 500, 200)}
            /> */}
            {/* <pointLight
                color={globeConfig.pointLight}
                position={new Vector3(-200, 500, 200)}
                intensity={0.8}
            /> */}
            <Globe {...props} />
            <OrbitControls
                enablePan={false}
                enableZoom={false}
                minDistance={cameraZ}
                maxDistance={cameraZ}
                autoRotateSpeed={props.globeConfig.autoRotateSpeed || 1}
                autoRotate={true}
                minPolarAngle={Math.PI / 3.5}
                maxPolarAngle={Math.PI - Math.PI / 3}
            />
        </Canvas>
    );
}

export function hexToRgb(hex: string) {
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function (m, r, g, b) {
        return r + r + g + g + b + b;
    });

    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
        ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16),
        }
        : null;
}

export function genRandomNumbers(min: number, max: number, count: number) {
    const arr = [];
    while (arr.length < count) {
        const r = Math.floor(Math.random() * (max - min)) + min;
        if (arr.indexOf(r) === -1) arr.push(r);
    }

    return arr;
}

export function ContentGlobe() {
    const globeConfig: GlobeConfig = {
        globeColor: "#ffffff",      // Target: White globe
        opacity: 0.7,               // Target: Translucent
        showAtmosphere: true,
        atmosphereColor: "#0253E4", // Blue atmosphere (as in image)
        atmosphereAltitude: 0.1,
        polygonColor: "rgba(2, 83, 228, 0.25)", // For hexes/rings
        emissive: "#ffffff",        // Target: White emissive glow for the globe itself
        emissiveIntensity: 0.4,     // Intensity of the white glow
        shininess: 0.9,              // A more standard shininess value
        arcTime: 5000,
        arcLength: 0.9,
        rings: 1,
        maxRings: 3,
        ambientLight: "#ffffff",    // Softer ambient light
        directionalLeftLight: "#ffffff",
        directionalTopLight: "#ffffff",
        pointLight: "#ffffff",
        autoRotate: true,
        autoRotateSpeed: 0.5,
    };

    return (
        <div className=" absolute top-0 -left-4/5 sm:-left-1/4 lg:left-1/4 2xl:left-1/3 scale-90 md:scale-110  ">
            <div className=" w-[1200px] h-[1000px] ">
                <World globeConfig={globeConfig} data={sampleData} />
            </div>
        </div>
    );
}