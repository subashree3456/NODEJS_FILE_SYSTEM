//Importing External Package using New Method By Setting type="module"

//importing express for starting Server

import express from "express";

//importing fileSystem For Further use
import fs from "fs";

//Setting Default Port to Run An Server

const PORT = 4000;

//declear an express to an variable

const app = express();

// For An Human Understaning We Changing In To JSON Form

app.use(express.json());

//used To create An File using /time Route

app.post("/time", (req, res) => {
  // creating currentDate

  const currentDate = (Date) => {
    const date = Date.getDate();
    const month = Date.getMonth();
    const year = Date.getFullYear();
    const hours = Date.getHours();
    const minutes = Date.getMinutes();
    const seconds = Date.getSeconds();
    return `${date}-${month}-${year}_${hours}:${minutes}:${seconds}`;
  };

  //Invoking the currentDate function

  const date = currentDate(new Date());

  //Creating FileName Dainamically

  const filename = new Date().getTime();
  fs.writeFile(`./files/${filename}.txt`, date, (err, data) => {
    if (err) console.log(err);
    res.status(200).send("File created successfully");
  });
});

// NOTE: Read all file
app.get("/", (req, res) => {
  fs.readdir("./files", (err, data) => {
    if (err) {
      console.log(err);
      res.status(404).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}🎉🎉`));
