

function moveProcess(id) {
  var mouseStatus = false;
  // var svg = document.getElementById("svg");
  var task = document.getElementById("task" + id);
  var process = document.getElementById("process" + id);

  start = task.x.baseVal.value;
  width = start + task.width.baseVal.value;

  // console.log(process.style['width'])
  // console.log(process.x.baseVal.value)
  task.onmousemove = function (event) {

    var event = event || window.event;
    var x = (event.offsetX || event.layerX) - start

    console.log(start, width, x);
    if (mouseStatus == true && x <= width) {
      process.style['width'] = x;
    }
  }
  task.onmousedown = function (event) {
    var event = event || window.event;
    var x = (event.offsetX || event.layerX) - start
    if (x <= width) {
      process.style['width'] = x;
    }

  }
  process.onmousedown = function (event) {
    var event = event || window.event;
    var x = (event.offsetX || event.layerX) - start
    console.log(x, width)
    if (x <= width) {
      process.style['width'] = x;
    }
  }
  // process.onmousemove = function (event) {

  //   var event = event || window.event;
  //   var x = (event.offsetX || event.layerX)

  //   console.log(start, width, x);
  //   if (mouseStatus == true && x < width) {
  //     process.style['width'] = x - start;
  //   }
  // }
  // task.onmousemove = function (event) {

  //   var event = event || window.event;  //标准化事件对象
  //   if (event.offsetX || event.offsetY) {

  //     if (mouseStatus == true) {
  //       process.style['width'] = event.offsetX;
  //     }

  //   } else if (event.layerX || event.layerY) {

  //     if (mouseStatus == true) {
  //       process.style['width'] = event.layerX;
  //     }
  //   }
  // }
  // process.onmousemove = function (event) {

  //   var event = event || window.event;  //标准化事件对象
  //   if (event.offsetX || event.offsetY) {

  //     if (mouseStatus == true) {
  //       process.style['width'] = event.offsetX;
  //     }

  //   } else if (event.layerX || event.layerY) {

  //     if (mouseStatus == true) {
  //       process.style['width'] = event.layerX;
  //     }
  //   }
  // }

  // task.onmousedown = function (event) {
  //   var event = event || window.event;
  //   var width = event.offsetX || event.layerX
  //   process.style['width'] = width;
  // }
  // process.onmouseup = function (event) {
  //   var event = event || window.event;
  //   var width = event.offsetX || event.layerX
  //   process.style['width'] = width;
  // }

  window.onmousedown = function (event) {
    mouseStatus = true;
  }
  window.onmouseup = function (event) {
    mouseStatus = false;
  }
}

function save() {
  if ($("#milestone").prop("checked")) {
    milestone = true;
  } else {
    milestone = false;
  }
  // console.log(milestone);

  $.ajax({
    method: 'POST',
    url: 'http://localhost:8080/project/save',
    data: JSON.stringify({
      name: $("#name").val(),
      start: $("#start").val(),
      finish: $("#finish").val(),
      resource: $("#resource").val(),
      predecessor: $("#predecessor").val(),
      milestone: milestone,
      project: { id: $("#parent").val() }
    }),
    dataType: 'json',
    contentType: 'application/json',
    success: function (data) {
      console.log(data);
      location.reload();
    },
    error: function (xhr, status, error) {
      console.log(error);
    }
  });
}