# maps_app_stantech

This React Native project integrates a Maps API, displaying a dynamic map centered at specified coordinates, featuring directional arrows for user navigation. It retrieves the user's location every 10 minutes. In addition, the application checks battery saver mode using a Java file, importing and displaying the status on the UI through an informative card component.

## Base dependencies

- [react-native-maps](https://www.npmjs.com/package/react-native-maps)
- [react-native-geolocation-service](https://www.npmjs.com/package/react-native-geolocation-service)
- Google Maps Api
- Direction Api
- Updated google play services

## Folder structure

- `src`: This folder is the main container of all the code inside the application.
   - `component_name` : This folder contains all the files of components of the application.
     - `index.js` : This is the main file where all the code the component lies.
- `App.js`: Main component that starts your whole app.
- `index.js`: Entry point of your application as per React-Native standards.

## Instructions to run

- Get your google maps api key from google console. Follow these [instruction](https://github.com/react-native-maps/react-native-maps/blob/HEAD/docs/installation.md) to get google maps api key and to enable Direction api.
- Place google api key in AndroidManifest.xml and in src/maps/index.js under GOOGLE_MAPS_API variable.


![](https://github.com/rohit2610/maps_app_stantech/assets/33067209/a0ae3d52-957d-4ce8-9a30-9d33530f26a3)

