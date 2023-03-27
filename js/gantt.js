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

    // var draw = SVG().addTo('body')
    // .size(300, 300)
    draw = SVG().addTo('#chart').size(31 * this.columeWidth, this.height).attr({ 'id': 'svg' });
    constructor(beginDate, endDate) {
        this.beginDate = beginDate;
        this.endDate = endDate;
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
    addBar(id, start, finish) {
        var group = this.draw.group().attr({ 'name': 'task' });
        var x = this.datePosition.get(start);
        var width = this.datePosition.get(finish) - this.datePosition.get(start);
        // + this.columeWidth;
        // console.log(start, finish, x, x1)

        group.add(this.draw.rect(width, this.barHeight).attr({ x: x, y: this.top + 5, fill: '#f06', 'id': 'task' + id, 'class': 'taskbar' }).click(function () {
            //     this.stroke({ color: '#ffffff' })
            moveProcess(id);
        }))

        group.add(this.draw.rect(0, this.barHeight - 6).attr({ x: x, y: this.top + 8, fill: '#ffee00', 'id': 'process' + id, 'class': 'process' }).click(function () {
            // this.fill({ color: '#ffffff' })
            moveProcess(id);
        }))
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

    test(id) {
        console.log("ssssss" + id);
    }
    changeTask(id) {
        console.log("------1-----");
        var start = document.getElementById("start" + id).value;
        var finish = document.getElementById("finish" + id).value;
        console.log(start);

        var x = this.datePosition.get(start);
        var width = gantt.datePosition.get(finish) - this.datePosition.get(start);
        console.log("x:", x)
        document.getElementById("task" + id).style['x'] = x;
        document.getElementById("task" + id).style['width'] = width;
        console.log("------2-----");
    }
    addTask(id, name, start, finish) {


        var tr = document.createElement("tr");

        var task = document.createElement('input');
        task.setAttribute("id", "name" + id);
        task.setAttribute("value", name);
        task.addEventListener("focus", function (event) {
            this.style.background = "pink";
        }, true);
        // 
        // task.appendChild(document.createTextNode("测试").getRootNode())

        var start = document.createElement('input')
        start.setAttribute("id", "start" + id)
        start.setAttribute("type", "date")
        start.setAttribute("value", start);
        // start.addEventListener("focus",  this.changeTask(id,'2022-12-28','2023-01-01'), true);
        // start.addEventListener("focus",  this.test, true);
        start.addEventListener("change", function () {
            this.changeTask(id);

        }.bind(this), false);

        var finish = document.createElement('input')
        finish.setAttribute("id", "finish" + id)
        finish.setAttribute("type", "date")
        finish.setAttribute("value", finish)
        finish.addEventListener("change", function (event) {
            // this.style.background = "pink";
            this.changeTask(id);
        }.bind(this), true);

        var duration = document.createElement('input');
        duration.setAttribute("id", "duration" + id);
        duration.setAttribute("value", "5")
        duration.setAttribute("size", "2")
        duration.addEventListener('click', function () {
            // console.log(this); // 预期输出：'Data'
            this.test(id);
            this.changeTask(id)
        }.bind(this));

        tr.appendChild(document.createElement('td').appendChild(task).getRootNode());
        tr.appendChild(document.createElement('td').appendChild(start).getRootNode());
        tr.appendChild(document.createElement('td').appendChild(finish).getRootNode());
        tr.appendChild(document.createElement('td').appendChild(duration).getRootNode());

        var resource = document.createElement('select')
        resource.setAttribute("id", "resource" + id);
        var option = document.createElement("option");
        option.setAttribute("value", "Neo");
        option.appendChild(document.createTextNode("Volvo").getRootNode())

        resource.appendChild(option);

        tr.appendChild(document.createElement('td').appendChild(resource).getRootNode());;
        // th.appendChild(task);

        // document.body.appendChild(heading);
        document.getElementById("task").appendChild(tr);


        // moveProcess(id)

    }

    // var form = document.getElementById("form");
    // form.addEventListener("focus", function( event ) {
    //   event.target.style.background = "pink";
    // }, true);
    // form.addEventListener("blur", function( event ) {
    //   event.target.style.background = "";
    // }, true);

    // const el = document.getElementById("outside");
    // el.addEventListener("click", () => { modifyText("four"); }, false);
}