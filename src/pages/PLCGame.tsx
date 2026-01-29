import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft, 
  Play, 
  RotateCcw, 
  Zap, 
  Power, 
  AlertTriangle, 
  CheckCircle2,
  XCircle,
  Lightbulb,
  Timer,
  Trophy,
  ChevronRight
} from "lucide-react";
import { Link } from "react-router-dom";

// Logic block types for ladder logic
type BlockType = "NO" | "NC" | "COIL" | "TIMER" | "COUNTER";

interface LogicBlock {
  id: string;
  type: BlockType;
  label: string;
  description: string;
}

interface PlacedBlock {
  id: string;
  block: LogicBlock;
  position: number;
}

interface Level {
  id: number;
  title: string;
  description: string;
  objective: string;
  targetOutput: boolean[];
  hints: string[];
  availableBlocks: LogicBlock[];
  requiredBlocks: number;
}

const BLOCK_PALETTE: LogicBlock[] = [
  { id: "NO", type: "NO", label: "NO", description: "Normally Open Contact - Passes signal when input is ON" },
  { id: "NC", type: "NC", label: "NC", description: "Normally Closed Contact - Passes signal when input is OFF" },
  { id: "COIL", type: "COIL", label: "COIL", description: "Output Coil - Activates when logic is complete" },
  { id: "TIMER", type: "TIMER", label: "TON", description: "Timer On-Delay - Delays signal by set time" },
];

const LEVELS: Level[] = [
  {
    id: 1,
    title: "Simple Start-Stop",
    description: "Create a basic motor control circuit",
    objective: "Connect a Start button (NO) to the Motor Coil to turn it ON",
    targetOutput: [true],
    hints: ["Drag the NO contact first", "Connect the COIL at the end"],
    availableBlocks: [BLOCK_PALETTE[0], BLOCK_PALETTE[2]],
    requiredBlocks: 2,
  },
  {
    id: 2,
    title: "Safety Interlock",
    description: "Add a safety switch to the motor circuit",
    objective: "Motor runs only when Start is pressed AND Safety switch is engaged",
    targetOutput: [true, true],
    hints: ["Use two NO contacts in series", "Both must be ON for output"],
    availableBlocks: [BLOCK_PALETTE[0], BLOCK_PALETTE[0], BLOCK_PALETTE[2]],
    requiredBlocks: 3,
  },
  {
    id: 3,
    title: "Emergency Stop",
    description: "Implement an emergency stop function",
    objective: "Motor runs when Start is ON, but stops immediately when E-Stop is pressed",
    targetOutput: [true, false],
    hints: ["NC contact breaks the circuit when activated", "E-Stop should use NC contact"],
    availableBlocks: [BLOCK_PALETTE[0], BLOCK_PALETTE[1], BLOCK_PALETTE[2]],
    requiredBlocks: 3,
  },
  {
    id: 4,
    title: "Dual Input Control",
    description: "Create a two-handed safety control system",
    objective: "Motor runs only when BOTH buttons are pressed simultaneously (safety feature)",
    targetOutput: [true, true],
    hints: ["Both hands must be on buttons for safety", "Use two NO contacts in series"],
    availableBlocks: [BLOCK_PALETTE[0], BLOCK_PALETTE[0], BLOCK_PALETTE[2]],
    requiredBlocks: 3,
  },
  {
    id: 5,
    title: "Conveyor Jam Detection",
    description: "Stop conveyor when jam is detected",
    objective: "Conveyor runs normally but stops when jam sensor (NC) is triggered",
    targetOutput: [true, false],
    hints: ["NC contact opens when jam is detected", "Think about fail-safe design"],
    availableBlocks: [BLOCK_PALETTE[0], BLOCK_PALETTE[1], BLOCK_PALETTE[2]],
    requiredBlocks: 3,
  },
  {
    id: 6,
    title: "Guard Door Interlock",
    description: "Implement machine guard safety interlock",
    objective: "Machine runs only when Start is ON AND Guard Door is closed (NC opens when door opens)",
    targetOutput: [true, true],
    hints: ["Guard door uses NC - closed door = signal passes", "Consider what happens when door opens"],
    availableBlocks: [BLOCK_PALETTE[0], BLOCK_PALETTE[1], BLOCK_PALETTE[2]],
    requiredBlocks: 3,
  },
  {
    id: 7,
    title: "Multi-Stage Startup",
    description: "Create a 3-stage startup sequence",
    objective: "All three stages must be enabled for the system to start",
    targetOutput: [true, true, true],
    hints: ["Series connection of multiple contacts", "All conditions must be true"],
    availableBlocks: [BLOCK_PALETTE[0], BLOCK_PALETTE[0], BLOCK_PALETTE[0], BLOCK_PALETTE[2]],
    requiredBlocks: 4,
  },
  {
    id: 8,
    title: "Override with Safety",
    description: "Normal operation with safety override",
    objective: "System runs when Start is ON, NC safety is engaged, but includes manual override",
    targetOutput: [true, true],
    hints: ["Combine NO and NC contacts", "Think about what each contact does"],
    availableBlocks: [BLOCK_PALETTE[0], BLOCK_PALETTE[1], BLOCK_PALETTE[0], BLOCK_PALETTE[2]],
    requiredBlocks: 4,
  },
];

