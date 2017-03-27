function setLectureFile(id, source) {
    document.forms['create-lecture-form']['presentationId'].value = id;
    document.getElementById('presentation-selector').innerHTML =
        '<span id="remove-presentation" title="Remove presentation" type="button" class="close">'+'' +
            '<span>&times;</span>' +
        '</span>';
    document.getElementById('presentation-selector').innerHTML += source.innerHTML;

    $('#file-modal').modal('hide');

    document.getElementById('remove-presentation').onclick = removePresentation;
}

function removePresentation() {
    document.forms['create-lecture-form']['presentationId'].value = 0;
    document.getElementById('presentation-selector').innerHTML = 'Select presentation file';
}