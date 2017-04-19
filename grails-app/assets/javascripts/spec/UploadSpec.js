describe("Test upload.js", function() {
    beforeEach(function() {
        spyOn(window, 'alert');
        var form = document.createElement("form");
        form.name = "uploadForm";

        var title = document.createElement("input");
        title.type = "text";
        title.value = "";
        title.name = "title";
        form.appendChild(title);

        var file = document.createElement("input");
        file.type = "text";
        file.name = "file";
        file.accept = ".pdf"
        file.value = "";
        form.appendChild(file);

        document.body.appendChild(form);
    });

    afterEach(function() {
        document.body.removeChild(document.forms['uploadForm']);
    });

    it("Test validateUploadForm() without title", function() {
        expect(validateUploadForm()).toBe(false);
        expect(window.alert).toHaveBeenCalledWith("Please fill out title");
    });

    it("Test validateUploadForm() with short title", function() {
        document.forms['uploadForm']['title'].value = "01"

        expect(validateUploadForm()).toBe(false);
        expect(window.alert).toHaveBeenCalledWith("Title must be at least 3 characters long.");
    });

    it("Test validateUploadForm() without file", function() {
        document.forms['uploadForm']['title'].value = "Test"

        expect(validateUploadForm()).toBe(false);
        expect(window.alert).toHaveBeenCalledWith("Please select a file to upload");
    });

    it("Test validateUploadForm() with invalid file type", function() {
        document.forms['uploadForm']['title'].value = "Test"
        document.forms['uploadForm']['file'].value = "Test.jpg"

        expect(validateUploadForm()).toBe(false);
        expect(window.alert).toHaveBeenCalledWith("Invalid file type!");
    });

    it("Test validateUploadForm() with valid input", function() {
        document.forms['uploadForm']['title'].value = "Test"
        document.forms['uploadForm']['file'].value = "Test.pdf"

        expect(validateUploadForm()).toBe(true);
    });
});