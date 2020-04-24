#!/bin/sh

peerjs --port 9000 --key peerjs --path /peer --proxied 1 &
http-server /app/dist