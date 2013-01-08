
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
function dateToYMD(date)
{
    var d = date.getDate();
    var m = date.getMonth()+1;
    var y = date.getFullYear();
    return '' + y +'-'+ (m<=9?'0'+m:m) +'-'+ (d<=9?'0'+d:d);
}

$("div.hoverable").live({
mouseenter: 
  function () {
    $(this).find(".hide").show();
  },
mouseleave:
function () {
    $(this).find(".hide").hide();
  }
});

// $("a[rel=popover]").popover({trigger: 'manual'})
//     .click(function() {
//         if($(this).hasClass('pop')) {
//             $(this)
//                 .popover('hide')
//                 .removeClass('pop');
//         } else {
//             var response = 'Success';
//             $(this)
//                 .attr('data-content', response)
//                 .popover('show')
//                 .addClass('pop');
//         }
//     });

      // .popover('show')
      // .click(function(e) {
      //   alert('pop');
      //   e.preventDefault();
      // });

// function pop(id){
//   alert('hello')
//   $("#"+id).popover({content:"hello"});
//   $(this).removeClass("hide");
//   return false;
// }

var isVisible = false;
var isChanged = false;
var clickedAway = false;
var lastNode = undefined;

// $(document).click(function(e) {
//   if(isVisible & clickedAway & !isChanged)
//   {
//      $('a[rel=popover]').each(function() {
//           $(this).popover('hide').removeClass('pop');
//      });
//     // lastNode.popover('hide').removeClass('pop');
//     // alert('hide');
//     isVisible = clickedAway = isChanged = false;
//     lastNode = undefined;

//   }
//   else
//   {
//     clickedAway = true;
//   }
//   isChanged = false;
// });


// $(function(){
// $('a[rel=popover]').datepicker();
// alert('date');
// });

// $("a[rel=popover]").live({
//   click:function(){
//     var node = $(this);
//     node.removeClass("hide");
//     $(this).datepicker('show')
//       .on('changeDate', function(ev){
//         if (ev.date.valueOf()){
//         }
//         $(this).datepicker('hide');
//       }).on('show', function(ev){
//         node.removeClass("hide");
//       }).on('hide', function(ev){
//         node.addClass("hide");
//       });
//   }
// });

// $("a[rel=popover]").live({
//   click:function(){
//     if($(this).hasClass('pop'))
//     {
//       $(this).popover('hide').removeClass('pop');
//       lastNode = undefined;
//       isVisible = false;
//       clickedAway = false;
//     } else {
      
//       if(isVisible && lastNode != undefined && lastNode != $(this)){
//         lastNode.popover('hide').removeClass('pop');
//         isChanged = true;
//       }else{
//         isChanged = false;
//       }
//       // alert("show:"+isVisible + " " + isChanged + " " + lastNode);
//       // $(this)
//       //     .popover('show')
//       //     .addClass('pop');
//       $(this).datepicker('show');
//       isVisible = true;
//       clickedAway = false;
//       lastNode = $(this);
      
//     }

//     // $(this).popover({trigger: 'manual'})
//     // .click(function() {
//     //     if($(this).hasClass('pop')) {
//     //         $(this)
//     //             .popover('hide')
//     //             .removeClass('pop');
//     //     } else {
//     //         var response = 'Success';
//     //         $(this)
//     //             .attr('data-content', response)
//     //             .popover('show')
//     //             .addClass('pop');
//     //     }
  

//     $(this).removeClass("hide");
//   }  
// });
