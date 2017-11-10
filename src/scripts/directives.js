define(['directives/header', 'directives/footer','directives/kloudlessMarkdownEditor'], function(headerDirective, footerDirective, kloudlessMarkdownEditorDirective) {
	'use strict';
	window.app.directive('ngheader', headerDirective);
	window.app.directive('ngfooter', footerDirective);
	window.app.directive('kloudlessMarkdownEditor', kloudlessMarkdownEditorDirective);
});