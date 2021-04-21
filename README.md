# Food Picker Demo - Ionic / Angular Version
Creating my Food Picker Demo in Ionic/Angular

## Setup and Run App with Cordova in browser (FoodPicker not persistent. Cordova pluggins are intended to interact with Native Device API)
	ionic cordova platform add browser
	ionic cordova run browser

## Build and Run iOS Simulator using Cordova (FoodPicker Persistent)
### Build
    ionic cordova build ios
### List all devices
	cordova run ios --list
### Run on Simulator on iPhone 12 Pro Max
	ionic cordova emulate ios --target="012A4879-205F-43BE-9811-1AEB3A364F46"


## Setup Ionic, Angular, Cordova and Native-run (Macbook)
    sudo npm i -g @ionic/cli
	sudo npm install -g @angular/cli
	sudo npm i -g cordova
	sudo npm i -g native-run

## Create new Ionic Project
	ionic start

## Run project on browser
	ionic serve

## Generate new Page
	ionic g page detail

## Installs and plugins for storage
	npm install @ionic-native/sqlite @ionic-native/core @ionic-native/sqlite-porter

	ionic cordova plugin add cordova-sqlite-storage

	ionic cordova plugin add uk.co.workingedge.cordova.plugin.sqliteporter
## Create CRUD serivce class and service for db
	ng g class services/food

	ng g service services/db
