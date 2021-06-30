function SQLEngine(database) {

  this.execute = function (query) {
    // parse the query
    let selectors = query.match(/SELECT (\w+.\w+(?:, \w+.\w+)*)/i)[1].split(', ')
    // console.log(selectors)

    let table = query.match(/FROM (\w+)/i)[1]
    // console.log(table)
    let joinRE = /JOIN (\w+) ON (\w+\.\w+) ?= ?(\w+\.\w+) ?/ig;
    let joins = [];
    let m;
    while(m = joinRE.exec(query)) {
      joins.push({table: m[1], cols: [m[2], m[3]]})
    }

    // let joins = [...query.matchAll(/JOIN (\w+) ON (\w+\.\w+) ?= ?(\w+\.\w+) ?/ig)].map(m => {
    //   return {table: m[1], cols: [m[2], m[3]]}
    // })

    let where = query.match(/WHERE (\w+\.\w+) ?([<>=]+) ?(.*) ?/i)
    var whereObj = undefined
    if (where != null) {
      whereObj = {col: where[1], operations: where[2], value: where[3].startsWith("'") && where[3].endsWith("'") ? where[3].slice(1, -1).replace("''", "'") : where[3]}
    }


    // From, Where, Select
    // Execute from:
    // Sort each table based on the value
    let data = database[table].map(o => objectFromEntries(Object.entries(o).map(([key, value]) => [table+'.'+key, value])))
    if (joins.length != 0) {
      // console.log('Joining tables');
      for(let join of joins) {
        // get the columns to sort by
        let [ogCol, newCol] = join.cols[0].startsWith(join.table + '.') ? join.cols.reverse() : join.cols

        data.sort(sortFun(ogCol))

        newTable = database[join.table].map(o => objectFromEntries(Object.entries(o).map(([key, value]) => [join.table+'.'+key, value])))
        newTable.sort(sortFun(newCol))

        let joined = []
        let j = 0;
        let [shorter, longer] = data.length < newTable.length ? [{table: data, col: ogCol}, {table: newTable, col: newCol}] : [{table: newTable, col: newCol}, {table: data, col: ogCol}]

        for(row of shorter.table) {
          while(j < longer.table.length && longer.table[j][longer.col] == row[shorter.col]) {
            // console.log(newTable[i][newCol]);
            joined.push(Object.assign({}, row, longer.table[j]))
            j++
          }
          // console.log(row);
        }
        data = joined
      }
    }

    var filtered = data
    if (whereObj != undefined) {
      filtered = filtered.filter(o => whereObj.operations.split('').filter(c => compare(o[whereObj.col], c, whereObj.value)).length > 0)
    }

    let selectCond = (o) => {
      var out = new Object()
      selectors.forEach(v => out[v] = o[v])
      return out
    }
    // if there was a join, the data can be accessed with o[movies.title]
    return filtered.map(selectCond)

  }

  function objectFromEntries(entries) {
    let o = new Object();
    entries.forEach(([k, v]) => o[k] = v);
    return o
  }

  function sortFun(field) {
    return (a,b) => typeof a[field] == 'number' ? a[field] - b[field] : a[field].localeCompare(b[field])
  }

  function compare(field, comparator, value) {
    switch (comparator) {
      case '>':
        return field > value
      case '<':
        return field < value
      case '=':
        return field == value
      default: throw new Error('Unrecognized symbol')
    }
  }
}


var movieDatabase = {
  movie: [
    { id: 1, name: 'Avatar', directorID: 1 },
    { id: 2, name: 'Titanic', directorID: 1 },
    { id: 3, name: 'Infamous', directorID: 2 },
    { id: 4, name: 'Skyfall', directorID: 3 },
    { id: 5, name: 'Aliens', directorID: 1 }
  ],
  actor: [
    { id: 1, name: 'Leonardo DiCaprio' },
    { id: 2, name: 'Sigourney Weaver' },
    { id: 3, name: 'Daniel Craig' },
  ],
  director: [
    { id: 2, name: 'Douglas McGrath' },
    { id: 1, name: 'James Cameron' },
    { id: 3, name: 'Sam Mendes' }
  ],
  actor_to_movie: [
    { movieID: 1, actorID: 2 },
    { movieID: 2, actorID: 1 },
    { movieID: 3, actorID: 2 },
    { movieID: 3, actorID: 3 },
    { movieID: 4, actorID: 3 },
    { movieID: 5, actorID: 2 },
  ]
};

let s = new SQLEngine(movieDatabase);
// console.log(s.execute("SELECT movie.name, actor.name FROM movie JOIN actor_to_movie ON actor_to_movie.movieID = movie.id JOIN actor ON actor_to_movie.actorID = actor.id WHERE actor.name <> 'Daniel Craig'"))
console.log(s.execute("SELECT movie.name, director.name FROM director JOIN movie ON director.id = movie.directorID"))
