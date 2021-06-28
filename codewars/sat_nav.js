function satNav(directions) {
    // Your code here!
    let headings = ['NORTH', 'EAST', 'SOUTH', 'WEST'];
    let loc = { x: 0, y: 0, h: 0 };
    for (dir of directions) {
        if (dir == 'You have reached your destination!') break;
        console.log(dir)

        var heading_regex = /Head (\w+)/g;
        var turn_regex = /Take the (\w+) (\w+)/g;
        var straight_m_regex = /Go straight on for (\d+\.?\d*)m/g;
        var straight_km_regex = /Go straight on for (\d+\.?\d*)km/g;

        var match;
        if (dir == 'Turn around!') {
            loc.h = (loc.h + 2) % 4;

        } else if ((match = heading_regex.exec(dir)) !== null) {
            loc.h = headings.findIndex(h => h == match[1]);

        } else if ((match = turn_regex.exec(dir)) !== null) {
            let num = match[1] == 'NEXT' ? 1.0 : match[1].slice(0, match[1].length - 2); // since st, rd, nd, and th all have 2 letters
            let head = match[2] == 'LEFT' ? (loc.h + 3) % 4 : (loc.h + 1) % 4
            straight(num, loc);
            loc.x = loc.h == 1 ? Math.floor(loc.x) : Math.ceil(loc.x);
            loc.y = loc.h == 0 ? Math.floor(loc.y) : Math.ceil(loc.y);
            loc.h = head;

        } else if ((match = straight_m_regex.exec(dir)) !== null) {
            straight(match[1] / 1000.0, loc);

        } else if ((match = straight_km_regex.exec(dir)) !== null) {
            straight(match[1], loc);

        }


        console.log(loc)
    }
    return [Math.round(loc.x * 10) + 0, Math.round(loc.y * 10) + 0]
}

function straight(dist, loc) {
    if (loc.h % 2 == 1)
        loc.x += (2 - loc.h) * dist
    else
        loc.y += (1 - loc.h) * dist
    
    loc.x = Number(loc.x.toFixed(2));
    loc.y = Number(loc.y.toFixed(2));
}

let directions = ['Head SOUTH',
    'Turn around!',
    'Take the 2nd LEFT',
    'Turn around!',
    'Take the NEXT RIGHT',
    'Take the 5th LEFT',
    'Go straight on for 2.0km',
    'Go straight on for 800m',
    'Go straight on for 400m',
    'Turn around!',
    'Take the 3rd RIGHT',
    'Go straight on for 100m',
    'Go straight on for 400m',
    'Go straight on for 3.1km',
    'Take the 3rd RIGHT',
    'Go straight on for 4.1km',
    'Take the 5th LEFT',
    'Go straight on for 800m',
    'Take the 3rd LEFT',
    'Go straight on for 400m',
    'Go straight on for 700m',
    'Go straight on for 3.1km',
    'Go straight on for 500m',
    'Go straight on for 300m',
    'Take the 5th RIGHT',
    'Go straight on for 100m',
    'Turn around!',
    'Take the NEXT RIGHT',
    'Take the 5th LEFT',
    'Turn around!',
    'Go straight on for 3.1km',
    'Take the 5th RIGHT',
    'Take the 5th RIGHT',
    'Go straight on for 4.2km',
    'Go straight on for 700m',
    'Take the 5th LEFT',
    'Take the 5th LEFT',
    'Take the 2nd RIGHT',
    'Go straight on for 700m',
    'Go straight on for 3.9km',
    'Go straight on for 900m',
    'Take the 5th LEFT',
    'Turn around!',
    'Turn around!',
    'Go straight on for 2.4km',
    'Turn around!',
    'Go straight on for 900m',
    'Take the 2nd RIGHT',
    'Go straight on for 500m',
    'Take the 5th LEFT',
    'Take the 3rd RIGHT',
    'Take the NEXT RIGHT',
    'Take the 5th LEFT',
    'Turn around!',
    'Take the NEXT LEFT',
    'Go straight on for 100m',
    'Take the 4th LEFT',
    'You have reached your destination!'];

console.log(satNav(directions))
