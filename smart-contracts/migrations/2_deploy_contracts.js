const Ex1 = artifacts.require("Ex1");
const Ex2 = artifacts.require("Ex2");
const Ex3 = artifacts.require("Ex3");
const Ex4 = artifacts.require("Ex4");
const Ex5 = artifacts.require("Ex5");
const Ex6 = artifacts.require("Ex6");
const Rectangle = artifacts.require("Rectangle");
const Ex8 = artifacts.require("Ex8");

module.exports = async function (deployer) {
  await deployer.deploy(Ex1);
  await deployer.deploy(Ex2);
  await deployer.deploy(Ex3);
  await deployer.deploy(Ex4);
  await deployer.deploy(Ex5);
  await deployer.deploy(Ex6);
  await deployer.deploy(Rectangle, 5, 10); 
  await deployer.deploy(Ex8);
};