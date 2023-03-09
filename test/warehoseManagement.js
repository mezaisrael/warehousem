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

    let tasksDetail = ["taskDetail", "PICK", "Lpn_01","Iphone","3", "0", accounts[0], false]
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

  it("Should assert on starting a non existant task", async () => {
    const warehouseInstance = await Warehouse.deployed();
    let acutal = null
    try {
      await warehouseInstance.startTask("task_02")
    }
    catch(error) {
      assert.equal(error.data.message, "revert")
      return
    }
    assert.fail("Did not fail on starting non existant tas")
  });

  it("Should assert on starting task in progress", async () => {
    const warehouseInstance = await Warehouse.deployed();
    try {
      await warehouseInstance.startTask(TASK_ID)
    } 
    catch (error) {
      assert.equal( error.data.message, "revert")
      return
    }
    assert.fail("Did not fail on starting task in progress")
  });

  it ("Should not revert on correct scan", async () => {
    const warehouseInstance = await Warehouse.deployed();
    let result = await warehouseInstance.verifyItem(TASK_ID, "Iphone")
    assert.equal(true, result)
  })

  it("Should revert on wrong item scanned", async () => {
    const warehouseInstance = await Warehouse.deployed();
    let success = false
    try {
      success =  await warehouseInstance.verifyItem(TASK_ID, "Nokia")
    } catch (error) {
      success = false
    }
    assert.equal(false, success)
  });

  it("should not revert on valid quantity", async () => {
    const warehouseInstance = await Warehouse.deployed();
    await warehouseInstance.verifyQuantity(2, TASK_ID, "Iphone")
    let actualNeedQuant = (await warehouseInstance.tasks(TASK_ID)).needQuantity;
    assert(48, actualNeedQuant.toNumber())
  })

  it("should revert when scanned quantity is greater than needed quantity", async () =>{
    const warehouseInstance = await Warehouse.deployed();
    try {
      await warehouseInstance.verifyQuantity(99999, TASK_ID, "Iphone")
    } catch(error) {
      assert.equal( error.data.message, "revert")
      return;
    }
    assert.fail("managed to over scan");
  })

  
});
