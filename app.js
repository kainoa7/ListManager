// Get 3rd Party modules
const express = require("express");
// Get Custom built modules
const fm = require("./filemgr");

// Create the express http server
const app = express();

// Define some built-in middleware
app.use(express.static("./Client"));
app.use(express.json());

// Define HTTP routes listenting for requests
app.get("/api", async (req,res) => {
  try{
    const data = await fm.ReadData();
    res.send(data);
  } catch (error){
    console.error("BOMBASTIC ERROR", error)
    
  }
})

app.post("/api", async (req,res) => {
  try{
    const data = await fm.WriteData(req.body);
    res.send(data);

  } catch(error){
    console.error("EORRORROOR", error);
  }
})
app.delete("/api", async (req,res) =>{
  try{
    const data = await fm.DeleteData(req.body);
    res.send(data);
  }catch(error){
    console.error("ERROROROR", error);
  }
})
// page not found route
app.all("*", (req,res) => {
  res.status(404).send("<h1>Page Not Found...</h1>");
});

// Create a server
const appName = "Simple List";
const port = 6500;
app.listen(port, () => {
  console.log(`App ${appName} is running on port ${port}`);
})