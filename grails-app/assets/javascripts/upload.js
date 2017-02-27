function validateUploadForm() {
    var form = document.forms['uploadForm'];

    if(form['title'].value == "") {
        alert("Please fill out title");
        return false;
    }

    if(form['title'].value.length < 3) {
        alert("Title must be at least 3 characters long.");
        return false;
    }

    var fileName  = form['file'].value;

    if(fileName == "") {
        alert("Please select a file to upload");
        return false;
    }

    var fileExt = fileName.substr(fileName.lastIndexOf('.'));
    var acceptedFileTypes = form['file'].accept.split(',');
    var accepted = false;
    for(var i = 0; i < acceptedFileTypes.length; i++) {
        if(fileExt == acceptedFileTypes[i])
            return true;
    }

    if(!accepted) {
        alert("Invalid file type!");
        return false;
    }

    return true;
}