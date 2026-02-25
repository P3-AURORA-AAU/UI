import {useCallback, useEffect, useRef, useState} from "react";

// interfaces for message types
// TODO: actually make these lol
interface SensorData {
    temperature: number;
}

export interface RoverStatusData {
    human_detection: boolean;
    auto_driving: boolean;
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


export function useRoverWebSocket() {
    const [sensorData, setSensorData] = useState<SensorData | null>(null);
    const [pathData, setPathData] = useState<PathData>(null);
    const [cameraData, setCameraData] = useState<CameraData | null>(null);
    const [isConnected, setIsConnected] = useState(false);
    const [roverStatus, setRoverStatus] = useState<RoverStatusData>({human_detection: false, auto_driving: false});
    const ws = useRef<WebSocket | null>(null);
    const isConnectedRef = useRef(false);

    useEffect(() => {
        // setup websocket connection
        ws.current = new WebSocket("ws://10.42.7.36:8000/ws"); // or whatever port we have it on
        console.log("Connecting to WebSocket server...");

        ws.current.onopen = () => {
            setIsConnected(true);
            isConnectedRef.current = true;
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
                case 'rover_status_data':
                    setRoverStatus(message.data);
                    console.log("Rover Status Data:", message.data);
                    break;
                default:
                    console.log("Grrr, unknown message type: ", message.type, " - ", message.data, "");
            }
        }


        // when it dies...
        ws.current.onclose = () => {
            setIsConnected(false);
            isConnectedRef.current = false;
            console.log("Disconnected from WebSocket server");
        }

        // cleanup
        return () => {
            ws.current?.close();
        }
    }, []);

    // helper function for sending commands
    const sendCommand = useCallback((type: string, data: unknown) => {
        console.log(`Sending command: ${JSON.stringify({type, data})}`);

        if (ws.current && isConnectedRef.current) {
            ws.current.send(JSON.stringify({type, data}));
        }
    }, []);

    // functions for making the rover do stuff
    const moveRover = useCallback(
        (moveData: MoveData) => sendCommand("move_rover", moveData),
        [sendCommand]
    );
    const enableHumanDetection = useCallback((enable: boolean) => {
        setRoverStatus((prevState) => ({
            ...prevState,
            human_detection: enable
        }))
        sendCommand("enable_human_detection", {enable: enable});
    }, [sendCommand]);
    const enableAutonomousDriving = useCallback((enable: boolean) => {
        setRoverStatus((prevState) => ({
            ...prevState,
            auto_driving: enable
        }))
        sendCommand("enable_autonomous_driving", {enable: enable});
    }, [sendCommand]);

    return { sensorData, cameraData, isConnected, pathData, roverStatus, moveRover, enableHumanDetection, enableAutonomousDriving };
}
