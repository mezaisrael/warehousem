// SPDX-License-Identifier: MIT
pragma solidity ^0.8.15; 

contract Warehouse {

  struct TaskDetail {
    string id;
    string typeOfTask; // pick, pack .. etc
    string containerId;
    string item;
    string quantity;
    Status status;
    address user;
    bool exist; // to determine if map contains this taskDetail
  }

  enum Status {CREATED, IN_PROGRESS, COMPLETED, CANCELED}

  // taskId to TaskDetail
  mapping (string => TaskDetail) public tasks;

  // item to availability mapping
  mapping (string => uint) inventory;

  function createTask(string taskId, TaskDetail taskDetail) public {
    require(tasks[taskId].exist = false ,"taskId is already in system");
    taskDetail.exist = true;
    tasks[taskId] = taskDetail;
  }

  function startTask(string taskId) public {
    assert(tasks[taskId].exist == true);
    assert(tasks[taskId].status != Status.IN_PROGRESS);

    TaskDetail currentTask = tasks[taskId];
    currentTask.status = Status.IN_PROGRESS;
    currentTask.user = msg.sender;
  }

  // function verifyItem(string currentTask, string taskId, string itemId) public {
  //   revert(); // the item must be part of the tas
  //   revert(); // must have enougth of item in inventory
  // }

  function addInventory(string item, uint quantity) public {
    inventory[item] += quantity;
  }

}
