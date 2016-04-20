function jMdDatepicker($timeout, $filter, $mdDialog, $compile, mdThemeColors, $mdMedia, JDatePickerCount) {
  return {
    restrict: 'E',
    replace: false,
    require: 'ngModel',
    scope: {
      ngModel: '=',
      ngDisabled: '=',
      placeholder: '@',
      orientation: '@'
    },
    template: '<input class="dpicker-input" type="text" ng-attr-id="jmddpcomp-{{serial}}" ng-model="SelectedDateText" ng-click="PopupDialogComponent($event, SelectedDate)" />',
    link: function($scope, $element, $attr, $ctrl) {
      function formatter(value) {
        if (value) {
          return value;
        }
      }

      function parser(value) {
        if (value && angular.isDate(value)) return value;
        else return undefined;
      }

      // Check to see if this is the first instance of the date picker on this page. If it is, we must inject appropriate styling templating to the HEAD element. If it isn't, skip this part.
      if (JDatePickerCount.GetCount() === 0) {
        // Grab a handle to the HEAD element
        var head = angular.element(document.querySelector('HEAD'));

        var style = angular.element('<style></style>');

        // Add the styling code now...
        var styleText = 'div.monthpanel .md-button.jmd-fab:hover {\
background-color : {{mdThemeColors.primary[\'400\']}} !important;\
color: #fff !important;\
}\
div.monthpanel .md-button.jmd-fab.selected {\
background-color : {{mdThemeColors.primary[\'500\']}} !important;\
color: #fff !important;\
}\
div.displaypanel div.titleheader {\
background-color : {{mdThemeColors.primary[\'700\']}};\
}\
div.displaypanel {\
background-color: {{mdThemeColors.primary[\'500\']}};\
}\
div.selectionpanel div.titleheader .md-button.navbutton div.leftarrow {\
border-right-color: {{mdThemeColors.primary[\'500\']}};\
}\
div.selectionpanel div.titleheader .md-button.navbutton div.rightarrow {\
border-left-color: {{mdThemeColors.primary[\'500\']}};\
}\
div.monthpanel .md-button.jmd-fab.today {\
color: {{mdThemeColors.primary[\'500\']}};\
}\
div.actionpanel .md-button {\
color: {{mdThemeColors.primary[\'500\']}};\
}\
md-dialog.portrait {\
	width: 328px;\
}\
div.masterpicker {\
	box-sizing: border-box;\
}\
div.masterpicker.landscape {\
	height: 19rem;\
	width: 32rem;\
}\
div.masterpicker.portrait {\
	\
}\
.landscape div.displaypanel {\
  width: 10.5rem;\
  height: 19rem;\
  min-height: 19rem;\
  position: relative;\
  text-align: left;\
  float: left;\
  padding-top: 1rem;\
  padding-left: 1rem;\
  padding-right: 3rem;\
  box-sizing: border-box;\
}\
.portrait div.displaypanel {\
	\
	padding-top: 19px;\
	padding-left: 1.5rem;\
}\
div.displaypanel div.yearlabel {\
	color: rgba(255,255,255,0.8);\
	font-weight: normal;\
}\
.landscape div.displaypanel div.yearlabel {\
	font-size: 1rem;\
	margin-bottom: 4px;\
}\
.portrait div.displaypanel div.yearlabel {\
	font-size: 14px;\
	margin-bottom: 6px;\
}\
div.displaypanel div.datelabel {\
	font-weight: 500;\
	font-size: 24px;\
	color: white;\
	letter-spacing: 1px;\
}\
.landscape div.displaypanel div.datelabel {\
	margin-left: -1px;\
}\
div.selectionpanel {\
	position: relative;\
  text-align: center;\
  box-sizing: border-box;\
  line-height: 1.5rem;\
  overflow-y: hidden;\
  font-size: 1.2rem;\
}\
.landscape div.selectionpanel {\
  width: 21.5rem;\
  height: 19rem;\
  min-height: 19rem;\
  padding: 0 0.2rem 0 0.7rem;\
}\
.portrait div.selectionpanel {\
  \
  padding: 0 0.2rem 0 0.6rem;\
}\
div.selectionpanel div.titleheader {\
  line-height: 55px;\
  text-align: left;\
  font-size: 1.2rem;\
  box-sizing: border-box;\
  font-weight: 500;\
  overflow-y: hidden;\
}\
.landscape div.selectionpanel div.titleheader {\
  max-height: 2.9rem;\
  width: 20.1rem;\
}\
.portrait div.selectionpanel div.titleheader {\
  max-height: 5.6rem;\
  height: 5.6rem;\
  margin-left: -0.2rem;\
}\
div.selectionpanel div.titleheader .md-button.navbutton {\
  float: left;\
  min-width: 0;\
  height: 2.3rem;\
  fill: rgba(0,0,0,0.6);\
}\
.landscape div.selectionpanel div.titleheader .md-button.navbutton {\
  padding: 2px 1px;\
}\
.portrait div.selectionpanel div.titleheader .md-button.navbutton {\
  padding: 6px 3px 0 3px;\
  margin-top: 7px;\
}\
div.selectionpanel div.titleheader .md-button.navbutton.right {\
  float: right;\
}\
div.selectionpanel div.titleheader span.monthyear {\
	position: relative;\
	cursor: pointer;\
	font-weight: 700;\
}\
.landscape div.selectionpanel div.titleheader span.monthyear {\
  margin-left: 89px;\
  font-size: 0.9rem;\
}\
.portrait div.selectionpanel div.titleheader span.monthyear {\
  margin-left: 80px;\
  font-size: 14px;\
}\
div.selectionpanel div.titleheader span.monthyear:hover {\
  text-decoration: underline;\
}\
div.selectionpanel div.titleheader span.monthyear select {\
  position: absolute;\
  top: 0px;\
  left: 0px;\
  bottom: 0px;\
  right: 0px;\
  opacity: 0;\
  width: 100%;\
}\
div.selectionpanel div.titleheader .yearinput {\
  border: none;\
  width: 6.9rem;\
  font-weight: 700;\
}\
.landscape div.selectionpanel div.titleheader .yearinput {\
  font-size: 0.9rem;\
}\
.portrait div.selectionpanel div.titleheader .yearinput {\
  font-size: 14px;\
}\
div.weekdayheader {\
  font-weight: 500;\
  text-align: left;\
  height: 2.5rem;\
  box-sizing: border-box;\
}\
div.weekdaylabel {\
  height: 2.5rem;\
  float: left;\
  padding: 0 0;\
  border-radius: 3rem;\
  font-size: 11px;\
  box-sizing: border-box;\
  text-align: center;\
  color: #a0a0a0;\
}\
.landscape div.weekdaylabel {\
  width: 2.9rem;\
}\
.portrait div.weekdaylabel {\
  width: 4.5rem;\
}\
div.monthpanel {\
	position: relative;\
	font-size: 1rem;\
	margin-top: -0.1rem;\
	box-sizing: border-box;\
}\
.landscape div.monthpanel {\
	top: -0.5rem;\
	left: -1px;\
	height: 12.5rem;\
}\
.portrait div.monthpanel {\
	top: 7px;\
	height: 26rem;\
}\
div.monthpanel .md-button.jmd-fab {\
  float: left;\
  line-height: 2rem;\
  min-width: 0;\
  border-radius: 2rem;\
  font-weight: 700;\
  min-height: inherit;\
  overflow: visible;\
}\
.landscape div.monthpanel .md-button.jmd-fab {\
  width: 2rem;\
  height: 2rem;\
  margin: 0 0.45rem 0 0.45rem;\
  font-size: 0.7rem;\
}\
.portrait div.monthpanel .md-button.jmd-fab {\
  width: 4rem;\
  height: 4rem;\
  margin: 0 0.15rem 0 0.1rem;\
  font-size: 1.2rem;\
}\
.landscape div.monthpanel .md-button.jmd-fab.firstday {\
  margin-left: 2.9rem;\
}\
.portrait div.monthpanel .md-button.jmd-fab.firstday {\
  margin-left: 16.6rem;\
}\
div.actionpanel {\
	min-height: 4.8rem;\
	height: 4.8rem;\
	position: relative;\
}\
.landscape div.actionpanel {\
	padding-right: 4px;\
	top: -14px;\
}\
.portrait div.actionpanel {\
	padding-right: 14px;\
}\
div.actionpanel .md-button {\
	min-width: 3rem;\
	float: right;\
}\
.portrait div.actionpanel .md-button {\
	margin: 6px 8px 6px 7px;\
}\
div.popupDialogContent {\
	padding: 0;\
}';

        // Put the styling code into the element
        style.text(styleText);

        // Attach the style element to the head
        head.append(style);

        $compile(head.contents())($scope);
      }

      // Up the count of the datepicker instances
      JDatePickerCount.Increment();

      $ctrl.$formatters.push(formatter);
      $ctrl.$parsers.push(parser);

      $scope.SelectedDate = $scope.ngModel;
		$scope.serial = Math.floor(Math.random() * 10000000000000000);
		
      $scope.mdThemeColors = mdThemeColors;

      $scope.$watch('ngModel', function(newValue) {
        $scope.SelectedDate = $scope.ngModel;
      }, true);

      $scope.$watch('SelectedDate', function(newValue) {
        if (newValue != null) {
          $scope.SelectedDateText = $filter('date')(newValue, 'M/d/yyyy');
        } else {
          $scope.SelectedDateText = null;
        }
      }, true);
	  
      $scope.PopupDialogComponent = function($event, startval) {
        $event.preventDefault();

        // If currently disabled by the parent, cancel this attempt.
        if ($scope.ngDisabled) return;

        var dlgCtrl = function($scope, $mdDialog, dlgOrientation, serial) {
          if (startval == null) startval = new Date();
          $scope.DialogSelectedDate = startval;
		  $scope.originalOrientation = dlgOrientation;
		  $scope.serial = serial;
		  $scope.currentOrientation = ($mdMedia('(max-width: 655px)') ? 'portrait' : $scope.orientation);
	  
		  $scope.$watch(function() {
			return $mdMedia('(max-width: 655px)');
			}, function (isSmall) {
				if (isSmall) {
					// In small profile, will be portrait no matter what was originally specified
					$scope.currentOrientation = 'portrait';
				} else {
					$scope.currentOrientation = $scope.originalOrientation;
					}
					});

          $scope.NowClick = function($event) {
            $event.preventDefault();

            $timeout(function() {
              $scope.DialogSelectedDate = new Date();
            });
          };

          $scope.CancelClick = function($event) {
            $event.preventDefault();

            $mdDialog.cancel();
          };

          $scope.SaveClick = function($event) {
            $event.preventDefault();

            $mdDialog.hide($scope.DialogSelectedDate);
          };
        };

        var dlgOpts = {
          template: '<md-dialog ng-class="{\'portrait\' : currentOrientation == \'portrait\'}" ng-attr-id="mddpdlg-{{serial}}">\
	<div class="popupDialogContent" style="overflow:hidden">\
		<j-md-datepicker-component2 ng-model="DialogSelectedDate" orientation="' + $scope.orientation + '" submitclick="SaveClick" cancelclick="CancelClick"></j-md-datepicker-component2>\
	</div>\
</md-dialog>',
          controller: dlgCtrl,
          targetEvent: $event,
		  locals: {
			dlgOrientation: $scope.orientation,
			serial: $scope.serial
			},
		  onComplete: function () {
			document.getElementById('mddpdlg-' + $scope.serial).focus();
		  }
        };

        $mdDialog.show(dlgOpts).then(function(answer) {
          $scope.ngModel = answer;
        });
      }
    }
  }
}

export default jMdDatepicker;