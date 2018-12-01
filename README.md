PayaFanaavarn Insole Management System.

## Pre requirements
clone this to "C:\OpenSSL-Win64"
https://github.com/SweetInk/openssl-lib
```bash
$ npm install -g bower
$ bower install --allow-root
```
## Server setting
Add firewall exception
```bash
$ iptables -I INPUT 4 -m state --state NEW -m tcp -p tcp --dport 49153 -j ACCEPT
$ service iptables save
```
## Quick Install

```bash
$ npm install
```

## Start

```bash
Start Mongo if needed
$ sudo service mongod start

Start Server
$ npm start
OR
$ node server.js
OR
$ forever start server.js
```
## Git
To push your changes to git, after commiting
```bash
$ git push -u origin master
```

To clone and pull git changes
```bash
$ git clone https://gitlab.com/MNR85/payatek-insole.git
$ git pull origin
```
## License
[The MIT License](LICENSE.md)
