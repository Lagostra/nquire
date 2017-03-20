function setLectureFile(id, source) {
    document.forms['create-lecture-form']['presentationId'].value = id;
    document.getElementById('presentation-selector').innerHTML = source.innerHTML;
    $('#file-modal').modal('hide');
}