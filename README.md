# Food Picker Demo - Ionic / Angular Version
Creating my Food Picker Demo in Ionic/Angular
## Setup Ionic, Angular, Cordova and Native-run (Macbook)
    sudo npm i -g @ionic/cli
	sudo npm install -g @angular/cli
	sudo npm i -g cordova
	sudo npm i -g native-run

## Create new Angular Project
	ionic start
## Run project on browser
	ionic serve
## Generate new Page
	ionic g page detail
## Build and Run iOS Cordova
### Build
    ionic cordova build ios
### List all devices
	cordova run ios --list
### Run on Simulator
	ionic cordova emulate ios --target "iPhone-12-Pro-Max"