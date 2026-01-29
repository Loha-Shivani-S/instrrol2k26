import { Suspense, useState } from "react";
import { motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, ContactShadows, Html, PerspectiveCamera } from "@react-three/drei";
import { ArrowLeft, Box, Cpu, Thermometer, Gamepad2, RotateCcw, SlidersHorizontal, X } from "lucide-react";
import { Link } from "react-router-dom";
import { Microcontroller } from "@/components/smart-factory/Microcontroller";
import { TemperatureSensor } from "@/components/smart-factory/TemperatureSensor";
import { RoboticArm } from "@/components/smart-factory/RoboticArm";
import { Slider } from "@/components/ui/slider";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer";

// Loading component
function Loader() {
  return (
    <Html center>
      <div className="flex flex-col items-center gap-2">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        <span className="text-sm text-muted-foreground">Loading 3D Model...</span>
      </div>
    </Html>
  );
}

type ModelType = "mcu" | "sensor" | "robot";

interface ModelInfo {
  id: ModelType;
  name: string;
  icon: React.ReactNode;
  description: string;
  specs: { label: string; value: string }[];
}

const MODELS: ModelInfo[] = [
  {
    id: "mcu",
    name: "Microcontroller",
    icon: <Cpu className="w-5 h-5" />,
    description: "Arduino Mega 2560 microcontroller board for embedded systems and IoT applications",
    specs: [
      { label: "MCU", value: "ATmega2560" },
      { label: "Clock", value: "16 MHz" },
      { label: "Digital I/O", value: "54 pins" },
      { label: "Flash Memory", value: "256 KB" },
      { label: "Interface", value: "USB-B" },
    ],
  },
  {
    id: "sensor",
    name: "Temperature Sensor",
    icon: <Thermometer className="w-5 h-5" />,
    description: "RTD PT100 temperature sensor for precise temperature measurement in industrial processes",
    specs: [
      { label: "Type", value: "RTD PT100" },
      { label: "Range", value: "-200°C to 850°C" },
      { label: "Accuracy", value: "±0.1°C" },
      { label: "Response", value: "0.5s" },
      { label: "Output", value: "4-20mA" },
    ],
  },
  {
    id: "robot",
    name: "Robotic Arm",
    icon: <Box className="w-5 h-5" />,
    description: "6-axis industrial robot arm for precision pick-and-place and assembly operations",
    specs: [
      { label: "Model", value: "ARM-200" },
      { label: "Payload", value: "20 kg" },
      { label: "Reach", value: "1.8 m" },
      { label: "Repeatability", value: "±0.02 mm" },
      { label: "Axes", value: "6" },
    ],
  },
];

interface JointAngles {
  base: number;
  shoulder: number;
  elbow: number;
  wrist: number;
  gripper: number;
}

interface SensorState {
  temperature: number;
}

const DEFAULT_ANGLES: JointAngles = {
  base: 0,
  shoulder: -0.3,
  elbow: -0.5,
  wrist: 0,
  gripper: 0.5,
};

const DEFAULT_SENSOR: SensorState = {
  temperature: 25,
};

