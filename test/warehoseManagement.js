const Warehouse = artifacts.require("Warehouse");

let WAREHOUSE_INSTANCE;

contract('Warehouse', (accounts) => {
  beforeEach(async () => {
    WAREHOUSE_INSTANCE = await Warehouse.deployed();
    WAREHOUSE_INSTANCE.addIntory("Iphone100", 50)
    WAREHOUSE_INSTANCE.addIntory("Samsung Galaxy99", 50)
  })
  
  it("Should create task", async () => {
    const warehouseInstance = await Warehouse.deployed();

    let tasksDetail = {
      id: "takskDetail_01",
      typeOfTask: "PICK",
      container: "LPN_01",
      item: "IPHONE_20",
      quantity: "1"
    }

    warehouseInstance.createTask("TASK_01", JSON.stringify(tasksDetail));

  });
  // it("should not add duplicate task")
  
});
