describe("Test pdfRenderer.js", function() {
    beforeEach(function() {
        pdf = Object();
        pdf.numPages = 2;
    });

    it("Test renderPreviousPage", function() {
        renderPage = function() {};

        currentPage = 2;
        renderPreviousPage();
        expect(currentPage).toBe(1);
    })
});