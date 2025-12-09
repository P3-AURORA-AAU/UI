import {useEffect, useRef, useState} from "react";

// interfaces for message types
// TODO: actually make these lol
interface SensorData {
    temperature: number;
}

interface CameraData {
    image: string;
}

export interface PathData {
    grid: number[][];
    path: [number, number][];
    start: [number, number];
    destination: [number, number];
}

export interface MoveData {
    // "forward" | "backwards" | "left" | "right" | "forward_left" | "forward_right" | "backwards_left" | "backwards_right" | "none"
    direction: string;
}

export interface SpeedData {

}

export function useRoverWebSocket() {
    const [sensorData, setSensorData] = useState<SensorData | null>(null);
    const [pathData, setPathData] = useState<PathData>(null);
    const [cameraData, setCameraData] = useState<CameraData | null>(null);
    const [isConnected, setIsConnected] = useState(false);
    const ws = useRef<WebSocket | null>(null);

    useEffect(() => {
        // setup websocket connection
        ws.current = new WebSocket("ws://localhost:8000/ws"); // or whatever port we have it on
        console.log("Connecting to WebSocket server...");

        ws.current.onopen = () => {
            setIsConnected(true);
            console.log("Connected to WebSocket server"); // debug stuff waow
        };

        // handle messages
        ws.current.onmessage = (event) => {
            // Binary message (camera)
            if (event.data instanceof Blob) {
                const url = URL.createObjectURL(event.data);
                setCameraData({ image: url });
                return;
            }

            // JSON message (sensor/other)
            const message = JSON.parse(event.data);
            switch (message.type) {
                case 'sensor_data':
                    setSensorData(message.data);
                    break;
                case 'path_data':
                    setPathData(message.data);
                    break;
                default:
                    console.log("Grrr, unknown message type: ", message.type, " - ", message.data, "");
            }
        }


        // when it dies...
        ws.current.onclose = () => {
            setIsConnected(false);
            console.log("Disconnected from WebSocket server");
        }

        // cleanup
        return () => {
            ws.current?.close();
        }
    }, []);

    // helper function for sending commands
    function sendCommand(type: string, data: unknown) {
        console.log(`Sending command: ${JSON.stringify({type, data})}`);

        if (ws.current && isConnected) {
            ws.current.send(JSON.stringify({type, data}));
        }
    }

    // functions for making the rover do stuff
    // TODO: Make types for these
    const moveRover = (moveData: MoveData) => sendCommand("move_rover", moveData);
    const changeSpeed = (speed: string) => sendCommand("change_speed", {speed: speed});

    return { sensorData, cameraData, isConnected, pathData, moveRover, changeSpeed: changeSpeed };
}

