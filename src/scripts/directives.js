define(['directives/header', 'directives/footer','directives/kloudlessBtn'], function(headerDirective, footerDirective, kloudlessBtnDirective) {
	'use strict';
	window.app.directive('ngheader', headerDirective);
	window.app.directive('ngfooter', footerDirective);
	window.app.directive('kloudlessBtn', kloudlessBtnDirective);
});