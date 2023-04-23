class Gantt {
    height = 60
    columeWidth = 29
    barHeight = 20
    rowHeight = 30
    vline = 0
    top = 90
    beginDate = '';
    endDate = '';
    datePosition = new Map();
    resource = new Map();
    trailsPosition = new Map();
    tasks = [];

    draw = SVG().addTo('#chart').size(31 * this.columeWidth, this.height).attr({ 'id': 'svg' });
    constructor(beginDate, endDate) {
        this.beginDate = beginDate;
        this.endDate = endDate;
        this.drawPredecessorGroup = this.draw.group().attr({ 'id': 'predecessorGroup' });
        this.ling = this.draw.defs().polygon('15,0 0,15 15,30 30,15').fill('black').stroke({ width: 1 })
        // this.arrow = this.draw.defs().marker(10, 10, function (add) {
        //     add.path("M 0 0 L 10 5 L 0 10 z")
        // })
    }
    initTasks(tasks) {
        // console.log(tasks);
        this.tasks = tasks;
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
            if (day == 1) {
                group.add(this.draw.line(x, 0, x, "100%").stroke('black'));
                group.add(this.draw.text(date).attr({ x: x + 6, y: 20, "text-anchor": "start", "dominant_baseline": 'hanging' }));
            }
            var week = new Date(date).getDay();
            if (week == 0 || week == 6) {
                var rect = this.draw.rect(this.columeWidth, 100).attr({ x: x, y: this.rowHeight * 2, fill: '#eeeeee' });
                rect.add(SVG('<title>' + date + '</title>'))
            } else {
                var rect = this.draw.rect(this.columeWidth, 100).attr({ x: x, y: this.rowHeight * 2, fill: '#dddddd' });
                rect.add(SVG('<title>' + date + '</title>'))
            }
            group.add(rect);

            if (week == 0) {
                group.add(this.draw.line(x + this.columeWidth + 1, this.rowHeight, x + this.columeWidth + 1, "100%").stroke('#555555'));
            }

            var text = this.draw.text(weeks[week]).attr({ x: x + 6, y: 20 + this.rowHeight, "text-anchor": "start", "dominant_baseline": 'hanging' });
            group.add(text);
            var xOffset = 5;
            if (day < 10) {
                xOffset = 10;
            }
            text = this.draw.text(day).attr({ x: x + xOffset, y: 53 + this.rowHeight, "font-size": 20 });
            group.add(text);
            this.vline += 1;
            colume += 1;
        });

        group.add(this.draw.line(0, 0, '100%', 0).stroke('grey'));
        group.add(this.draw.line(0, 30, '100%', 30).stroke('grey'))
        group.add(this.draw.line(0, 60, '100%', 60).stroke('grey'));
        group.add(this.draw.line(0, 90, '100%', 90).stroke('grey'));

        group.add(this.draw.line(1, 0, 1, "100%").stroke('grey'));
        group.add(this.draw.line("100%", 0, "100%", "100%").stroke('grey'));

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
        tr.appendChild(document.createElement('th').appendChild(document.createTextNode("前置任务")).getRootNode());
        tr.appendChild(document.createElement('th').appendChild(document.createTextNode("父任务")).getRootNode());

        thead.appendChild(tr);
        table.appendChild(thead);

        var tbody = document.createElement("tbody");
        tbody.setAttribute("id", "task")
        // tbody.appendChild(tr);

        table.appendChild(tbody);

        document.getElementById("table").appendChild(table);
    }
    done() {
        this.draw.add(this.drawPredecessorGroup);
    }
    task() {
        var group = this.draw.group().attr({ 'id': 'task' });
        group.add(this.draw.rect((this.columeWidth + this.vline) * 3, this.barHeight).attr({ x: 0, y: this.top + 5, fill: '#000011' }))
        group.add(this.draw.line(0, this.top + this.rowHeight, '100%', this.top + this.rowHeight).stroke('grey'));
        this.draw.add(group);
    }
    addBar(item) {
        // console.log(item);
        var id = item.id;
        var start = item.start;
        var finish = item.finish;
        var milestone = item.milestone;
        var parent = item.parent;

        var group = this.draw.group().attr({ 'name': 'task' });
        var x = this.datePosition.get(start);
        var width = this.datePosition.get(finish) - this.datePosition.get(start);
        // + this.columeWidth;
        var position = new Map();
        position.set('x', x);
        position.set('y', this.top);
        position.set('width', width);
        this.trailsPosition.set(id, position)
        // console.log(start, finish, x, x1)
        // console.log(parent)
        if (milestone) {
            var use = this.draw.use(this.ling).move(x, this.top).attr({ 'id': 'task' + id })
            group.add(use)
        }
        else if (parent == true) {
            // <path d="M 0 0 V 50 L 25 25 H 300 L 325 50 V 350 0" />
            var y = parseInt(this.top);
            var x = parseInt(x);
            var width = x + width + 19;
            var path = 'M ' + (x + 1) + ' ' + (y + 5) + ' V ' + (y + 25) + ' L ' + (x + 10) + ' ' + (y + 15) + ' H ' + (width) + ' L ' + (width + 10) + ' ' + (y + 25) + ' V ' + (y + 5) + ' H ' + (x);
            group.add(this.draw.path(path).attr({ 'id': 'task' + id }))
        }
        else {
            group.add(this.draw.rect(width + this.columeWidth - 1, this.barHeight).attr({ x: x, y: this.top + 5, fill: '#f06', 'id': 'task' + id, 'class': 'taskbar' }).click(function () {
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
    initResource(data) {
        // this.resource.set(id, name)
        // console.log(data)
        var resource = document.getElementById('resourceSuggestion')
        // resource.setAttribute("id", "resource" + id);
        data.forEach(function (value) {
            var option = document.createElement("option");
            // option.setAttribute("value", value);
            option.appendChild(document.createTextNode(value).getRootNode());
            resource.appendChild(option);
        });
    }

    addTask(item) {

        var id = item.id;
        var name = item.name;
        // var start = item.start;
        // var finish = item.finish;
        // var resource = item.resource;

        var tr = document.createElement("tr");

        var task = document.createElement('input');
        task.setAttribute("id", "name" + id);
        task.setAttribute("value", item.name);
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
        start.setAttribute("value", item.start);
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

            $.getJSON('http://localhost:8080/project/get/' + id, function (data) {
                // console.log(data.id, data.predecessor)
                this.linkPredecessor(data.id, data.predecessor);
            }.bind(this));

        }.bind(this), false);

        var finish = document.createElement('input')
        finish.setAttribute("id", "finish" + id)
        finish.setAttribute("type", "date")
        finish.setAttribute("min", "2022-01-01");
        finish.setAttribute("max", "2024-12-31");
        finish.setAttribute("pattern", "\d{4}-\d{2}-\d{2}")
        finish.setAttribute("value", item.finish)
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
            $.getJSON('http://localhost:8080/project/get/next/' + id, function (data) {
                // console.log(data);
                $.each(data, function (id, item) {
                    // console.log(item.id, item.predecessor)
                    this.linkPredecessor(item.id, item.predecessor);
                }.bind(this));
            }.bind(this));
        }.bind(this), true);

        var duration = document.createElement('input');
        duration.setAttribute("id", "duration" + id);
        var day = (new Date(item.finish) - new Date(item.start)) / (1 * 24 * 60 * 60 * 1000) + 1;
        // console.log(new Date(finishDate), new Date(startDate), (new Date(finishDate) - new Date(startDate)), (1 * 24 * 60 * 60 * 1000), day);
        duration.setAttribute("value", day);
        duration.setAttribute("size", "2");
        duration.setAttribute("type", "number");
        duration.setAttribute("min", "1");
        duration.setAttribute("max", "31");
        duration.addEventListener('change', function () {

            var start = document.getElementById("start" + id).value;
            var duration = document.getElementById("duration" + id).value;
            // console.log(start, finish);

            var finishDate = new Date(start);
            finishDate.setDate(finishDate.getDate() + Number(duration - 1));
            // finish = new Date(finishDate.setDate(finishDate.getDate() + Number(duration)));
            // console.log(start, finishDate.getMonth(), finish, duration);
            var month = finishDate.getMonth() + 1
            var value = finishDate.getFullYear() + '-' + month.toString().padStart(2, '0') + '-' + finishDate.getDate().toString().padStart(2, '0');
            console.log(value)
            document.getElementById("finish" + id).value = value;
            this.changeTask(id)

            var finish = document.getElementById("finish" + id).value;
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

            $.getJSON('http://localhost:8080/project/get/next/' + id, function (data) {
                // console.log(data);
                $.each(data, function (id, item) {
                    // console.log(item.id, item.predecessor)
                    this.linkPredecessor(item.id, item.predecessor);
                }.bind(this));
            }.bind(this));

        }.bind(this));

        var resource = document.createElement('input');
        resource.setAttribute("type", "text")
        resource.setAttribute("id", "resource" + id)
        resource.setAttribute("name", "resource" + id)
        resource.setAttribute("value", item.resource)
        resource.setAttribute("list", "resourceSuggestion")
        resource.setAttribute("size", "10")
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
        // console.log(item)
        var predecessor = document.createElement('select');
        predecessor.setAttribute("id", "predecessor" + id)
        predecessor.setAttribute("name", "predecessor" + id)
        var option = document.createElement("option");
        option.setAttribute("value", "null");
        option.appendChild(document.createTextNode("-- 无 --").getRootNode());
        predecessor.appendChild(option);
        this.tasks.forEach(function (value, key) {
            var option = document.createElement("option");
            option.setAttribute("value", value.id);
            if (item.predecessor != null && item.predecessor == value.id) {
                // console.log("predecessor:", item.predecessor, value.id)
                option.setAttribute("selected", true);
            }

            option.appendChild(document.createTextNode(value.name).getRootNode());
            predecessor.appendChild(option);
        });

        predecessor.addEventListener("change", function (event) {

            var pid = document.getElementById("predecessor" + id).value;
            this.linkPredecessor(id, Number(pid));
            $.ajax({
                method: 'POST',
                url: 'http://localhost:8080/project/change',
                data: JSON.stringify({ id: id, predecessor: pid }),
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

        var parent = document.createElement('select');
        parent.setAttribute("id", "parent" + id)
        parent.setAttribute("name", "parent" + id)
        var option = document.createElement("option");
        option.setAttribute("value", "null");
        option.appendChild(document.createTextNode("-- 无 --").getRootNode());
        parent.appendChild(option);
        this.tasks.forEach(function (value, key) {
            var option = document.createElement("option");
            option.setAttribute("value", value.id);
            if (item.project != null && item.project.id == value.id) {
                // console.log("predecessor:", item.project.id, value.id)
                option.setAttribute("selected", true);
            }

            option.appendChild(document.createTextNode(value.name).getRootNode());
            parent.appendChild(option);
        });
        parent.addEventListener("change", function (event) {
            //     // this.style.background = "pink";
            $.ajax({
                method: 'POST',
                url: 'http://localhost:8080/project/change',
                data: JSON.stringify({ id: id, project: { id: this.value } }),
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

        tr.appendChild(document.createElement('td').appendChild(task).getRootNode());
        tr.appendChild(document.createElement('td').appendChild(start).getRootNode());
        tr.appendChild(document.createElement('td').appendChild(finish).getRootNode());
        tr.appendChild(document.createElement('td').appendChild(duration).getRootNode());
        tr.appendChild(document.createElement('td').appendChild(resource).getRootNode());;
        tr.appendChild(document.createElement('td').appendChild(predecessor).getRootNode());;
        tr.appendChild(document.createElement('td').appendChild(parent).getRootNode());;
        // th.appendChild(task);
        // document.body.appendChild(heading);
        document.getElementById("task").appendChild(tr);
    }
    changeTask(id) {
        var start = document.getElementById("start" + id).value;
        var finish = document.getElementById("finish" + id).value;
        // console.log(start,finish);
        var x = this.datePosition.get(start);
        var width = this.datePosition.get(finish) - this.datePosition.get(start);
        // console.log(start, finish, "x:", x, "width:", width)
        var task = document.getElementById("task" + id);
        task.setAttribute("x", x);
        task.style['width'] = width + this.columeWidth - 1;

        var position = this.trailsPosition.get(id);
        // console.log(position);
        position.set('x', x);
        position.set('width', width);
        this.trailsPosition.set(id, position);
        // console.log("------2-----");
    }
    addTaskList(data) {
        // this.taskLists.set()
        // console.log(data);
        const predecessor = document.getElementById("predecessor");
        const parent = document.getElementById("parent");
        // var resource = document.createElement('datalist')
        // resource.setAttribute("id", "taskLists");
        data.forEach(function (value, key) {
            // console.log(value, key)
            var option = document.createElement("option");
            option.setAttribute("value", value.id);
            option.appendChild(document.createTextNode(value.name).getRootNode());
            predecessor.appendChild(option);
        });
        data.forEach(function (value, key) {
            // console.log(value, key)
            var option = document.createElement("option");
            option.setAttribute("value", value.id);
            option.appendChild(document.createTextNode(value.name).getRootNode());
            parent.appendChild(option);
        });

    }
    linkPredecessor(id, predecessor) {
        // console.log(this.trailsPosition);
        console.log(id, predecessor);
        // var position = this.trailsPosition;

        var parent = this.trailsPosition.get(predecessor)
        var current = this.trailsPosition.get(id)
        console.log(parent, current);

        if (parent) {
            $("#linkPredecessor" + id).remove();
            var polyline = this.draw.polyline([[parseInt(parent.get("x") + parent.get('width') + this.columeWidth), parseInt(parent.get("y") + 15)], [parseInt(current.get('x') + 15), parseInt(parent.get('y') + 15)], [parseInt(current.get('x') + 15), parseInt(current.get('y') - 5)]]).fill('none').stroke('black').attr({ 'id': 'linkPredecessor' + id, 'stroke-width': 1 }).marker('end', 10, 10, function (add) {
                add.path("M 0 0 L 10 5 L 0 10 z");
                // add.path("M 0 2 L 5 5 L 0 8 z");

            });
            this.drawPredecessorGroup.add(polyline);
        }
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