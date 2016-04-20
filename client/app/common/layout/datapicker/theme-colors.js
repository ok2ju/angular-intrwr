import angular from 'angular';

let themeColorsModule = angular.module('mdThemeColors', [])
.config(($provide, $mdThemingProvider) => {
  "ngInject";
  
  var colorStore = {};

  //fetch the colors out of the themeing provider
  Object.keys($mdThemingProvider._PALETTES).forEach(
    // clone the pallete colors to the colorStore var
    function(palleteName) {
      var pallete = $mdThemingProvider._PALETTES[palleteName];
      var colors = [];
      colorStore[palleteName] = colors;
      Object.keys(pallete).forEach(function(colorName) {
        // use an regex to look for hex colors, ignore the rest
        if (/#[0-9A-Fa-f]{6}|0-9A-Fa-f]{8}\b/.exec(pallete[colorName])) {
          colors[colorName] = pallete[colorName];
        }
      });
    });

  $provide.factory('mdThemeColors', [
    function() {
      var service = {};

      var getColorFactory = function(intent) {
        return function() {
          var colors = $mdThemingProvider._THEMES['default'].colors[intent];
          var name = colors.name
            // Append the colors with links like hue-1, etc
          colorStore[name].default = colorStore[name][colors.hues['default']]
          colorStore[name].hue1 = colorStore[name][colors.hues['hue-1']]
          colorStore[name].hue2 = colorStore[name][colors.hues['hue-2']]
          colorStore[name].hue3 = colorStore[name][colors.hues['hue-3']]
          return colorStore[name];
        }
      }

      /**
       * Define the getter methods for accessing the colors
       */
      Object.defineProperty(service, 'primary', {
        get: getColorFactory('primary')
      });

      Object.defineProperty(service, 'accent', {
        get: getColorFactory('accent')
      });

      Object.defineProperty(service, 'warn', {
        get: getColorFactory('warn')
      });

      Object.defineProperty(service, 'background', {
        get: getColorFactory('background')
      });

      return service;
    }
  ]);
  
});

export default themeColorsModule;