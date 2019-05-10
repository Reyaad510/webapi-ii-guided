
Async/Await vs Promises


Promise: 

(req, res) => {
    db.find()
    .then(data => {
        res.json(data);
    })
    .catch(err => {
        res.status(500).json({ err })
    })
}

Bad form:
because res.json(data) will run first before db.find() finishes and data risks throwing error which will crash server which is why we use promises or callbacks

(req, res) => {
    const data = db.find();

    res.json(data);
}



Below with async will wait for db.find() before moving to res.json(data)
Use try to catch errors if possible
Try block(used for async await and not promises) is saying if anything throws an error within its brackets instead of crashing server it will catch an error.

Async / Await:

async (req, res) => {
    try {
    const data = await db.find();

    res.json(data);
    } catch(err) {
        res.status(500).json({ err })
    }
}



Query Strings

https://www.google.com/search?q=timer&oq=timer&aqs=chrome..69i57j0l5.577j0j7&sourceid=chrome&ie=UTF-8



q=timer&oq=timer&aqs=chrome..69i57j0l5.577j0j7&sourceid=chrome&ie=UTF-8

EQUALS

{
    q: "timer",
    oq: "timer",
    aqs: "chrome.....",
    ie: "UTF-8"
}

server.get('/search, (req, res) => {
  req.query
});

Look at hubs-model will give page, limit, sortdir, etc

Go to postman and do localhost:4000/api/hubs?limit=5&sortdir=desc&sortby=name

this will change the default limit in hubs-model and do '&' to change another value



