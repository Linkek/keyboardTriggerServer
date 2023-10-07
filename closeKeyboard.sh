#!/bin/bash

if pgrep -f "matchbox-keyboard" > /dev/null; then
    echo "pkill the matchbox-keyboard!"
    pkill matchbox-key
else
    echo "matchbox-keyboard is not running."
fi
