const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Note = require("../models/Note");
const ObjectId = require("mongoose").Types.ObjectId;
const { body, validationResult } = require("express-validator");
const User = require("../models/User");
const { json } = require("express");

// ROUTE 1: Get All the Notes using: GET "/api/notes/getuser". Login required
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    // console.log(req.user.id)

    const { role } = await User.findById(req.user.id);
    let notes;
    let length;

    if (role === "user") {
      console.log("asdasdadadas");
      notes = await Note.find({ user: new ObjectId(req.user.id) });
      // let size = req.user.id.isLength();

      console.log(req.user._id);

      //   let length = (req.user.id).length;
      //   console.log(length);

      var len = Object.keys(notes).length;
      console.log(len);
    } else if (role === "admin") {
      // console.log("2343243423")
      notes = await Note.find();

      // console.log((req.user).length);

      var len = Object.keys(notes).length;
      // console.log(len);
      {
        notes.id;
      }
    }
    //    console.log(notes)
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// route 5: get all user from db.
router.get("/users", async (req, res) => {
  try {

    // const res = await db.Note.aggregate([
    //   // {$group: {$user: }},
    //   { $lookup : {
    //     from : 'User',
    //     localField : 'user',
    //     foreignField : '_id',
    //     // as : 'User'
    // } }
    // ])
    console.log(res)
    // let AllUser;
    // console.log("get all user");

    this.AllUser = await User.find({});
    console.log(this.AllUser);

    res.json(this.AllUser);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

// ROUTE 2: Add a new Note using: POST "/api/notes/addnote". Login required
router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "Description must be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;

      // If there are errors, return Bad request and the errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savedNote = await note.save();

      res.json(savedNote);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

// ROUTE 3: Update an existing Note using: PUT "/api/notes/updatenote". Login required
router.put("/updatenote/:id", fetchuser, async (req, res) => {
  const { title, description, tag } = req.body;
  try {
    //create a newNote object
    const newNote = {};
    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.tag = tag;
    }

    // Find the note to be updated and update it
    let note = await Note.findById(req.params.id);
    if (!note) {
      res.status(404).send("Not Found");
    }

    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }
    note = await Note.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.json({ note });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// ROUTE 4: Delete an existing Note using: DELETE "/api/notes/deletenote". Login required
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  try {
    // Find the note to be delete and delete it
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not Found");
    }

    // Allow deletion only if user owns this Note
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    note = await Note.findByIdAndDelete(req.params.id);
    res.json({ Success: "Note has been deleted", note: note });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
