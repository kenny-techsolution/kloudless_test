define(['services/kloudless'], function(kloudlessService) {
    'use strict';
    console.log('kenny defined here why not here',kloudlessService);
	window.app.factory('kloudlessService', kloudlessService);
});