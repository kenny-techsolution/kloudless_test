define([], function() {
	'use strict';
    function kloudlessService($http) {
        return {
            saveToLocation: function (accountId, folderId,bearToken, contentStr) {
                console.log('save To Location');
                var myblob = new Blob([contentStr], {
                    type: 'text/plain'
                });
                var fd = new FormData();
                fd.append('fname', 'markdown.txt');
                fd.append('data', myblob);

                var data = $http.post('https://api.kloudless.com/v1/accounts/'+ accountId +'/storage/files/?overwrite=true', fd, 
                {
                    transformRequest: angular.identity,
                    headers: {
                        'Content-Type': undefined, 
                        'X-Kloudless-Metadata': JSON.stringify({
                            'parent_id': folderId,
                            'name': 'markdown.txt'
                        }), 
                        'Authorization': 'Bearer '+ bearToken
                    }
                })
                .then(function (response) {
                    console.log('response',response);
                    return response;
                }, function (err) {
                    return err;
                });
                // var data = $http({
                //     method: 'POST',
                //     url: 'https://api.kloudless.com/v1/accounts/'+ accountId +'/storage/files/?overwrite=true',
                //     headers:{
                //         'X-Kloudless-Metadata': JSON.stringify({
                //             'parent_id': folderId,
                //             'name': 'markdown.txt'
                //         }), 
                //         'Authorization': 'Bearer '+ bearToken
                //     },
                //     contentType: 'application/json',
                //     data: fd,
                //     processData: false,
                //     contentType: false
                // })
                // .then(function (response) {
                //     console.log('response',response);
                //     return response;
                // }, function (err) {
                //     return err;
                // });
                console.log("success..dfskadjflsaj");
                return data;
            }, 
            getAccountDetail: function(accountId, bearToken){
                var data = $http({
                    method: 'GET',
                    url: 'https://api.kloudless.com/v1/accounts/'+ accountId +'?retrieve_tokens=false&retrieve_full=true',
                    headers:{
                        'Authorization': 'Bearer '+ bearToken
                    },
                    contentType: 'application/json'
                })
                .then(function (response) {
                    console.log('account response',response);
                    return response;
                }, function (err) {
                    return err;
                });
                console.log("success..dfskadjflsaj");
                return data;                
            },
            downloadFile: function(accountId, fileId, bearToken){
                var data = $http({
                    method: 'GET',
                    url: 'https://api.kloudless.com/v1/accounts/'+ accountId +'/storage/files/'+ fileId + '/contents',
                    headers:{
                        'Authorization': 'Bearer '+ bearToken
                    },
                    contentType: 'application/json'
                })
                .then(function (response) {
                    console.log('download content',response);
                    return response;
                }, function (err) {
                    return err;
                });
                console.log("success..dfskadjflsaj");
                return data;
            },
            file: JSON.parse(window.localStorage['file']),
            service: window.localStorage['service'],
            downloadId: window.localStorage['downloadId']
        };
    };
    kloudlessService.$inject = ['$http'];
	return kloudlessService;
});