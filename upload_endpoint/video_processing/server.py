#!/usr/bin/env python3

import os
import signal
import asyncio
import json
import secrets
import websockets
from detection import detection

JOIN = {}
uploadedPath = "/video_processing/videos/uploaded/"
processedPath = "/video_processing/videos/processed/"
codeType = "DICT_4X4_50"


# Send an error message
async def error(websocket, message):
    event = {
        "type": "error",
        "message": message,
    }
    await websocket.send(json.dumps(event))


# Receive and process command from Dasboard and Controller
async def receive_command(websocket, connected):
    async for message in websocket:
        command = json.loads(message)
        print(command)
        if command["type"] == "upload":
            if "video" in command:
                name = command["video"]["fullTitle"]
                output = detection(uploadedPath, processedPath, name, codeType)
                if output != name:
                    event = {
                        "type": "processed",
                        "output": output,
                        "uploaded": name,
                        "video": command["video"]
                    }
                    websockets.broadcast(connected, json.dumps(event))
                else:
                    error(websocket, "Failed to process video")


# Handle a connection from the upload endpt
async def start(websocket):
    print("Upload endpoint connect")

    connected = {websocket}
    key = secrets.token_urlsafe(12)
    JOIN[key] = connected

    try:
        await receive_command(websocket, connected)
    finally:
        del JOIN[key]
        return


# Handle a connection initial connection
async def handler(websocket):
    # Receive and parse the "init" event from the upload endpt
    message = await websocket.recv()
    event = json.loads(message)
    assert event["type"] == "init"
    await start(websocket)


async def main():
    # Set the stop condition when receiving SIGTERM.
    loop = asyncio.get_running_loop()
    stop = loop.create_future()
    loop.add_signal_handler(signal.SIGTERM, stop.set_result, None)

    port = int(os.environ.get("PORT", "10801"))
    async with websockets.serve(handler, "", port):
        await stop


if __name__ == "__main__":
    print("Server started!")
    asyncio.run(main())
    print("Server stopped!")
