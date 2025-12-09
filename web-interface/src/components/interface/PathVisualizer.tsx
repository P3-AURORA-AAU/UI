import Window from "@/components/general/Window.tsx";
import {type RefObject, useEffect, useRef, useState} from "react";
import { Stage, Layer, Rect, Circle, Line } from "react-konva";
import type {TerminalRef} from "@/components/interface/Terminal.tsx";
import type {PathData} from "@/hooks/useRoverWebsockets.ts";

interface PathVisualizationProps {
    data: PathData | null;
    terminalRef: RefObject<TerminalRef>;
}

export default function PathVisualizer({data, terminalRef}: PathVisualizationProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [canvasSize, setCanvasSize] = useState({width: 200, height: 200});

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const { width, height } = container.getBoundingClientRect();
        setCanvasSize({ width, height });

        // watch for resize events using the cool resize observer thingy, and update size when it happens
        const resizeObserver = new ResizeObserver((entries) => {
            for (const entry of entries) {
                const { width, height } = entry.contentRect;
                setCanvasSize({ width, height });
                console.log("resized to " + width + "x" + height);
            }
        });

        resizeObserver.observe(container);
        return () => resizeObserver.disconnect();
    }, [data])

    if (!data) {
        return (
            <Window title={"PATH_FINDING"} className={""}>
                <div className={""}>
                    Guhhh no data
                </div>
            </Window>
        )
    }

    return (
        <Window title={"PATH_FINDING"} className={"gap-0"}>
            <div className={"flex-1 flex items-center justify-center h-full"} ref={containerRef}>
                {/* konva stage for the visual stuff */}
                <MapCanvas data={data} canvasSize={canvasSize} terminalRef={terminalRef}/>
            </div>
        </Window>
    )
}

interface MapCanvasProps {
    data: PathData | null;
    canvasSize: {width: number; height: number};
    terminalRef: RefObject<TerminalRef>;
}

function MapCanvas({data, canvasSize, terminalRef} : MapCanvasProps) {
    const [hoveredCell, setHoveredCell] = useState<string | null>(null);

    if (!data) return null;

    const {grid, path, start, destination} = data;
    const rows = grid.length;
    const cols = grid[0].length;
    const cellWidth = canvasSize.width / cols;
    const cellHeight = canvasSize.height / rows;

    // helper functions
    const getCellKey = (r: number, c: number) => `${r},${c}`;
    const setDestination = (x: number, y: number) => {
        terminalRef.current?.executeCommand(`destination ${x} ${y}`, false)
    }

    return (
        <Stage width={canvasSize.width} height={canvasSize.height}>
            <Layer>
                {/* grid - base cells */}
                {grid.flatMap((row, r) => (
                    row.map((val, c) => {
                        const key = getCellKey(r, c);

                        return (
                            <Rect
                                key={key}
                                x={c * cellWidth}
                                y={r * cellHeight}
                                width={cellWidth}
                                height={cellHeight}
                                fill={val ? getComputedStyle(document.documentElement).getPropertyValue('--muted-foreground')
                                    : getComputedStyle(document.documentElement).getPropertyValue('--background')
                                }
                                stroke={getComputedStyle(document.documentElement).getPropertyValue('--border')}
                                strokeWidth={1}
                                onMouseEnter={() => setHoveredCell(key)}
                                onMouseLeave={() => setHoveredCell(null)}
                                onClick={() => setDestination(c, r)}
                            />
                        )
                    })
                ))}

                {/*path line*/}
                <Line
                    points={path.flatMap(([r, c]) => [c * cellWidth + cellWidth / 2, r * cellHeight + cellHeight / 2])}
                    stroke={getComputedStyle(document.documentElement).getPropertyValue('--chart-5')}
                    strokeWidth={3}
                    lineCap="round"
                    lineJoin="round"
                />

                {/* start point */}
                <Circle
                    x={start[1] * cellWidth + cellWidth / 2}
                    y={start[0] * cellHeight + cellHeight / 2}
                    radius={8}
                    fill={getComputedStyle(document.documentElement).getPropertyValue('--primary')}
                    stroke={getComputedStyle(document.documentElement).getPropertyValue('--foreground')}
                    strokeWidth={2}
                />

                {/* destination point */}
                <Circle
                    x={destination[1] * cellWidth + cellWidth / 2}
                    y={destination[0] * cellHeight + cellHeight / 2}
                    radius={8}
                    fill={getComputedStyle(document.documentElement).getPropertyValue('--destructive')}
                    stroke={getComputedStyle(document.documentElement).getPropertyValue('--foreground')}
                />
            </Layer>

            {/*hover effect*/}
            <Layer>
                {hoveredCell && (() => {
                    const [c, r] = hoveredCell.split(',').map(Number);
                    return (
                        <Rect
                            x={r * cellWidth}
                            y={c * cellHeight}
                            width={cellWidth}
                            height={cellHeight}
                            fill="transparent"
                            stroke={getComputedStyle(document.documentElement).getPropertyValue('--primary')}
                            strokeWidth={2}
                            listening={false}
                        />
                    );
                })()}
            </Layer>
        </Stage>
    )
}