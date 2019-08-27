function getProductAddress(crateid, Product, weight) {
  let nameHash = hash("ff");
  let sHash = hash(crateid);
  let pHash = hash(Product);
  let wtHash = hash(weight);
  return (
    nameHash.slice(0, 6) +
    pHash.slice(0, 6) +
    wHash.slice(0, 4) +
    sHash.slice(0, 54)
  );
}

function agencyAdd(event) {
  event.preventDefault();
  let sender = document.getElementById("senderID").value;
  let privKey = document.getElementById("privateagency").value;
  let cid = document.getElementById("crateid").value;
  let prt = document.getElementById("product").value;
  let wgt = document.getElementById("weight").value;
  let Dop = document.getElementById("dop").value;
  let state = document.getElementById("fromstate").value;
  console.log("state", state);
  if (
    sender != "" &&
    privKey != "" &&
    cid != "" &&
    prt != "" &&
    wgt != "" &&
    Dop != "" &&
    state != ""
  ) {
    $.post(
      "/addAgency",
      {
        Agency: sender,
        key: privKey,
        crateid: cid,
        product: prt,
        weight: wgt,
        dop: Dop,
        State: state
      },
      function(data) {
        if (data.status != 202) alert("your data status : " + data.text);
      },
      "json"
    );
  } else {
    alert("Fill all the Details");
  }
}

function Central(event) {
  event.preventDefault();
  let senderC = document.getElementById("CentralID").value;
  let privKey = document.getElementById("privateCentral").value;
  let Cid = document.getElementById("crateidC").value;
  let prt = document.getElementById("productC").value;
  let wgt = document.getElementById("weightC").value;
  let doaC = document.getElementById("doaCentral").value;
  let dodC = document.getElementById("dodCentral").value;
  let stateC = document.getElementById("tostate").value;
  if (
    senderC != "" &&
    privKey != "" &&
    Cid != "" &&
    prt != "" &&
    wgt != "" &&
    doaC != "" &&
    dodC != "" &&
    stateC != ""
  ) {
    $.post(
      "/centralVerify",
      {
        Central: senderC,
        key: privKey,
        Crateid: Cid,
        product: prt,
        weight: wgt,
        arrival: doaC,
        dispatch: dodC,
        toState: stateC
      },
      function(data) {
        if (data.status != 202) alert("your data status : " + data.text);
      },
      "json"
    );
  } else {
    alert("Fill all the Details");
  }
}

function State(event) {
  event.preventDefault();
  let senderS = document.getElementById("stateID").value;
  let privKey = document.getElementById("privateState").value;
  let Cid = document.getElementById("crateidS").value;
  let prt = document.getElementById("productS").value;
  let wgt = document.getElementById("weightS").value;
  let doaS = document.getElementById("doastate").value;
  let dodS = document.getElementById("dodstate").value;
  let zone = document.getElementById("tozone").value;
  if (
    senderS != "" &&
    privKey != "" &&
    Cid != "" &&
    prt != "" &&
    wgt != "" &&
    doaS != "" &&
    dodS != "" &&
    zone != ""
  ) {
    $.post(
      "/addState",
      {
        State: senderS,
        key: privKey,
        Crateid: Cid,
        product: prt,
        weight: wgt,
        arrival: doaS,
        dispatch: dodS,
        toZone: zone
      },
      function(data) {
        if (data.status != 202) alert("your data status : " + data.text);
      },
      "json"
    );
  } else {
    alert("Fill all the Details");
  }
}

function Zonal(event) {
  event.preventDefault();
  let senderZ = document.getElementById("zoneID").value;
  let privKey = document.getElementById("privateZone").value;
  let Cid = document.getElementById("crateidZ").value;
  let prt = document.getElementById("productZ").value;
  let wgt = document.getElementById("weightZ").value;
  let doaZ = document.getElementById("doazone").value;
  let dodZ = document.getElementById("dodzone").value;
  let retailer = document.getElementById("toretailer").value;
  if (
    senderZ != "" &&
    privKey != "" &&
    Cid != "" &&
    prt != "" &&
    wgt != "" &&
    doaZ != "" &&
    dodZ != "" &&
    retailer != ""
  ) {
    $.post(
      "/addZone",
      {
        Zone: senderZ,
        key: privKey,
        Crateid: Cid,
        product: prt,
        weight: wgt,
        arrival: doaZ,
        dispatch: dodZ,
        toRetailer: retailer
      },
      function(data) {
        if (data.status != 202) alert("your data status : " + data.text);
      },
      "json"
    );
  } else {
    alert("Fill all the Details");
  }
}

function getProducts(event) {
  let rid = document.getElementById("retailer").value;
  $.get("/products" + "/" + rid, (data, textStatus, jqXHR) => {
    if (data.dataR == "not exist") {
      alert("No data found ");
    } else {
      console.log(data.dataR);
      var pdata = JSON.parse(data.dataR);
      var table = document.getElementById("productlist");
      table.innerHTML = "";
      pdata.forEach(element => {
        if (element) {
          var row = table.insertRow(0);
          var cell1 = row.insertCell(0);
          var cell2 = row.insertCell(1);
          var cell3 = row.insertCell(2);
          cell1.innerHTML = element[1];
          cell2.innerHTML = element[2];
          cell3.innerHTML = element[3];
        }
      });
    }
  });
}

function Retrieve(event) {
  event.preventDefault();
  let Cid = document.getElementById("crateidR").value;
  let prt = document.getElementById("productR").value;
  let wgt = document.getElementById("weightR").value;
  $.get(
    "/state" + "/" + Cid + "/" + prt + "/" + wgt,
    (data, textStatus, jqXHR) => {
      if (data.dataR == "not exist") {
        alert("No data found ");
      } else {
        Data = data.dataR;
        document.getElementById("origin").value = Data[5];
        document.getElementById("packing").value = Data[4];
        document.getElementById("Carrival").value = Data[7];
        document.getElementById("Cdispatch").value = Data[8];
        document.getElementById("Sarrival").value = Data[11];
        document.getElementById("Sdispatch").value = Data[12];
        document.getElementById("Zarrival").value = Data[15];
        document.getElementById("Zdispatch").value = Data[16];
      }
    },
    "json"
  );
}

function Delete(event) {
  event.preventDefault();
  let privKey = document.getElementById("privateRetailer").value;
  let Cid = document.getElementById("crateidR").value;
  let prt = document.getElementById("productR").value;
  let wgt = document.getElementById("weightR").value;
  $.post(
    "/delete",
    { key: privKey, crateid: Cid, product: prt, weight: wgt },
    function(data) {
      if (data.status != 202) alert("your data status : " + data.text);
      window.location.href = "/";
    },
    "json"
  );
}
