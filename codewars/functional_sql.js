var query = function() {
    // Returns an object that has select, from, where, orderBy, groupBy, having, and execute
    
    let q = new Object();
    q.operations = [];
    
    q.select = function(selector) {
        // selector is a function that will get applied on each result to get only the data we need
        q.operations.push('select');
        
        // Check if the selector was already chosen
        if(q.selector != undefined) throw "Duplicate SELECT";

        // Check if a method was passed in, otherwise return all fields
        if(selector == undefined) selector = u => u;
        q.selector = selector;
        return q;
    }
    
    q.from = function(array) {
        q.operations.push('from');

        // Check if the selector was already chosen
        if(q.table != undefined) throw "Duplicate FROM";

        q.table = array;
        return q;
    }
    
    q.where = function(whereClause) {
        q.operations.push('where');

        q.whereClause = whereClause;

        return q;
    }
    
    q.orderBy = function(orderClause) {
        q.operations.push('order');

        q.orderClause = orderClause;

        return q;
    }
    
    q.groupBy = function(groupClause) {
        q.operations.push('group');

        q.groupClause = groupClause;

        return q;
    }
    
    q.having = function(havingClause) {
        q.operations.push('having');

        q.havingClause = havingClause;

        return q;
    }
    
    q.execute = function() {
        console.log(q.operations)
        // Execute based on this order: From, Where, Group By, Having, Select, Order By
        // if there are multiple tables that need to be joined
        if(q.joinRequired)
        return q.table.map (q.selector)
    }
     
    return q;
    
};

var persons = [
    {name: 'Peter', profession: 'teacher', age: 20, maritalStatus: 'married'},
    {name: 'Michael', profession: 'teacher', age: 50, maritalStatus: 'single'},
    {name: 'Peter', profession: 'teacher', age: 20, maritalStatus: 'married'},
    {name: 'Anna', profession: 'scientific', age: 20, maritalStatus: 'married'},
    {name: 'Rose', profession: 'scientific', age: 50, maritalStatus: 'married'},
    {name: 'Anna', profession: 'scientific', age: 20, maritalStatus: 'single'},
    {name: 'Anna', profession: 'politician', age: 50, maritalStatus: 'married'}
];

console.log(query().select(u => u.profession).from(persons).execute());
query().select().select().execute();