define(['text!../../templates/kloudlessToolbar.html'], function(kloudlessToolbar) {
	'use strict';
    function kloudlessBtnDirective(kloudlessService){
        return {
            restrict: "E",
            scope: {
            },
            replace: true,
            template: kloudlessToolbar,
            link: function($scope, $element, $attrs, $ctrl){
                $element.find('textarea').on("input propertychange", function(){
                    console.log("ahah", marked($element.find('textarea').val()));
                    document.getElementById('content').innerHTML = marked($element.find('textarea').val());
                    $scope.$apply();
                });
                $scope.isBannerClosed = false;
                $scope.file = kloudlessService.file;
                $scope.downloadId = kloudlessService.downloadId;
                $scope.markdownStr; 
                if($scope.file!==null&&$scope.downloadId!==null) {
                    $scope.saveInfo = "Save";
                    kloudlessService.downloadFile($scope.file['account'], $scope.downloadId, $scope.file['bearer_token']['key'])
                    .then(function(response){
                        console.log(response);
                        $scope.markdownStr = response.data;
                    });
                } else {
                    $scope.saveInfo = "Disabled";
                }
                console.log('SERVICE',kloudlessService.service);
                $scope.folderInfo = {
                    name : kloudlessService.file.name || "Undefined", 
                    service: kloudlessService.service ||"Undefined"
                };
                $scope.timer;
                function getServiceAccountName(accountId, bearToken){
                    kloudlessService.getAccountDetail(accountId, bearToken).then(function(response){
                        $scope.folderInfo.service = response.data.service;
                        window.localStorage['service'] = response.data.service;
                        return;
                    });
                }
                console.log('local storage', kloudlessService.file);
                
                console.log($element);
                explorer.choosify($element.find('#chooser'));
                var folderInfo = $scope.folderInfo;

                explorer.on('success', function(files) {
                    console.log(files[0]);
                    console.log(folderInfo.name);
                    $scope.file = files[0];
                    window.localStorage['file'] = JSON.stringify($scope.file);
                    folderInfo.name = files[0]['name'];
                    //uploadFile(files[0]);
                    getServiceAccountName($scope.file['account'],$scope.file['bearer_token']['key']);
                    $scope.saveInfo = "Save";
                    $scope.$apply();

                });
                console.log('kloudlessService', kloudlessService);

                $scope.saveFile = function(){
                    if($scope.file){
                        var file = $scope.file;
                        $scope.saveInfo = "Auto Saved..."
                        kloudlessService.saveToLocation(file["account"],file['id'],file['bearer_token']['key'],$scope.markdownStr)
                            .then(function(response){
                                console.log('file saved...', response);
                                window.localStorage["downloadId"] = response.data.id;
                                $scope.saveInfo = "Save";
                            });
                    } else {
                        console.log('Please select a location first');
                    }
                };

                
                function autoSave(){
                    $scope.timer = setInterval(function() {
                        // refresh list
                        console.log('save',$element.find('textarea').val());
                        $scope.saveFile();
                    }, 10000);
                }
                $scope.closeInstruction = function(){
                    $scope.isBannerClosed = true;
                    window.localStorage["instructionRead"] = 1; 
                };
                
                $scope.$watchCollection('file', function(newFile){
                    if(newFile) {
                        autoSave();
                    } else {
                        clearInterval($scope.timer);
                    }
                });

                setTimeout(function(){
                    console.log("marked content..... ");
                    document.getElementById('content').innerHTML = marked($scope.markdownStr);
                    $scope.$apply();
                },3000);

                if(window.localStorage["instructionRead"]==1){
                    $scope.isBannerClosed = true;
                }

            }
        };
    }
    kloudlessBtnDirective.$inject = ['kloudlessService'];
	return kloudlessBtnDirective;
});