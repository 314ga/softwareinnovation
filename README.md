# How to run project development

Assuming Node.js and Java JDK are present in your system
Firebase tools needs to be installed globally:

- npm install -g firebase-tools

### To start emulator in this project:

Run in project root:

- npm install
- **1st terminal:** firebase emulators:start --project demo-smart-charger-socket --import=./firebase-data --export-on-exit
- **2nd terminal:** npm start

# Application functionallity (tasks)

:heavy_check_mark: Access www.energidataservice.dk API for retrieving electricity consumption data

:heavy_check_mark: Graphs and visualization

:heavy_check_mark: Create electronic devices with their parameters and add them to Firestore DB

Parameters for device creation:

:black_small_square: Device name

:black_small_square: Urgent charging (set time when device needs to be fully charged)

:black_small_square: Battery size

:black_small_square: Charging time

:black_small_square: Last charged

:black_small_square: Current battery status

:heavy_check_mark: Create virtual socket

:heavy_check_mark: Start charging functionality

User chooses:

:black_small_square: Device from list of devices

:black_small_square: Time to be ready with charging

:black_small_square: Battery left

:black_small_square: Socket number

## Note

If Task is done :heavy_check_mark: icon is set if not :x: is set
