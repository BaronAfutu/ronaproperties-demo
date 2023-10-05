/* globals Chart:false, feather:false */

(function () {
  'use strict'

  feather.replace({ 'aria-hidden': 'true' });

  $(".viewe-image").click(function (e) { 
    e.preventDefault();
    $("#displayImage").attr("src", $(this).attr("src"));
  });

  $("#editBtn").click(function (e) { 
    e.preventDefault();
    $("input").removeAttr("disabled");
    $("textarea").removeAttr("disabled");
    $("#ppn").focus();
  });

  $("#editListingForm").submit(function (e) { 
    e.preventDefault();
    $("#editListingForm input").attr("disabled", true);
    $("textarea").attr("disabled", true);
    return false;
  });
})()
