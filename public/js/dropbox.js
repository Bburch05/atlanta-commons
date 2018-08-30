var $submitBtn = $("#submit");

var API = {
    pushToDropBox: function(){
    return $.ajax({
      type: "POST",
      url : 'https://content.dropboxapi.com/2/files/upload',
      dataType: 'application/octet-stream',
      headers : {
        "Authorization" : "Bearer Token",
        "Dropbox-API-Arg" : "{"path:"/newFolder/datasrc.js","mode":"add","autorename":false"}"
            }
        });
    }
}

$submitBtn.on("click", pushToDropBox);