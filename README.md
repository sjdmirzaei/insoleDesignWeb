PayaFanaavarn Insole Management System.

## Pre requirements
clone this to "C:\OpenSSL-Win64"
https://github.com/SweetInk/openssl-lib
```bash
$ npm install -g bower
$ bower install --allow-root
```
Add firewall exception
```bash
$ iptables -I INPUT 4 -m state --state NEW -m tcp -p tcp --dport 49153 -j ACCEPT
$ service iptables save
```
## Quick Install

```bash
$ npm install
```

To push your changes, after commiting
```bash
$ git push -u origin master
```

To clone and sync with git
```bash
$ git clone https://gitlab.com/MNR85/payatek-insole.git
$ git pull origin
```
## License
[The MIT License](LICENSE.md)
