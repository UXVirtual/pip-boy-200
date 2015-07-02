# Pip-Boy 200

Pip-Boy app for Pebble. Has damage counter, death countdown, rad counter and skill / perk tracking.

## Developers

Modify `src/app.js`. This should be the only JS file you need to touch. A special fork of Pebble.js is loaded in as a
sub-module and is the only dependency.

Put your fonts and images in `resources/fonts` and `resources/images` folders respectively. Reference these paths as
`fonts/custom` and `images/custom` in your `appinfo.json` file.