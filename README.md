# Sails.js Url Shortener

A demo project for the sake of learning Sails.

## Setup

```
$ Pray to the God of Entropy
$ cd vagrant
$ vagrant up
$ vagrant ssh
$ sudo apt-get install mysql-server // root no password
$ mysql -u root -e "CREATE DATABASE shortener"
$ cd /var/www
$ chmod u+x node_modules/sails/bin/sails.js
$ node_modules/sails/bin/sails.js lift
```

## API Calls

Adding a URL:

` POST: http://192.168.33.11:1337/api/v1/url.json; BODY: { "path": "http://google.com"} `

Retrieving a URL:

` GET: http://192.168.33.11:1337/api/v1/url/10.json `

Response:

```
{
  "active": "ACTIVE",
  "id": 10,
  "created": "2016-01-08T05:29:52.000Z",
  "updatedAt": "2016-01-08T05:29:52.000Z",
  "path": "http://google.com",
  "token": ".1lqg4",
  "createdAt": "2016-01-08T05:29:52.000Z"
}
```

#Running Tests
` $ node_modules/mocha/bin/mocha test/bootstrap.test.js test/unit/**/*.test.js `