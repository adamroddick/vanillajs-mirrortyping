// Setup the app with its default properties
var counterApp = new Reef('div#counter', {
    data: {
        metal: {
            resourcename: 'metal',
            counter: 0,
            worker: 0,
            workername: 'Metalsmiths',
            workercost: 10,
            multiplier: 1,
            }        
        },
    template: function (props) {
        return '<b>' + props.metal.workername + ': </b> ' + props.metal.worker + '<br>' +
        '<b>' + props.metal.resourcename + ': </b>' + props.metal.counter + '<br>' +
        '<b>' + props.metal.resourcename + 'p/s: ' + calculatePerSecond(props.metal) + '</b>' 

    }
});

// Calculating metal per second
// TODO: Use this calculation in the Counter function instead of calcing manually?
function calculatePerSecond(resource) {
    return resource.worker * resource.multiplier
} 

// Update the counter every 1s but re-render every 200ms
// Refreshing every 200ms felt smoother when rapid clicking the Create Metalsmith button
function startCounter() {
    window.setInterval(function () {
        counterApp.data.metal.counter += counterApp.data.metal.multiplier * counterApp.data.metal.worker;
    }, 1000);

    window.setInterval(function () {
        counterApp.render(0);
    }, 100);
}

// Write a log entry
// TODO: update this to load from an array of log entries we can store in localStorage or something
function writeLog(logString) {

    var htmlElement = document.querySelector('tbody#logtable')
    var date = new Date().toLocaleDateString();
    var time = new Date().toLocaleTimeString();

    var col1 = '<td>' + logString + '</td>'
    var col2 = '<td>' + date + ' - ' + time + '</td>'

    htmlElement.innerHTML += '<tr>' + col1 + col2 + '</tr>'

}

// Allow creating of more "Metalsmiths" by clicking the button
window.addEventListener('click', function(event) {
    if (event.target.matches('button#getmetalworker')) {
        if (counterApp.data.metal.counter >= counterApp.data.metal.workercost) {
            counterApp.data.metal.counter -= counterApp.data.metal.workercost
            counterApp.data.metal.workercost = Math.round(counterApp.data.metal.workercost * 1.5)
            counterApp.data.metal.worker += 1
            writeLog('Created a Metalsmith.')
        }
        else {
            console.log('Insufficient resources to buy worker.')
        }
    }
// Allow single resource creation manually to get started
    if (event.target.matches('button#getmetal')) {
        console.log(event.target.test)
        counterApp.data.metal.counter += 1
    }
});

// Render and start the counter immediately even though both props start at 0
counterApp.render();
startCounter();
