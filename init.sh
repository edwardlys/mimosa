#!/bin/sh

peerjs --port 9000 --key peerjs --path /chat --proxied 1 &
http-server /app/dist