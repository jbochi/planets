var paper, planets;
var dt = 0.01;
var G = 10000;

var update_velocities = function() {
    for (var i in planets) {
        for (var j = 0; j < i; j++) {
            var dx = planets[j].x - planets[i].x;
            var dy = planets[j].y - planets[i].y;
            var r2 = Math.pow(dx, 2) + Math.pow(dy, 2)

            var f = G * planets[i].mass * planets[j].mass / r2;

            var theta = Math.atan(dx / dy);
            var fx = Math.abs(f * Math.sin(theta)) * (dx > 0 ? 1 : -1);
            var fy = Math.abs(f * Math.cos(theta)) * (dy > 0 ? 1 : -1);

            planets[i].velX += fx / planets[i].mass * dt;
            planets[i].velY += fy / planets[i].mass * dt;

            planets[j].velX -= fx / planets[j].mass * dt;
            planets[j].velY -= fy / planets[j].mass * dt;
        }
    }
};

var update_positions = function() {
    for (var i in planets) {
        var planet = planets[i];

        var dx = planet.velX * dt;
        var dy = planet.velY * dt;

        planet.x += dx;
        planet.y += dy;
    }
};


var update_loop = function() {
    update_velocities();
    update_positions();
    draw_planets();
};

var initialize = function() {
    paper = Raphael("canvas", 400, 400);

    //http://phet.colorado.edu/sims/my-solar-system/my-solar-system_en.html
    sun_planet_moon = [
        {
        mass: 200,
        x: 0,
        y: 0,
        velX: 0,
        velY: 0,
        color: "#ccc"},
    {
        mass: 10,
        x: 160,
        y: 0,
        velX: 0,
        velY: 120,
        color: "#cc0"},
    {
        mass: 0.001,
        x: 140,
        y: 0,
        velX: 0,
        velY: 53,
        color: "#c00"}
        ];

    four_star_ballet = [
        {
        mass: 120,
        x: -100,
        y: 100,
        velX: -50,
        velY: -50,
        color: "#ccc"},
    {
        mass: 120,
        x: 100,
        y: 100,
        velX: -50,
        velY: 50,
        color: "#cc0"},
    {
        mass: 120,
        x: 100,
        y: -100,
        velX: 50,
        velY: 50,
        color: "#c00"},
    {
        mass: 120,
        x: -100,
        y: -100,
        velX: 50,
        velY: -50,
        color: "#0cc"}
        ];

    double_double = [
        {
        mass: 60,
        x: -115,
        y: -3,
        velX: 0,
        velY: -155,
        color: "#ccc"},
    {
        mass: 70,
        x: 102,
        y: 0,
        velX: 1,
        velY: 150,
        color: "#cc0"},
    {
        mass: 55,
        x: -77,
        y: -2,
        velX: -1,
        velY: 42,
        color: "#c00"},
    {
        mass: 62,
        x: 135,
        y: 0,
        velX: -1,
        velY: -52,
        color: "#0cc"}
        ];

    planets = sun_planet_moon;


    draw_planets();
    setInterval(update_loop, dt * 1000);
};

var draw_planets = function() {
    //var center = {x: 0, y: 0};
    var center = planets[1];
    for (var i in planets) {
        var planet = planets[i];
        var x = planet.x - center.x + paper.width / 2;
        var y = paper.height / 2 - planet.y + center.y;
        if (planet.circle) {
            planet.circle.remove();
        }

        var radius = Math.max(Math.min(Math.pow(planet.mass, 1 / 3), 5), 2);

        planet.circle = paper.circle(x, y, radius);
        planet.circle.attr({
            fill: planet.color,
            stroke: planet.color
        });

        planet.trace = paper.rect(x, y, 1, 1);
        planet.trace.attr({fill: planet.color, stroke: planet.color});
    }
};

initialize();​