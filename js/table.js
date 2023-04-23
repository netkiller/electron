function moveProgress(id) {
  var mouseStatus = false;
  // var svg = document.getElementById("svg");
  var task = document.getElementById("task" + id);
  var progress = document.getElementById("progressBar" + id);

  start = task.x.baseVal.value;
  width = start + task.width.baseVal.value;

  // console.log(progress.style['width'])
  // console.log(progress.x.baseVal.value)
  task.onmousemove = function (event) {

    var event = event || window.event;
    var x = (event.offsetX || event.layerX) - start

    console.log(start, width, x);
    if (mouseStatus == true && x <= width) {
      progress.style['width'] = x;
    }
  }
  task.onmousedown = function (event) {
    var event = event || window.event;
    var x = (event.offsetX || event.layerX) - start
    if (x <= width) {
      progress.style['width'] = x;
    }

  }
  progress.onmousedown = function (event) {
    var event = event || window.event;
    var x = (event.offsetX || event.layerX) - start
    console.log(x, width)
    if (x <= width) {
      progress.style['width'] = x;
    }
  }
  // progress.onmousemove = function (event) {

  //   var event = event || window.event;
  //   var x = (event.offsetX || event.layerX)

  //   console.log(start, width, x);
  //   if (mouseStatus == true && x < width) {
  //     progress.style['width'] = x - start;
  //   }
  // }
  // task.onmousemove = function (event) {

  //   var event = event || window.event;  //标准化事件对象
  //   if (event.offsetX || event.offsetY) {

  //     if (mouseStatus == true) {
  //       progress.style['width'] = event.offsetX;
  //     }

  //   } else if (event.layerX || event.layerY) {

  //     if (mouseStatus == true) {
  //       progress.style['width'] = event.layerX;
  //     }
  //   }
  // }
  // progress.onmousemove = function (event) {

  //   var event = event || window.event;  //标准化事件对象
  //   if (event.offsetX || event.offsetY) {

  //     if (mouseStatus == true) {
  //       progress.style['width'] = event.offsetX;
  //     }

  //   } else if (event.layerX || event.layerY) {

  //     if (mouseStatus == true) {
  //       progress.style['width'] = event.layerX;
  //     }
  //   }
  // }

  // task.onmousedown = function (event) {
  //   var event = event || window.event;
  //   var width = event.offsetX || event.layerX
  //   progress.style['width'] = width;
  // }
  // progress.onmouseup = function (event) {
  //   var event = event || window.event;
  //   var width = event.offsetX || event.layerX
  //   progress.style['width'] = width;
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

function tableSwitch() {
  var status = document.getElementById("table").style.visibility;
  // console.log('hide', status);
  if (status == "hidden") {
    document.getElementById("table").style.visibility = "visible";//显示
    document.getElementById("table").removeAttribute('style');
  } else {
    document.getElementById("table").style.visibility = "hidden";//隐藏
    document.getElementById("table").style.width = 0;
  }
}

function hideTableColume(colume, status) {
  // var table = document.getElementsByTagName("table");
  var table = document.getElementById("project");
  // console.log(status);
  for (var i = 0, len = table.rows.length; i < len; i++) {
    // var cell = 
    if (status) {
      table.rows[i].cells[colume].style.display = 'none';
    } else {
      table.rows[i].cells[colume].style.display = '';
    }

  }
}

// function ss(id) {
//   let column = document.getElementById(id); //获取 tadio元素
//   let checkVal = column.checked; //获取 radio checked值
//   let table = document.getElementById("tab");
//   let trs = table.getElementsByTagName("tr"); //获取所有 tr
//   let ths = trs[0].getElementsByTagName("th"); // 获取 th
//   let xb = 0;
//   for (var i = 0; i < ths.length; i++) {
//       if (ths[i].getAttribute("name") == id) { 
//           xb = i;
//           if (checkVal) {
//               ths[i].style.display = "";
//           } else {
//               ths[i].style.display = "none";
//           }
//       }
//   }
//   for (var i = 1; i < trs.length; i++) {
//       let tds = trs[i].getElementsByTagName("td");
//       if (checkVal) {
//           tds[xb].style.display = "";
//       } else {
//           tds[xb].style.display = "none";
//       }

//   }
// }
