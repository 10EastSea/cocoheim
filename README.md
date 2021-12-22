# COCO HEIM


## Version
```Bash
>> node -v
v14.18.0

>> npm -v
6.14.15

>> truffle version
Truffle v5.4.16 (core: 5.4.16)
Solidity v0.5.16 (solc-js)
Node v14.18.0
Web3.js v1.5.3

>> ganache-cli --version
Ganache CLI v6.12.2 (ganache-core: 2.13.2)
```


## Setup & Run
```Bash
# setup
>> npm install

# compile (Precautions for compile)
>> truffle compile

# migrate
>> truffle migrate

# run
>> npm run dev
```


## ❗️Precautions for compile
Each contracts needs to be compiled to suit the solidity version (refer to `truffle-config.js`).


## ❗️Ganache setting
``` Bash
# ganache-cli -h [host name] -p [port number] --account="[private key of my wallet], [ethereum]"
>> ganache-cli -h 192.168.0.134 -p 7545 --account="0xd461db..., 100000000000000000000000000"
```

* `host name` should also be modified in `app.js`, `swap.js`, `util.js` and `truffle-config.js`.
