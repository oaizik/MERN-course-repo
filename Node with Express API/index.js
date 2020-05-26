const express = require("express");
const morgan = require("morgan");
const path = require("path");

const controller = require("./controller/controller");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/getAllMembers", controller.getAllMembers);
app.get("/getMember", controller.getMember);
app.post("/addMember", controller.addMember);
app.put("/editMemberPeriod", controller.editMemberPeriod);
app.delete("/removeMember", controller.removeMember);

app.use("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/index.html"));
});

app.listen(port, () =>
  console.log("Express server ready for requests on port:", port)
);
