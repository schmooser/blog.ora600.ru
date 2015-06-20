+++
date = "2015-06-04T10:21:07+03:00"
title = "Enable authentication in mongodb"
tags = ["mongo"]
+++

If you intended to use your mongodb server from outer world you need to enable
authentication. I think that authentication scheme in mongo is far from good and
always struggling with set up. That's why I keep notes on this topic here.

1. Start `mongod` on the db without users using `--noauth` option and login
   there without password

2. Create `admin` user with `userAdminAnyDatabase` role:

        > use admin
        > db.createUser({user: "admin", pwd: "somestrongpassword", roles: [{role: "userAdminAnyDatabase", db: "admin"}]})
        > exit

3. Login with created admin user and add other users:

        $ mongo localhost:27017 --username admin --password "somestrongpassword" --authenticationDatabase admin
        > use reports
        > db.createUser({user: reports, pwd: "12345", roles: [{role: "readWrite", db: "reports"}]})
        > exit

4. Check that created user is able to login

        $ mongo localhost:27017/reports --username reports --password "12345" --authenticationDatabase reports
        > 

That's it. [Documentation].

[Documentation]: http://docs.mongodb.org/v2.6/core/security-introduction/
