

// interfaces for message types
// TODO: actually make these lol
import {useEffect, useRef, useState} from "react";

interface SensorData {
    temperature: number;
}

interface CameraData {
    image: string;
}

export function useRoverWebSocket() {
    const [sensorData, setSensorData] = useState<SensorData | null>(null);
    const [cameraData, setCameraData] = useState<CameraData | null>(null);
    const [isConnected, setIsConnected] = useState(false);
    const ws = useRef<WebSocket | null>(null);

    useEffect(() => {
        // setup websocket connection
        ws.current = new WebSocket("ws://localhost:8000/ws"); // or whatever port we have it on
        console.log("Connecting to WebSocket server...");

        ws.current.onopen = () => {
            setIsConnected(true);2
            console.log("Connected to WebSocket server"); // debug stuff waow
        };

        // handle messages
        ws.current.onmessage = (event) => {
            const message = JSON.parse(event.data);

            // route the stuff
            switch (message.type) {
                case 'sensor_data':
                    setSensorData(message.data);
                    break;
                case 'camera_data':
                    setCameraData(message.data);
                    break;
                default:
                    console.log("Grrr, unknown message type: ", message.type, " - ", message.data, "");
                    break;
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
    function sendCommand(type: string, data: Record<string, unknown>) {
        if (ws.current && isConnected) {
            ws.current.send(JSON.stringify({type, ...data}));
        }
    }

    // functions for making the rover do stuff
    // TODO: Make types for these
    const moveRover = (direction: string) => sendCommand("move_rover", {direction: direction});
    const changeSPeed = (speed: string) => sendCommand("change_speed", {speed: speed});

    return { sensorData, cameraData, isConnected, moveRover, changeSPeed };
}

