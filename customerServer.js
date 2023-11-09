var express = require("express");
var app = express();
var cors = require("cors");
app.use(cors());
app.use(express.json());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET,POST, OPTIONS, PUT, PATCH, DELETE, HEAD"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
var port = process.env.PORT||2410;
app.listen(port, () => console.log(`Node app listening on port ${port}!`));

let customersData = [
  {
    id: "DFI61",
    name: "Vishal",
    city: "Delhi",
    age: 27,
    gender: "Male",
    payment: "Credit Card",
  },
  {
    id: "JUW88",
    name: "Amit",
    city: "Noida",
    age: 49,
    gender: "Male",
    payment: "Debit Card",
  },
  {
    id: "KPW09",
    name: "Pradeep",
    city: "Gurgaon",
    age: 21,
    gender: "Male",
    payment: "Wallet",
  },
  {
    id: "ABR12",
    name: "Rohit",
    city: "Jaipur",
    age: 34,
    gender: "Male",
    payment: " Debit Card",
  },
  {
    id: "BR451",
    name: "Preeti",
    city: "Delhi",
    age: 29,
    gender: "Female",
    payment: "Credit Card",
  },
  {
    id: "MKR52",
    name: "Neha",
    city: "Noida",
    age: 42,
    gender: " Female ",
    payment: "Debit Card",
  },
  {
    id: "BTT66",
    name: "Swati",
    city: "Gurgaon",
    age: 24,
    gender: " Female ",
    payment: "Wallet",
  },
  {
    id: "CDP09",
    name: "Meghna",
    city: "Jaipur",
    age: 38,
    gender: " Female ",
    payment: " Debit Card",
  },
  {
    id: "KK562",
    name: "Irfan",
    city: "Delhi",
    age: 25,
    gender: "Male",
    payment: "Credit Card",
  },
  {
    id: "LPR34",
    name: "Gagan",
    city: "Noida",
    age: 51,
    gender: " Female ",
    payment: "Debit Card",
  },
  {
    id: "MQC11",
    name: "John",
    city: "Gurgaon",
    age: 24,
    gender: "Male",
    payment: "Wallet",
  },
  {
    id: "AXY22",
    name: "Gurmeet",
    city: "Jaipur",
    age: 31,
    gender: "Male",
    payment: " Debit Card",
  },
];

app.get("/customers", function (req, res) {
  let arr1 = customersData;
  let city = req.query.city;
  let gender = req.query.gender;
  let payment = req.query.payment;
  let sortBy = req.query.sortBy;
  if (city) {
    arr1 = arr1.filter((p) => p.city === city);
  }
  if (gender) {
    arr1 = arr1.filter((p) => p.gender === gender);
  }
  if (payment) {
    arr1 = arr1.filter((p) => p.payment === payment);
  }
  if (sortBy) {
    if (sortBy === "id") {
      arr1.sort((st1, st2) => st1.id.localeCompare(st2.id));
    }
    if (sortBy === "name") {
      arr1.sort((st1, st2) => st1.name.localeCompare(st2.name));
    }
    if (sortBy === "age") {
      arr1.sort((st1, st2) => st1.age-(st2.age));
    }
    if (sortBy === "payment") {
      arr1.sort((st1, st2) => st1.payment.localeCompare(st2.payment));
    }
    if (sortBy === "city") {
      arr1.sort((st1, st2) => st1.city.localeCompare(st2.city));
    }
    if (sortBy === "gender") {
      arr1.sort((st1, st2) => st1.gender.localeCompare(st2.gender));
    }
  }
  res.send(arr1);
});
app.get("/customers/:id", function (req, res) {
  let id = req.params.id;
  console.log("Requested Customer ID:", id);

  let customer = customersData.find((c) => c.id === id);

  if (customer) {
    res.send(customer);
  } else {
    res.status(404).send("Customer with ID " + id + " not found.");
  }
});

app.post("/customers", function (req, res) {
  let body = req.body;
  console.log(body);
  customersData.push(body);
  res.send(body);
});

app.put("/customers/:id", function (req, res) {
  let id = req.params.id;
  let body = req.body;
  let index = customersData.findIndex((c) => c.id === id);
  if (index >= 0) {
    customersData[index] = body;
    res.send(body);
  } else {
    res.status(404).send("No student found");
  }
});

app.delete("/customers/:id", function (req, res) {
  let id = req.params.id;
  let index = customersData.findIndex((st) => st.id === id);
  if (index >= 0) {
    let deletedCustomer = customersData.splice(index, 1);
    res.send(deletedCustomer);
  } else res.status(404).send("NO student found");
});
