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
