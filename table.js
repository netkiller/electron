table = document.createElement("table");
// table.setAttribute("border", "1");

table.appendChild(document.createElement("caption").appendChild(document.createTextNode("Big Head!")).getRootNode());
thead = document.createElement("thead");
// thead.setAttribute("border", "1");
tr = document.createElement("tr");

tr.appendChild(document.createElement('th').appendChild(document.createTextNode("任务")).getRootNode());
tr.appendChild(document.createElement('th').appendChild(document.createTextNode("开始时间")).getRootNode());
tr.appendChild(document.createElement('th').appendChild(document.createTextNode("完成时间")).getRootNode());
tr.appendChild(document.createElement('th').appendChild(document.createTextNode("工时")).getRootNode());
tr.appendChild(document.createElement('th').appendChild(document.createTextNode("资源")).getRootNode());

thead.appendChild(tr);
table.appendChild(thead);

tbody = document.createElement("tbody");
tbody.setAttribute("id", "task")
// tbody.appendChild(tr);

table.appendChild(tbody);

document.getElementById("table").appendChild(table);

function addTask() {


    tr = document.createElement("tr");

    task = document.createElement('input');
    task.setAttribute("id", "name");
    task.setAttribute("value", "测试")
    // task.appendChild(document.createTextNode("测试").getRootNode())

    start = document.createElement('input')
    start.setAttribute("id", "start")
    start.setAttribute("type", "date")

    finish = document.createElement('input')
    finish.setAttribute("id", "start")
    finish.setAttribute("type", "date")

    duration = document.createElement('input');
    duration.setAttribute("id", "duration");
    duration.setAttribute("value", "5")
    duration.setAttribute("size", "2")

    tr.appendChild(document.createElement('td').appendChild(task).getRootNode());
    tr.appendChild(document.createElement('td').appendChild(start).getRootNode());
    tr.appendChild(document.createElement('td').appendChild(finish).getRootNode());
    tr.appendChild(document.createElement('td').appendChild(duration).getRootNode());

    resource = document.createElement('select')
    resource.setAttribute("id", "resource");
    var option = document.createElement("option");
    option.setAttribute("value", "Neo");
    option.appendChild(document.createTextNode("Volvo").getRootNode())

    resource.appendChild(option);

    tr.appendChild(document.createElement('td').appendChild(resource).getRootNode());;
    // th.appendChild(task);

    // document.body.appendChild(heading);
    document.getElementById("task").appendChild(tr);
}
