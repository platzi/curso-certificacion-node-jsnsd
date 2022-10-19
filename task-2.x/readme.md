# Task

The `answer.js` file contains the following:

```javascript
'use strict'

const users = {
  admin: {
    password: 'admin',
    role: '67890'
  }
}

function searchUser (user) {
  if (!user || !users[user]) return null

  return users[user]
}
```

Using the Node-core API's or any framework or libraries of your choice, build a web-server listening for requests on the port set in the `PORT` environment variable.

This server should have a single endpoint `/users` responding to GET, returning 404 for other routes and methods.

`/users` should merely allow an URL query parameter called `username`, and respond to these codes managing the following scenarios:

- if `username` is missing - status code 400
- if extra URL query parameters are received - 406
- if the `searhUser` function returns null - 500

If any of the exceptions above do not occur, The endpoint should return the result of the `searchUser` function for the `username` with a status code of 200 along with a json result, in the following format:

```JSON
{
  "username": original username here,
  "result": {
    object result of the searchUser function here
  }
}
```

Finally, configure `package.json` so that `npm start` initializes the service, remember, the service must listen on the port set in the `PORT` environment variable.
**Failure to do so will result in a zero grade.**
