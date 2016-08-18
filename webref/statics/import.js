$(document).ready(function (){
  $("button[name='doilookup']").on("click", function(event){
    var doi = $("input[name='doi']").val();
    //alert(doi);
    $.ajax("http://dx.doi.org/10.1103/PhysRevB.91.100401", {
      //accepts: {
        //json: "application/vnd.citationstyles.csl+json"
      //},
      headers: {
        Accept: "application/vnd.citationstyles.csl+json"
      },
      dataType: "json",
      jsonp: false,
      success: function (data, textStatus, jqXHR){
        $("input[name='title']").val() = data.title;
      }
    });
  });
});