const SmartFactory = () => {
  const [selectedModel, setSelectedModel] = useState<ModelType>("robot");
  const [jointAngles, setJointAngles] = useState<JointAngles>(DEFAULT_ANGLES);
  const [sensorState, setSensorState] = useState<SensorState>(DEFAULT_SENSOR);
  const [ledStates, setLedStates] = useState<boolean[]>([true, false, true, false, true, true, false, true]);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const currentModel = MODELS.find(m => m.id === selectedModel)!;

  const updateJoint = (joint: keyof JointAngles, value: number) => {
    setJointAngles(prev => ({ ...prev, [joint]: value }));
  };

  const resetAngles = () => {
    setJointAngles(DEFAULT_ANGLES);
  };

  const ControlsContent = (
    <>
      {selectedModel === "robot" && (
        <>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display text-sm font-semibold text-primary">Joint Control</h3>
            <button
              onClick={resetAngles}
              className="p-1.5 rounded hover:bg-muted transition-colors"
              title="Reset to default"
            >
              <RotateCcw className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-muted-foreground">Base Rotation</span>
                <span className="text-primary font-mono">{(jointAngles.base * 57.3).toFixed(0)}°</span>
              </div>
              <Slider
                value={[jointAngles.base]}
                onValueChange={([v]) => updateJoint("base", v)}
                min={-Math.PI}
                max={Math.PI}
                step={0.01}
                className="cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-muted-foreground">Shoulder</span>
                <span className="text-primary font-mono">{(jointAngles.shoulder * 57.3).toFixed(0)}°</span>
              </div>
              <Slider
                value={[jointAngles.shoulder]}
                onValueChange={([v]) => updateJoint("shoulder", v)}
                min={-1.2}
                max={0.5}
                step={0.01}
                className="cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-muted-foreground">Elbow</span>
                <span className="text-primary font-mono">{(jointAngles.elbow * 57.3).toFixed(0)}°</span>
              </div>
              <Slider
                value={[jointAngles.elbow]}
                onValueChange={([v]) => updateJoint("elbow", v)}
                min={-1.5}
                max={0.5}
                step={0.01}
                className="cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-muted-foreground">Wrist</span>
                <span className="text-primary font-mono">{(jointAngles.wrist * 57.3).toFixed(0)}°</span>
              </div>
              <Slider
                value={[jointAngles.wrist]}
                onValueChange={([v]) => updateJoint("wrist", v)}
                min={-1}
                max={1}
                step={0.01}
                className="cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-muted-foreground">Gripper</span>
                <span className="text-primary font-mono">{jointAngles.gripper > 0.5 ? "Open" : "Closed"}</span>
              </div>
              <Slider
                value={[jointAngles.gripper]}
                onValueChange={([v]) => updateJoint("gripper", v)}
                min={0}
                max={1}
                step={0.01}
                className="cursor-pointer"
              />
            </div>
          </div>
        </>
      )}

      {selectedModel === "sensor" && (
        <>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display text-sm font-semibold text-primary">Temperature Control</h3>
            <button
              onClick={() => setSensorState(DEFAULT_SENSOR)}
              className="p-1.5 rounded hover:bg-muted transition-colors"
              title="Reset to default"
            >
              <RotateCcw className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-muted-foreground">Temperature</span>
                <span className="text-primary font-mono">{sensorState.temperature}°C</span>
              </div>
              <Slider
                value={[sensorState.temperature]}
                onValueChange={([v]) => setSensorState(prev => ({ ...prev, temperature: v }))}
                min={-20}
                max={100}
                step={1}
                className="cursor-pointer"
              />
            </div>
          </div>
        </>
      )}

      {selectedModel === "mcu" && (
        <>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display text-sm font-semibold text-primary">GPIO Control</h3>
            <button
              onClick={() => setLedStates([true, false, true, false, true, true, false, true])}
              className="p-1.5 rounded hover:bg-muted transition-colors"
              title="Reset to default"
            >
              <RotateCcw className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>

          <div className="space-y-3">
            <p className="text-xs text-muted-foreground">Toggle LEDs:</p>
            <div className="grid grid-cols-4 gap-2">
              {ledStates.map((on, i) => (
                <button
                  key={i}
                  onClick={() => {
                    const newStates = [...ledStates];
                    newStates[i] = !newStates[i];
                    setLedStates(newStates);
                  }}
                  className={`
                    w-10 h-10 rounded-lg text-xs font-mono font-bold transition-all
                    ${on
                      ? "bg-primary/20 text-primary border border-primary"
                      : "bg-muted/50 text-muted-foreground border border-border"
                    }
                  `}
                >
                  D{i}
                </button>
              ))}
            </div>
            <div className="flex gap-2 mt-4">
              <button
                onClick={() => setLedStates(ledStates.map(() => true))}
                className="flex-1 px-3 py-2 rounded-lg text-xs bg-primary/10 text-primary border border-primary/30 hover:bg-primary/20 transition-colors"
              >
                All ON
              </button>
              <button
                onClick={() => setLedStates(ledStates.map(() => false))}
                className="flex-1 px-3 py-2 rounded-lg text-xs bg-muted/50 text-muted-foreground border border-border hover:border-primary/30 transition-colors"
              >
                All OFF
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );

  const InfoContent = (
    <>
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center text-primary">
          {currentModel.icon}
        </div>
        <div>
          <h3 className="font-display text-lg font-bold">{currentModel.name}</h3>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-xs text-primary">Active</span>
          </div>
        </div>
      </div>

      <p className="text-muted-foreground text-xs mb-4">
        {currentModel.description}
      </p>

      <div className="space-y-1.5">
        {currentModel.specs.slice(0, 4).map((spec, i) => (
          <div key={i} className="flex justify-between text-xs">
            <span className="text-muted-foreground">{spec.label}</span>
            <span className="font-medium">{spec.value}</span>
          </div>
        ))}
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-background machinery-pattern">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 glass py-4">
        <div className="container mx-auto px-6 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors">
            <ArrowLeft size={20} />
            <span className="font-display tracking-wide">Back to Home</span>
          </Link>
          <h1 className="font-display text-xl font-bold tracking-wider hidden sm:block">
            <span className="text-gradient-gold">SMART FACTORY ENVIRONMENT</span>
          </h1>
          <Link
            to="/plc-game"
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 border border-primary/30 text-primary hover:bg-primary/20 transition-colors"
          >
            <Gamepad2 size={18} />
            <span className="font-display tracking-wide hidden sm:inline">Play PLC Game</span>
          </Link>
        </div>
      </header>

      {/* Full Screen 3D Viewer */}
      <div className="fixed inset-0 pt-16">
        <Canvas shadows>
          <Suspense fallback={<Loader />}>
            <PerspectiveCamera makeDefault position={[3, 2, 4]} fov={50} />

            {/* Lighting */}
            <ambientLight intensity={0.3} />
            <spotLight
              position={[5, 8, 5]}
              angle={0.3}
              penumbra={1}
              intensity={1.5}
              castShadow
              shadow-mapSize={2048}
            />
            <spotLight
              position={[-5, 5, -5]}
              angle={0.4}
              penumbra={1}
              intensity={0.5}
            />
            <pointLight position={[-3, 2, 3]} intensity={0.3} color="#0a84ff" />
            <pointLight position={[3, 2, -3]} intensity={0.2} color="#ff6b35" />

            {/* Models */}
            {selectedModel === "mcu" && <Microcontroller active={true} ledStates={ledStates} />}
            {selectedModel === "sensor" && <TemperatureSensor active={true} temperature={sensorState.temperature} />}
            {selectedModel === "robot" && (
              <RoboticArm
                baseRotation={jointAngles.base}
                shoulderAngle={jointAngles.shoulder}
                elbowAngle={jointAngles.elbow}
                wristAngle={jointAngles.wrist}
                gripperOpen={jointAngles.gripper}
              />
            )}

            {/* Ground */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
              <planeGeometry args={[20, 20]} />
              <meshStandardMaterial color="#0a0a12" metalness={0.5} roughness={0.8} />
            </mesh>

            {/* Grid on ground */}
            <gridHelper args={[20, 40, "#1a3a5a", "#0a1a2a"]} position={[0, 0.01, 0]} />

            <ContactShadows position={[0, 0, 0]} opacity={0.6} scale={10} blur={2} far={4} />
            <Environment preset="city" />
            <OrbitControls
              enablePan={true}
              minDistance={1.5}
              maxDistance={8}
              minPolarAngle={0.2}
              maxPolarAngle={Math.PI / 2 - 0.1}
              target={[0, selectedModel === "robot" ? 0.6 : 0.5, 0]}
            />
          </Suspense>
        </Canvas>
      </div>

      {/* Mobile: Drawer for Equipment + Controls + Details (keeps 3D view unobstructed) */}
      <div className="md:hidden">
        <Drawer open={mobileDrawerOpen} onOpenChange={setMobileDrawerOpen}>
          <DrawerTrigger asChild>
            <button
              className="fixed bottom-4 right-4 z-30 inline-flex items-center gap-2 rounded-full px-4 py-3 bg-primary text-primary-foreground shadow-lg"
              aria-label="Open controls"
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span className="text-sm font-medium">Controls</span>
            </button>
          </DrawerTrigger>

          <DrawerContent className="md:hidden">
            <div className="p-4 pt-2 max-h-[75vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h2 className="font-display text-lg font-bold text-foreground">Controls & Details</h2>
                  <p className="text-xs text-muted-foreground">Select equipment, then adjust controls.</p>
                </div>
                <DrawerClose asChild>
                  <button
                    className="p-2 rounded-lg border border-border bg-card text-foreground"
                    aria-label="Close"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </DrawerClose>
              </div>

              <div className="industrial-panel p-4 backdrop-blur-xl bg-card/90">
                <h3 className="font-display text-sm font-semibold mb-3 text-muted-foreground">Equipment</h3>
                <div className="flex gap-2">
                  {MODELS.map((model) => (
                    <button
                      key={model.id}
                      onClick={() => setSelectedModel(model.id)}
                      className={`
                        p-3 rounded-lg flex items-center justify-center transition-all
                        ${selectedModel === model.id
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted/50 border border-border hover:border-primary/50 text-muted-foreground hover:text-foreground"
                        }
                      `}
                      title={model.name}
                    >
                      {model.icon}
                    </button>
                  ))}
                </div>
              </div>

              <div className="industrial-panel p-4 backdrop-blur-xl bg-card/90 mt-3">
                {InfoContent}
              </div>

              <div className="industrial-panel p-4 backdrop-blur-xl bg-card/90 mt-3">
                {ControlsContent}
              </div>
            </div>
          </DrawerContent>
        </Drawer>
      </div>

      {/* Joint Controls - Left Side (only for robot) */}
      {selectedModel === "robot" && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="hidden md:block fixed left-6 top-24 z-20 w-56 max-h-[calc(100vh-180px)] overflow-y-auto"
        >
          <div className="industrial-panel p-4 backdrop-blur-xl bg-card/90">
            {ControlsContent}
          </div>
        </motion.div>
      )}

      {/* Sensor Controls - Left Side (only for sensor) */}
      {selectedModel === "sensor" && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="hidden md:block fixed left-6 top-24 z-20 w-56"
        >
          <div className="industrial-panel p-4 backdrop-blur-xl bg-card/90">
            {ControlsContent}
          </div>
        </motion.div>
      )}

      {/* MCU Controls - Left Side (only for mcu) */}
      {selectedModel === "mcu" && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="hidden md:block fixed left-6 top-24 z-20 w-56"
        >
          <div className="industrial-panel p-4 backdrop-blur-xl bg-card/90">
            {ControlsContent}
          </div>
        </motion.div>
      )}

      {/* Desktop Equipment Switcher */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="hidden md:block fixed bottom-6 left-6 z-20"
      >
        <div className="industrial-panel p-4 backdrop-blur-xl bg-card/90">
          <h3 className="font-display text-sm font-semibold mb-3 text-muted-foreground">Equipment</h3>
          <div className="flex gap-2">
            {MODELS.map((model) => (
              <button
                key={model.id}
                onClick={() => setSelectedModel(model.id)}
                className={`
                  p-3 rounded-lg flex items-center justify-center transition-all
                  ${selectedModel === model.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted/50 border border-border hover:border-primary/50 text-muted-foreground hover:text-foreground"
                  }
                `}
                title={model.name}
              >
                {model.icon}
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Info Panel - Bottom Right (desktop only) */}
      <motion.div
        key={selectedModel}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="hidden md:block fixed bottom-6 right-6 z-20 max-w-xs"
      >
        <div className="industrial-panel p-4 backdrop-blur-xl bg-card/90">
          {InfoContent}
        </div>
      </motion.div>

      {/* Instructions - Top Center */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="hidden md:block fixed top-24 left-1/2 -translate-x-1/2 z-20"
      >
        <div className="px-4 py-2 rounded-full bg-card/80 border border-border backdrop-blur-sm">
          <span className="text-xs text-muted-foreground">
            Drag to rotate • Scroll to zoom • Right-click to pan
          </span>
        </div>
      </motion.div>
    </div>
  );
};

export default SmartFactory;
