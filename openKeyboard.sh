#!/bin/bash

if ! pgrep -f "matchbox-keyboard" > /dev/null; then
    DISPLAY=:0 matchbox-keyboard &
else
    echo "matchbox-keyboard is already running."
fi
