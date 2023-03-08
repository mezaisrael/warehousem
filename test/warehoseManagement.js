const Warehouse = artifacts.require("Warehouse");

const TASK_ID = "task_01";

contract('Warehouse', (accounts) => {

  it("should create inventory", async ()=> {
    const warehouseInstance = await Warehouse.deployed();
    const EXPECTED = 50;
    await warehouseInstance.addInventory("Iphone", 50)
    await warehouseInstance.addInventory("Samsung", 50)
    let actualTotalIphones = (await warehouseInstance.inventory("Iphone")).toNumber();
    assert.equal(EXPECTED, actualTotalIphones)
  })
  
  it("Should create task", async () => {
    const warehouseInstance = await Warehouse.deployed();

    let tasksDetail = ["taskDetail", "PICK", "Lpn_01","Iphone","1", "0", accounts[0], false]
    await warehouseInstance.createTask(TASK_ID, tasksDetail)
    try {
      await warehouseInstance.createTask(TASK_ID, tasksDetail)
      assert.fail("should not create duplicate task")
    } catch(error) {
      assert.equal("taskId is already in system", error.reason)
    }
  });

  it("Should start task", async () => {
    const warehouseInstance = await Warehouse.deployed();
      await warehouseInstance.startTask(TASK_ID)
  })

  it("Should assert on non existant task", async () => {
    const warehouseInstance = await Warehouse.deployed();
    let acutal = null
    try {
      await warehouseInstance.startTask("task_02")
    }
    catch(error) {
      actual = error.data.message
    }
    assert.equal(actual, "revert")
  });

  it("Should assert on starting task in progress", async () => {
    const warehouseInstance = await Warehouse.deployed();
    let actual = null
    try {
      await warehouseInstance.startTask(TASK_ID)
    } 
    catch (error) {
      actual = error.data.message
    }

    assert.equal(actual, "revert")
  });

  it ("Should not revert on correct scan", async () => {
    // const warehouseInstance = await Warehouse.deployed();
    // await warehouseInstance.verifyItem()
  })

  // it("Should revert on wrong item scaned", async () => {
  //   const warehouseInstance = await Warehouse.deployed();
  // });

  // it("should revert on no inventoyt for item", async () => {

  // })

  
});
