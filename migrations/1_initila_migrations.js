const Warehose = artifacts.require("Warehouse");

module.exports = function (deployer) {
  deployer.deploy(Warehose)
}
