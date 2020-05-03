#!/bin/sh

peerjs --port 9000 --key peerjs --path / --proxied 1 &
http-server /app/dist
