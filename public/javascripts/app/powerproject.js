function show(id){
  $("#"+id).show();
  $("#add_"+id).hide();
  $("#input_"+id).val("");
  $("#input_"+id).select();
  return false;
}
function hide(id){
  $("#"+id).hide();
  $("#add_"+id).show();
  return false;
}
$("div.hoverable").live({
mouseenter: 
  function () {
    $(this).find(".hide-actions").show();
  },
mouseleave:
function () {
    $(this).find(".hide-actions").hide();
  }
});