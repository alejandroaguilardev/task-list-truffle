### Desplegar Ganache para tener una blockchain Local y configurar Truffle

### npm install truffle -g 

### truffle-config.js
 networks port: 7545
network_id: "5777"
 compile version: "0.8.6"
### truffle compile
### truffle migrate
### truffle deploy =  truffle compile + truffle migrate

### Interacturar con truffle
 truffle console (Interactura con js)
 tasksContract = await TasksContract.deployed()
tasksContract.address
counter = await tasksContract.tasksCounter()

### Testing
Del ecosistema de Truffle se utiliza Framework Moka y Chai para realizar Testing en Javascript, tambien tiene para realizar el test en solidity

### Al ejecutar cambios (Equivalente a eliminar Cache)
   truffle migrate --reset