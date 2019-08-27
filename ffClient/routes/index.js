var express = require("express");
var { Product } = require("./UserClient");
const { getProductAddress, getAllProducts } = require("./lib/transaction");
var router = express.Router();

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("dashboards", { title: "Dashboards" });
});

router.post("/addAgency", async function(req, res) {
  let sender = req.body.Agency;
  let KEY = req.body.key;
  let crate = req.body.crateid;
  let product = req.body.product;
  let weight = req.body.weight;
  let dop = req.body.dop;
  let state = req.body.State;
  console.log("Data sent to REST API");
  console.log(sender, KEY, crate, product, weight, dop, state);
  var client = new Product();
  await client.agencyAdd(sender, KEY, crate, product, weight, dop, state);
  res.send({ text: "Data successfully added" });
});

router.post("/centralVerify", async function(req, res) {
  let senderC = req.body.Central;
  let key = req.body.key;
  let crateC = req.body.Crateid;
  let productC = req.body.product;
  let weightC = req.body.weight;
  let doa = req.body.arrival;
  let dod = req.body.dispatch;
  let stateC = req.body.toState;
  console.log("Data sent to REST API");

  var client = new Product();
  let address = await getProductAddress(crateC, productC, weightC);
  let stable = await client.getState(address, true);
  console.log("stable", stable);
  console.log("stable data", stable.data);
  if (stable.data == null || stable.data == [] || stable.data == "") {
    res.send({ text: "invalid details" });
  } else {
    await client.centralDept(
      senderC,
      key,
      crateC,
      productC,
      weightC,
      doa,
      dod,
      stateC
    );
    res.send({ text: "Data successfully added" });
  }
});

router.post("/addState", async function(req, res) {
  let senderS = req.body.State;
  let key = req.body.key;
  let crateS = req.body.Crateid;
  let productS = req.body.product;
  let weightS = req.body.weight;
  let doaS = req.body.arrival;
  let dodS = req.body.dispatch;
  let zoneS = req.body.toZone;
  console.log("Data sent to REST API");
  var client = new Product();
  let address = await getProductAddress(crateS, productS, weightS);
  let stable = await client.getState(address, true);
  console.log("stable", stable);
  console.log("stable data", stable.data);
  if (stable.data == null || stable.data == [] || stable.data == "") {
    res.send({ text: "invalid details" });
  } else {
    await client.stateDept(
      senderS,
      key,
      crateS,
      productS,
      weightS,
      doaS,
      dodS,
      zoneS
    );
    res.send({ text: "Data successfully added" });
  }
});

router.post("/addZone", async function(req, res) {
  let senderZ = req.body.Zone;
  let key = req.body.key;
  let crateZ = req.body.Crateid;
  let productZ = req.body.product;
  let weightZ = req.body.weight;
  let doaZ = req.body.arrival;
  let dodZ = req.body.dispatch;
  let retailer = req.body.toRetailer;
  console.log("Data sent to REST API");
  var client = new Product();
  let address = await getProductAddress(crateZ, productZ, weightZ);
  let stable = await client.getState(address, true);
  console.log("stable", stable);
  console.log("stable data", stable.data);
  if (stable.data == null || stable.data == [] || stable.data == "") {
    res.send({ text: "invalid details" });
  } else {
    await client.zoneDept(
      senderZ,
      key,
      crateZ,
      productZ,
      weightZ,
      doaZ,
      dodZ,
      retailer
    );
    res.send({ text: "Data successfully added" });
  }
});

/* Retriving Data */
router.get("/products/:data1", async function(req, res) {
  try {
    let rid = req.params.data1;
    console.log("rid", rid);
    let address = await getAllProducts();
    var client = new Product();
    let stable = await client.getState(address, true);
    console.log("stable", stable);
    var retailerdata = stable.data.map(y => {
      let x = Buffer.from(y.data, "base64").toString();
      let z = x.split(",");
      let retailer = z.pop();
      if (retailer == rid) {
        return z;
      }
    });

    console.log("retailer data:", retailerdata);
    res.send({ dataR: JSON.stringify(retailerdata) });
  } catch (err) {
    res.send({ dataR: "not exist" });
  }
});

router.get("/state/:data1/:data2/:data3", async function(req, res) {
  try {
    let Cid = req.params.data1;
    let prt = req.params.data2;
    let wgt = req.params.data3;
    console.log("cid", Cid);
    console.log("prt", prt);
    console.log("Wgt", wgt);
    let address = await getProductAddress(Cid, prt, wgt);
    var client = new Product();

    let stable = await client.getState(address, true);
    console.log("stable", stable);
    console.log("stable.data[0].data", stable.data[0].data);
    let Data = stable.data[0].data;
    let newData = Buffer.from(Data, "base64").toString();
    let DataStored = newData.split(",");
    console.log("DataStored", DataStored);
    res.send({ dataR: DataStored });
  } catch (err) {
    res.send({ dataR: "not exist" });
  }
});

router.post("/delete", async function(req, res) {
  let key = req.body.key;
  let crateD = req.body.crateid;
  let productD = req.body.product;
  let weightD = req.body.weight;
  console.log("Data sent to REST API");
  var client = new Product();
  await client.DeleteProduct(key, crateD, productD, weightD);
  res.send({ text: "Data successfully Deleted" });
});

module.exports = router;
