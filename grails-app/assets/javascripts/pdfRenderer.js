/**
 * Created by Lavrans on 14.02.2017.
 *
 * renders the pdf into "the-canvas" and page numbers into page_num and page_count
 * include the following in your html body to render into
 *      <div style="position: fixed;">
 *          <span >Page: <span id="page_num"></span> / <span id="page_count"></span></span>
 *      </div>
 *      <canvas id="the-canvas"></canvas>
 *
 * has functions for renderNextPage() and renderPreviousPage();
 *
 */

var renderTask = null;
var pageRendering = false;
var pdf = false;
var pageNumPending = null;
var currentPage = 1;

// Disable workers to avoid yet another cross-origin issue (workers need
// the URL of the script to be loaded, and dynamically loading a cross-origin
// script does not work).
PDFJS.disableWorker = true;
// The workerSrc property shall be specified.
PDFJS.workerSrc = '//mozilla.github.io/pdf.js/build/pdf.worker.js';

// atob() is used to convert base64 encoded PDF to binary-like data.
// (See also https://developer.mozilla.org/en-US/docs/Web/API/WindowBase64/Base64_encoding_and_decoding.)

function initPdfReader(){

}


//rerenders current page on window resize
window.onresize = function(){
    renderPage(currentPage);
}

//http://stackoverflow.com/questions/12092633/pdf-js-rendering-a-pdf-file-using-a-base64-file-source-instead-of-url
function setPresentation(string){
    pdf = atob(string);
    loadPDF();
}
function loadPDF(){
    if (pdf != null){
        // loading the document
        var loadingTask = PDFJS.getDocument({data: pdf}).then(function(pdf) {
            this.pdf = pdf;
            document.getElementById('page_count').textContent = pdf.numPages;
            //first render
            this.renderPage(1);

        }, function (reason) {
            // PDF loading error
        });
    }
}

function renderPage(pageNumber) {

    pdf.getPage(pageNumber).then(function(page) {
        pageRendering = true;

        var scale = 1;
        var viewport = page.getViewport(scale);
        viewport = calculateScale(viewport,page);

        // Prepare canvas using PDF page dimensions
        var canvas = document.getElementById('the-canvas');
        var context = canvas.getContext('2d');
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        //cancels the running render if there is one
        if (renderTask) {
            renderTask.cancel();
        }

        // Render PDF page into canvas context
        var renderContext = {
            canvasContext: context,
            viewport: viewport
        };
        renderTask = page.render(renderContext);

        renderTask.promise.then(function () {
            console.log("page rendered")

            this.currentPage = pageNumber;
            document.getElementById('page_num').textContent = pageNumber;
            pageRendering = false;
            if (pageNumPending !== null) {
                // New page rendering is pending
                renderPage(pageNumPending);
                pageNumPending = null;
            }
        });

    });
}

// returns a new viewport with a scale that fits the page
function calculateScale(viewport,page){
    var height = viewport.height;
    var width = viewport.width;
    var presContainer = document.getElementById("presentation-container");
    var pageHeight = presContainer.clientHeight;
    var pageWidth = presContainer.clientWidth;

    if (height/pageHeight > width / pageWidth){
        return page.getViewport(pageHeight/height);
    }
    else {
        return page.getViewport(pageWidth/width);
    }
}

function renderPreviousPage() {
    if (currentPage <= 1) {
        return;
    }
    currentPage--;
    queueRenderPage(currentPage);
}

function renderNextPage() {
    if (currentPage >= pdf.numPages) {
        return;
    }
    currentPage++;
    queueRenderPage(currentPage);
}

function queueRenderPage(num) {
    if (pageRendering) {
        pageNumPending = num;
    } else {
        renderPage(num);
    }
}

/*
//testing next/previous page on keydown
var i = 1
window.onkeydown = function(e){
    console.log("key pressed")

    if (i==1 || i==3 || i== 5){
        renderNextPage();
        i += 1
    }
    else{
        renderPreviousPage();
        i += 1
    }
}

*/
