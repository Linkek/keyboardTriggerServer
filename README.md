# Keyboard Trigger for FullPageOS

## Introduction

This project provides a solution for triggering the on-screen keyboard `matchbox-keyboard` on FullPageOS or other kiosk mode setups. Designed primarily for touch interfaces in a kiosk environment, it serves as a bridge between a Chrome extension and a local Node.js server. When an input element is interacted with in the Chrome browser, the Chrome extension communicates with the local server which, in turn, triggers the `matchbox-keyboard`.

## Installation

1. **Prerequisites**:
    - Install the necessary software:
      ```
      sudo apt install matchbox-keyboard nodejs npm
      ```

2. **Setup**:
    - Clone this repository:
      ```
      git clone https://github.com/Linkek/keyboardTriggerServer.git
      ```
    - Navigate into the repository directory:
      ```
      cd keyboardTriggerServer
      ```
    - Install the required npm packages:
      ```
      npm install
      ```

3. **Load the Chrome Extension**:
    - In FullPageOS, press `Ctrl` + `T` to open a new tab.
    - Navigate to `chrome://extensions/`.
    - Enable "Developer mode" using the toggle at the top right.
    - Click on "Load unpacked" and navigate to the cloned repository folder, then select it.
    - After successfully loading the extension, restart FullPageOS.

4. **Testing**:
    - For initial testing, run:
      ```
      node server.js
      ```

5. **Setting Up as a Service (recommended)**:
    To ensure the server runs on boot, set it up as a system service:

    - Create a service file:
      ```
      sudo nano /etc/systemd/system/keyboardTriggerServer.service
      ```

    - Add the following content:
      ```
      [Unit]
      Description=Keyboard Trigger Server for FullPageOS
      After=network.target

      [Service]
      ExecStart=/usr/bin/node /path/to/keyboardTriggerServer/server.js
      Restart=always
      User=pi
      Group=pi
      Environment=PATH=/usr/bin:/usr/local/bin
      Environment=NODE_ENV=production
      WorkingDirectory=/path/to/keyboardTriggerServer

      [Install]
      WantedBy=multi-user.target
      ```

      Ensure you replace `/path/to/keyboardTriggerServer` with the actual path to your repository.

    - Start the service and enable it to start on boot:
      ```
      sudo systemctl start keyboardTriggerServer
      sudo systemctl enable keyboardTriggerServer
      ```

---

For more information on customizability and additional features, consider checking out the [matchbox-keyboard repository](https://github.com/mwilliams03/matchbox-keyboard). For more details on FullPageOS, visit [their official site](https://github.com/guysoft/FullPageOS).

