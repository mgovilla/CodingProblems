var query = function () {
    // Returns an object that has select, from, where, orderBy, groupBy, having, and execute
    let q = new Object();

    q.select = function (selector) {
        if (q.selector != undefined) throw new Error('Duplicate SELECT');

        if (selector == undefined) selector = u => u;
        q.selector = selector;

        return q;
    }

    q.from = function (...tables) {
        if (q.tables != undefined) throw new Error('Duplicate FROM');
        q.tables = tables;
        return q
    }

    q.where = function (...filter) {
        // if this is the first where, create a new empty filters array
        if (q.filters == undefined) q.filters = [];

        // if there are multiple arguments, they are treated as logical OR
        q.filters.push(u => filter.filter(p => p(u)).length > 0);
        return q;
    }

    q.orderBy = function (order) {
        if (q.order != undefined) throw new Error('Duplicate ORDERBY');
        q.order = order;
        return q;
    }

    q.groupBy = function (...groups) {
        if (q.groups != undefined) throw new Error('Duplicate GROUPBY');
        q.groups = groups;
        return q;
    }

    q.having = function (havingClause) {
        if (q.groups == undefined) throw new Error('Must have Group for Having Filter');
        q.havingClause = havingClause;
        return q;
    }

    q.execute = function () {
        var out = [];
        // From, Where, Group by, Having, Select, then Order by
        // able to omit from or select
        if (q.tables == undefined) q.tables = [[]]
        if (q.selector == undefined) q.selector = u => u;

        // create the joined table
        var table = q.tables[0]
        if (q.tables.length > 1) {
            // Cartesian Product ...q.tables
            let f = (a, b) => [].concat(...a.map(a => b.map(b => [].concat(a, b))));
            let cartesian = (a, b, ...c) => b ? cartesian(f(a, b), ...c) : a;
            table = cartesian(...q.tables);
        }

        // resolve where
        var filtered = q.filters ? filtered = table.filter(o => q.filters.filter(c => c(o)).length == q.filters.length) : table;

        // resolve group
        var grouped = q.groups ? createGroups(q.groups, filtered) : filtered;

        // resolve having
        var groupFiltered = q.havingClause ? grouped.filter(p => q.havingClause(p)) : grouped;

        // resolve select
        out = groupFiltered.map(o => q.selector(o));

        // resolve order
        if (q.order)
            out.sort(q.order)

        return out
    }

    return q;
};

// Function to group objects based on a set of predicates recursively
function createGroups(predicates, objects) {
    // Base case
    if (predicates.length == 0) return objects
    let p = predicates[0];

    // Create Map for groups
    let g = new Map();
    for (o of objects) {
        if (g.has(p(o)))
            g.get(p(o)).push(o);
        else
            g.set(p(o), [o]);
    }

    // For each of the values, turn them into groups of the next level
    for (key of g.keys())
        g.set(key, createGroups(predicates.slice(1), g.get(key)))

    return Array.from(g.entries())
}