define(['text!../../templates/kloudlessToolbar.html'], function(kloudlessToolbar) {
	'use strict';
    function kloudlessMarkdownEditorDirective(kloudlessService){
        return {
            restrict: "E",
            scope: {
            },
            replace: true,
            template: kloudlessToolbar,
            link: function($scope, $element, $attrs, $ctrl){
                $scope.isBannerClosed = false;
                $scope.isSaving = false;
                $scope.file = kloudlessService.file;
                $scope.downloadId = kloudlessService.downloadId;
                $scope.markdownStr; 
                $scope.folderInfo = {
                    name : kloudlessService.file?kloudlessService.file.name:"Undefined", 
                    service: kloudlessService.service ||"Undefined"
                };
                $scope.timer;
                
                $scope.saveFile = function(){
                    if($scope.file){
                        var file = $scope.file;
                        $scope.saveInfo = "Auto Saved..."
                        $scope.isSaving = true;
                        kloudlessService.saveToLocation(file["account"],file['id'],file['bearer_token']['key'],$scope.markdownStr)
                            .then(function(response){
                                window.localStorage["downloadId"] = response.data.id;
                                $scope.saveInfo = "Save";
                                $scope.isSaving = false;
                            });
                    } else {
                        alert('Please select a location first');
                    }
                };

                $scope.closeInstruction = function(){
                    $scope.isBannerClosed = true;
                    window.localStorage["instructionRead"] = 1; 
                };

                function getServiceAccountName(accountId, bearToken){
                    kloudlessService.getAccountDetail(accountId, bearToken).then(function(response){
                        $scope.folderInfo.service = response.data.service;
                        window.localStorage['service'] = response.data.service;
                        return;
                    });
                }

                function autoSave(){
                    $scope.timer = setInterval(function() {
                        $scope.saveFile();
                    }, 60000);
                }

                $scope.$watchCollection('file', function(newFile){
                    if(newFile) {
                        autoSave();
                    } else {
                        clearInterval($scope.timer);
                    }
                });

                function init(){
                    if(window.localStorage["instructionRead"]==1){
                        $scope.isBannerClosed = true;
                    }
    
                    explorer.choosify($element.find('#chooser'));
                    
                    explorer.on('success', function(files) {
                        $scope.file = files[0];
                        window.localStorage['file'] = JSON.stringify($scope.file);
                        $scope.folderInfo.name = files[0]['name'];
                        getServiceAccountName($scope.file['account'],$scope.file['bearer_token']['key']);
                        $scope.saveInfo = "Save";
                        $scope.$apply();
                    });
                    
                    $element.find('textarea').on("input propertychange", function(){
                        document.getElementById('content').innerHTML = marked($element.find('textarea').val());
                        $scope.$apply();
                    });
    
                    //see if the user has uploaded file before. if so, download the file and display.
                    if($scope.file!==null&&$scope.downloadId!==null) {
                        $scope.saveInfo = "Save";
                        kloudlessService.downloadFile($scope.file['account'], $scope.downloadId, $scope.file['bearer_token']['key'])
                        .then(function(response){
                            $scope.markdownStr = response.data;
                            setTimeout(function(){
                                document.getElementById('content').innerHTML = marked($scope.markdownStr);
                                $scope.$apply();
                            },1000);
                        });
                    } else {
                        $scope.saveInfo = "Disabled";
                    }
                }
                init();
            }
        };
    }
    kloudlessMarkdownEditorDirective.$inject = ['kloudlessService'];
	return kloudlessMarkdownEditorDirective;
});