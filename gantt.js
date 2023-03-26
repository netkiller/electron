class Gantt {
    height = 60
    columeWidth = 29
    barHeight = 20
    rowHeight = 30
    vline = 0
    top = 60
    beginDate = '';
    endDate = '';

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
        while ((endTime.getTime() - startTime.getTime()) > 0) {
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
        dateLists.forEach(element => console.log(element));
        // console.log(dateLists);
        dateLists.forEach(date => {
            console.log(date)
            var day = new Date(date).getDate()
            var x = this.columeWidth * (colume) + this.vline;

            // var week = new Date('2023-03-' + day.toString().padStart(2, '0')).getDay();
            var week = new Date(date).getDay();
            if (week == 0 || week == 6) {
                var rect = this.draw.rect(this.columeWidth, 100).attr({ x: x, y: this.rowHeight, fill: '#eeeeee' });
                rect.add(SVG('<title>'+date+'</title>'))
            } else {
                var rect = this.draw.rect(this.columeWidth, 100).attr({ x: x, y: this.rowHeight, fill: '#dddddd' });
                rect.add(SVG('<title>'+date+'</title>'))
            }
            group.add(rect);

            if (week == 0) {
                group.add(this.draw.line(x + this.columeWidth, 0, x + this.columeWidth, this.rowHeight).stroke('grey'));
            }

            // console.log(weeks[week]);

            var text = this.draw.text(weeks[week]).attr({ x: x + 5, y: 20, "text-anchor": "start", "dominant_baseline": 'hanging' });
            group.add(text);
            text = this.draw.text(day).attr({ x: x, y: 53, "font-size": 20 });
            group.add(text);
            this.vline += 1;
            colume += 1;
        }
        );

        group.add(this.draw.line(0, 30, '100%', 30).stroke('grey'))
        group.add(this.draw.line(0, 60, '100%', 60).stroke('grey'));

        this.draw.add(group);
    }


    task() {
        var top = 60
        var group = this.draw.group().attr({ 'id': 'task' });
        group.add(this.draw.rect((this.columeWidth + this.vline) * 3, this.barHeight).attr({ x: 0, y: top + 5, fill: '#000011' }))
        group.add(this.draw.line(0, top + this.rowHeight, '100%', top + this.rowHeight).stroke('grey'));
        this.draw.add(group);
    }
    addTask() {
        var group = this.draw.group().attr({ 'id': 'task' });
        group.add(this.draw.rect((this.columeWidth + this.vline) * 3, this.barHeight).attr({ x: 0, y: this.top + 5, fill: '#000011' }))
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
}