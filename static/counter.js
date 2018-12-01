// Setup the app with its default properties
var counterApp = new Reef('div#counter', {
    data: {
        metal: 0,
        metalsmith: 0,
    },
    template: function (props) {
        return '<b>Metalsmiths: </b> ' + props.metalsmith + '<br>' +
        '<b>Metal: </b>' + props.metal
            
    }
});

// Update the counter every 1s but re-render every 200ms
// Refreshing every 200ms felt smoother when rapid clicking the Create Metalsmith button
function startCounter() {
    window.setInterval(function () {
        counterApp.data.metal += 1 * counterApp.data.metalsmith;
    }, 1000);

    window.setInterval(function () {
        counterApp.render(0);
    }, 200);
}

// Allow creating of more "Metalsmiths" by clicking the button
window.addEventListener('click', function(event) {
    if (event.target.matches('button#MetalMultiplier')) {
        counterApp.data.metalsmith += 1
    }
});

// Render and start the counter immediately even though both props start at 0
counterApp.render();
startCounter();
