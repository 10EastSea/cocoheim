# COCO HEIM


## Version
```Bash
>> node -v
v14.18.0

>> npm -v
6.14.15

>> truffle version
Truffle v5.4.33 (core: 5.4.33)
Ganache v7.0.1
Solidity - 0.6.6 (solc-js)
Node v14.18.0
Web3.js v1.5.3

>> ganache --version
ganache v7.0.2 (@ganache/cli: 0.1.3, @ganache/core: 0.1.3)
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

<br />

## ❗️Precautions for compile
Each contracts needs to be compiled to suit the solidity version (refer to `truffle-config.js`).


## ❗️Ganache setting
``` Bash
# ganache-cli -h [host name] -p [port number] --account="[private key of my wallet], [ethereum]"
>> ganache -h 127.0.0.1 -p 7545 --account="0xd461db..., 100000000000000000000000000"
```

* `host name` should also be modified in `app.js`, `swap.js` and `truffle-config.js`.
