//import Dependencies
const Joi = require("joi");
var _ = require("underscore");
const express = require("express");

//initiate
const PORT = process.env.PORT || 3000;
const app = express();

//Express Json
app.use(express.json());

//data
const courses = [
  { id: 1, name: "course1" },
  { id: 2, name: "course2" },
  { id: 3, name: "course3" },
];
//ROUTES
app.get("/api/courses/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) return res.status(404).send("this is not the courses");
  res.send(course);
});

app.post("/api/courses", (req, res) => {
  const { error } = validateCourse(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };
  courses.push(course);
  res.send(course); 
});

app.put("/api/courses/:id", (req, res) => {
  //look up the course
  // if not existing, return 404
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) return res.status(404).send("this is not the courses");
  //validate
  //if invalid, return 400 - bad request
  const { error } = validateCourse(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  //Update course
  //return the updated course
  course.name = req.body.name;
  res.send(course);
});

app.delete('/api/courses/:id', (req,res)=>{
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) return res.status(404).send("this is not the courses");

  //delete
  const index = courses.indexOf(course);
  courses.splice(index, 1)

  res.send(course)
})

function validateCourse(course) {
  const schema = Joi.object({
    name: Joi.string().min(5).required(),
  });
  return schema.validate(course);
}
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
