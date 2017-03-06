<!doctype html>
<html>
<head>
   <meta name="layout" content="main"/> <!-- endre navn til presentation -->
   <title>nqurie Presentation </title> <!-- endre tittel dynamisk? -->

</head>
<body>
   <div class="container">
      <!-- denne må endres etterhvert. har "new_btn" tag når det er nytt q-->
      <div id="display_question_btn" class="btn btn-primary btn-md">Show Questions</div>
      <div id="hide_question_btn" class="btn btn-primary btn-md">Hide Questions</div>


      <div id="question_container" class="hidden">
         <div class="row">
            <div class="col-md-2"></div>
            <div class="col-md-8">
               <div id="default_question" class="question">
                  <p>No questions yet</p> <!-- mulig fjern -->
               </div>
            </div>
         </div>
      </div>

      <footer>
         <p>&copy; Company 2017</p>
      </footer>
   </div> <!-- /container -->

   <asset:javascript src="application.js"/>
   <asset:javascript src="lecturer.js"/>
</body>
</html>
