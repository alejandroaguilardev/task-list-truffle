App = {
    contracts: {},
    init: async () => {
        console.log('Loaded');
        await App.loadEthereum();
        await App.loadAccount();
        await App.loadContracts();
        App.render();
        await App.renderTasks();
    },
    loadEthereum : async () =>{
        if(window.ethereum){
            App.web3Privider = window.ethereum;
            await window.ethereum.request({method : 'eth_requestAccounts'});
        }else if (window.web3) {
           web3 = new web3(window.web3.currentProvider);
        }else{
            console.log('No tiene instalado Metamask');
        }
    },
    loadAccount: async() => {
       const accounts =  await window.ethereum.request({
            method: 'eth_requestAccounts'
        });
        App.accounts = accounts[0];
    },
    render:() => {
        document.getElementById('account').innerText= App.accounts;
    },
    renderTasks: async () => {
        const taskCounter = await App.tasksContract.tasksCounter();
        const taskCounterNumber = taskCounter.toNumber();
        let html='';
        for (let i = taskCounterNumber; i >= 1; i--){
            const task = await App.tasksContract.tasks(i);
            const data = {
                id : task[0],
                title :task[1],
                description : task[2],
                done : task[3],
                created : task[4]
            }
            
            let taskElement = `
                <div class="card bg-dark rounded-0 mb-2">
                    <div class="card-header d-flex justify-content-between align-item-center">
                        <span>${data.title}</span>
                        <div class="form-check form-switch">
                            <input class="form-check-input" type="checkbox"  ${data.done && "checked"}
                            data-id="${data.id}"
                            onChange="App.toogleDone(this)"
                            >
                        </div>
                    </div>
                    <div class="card-body">
                        <span>${data.description}</span>
                        <p class="text-muted"> Task was created ${new Date(data.created *1000).toLocaleString()}</p>
                    </div>
                </div>
            `;

            html += taskElement;
        }

        document.querySelector("#tasksList").innerHTML = html;
    },
    loadContracts : async () => {
      const res = await fetch("TasksContract.json");
      const tasksContractJson = await res.json();
      
      App.contracts.tasksContract  = TruffleContract(tasksContractJson);

      App.contracts.tasksContract.setProvider(App.web3Privider);

      App.tasksContract = await App.contracts.tasksContract.deployed();
    },
    createTask: async (title, description) => {
        const result = await App.tasksContract.createTask(title, description, {
            from: App.accounts
        });
        return result.logs[0].args
    },
    toogleDone:async (element) =>{
        await App.tasksContract.toogleDone(element.dataset.id,{
                from: App.accounts
        });
    }
}