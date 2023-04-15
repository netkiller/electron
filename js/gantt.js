class Gantt {
    height = 60
    columeWidth = 29
    barHeight = 20
    rowHeight = 30
    vline = 0
    top = 60
    beginDate = '';
    endDate = '';
    datePosition = new Map();
    resource = new Map();
    taskLists = new Map();

    // var draw = SVG().addTo('body')
    // .size(300, 300)
    draw = SVG().addTo('#chart').size(31 * this.columeWidth, this.height).attr({ 'id': 'svg' });
    constructor(beginDate, endDate) {
        this.beginDate = beginDate;
        this.endDate = endDate;

        this.ling = this.draw.defs().polygon('15,0 0,15 15,30 30,15').fill('black').stroke({ width: 1 })
    }

    getAllDay(start, end) {

        let startTime = new Date(start);
        let endTime = new Date(end);
        // console.log('startTime',startTime,endTime)
        let dates = [];
        while ((endTime.getTime() - startTime.getTime()) >= 0) {
            let year = startTime.getFullYear();
            let month = (startTime.getMonth() + 1).toString().length === 1 ? "0" + (parseInt(startTime.getMonth().toString(), 10) + 1) : (startTime.getMonth() + 1);
            let day = startTime.getDate().toString().length === 1 ? "0" + startTime.getDate() : startTime.getDate();
            // console.log('endTime',year,month,day)
            dates.push(year + "-" + month + "-" + day);
            startTime.setDate(startTime.getDate() + 1);
        }
        // console.log('dateArr',dateArr);
        return dates;

    }
    calendar() {
        var group = this.draw.group().attr({ 'id': 'calendar' });
        var begin = 1;
        var end = 100;
        var colume = 0

        let weeks = ['日', '一', '二', '三', '四', '五', '六'];
        // let day = new Date().getDay();
        // console.log(weeks[day]);
        var dateLists = this.getAllDay(this.beginDate, this.endDate);
        document.getElementById("svg").style['width'] = this.columeWidth * dateLists.length + dateLists.length;
        // dateLists.forEach(element => console.log(element));
        // console.log(dateLists);
        dateLists.forEach(date => {
            // console.log(date)
            var day = new Date(date).getDate()
            var x = this.columeWidth * (colume) + this.vline;
            this.datePosition.set(date, x)
            // var week = new Date('2023-03-' + day.toString().padStart(2, '0')).getDay();
            var week = new Date(date).getDay();
            if (week == 0 || week == 6) {
                var rect = this.draw.rect(this.columeWidth, 100).attr({ x: x, y: this.rowHeight, fill: '#eeeeee' });
                rect.add(SVG('<title>' + date + '</title>'))
            } else {
                var rect = this.draw.rect(this.columeWidth, 100).attr({ x: x, y: this.rowHeight, fill: '#dddddd' });
                rect.add(SVG('<title>' + date + '</title>'))
            }
            group.add(rect);

            if (week == 0) {
                group.add(this.draw.line(x + this.columeWidth, 0, x + this.columeWidth, this.rowHeight).stroke('grey'));
            }

            var text = this.draw.text(weeks[week]).attr({ x: x + 5, y: 20, "text-anchor": "start", "dominant_baseline": 'hanging' });
            group.add(text);
            text = this.draw.text(day).attr({ x: x, y: 53, "font-size": 20 });
            group.add(text);
            this.vline += 1;
            colume += 1;
        });

        // console.log(this.datePosition);

        group.add(this.draw.line(0, 30, '100%', 30).stroke('grey'))
        group.add(this.draw.line(0, 60, '100%', 60).stroke('grey'));

        this.draw.add(group);
    }

    table() {
        var table = document.createElement("table");
        // table.setAttribute("border", "1");

        table.appendChild(document.createElement("caption").appendChild(document.createTextNode("Big Head!")).getRootNode());
        var thead = document.createElement("thead");
        // thead.setAttribute("border", "1");
        var tr = document.createElement("tr");

        tr.appendChild(document.createElement('th').appendChild(document.createTextNode("任务")).getRootNode());
        tr.appendChild(document.createElement('th').appendChild(document.createTextNode("开始时间")).getRootNode());
        tr.appendChild(document.createElement('th').appendChild(document.createTextNode("完成时间")).getRootNode());
        tr.appendChild(document.createElement('th').appendChild(document.createTextNode("工时")).getRootNode());
        tr.appendChild(document.createElement('th').appendChild(document.createTextNode("资源")).getRootNode());

        thead.appendChild(tr);
        table.appendChild(thead);

        var tbody = document.createElement("tbody");
        tbody.setAttribute("id", "task")
        // tbody.appendChild(tr);

        table.appendChild(tbody);

        document.getElementById("table").appendChild(table);
    }

    task() {
        var top = 60
        var group = this.draw.group().attr({ 'id': 'task' });
        group.add(this.draw.rect((this.columeWidth + this.vline) * 3, this.barHeight).attr({ x: 0, y: top + 5, fill: '#000011' }))
        group.add(this.draw.line(0, top + this.rowHeight, '100%', top + this.rowHeight).stroke('grey'));
        this.draw.add(group);
    }
    addBar(item) {
        // console.log(item);
        var id = item.id;
        var start = item.start;
        var finish = item.finish;
        var milestone = item.milestone;

        var group = this.draw.group().attr({ 'name': 'task' });
        var x = this.datePosition.get(start);
        var width = this.datePosition.get(finish) - this.datePosition.get(start);
        // + this.columeWidth;
        // console.log(start, finish, x, x1)

        if (milestone) {
            var use = this.draw.use(this.ling).move(x, this.top)
            group.add(use)
        } else {
            group.add(this.draw.rect(width, this.barHeight).attr({ x: x, y: this.top + 5, fill: '#f06', 'id': 'task' + id, 'class': 'taskbar' }).click(function () {
                //     this.stroke({ color: '#ffffff' })
                moveProcess(id);
            }))

            group.add(this.draw.rect(0, this.barHeight - 6).attr({ x: x, y: this.top + 8, fill: '#ffee00', 'id': 'process' + id, 'class': 'process' }).click(function () {
                // this.fill({ color: '#ffffff' })
                moveProcess(id);
            }))
        }
        group.add(this.draw.line(0, this.top + this.rowHeight, '100%', this.top + this.rowHeight).stroke('grey'));
        this.draw.add(group);
        this.top += this.rowHeight;
        document.getElementById("svg").style['height'] = this.top;

        // const container = document.querySelector("#test");
        // const matches = container.querySelectorAll("div.highlighted > p");

        const highlightedItems = document.querySelectorAll("#calendar > rect");

        highlightedItems.forEach((userItem) => {
            userItem.style['height'] = this.top;
            // console.log(userItem);
        });
    }
    initResource(id, name) {
        this.resource.set(id, name)
    }

    changeTask(id) {
        // console.log("------1-----");
        var start = document.getElementById("start" + id).value;
        var finish = document.getElementById("finish" + id).value;
        // console.log(start);

        var x = this.datePosition.get(start);
        var width = gantt.datePosition.get(finish) - this.datePosition.get(start);
        // console.log("x:", x)
        document.getElementById("task" + id).style['x'] = x;
        document.getElementById("task" + id).style['width'] = width;
        // console.log("------2-----");
    }
    addTask(id, name, startDate, finishDate, taskResource) {

        var tr = document.createElement("tr");

        var task = document.createElement('input');
        task.setAttribute("id", "name" + id);
        task.setAttribute("value", name);
        task.addEventListener("focus", function (event) {
            this.style.background = "pink";
        }, true);
        task.addEventListener("change", function (event) {
            var id = parseInt(this.id.replace('name', ''));
            var name = this.value;

            $.ajax({
                method: 'POST',
                url: 'http://localhost:8080/project/change',
                data: JSON.stringify({ id: id, name: name }),
                dataType: 'json',
                contentType: 'application/json',
                success: function (data) {
                    console.log(data);
                },
                error: function (xhr, status, error) {
                    console.log(error);
                }
            });


            this.style.background = "white";
        }, true);
        // 
        // task.appendChild(document.createTextNode("测试").getRootNode())

        var start = document.createElement('input');
        start.setAttribute("id", "start" + id);
        start.setAttribute("type", "date");
        start.setAttribute("min", "2022-01-01");
        start.setAttribute("max", "2024-12-31");
        start.setAttribute("pattern", "\d{4}-\d{2}-\d{2}")
        start.setAttribute("value", startDate);
        // start.addEventListener("focus",  this.changeTask(id,'2022-12-28','2023-01-01'), true);
        // start.addEventListener("focus",  this.test, true);
        start.addEventListener("change", function () {
            this.changeTask(id);
            var startDate = document.getElementById("start" + id).value;
            var finishDate = document.getElementById("finish" + id).value;
            var day = (new Date(finishDate) - new Date(startDate)) / (1 * 24 * 60 * 60 * 1000);
            document.getElementById("duration" + id).value = day;

            var start = startDate;

            $.ajax({
                method: 'POST',
                url: 'http://localhost:8080/project/change',
                data: JSON.stringify({ id: id, start: start }),
                dataType: 'json',
                contentType: 'application/json',
                success: function (data) {
                    console.log(data);
                },
                error: function (xhr, status, error) {
                    console.log(error);
                }
            });


        }.bind(this), false);

        var finish = document.createElement('input')
        finish.setAttribute("id", "finish" + id)
        finish.setAttribute("type", "date")
        finish.setAttribute("min", "2022-01-01");
        finish.setAttribute("max", "2024-12-31");
        finish.setAttribute("pattern", "\d{4}-\d{2}-\d{2}")
        finish.setAttribute("value", finishDate)
        finish.addEventListener("change", function (event) {
            // this.style.background = "pink";
            this.changeTask(id);
            var startDate = document.getElementById("start" + id).value;
            var finishDate = document.getElementById("finish" + id).value;
            var day = (new Date(finishDate) - new Date(startDate)) / (1 * 24 * 60 * 60 * 1000);
            document.getElementById("duration" + id).value = day;

            var finish = finishDate;

            $.ajax({
                method: 'POST',
                url: 'http://localhost:8080/project/change',
                data: JSON.stringify({ id: id, finish: finish }),
                dataType: 'json',
                contentType: 'application/json',
                success: function (data) {
                    console.log(data);
                },
                error: function (xhr, status, error) {
                    console.log(error);
                }
            });
        }.bind(this), true);

        var duration = document.createElement('input');
        duration.setAttribute("id", "duration" + id);
        var day = (new Date(finishDate) - new Date(startDate)) / (1 * 24 * 60 * 60 * 1000);
        // console.log(new Date(finishDate), new Date(startDate), (new Date(finishDate) - new Date(startDate)), (1 * 24 * 60 * 60 * 1000), day);
        duration.setAttribute("value", day);
        duration.setAttribute("size", "2");
        duration.addEventListener('change', function () {
            // this.test(id);
            this.changeTask(id)
            var start = document.getElementById("start" + id).value;
            var finish = document.getElementById("finish" + id).value;
            var duration = document.getElementById("duration" + id).value;
            console.log(start, finish);

            var startDate = new Date(start);
            var finishDate = new Date(startDate.setDate(startDate.getDate() + Number(duration)));
            // console.log(startDate, finishDate, duration);
            var value = finishDate.getFullYear() + '-' + finishDate.getMonth().toString().padStart(2, '0') + '-' + finishDate.getDate().toString().padStart(2, '0');
            // console.log(value)
            document.getElementById("finish" + id).value = value;
        }.bind(this));

        tr.appendChild(document.createElement('td').appendChild(task).getRootNode());
        tr.appendChild(document.createElement('td').appendChild(start).getRootNode());
        tr.appendChild(document.createElement('td').appendChild(finish).getRootNode());
        tr.appendChild(document.createElement('td').appendChild(duration).getRootNode());

        // var resource = document.createElement('select')
        // resource.setAttribute("id", "resource" + id);
        // this.resource.forEach(function (value, key) {
        //     // console.log(value, key)
        //     var option = document.createElement("option");
        //     option.setAttribute("value", key);
        //     option.appendChild(document.createTextNode(value).getRootNode());
        //     resource.appendChild(option);

        // });
        var resource = document.createElement('input');
        resource.setAttribute("type", "text")
        resource.setAttribute("id", "resource" + id)
        resource.setAttribute("name", "resource" + id)
        resource.setAttribute("value", taskResource)
        resource.setAttribute("list", "resourceSuggestion")
        resource.addEventListener("change", function (event) {
            // this.style.background = "pink";
            $.ajax({
                method: 'POST',
                url: 'http://localhost:8080/project/change',
                data: JSON.stringify({ id: id, resource: this.value }),
                dataType: 'json',
                contentType: 'application/json',
                success: function (data) {
                    console.log(data);
                },
                error: function (xhr, status, error) {
                    console.log(error);
                }
            });
        }, true);


        tr.appendChild(document.createElement('td').appendChild(resource).getRootNode());;
        // th.appendChild(task);

        // document.body.appendChild(heading);
        document.getElementById("task").appendChild(tr);


        // moveProcess(id)

    }
    addTaskList(data) {
        // this.taskLists.set()
        // console.log(data);
        const predecessor = document.getElementById("predecessor");

        // var resource = document.createElement('datalist')
        // resource.setAttribute("id", "taskLists");
        data.forEach(function (value, key) {
            console.log(value, key)
            var option = document.createElement("option");
            option.setAttribute("value", value.id);
            option.appendChild(document.createTextNode(value.name).getRootNode());
            predecessor.appendChild(option);
        });
    }

    // form.addEventListener("focus", function( event ) {
    //   event.target.style.background = "pink";
    // }, true);
    // form.addEventListener("blur", function( event ) {
    //   event.target.style.background = "";
    // }, true);

    // 
    // el.addEventListener("click", () => { modifyText("four"); }, false);
}