
var explorer = window.Kloudless.explorer({
    app_id: 'X9oaWHtuldy9Joik3mmv3gnGafF6fsQQAyTwVKo1R11CKl2B',
    computer: true,
    types: ['folders'], 
    retrieve_token: true
  });
  
  // Chooser
  explorer.on('success', function(files) {
    $("#file-info > pre").replaceWith(
      '<pre>' +
      JSON.stringify(files, null, 2) +
      '</pre>');
      console.log(files[0]);
      uploadFile(files[0]);
  });
  explorer.choosify($('#chooser'));
 

  function uploadFile(file) {
    var mystring = "Hello World!";
    var myblob = new Blob([mystring], {
        type: 'text/plain'
    });
    var fd = new FormData();
    fd.append('fname', 'hello.txt');
    fd.append('data', myblob);
    $.ajax({
        type: 'POST',
        url: 'https://api.kloudless.com/v1/accounts/'+ file["account"]+'/storage/files/?overwrite=true',
        headers:{
          'X-Kloudless-Metadata': JSON.stringify({
            'parent_id': file['id'],
            'name': 'demo.txt'
          }), 
          'Authorization': 'Bearer '+file['bearer_token']['key']
        },
        data: fd,
        processData: false,
        contentType: false
    }).done(function(data) {
           console.log(data);
    });
  }

  document.getElementById('content').innerHTML = marked('# Marked in browser\n\nRendered by **marked**.');
  $textarea = $("#editor");
  $textarea.on("input propertychange", function(){
    console.log("ahah", new Date());
    document.getElementById('content').innerHTML = marked($textarea.val());
  });