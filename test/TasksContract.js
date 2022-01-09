const TasksContract = artifacts.require("TasksContract");

contract("TasksContract", () => {
    before (async() => {
        this.tasksContract = await TasksContract.deployed();
    });

    it('migrate deployed successfully', async () => {
        const address = this.tasksContract.address;

        assert.notEqual(address, null);
        assert.notEqual(address, undefined);
        assert.notEqual(address, 0x0);
        assert.notEqual(address, "");
    });

    it('get TasksList', async () => {
        const tasksCounter = await this.tasksContract.tasksCounter();
        const task = await  this.tasksContract.tasks(tasksCounter);

        assert.equal(task.id.toNumber(), tasksCounter);
        assert.equal(task.title, "Mi primer tarea");
        assert.equal(task.description, "Tengo que hacer algo");
        assert.equal(tasksCounter, 1);
    });

    it('task created successfully', async () => {
        const result = await this.tasksContract.createTask("some task", "description two");
        const taskEvent = result.logs[0].args;

        const tasksCounter = await this.tasksContract.tasksCounter();

        assert.equal(taskEvent.id.toNumber(), tasksCounter);
        assert.equal(taskEvent.id.toNumber(), 2);
        assert.equal(taskEvent.title, "some task");
        assert.equal(taskEvent.description, "description two");
        assert.equal(taskEvent.done, false);
    });

    it('task toggle done', async() => {
        const result = await this.tasksContract.toogleDone(1);
        const taskEvent = result.logs[0].args;

        const  task = await this.tasksContract.tasks(1);

        assert.equal(taskEvent.done, true);
        assert.equal(task.done, true);
        assert.equal(task.id, 1);
    });

});