const BlockIcon = ({ type }: { type: BlockType }) => {
  switch (type) {
    case "NO":
      return (
        <div className="w-full h-full flex items-center justify-center">
          <div className="relative w-8 h-4">
            <div className="absolute top-1/2 left-0 w-2 h-0.5 bg-current -translate-y-1/2" />
            <div className="absolute top-1/2 right-0 w-2 h-0.5 bg-current -translate-y-1/2" />
            <div className="absolute top-0 left-2 w-0.5 h-full bg-current transform rotate-45 origin-bottom" />
          </div>
        </div>
      );
    case "NC":
      return (
        <div className="w-full h-full flex items-center justify-center">
          <div className="relative w-8 h-4">
            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-current -translate-y-1/2" />
            <div className="absolute top-1/2 left-1/2 w-0.5 h-3 bg-current -translate-x-1/2 -translate-y-1/2" />
          </div>
        </div>
      );
    case "COIL":
      return (
        <div className="w-full h-full flex items-center justify-center">
          <div className="w-6 h-6 rounded-full border-2 border-current flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-current" />
          </div>
        </div>
      );
    case "TIMER":
      return <Timer className="w-5 h-5" />;
    default:
      return <Zap className="w-5 h-5" />;
  }
};

const PLCGame = () => {
  const [currentLevel, setCurrentLevel] = useState(0);
  const [placedBlocks, setPlacedBlocks] = useState<PlacedBlock[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [inputStates, setInputStates] = useState<boolean[]>([true, true]);
  const [outputState, setOutputState] = useState(false);
  const [score, setScore] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [gameComplete, setGameComplete] = useState(false);
  const [draggedBlock, setDraggedBlock] = useState<LogicBlock | null>(null);

  const level = LEVELS[currentLevel];

  const evaluateLogic = useCallback(() => {
    if (placedBlocks.length === 0) return false;
    
    let signal = true;
    const sortedBlocks = [...placedBlocks].sort((a, b) => a.position - b.position);
    
    sortedBlocks.forEach((placed, index) => {
      if (placed.block.type === "NO") {
        signal = signal && inputStates[Math.min(index, inputStates.length - 1)];
      } else if (placed.block.type === "NC") {
        signal = signal && !inputStates[Math.min(index, inputStates.length - 1)];
      }
    });
    
    return signal;
  }, [placedBlocks, inputStates]);

  const runSimulation = () => {
    setIsRunning(true);
    const result = evaluateLogic();
    setOutputState(result);
    
    // Check if level is complete
    setTimeout(() => {
      const expectedOutput = level.targetOutput.every((expected, i) => {
        const testInputs = [...inputStates];
        if (i < testInputs.length) testInputs[i] = true;
        return evaluateLogic() === expected;
      });
      
      if (result && placedBlocks.length >= level.requiredBlocks) {
        setScore(prev => prev + 100);
        if (currentLevel < LEVELS.length - 1) {
          setTimeout(() => {
            setCurrentLevel(prev => prev + 1);
            resetLevel();
          }, 1500);
        } else {
          setGameComplete(true);
        }
      }
      setIsRunning(false);
    }, 1000);
  };

  const resetLevel = () => {
    setPlacedBlocks([]);
    setOutputState(false);
    setIsRunning(false);
    setShowHint(false);
    setInputStates([true, true]);
  };

  const handleDragStart = (block: LogicBlock) => {
    setDraggedBlock(block);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (position: number) => {
    if (draggedBlock && placedBlocks.length < level.requiredBlocks) {
      setPlacedBlocks(prev => [
        ...prev,
        { id: `${draggedBlock.id}-${Date.now()}`, block: draggedBlock, position }
      ]);
    }
    setDraggedBlock(null);
  };

  const removeBlock = (id: string) => {
    setPlacedBlocks(prev => prev.filter(b => b.id !== id));
    setOutputState(false);
  };

  const toggleInput = (index: number) => {
    if (!isRunning) {
      setInputStates(prev => {
        const newStates = [...prev];
        newStates[index] = !newStates[index];
        return newStates;
      });
    }
  };

  return (
    <div className="min-h-screen bg-background machinery-pattern">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 glass py-4">
        <div className="container mx-auto px-6 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors">
            <ArrowLeft size={20} />
            <span className="font-display tracking-wide">Back to Home</span>
          </Link>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-card border border-primary/20">
              <Trophy className="w-5 h-5 text-accent" />
              <span className="font-display font-bold text-lg">{score}</span>
            </div>
          </div>
        </div>
      </header>

      <main className="pt-24 pb-16 px-6">
        <div className="container mx-auto max-w-6xl">
          {/* Game Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-2 tracking-wider">
              <span className="text-gradient-gold">PLC</span> Logic Challenge
            </h1>
            <p className="text-muted-foreground font-body">
              Master ladder logic programming in this interactive puzzle game
            </p>
          </motion.div>

          <AnimatePresence mode="wait">
            {gameComplete ? (
              <motion.div
                key="complete"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-16"
              >
                <Trophy className="w-24 h-24 text-accent mx-auto mb-6" />
                <h2 className="font-display text-3xl font-bold mb-4 text-glow">
                  Congratulations!
                </h2>
                <p className="text-xl text-muted-foreground mb-8">
                  You've completed all levels with a score of {score}!
                </p>
                <button
                  onClick={() => {
                    setCurrentLevel(0);
                    setScore(0);
                    setGameComplete(false);
                    resetLevel();
                  }}
                  className="btn-hero-primary"
                >
                  Play Again
                </button>
              </motion.div>
            ) : (
              <motion.div
                key={`level-${currentLevel}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                {/* Level Info */}
                <div className="industrial-panel mb-8">
                  <div className="flex items-start justify-between flex-wrap gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-3 py-1 rounded-full bg-primary/20 text-primary text-sm font-medium">
                          Level {level.id}
                        </span>
                        <h2 className="font-display text-2xl font-bold">{level.title}</h2>
                      </div>
                      <p className="text-muted-foreground mb-2">{level.description}</p>
                      <p className="text-sm text-accent font-medium">
                        <Lightbulb className="w-4 h-4 inline mr-1" />
                        Objective: {level.objective}
                      </p>
                    </div>
                    <button
                      onClick={() => setShowHint(!showHint)}
                      className="px-4 py-2 rounded-lg border border-accent/30 text-accent hover:bg-accent/10 transition-colors text-sm"
                    >
                      {showHint ? "Hide Hint" : "Show Hint"}
                    </button>
                  </div>
                  
                  <AnimatePresence>
                    {showHint && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-4 p-4 rounded-lg bg-accent/10 border border-accent/30"
                      >
                        <ul className="space-y-1">
                          {level.hints.map((hint, i) => (
                            <li key={i} className="text-sm text-accent flex items-center gap-2">
                              <ChevronRight className="w-4 h-4" />
                              {hint}
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Block Palette */}
                  <div className="industrial-panel">
                    <h3 className="font-display text-lg font-semibold mb-4 flex items-center gap-2">
                      <Zap className="w-5 h-5 text-primary" />
                      Logic Blocks
                    </h3>
                    <div className="space-y-3">
                      {level.availableBlocks.map((block, idx) => (
                        <motion.div
                          key={`${block.id}-${idx}`}
                          draggable
                          onDragStart={() => handleDragStart(block)}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="p-4 rounded-lg bg-secondary border border-border cursor-grab active:cursor-grabbing hover:border-primary/50 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                              <BlockIcon type={block.type} />
                            </div>
                            <div>
                              <span className="font-display font-semibold">{block.label}</span>
                              <p className="text-xs text-muted-foreground mt-0.5">
                                {block.description}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Ladder Logic Canvas */}
                  <div className="lg:col-span-2 industrial-panel">
                    <h3 className="font-display text-lg font-semibold mb-4 flex items-center gap-2">
                      <Power className="w-5 h-5 text-primary" />
                      Ladder Logic Diagram
                    </h3>

                    {/* Power Rails */}
                    <div className="relative bg-muted/50 rounded-lg p-6 min-h-[200px]">
                      {/* Left Power Rail */}
                      <div className="absolute left-4 top-0 bottom-0 w-1 bg-primary rounded-full" />
                      
                      {/* Right Power Rail */}
                      <div className="absolute right-4 top-0 bottom-0 w-1 bg-primary rounded-full" />

                      {/* Drop Zones */}
                      <div className="flex items-center justify-center gap-4 py-8 px-12">
                        {Array.from({ length: level.requiredBlocks }).map((_, idx) => {
                          const placed = placedBlocks.find(b => b.position === idx);
                          return (
                            <div key={idx} className="flex items-center">
                              {idx > 0 && (
                                <div className="w-8 h-0.5 bg-primary/50" />
                              )}
                              <div
                                onDragOver={handleDragOver}
                                onDrop={() => handleDrop(idx)}
                                className={`
                                  w-20 h-20 rounded-lg border-2 border-dashed flex items-center justify-center
                                  transition-all duration-200
                                  ${placed ? "border-primary bg-primary/10" : "border-border hover:border-primary/50"}
                                  ${draggedBlock && !placed ? "border-primary/50 bg-primary/5" : ""}
                                `}
                              >
                                {placed ? (
                                  <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="w-full h-full p-2 flex flex-col items-center justify-center cursor-pointer"
                                    onClick={() => removeBlock(placed.id)}
                                  >
                                    <div className="w-10 h-10 rounded bg-primary/20 text-primary flex items-center justify-center mb-1">
                                      <BlockIcon type={placed.block.type} />
                                    </div>
                                    <span className="text-xs font-medium">{placed.block.label}</span>
                                  </motion.div>
                                ) : (
                                  <span className="text-xs text-muted-foreground">Drop here</span>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {/* Connection Line */}
                      {placedBlocks.length > 0 && (
                        <div className="absolute top-1/2 left-5 right-5 h-0.5 bg-primary/30 -translate-y-1/2 -z-10" />
                      )}
                    </div>

                    {/* Input Controls */}
                    <div className="mt-6 flex items-center gap-4">
                      <span className="text-sm font-medium">Inputs:</span>
                      {inputStates.slice(0, level.requiredBlocks - 1).map((state, idx) => (
                        <button
                          key={idx}
                          onClick={() => toggleInput(idx)}
                          disabled={isRunning}
                          className={`
                            px-4 py-2 rounded-lg border font-medium text-sm transition-all
                            ${state 
                              ? "bg-primary/20 border-primary text-primary" 
                              : "bg-muted border-border text-muted-foreground"
                            }
                            ${isRunning ? "opacity-50 cursor-not-allowed" : "hover:border-primary/50"}
                          `}
                        >
                          Input {idx + 1}: {state ? "ON" : "OFF"}
                        </button>
                      ))}
                    </div>

                    {/* Output Display */}
                    <div className="mt-6 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <span className="text-sm font-medium">Output:</span>
                        <div className={`
                          px-6 py-3 rounded-lg border-2 font-display font-bold flex items-center gap-2
                          ${outputState 
                            ? "bg-primary/20 border-primary text-primary" 
                            : "bg-muted border-border text-muted-foreground"
                          }
                        `}>
                          {outputState ? (
                            <>
                              <CheckCircle2 className="w-5 h-5" />
                              MOTOR ON
                            </>
                          ) : (
                            <>
                              <XCircle className="w-5 h-5" />
                              MOTOR OFF
                            </>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <button
                          onClick={resetLevel}
                          disabled={isRunning}
                          className="px-4 py-2 rounded-lg border border-border text-muted-foreground hover:text-foreground hover:border-primary/50 transition-colors flex items-center gap-2"
                        >
                          <RotateCcw className="w-4 h-4" />
                          Reset
                        </button>
                        <button
                          onClick={runSimulation}
                          disabled={isRunning || placedBlocks.length < level.requiredBlocks}
                          className={`
                            px-6 py-2 rounded-lg font-semibold flex items-center gap-2 transition-all
                            ${placedBlocks.length >= level.requiredBlocks && !isRunning
                              ? "bg-primary text-primary-foreground hover:shadow-lg"
                              : "bg-muted text-muted-foreground cursor-not-allowed"
                            }
                          `}
                        >
                          <Play className="w-4 h-4" />
                          {isRunning ? "Running..." : "Run"}
                        </button>
                      </div>
                    </div>

                    {/* Success/Failure Message */}
                    <AnimatePresence>
                      {isRunning && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          className={`
                            mt-4 p-4 rounded-lg flex items-center gap-3
                            ${outputState 
                              ? "bg-primary/10 border border-primary/30 text-primary" 
                              : "bg-accent/10 border border-accent/30 text-accent"
                            }
                          `}
                        >
                          {outputState ? (
                            <>
                              <CheckCircle2 className="w-6 h-6" />
                              <span className="font-medium">Logic correct! Moving to next level...</span>
                            </>
                          ) : (
                            <>
                              <AlertTriangle className="w-6 h-6" />
                              <span className="font-medium">Logic incomplete. Check your connections.</span>
                            </>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

export default PLCGame;
