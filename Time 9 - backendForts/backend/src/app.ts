import { Hono } from "hono";
import { cors } from "hono/cors";
import { isNameValid } from "./lib/validators";

const app = new Hono();

app.use("/*", cors());

//data
export let students = [
  { id: "1", name: "Ola Normann" },
  { id: "2", name: "Kari Normann" },
];

//get request håndtering
//Eks på fetch("https/://server-url/api/students, {method:"GET"})
app.get("/api/students", (c) => {
  return c.json(students)
})

//get request håndtering med url params
//Eks på fetch("https/://server-url/api/students/${id}, {method:"GET"})
app.get("/api/students/:id", (c) => {
  //her burde det håndteres og sendes tilbake en 404 hvis studenten ikke blir funnet
  const id = c.req.param("id")
  const student = students.filter((student) => student.id === id)
  return c.json(students)
})

//post request håndtering 
//Eks på fetch("https/://server-url/api/students/, {method:"POST", body: JSON.stringify(data)})
app.post("/api/students", async (c) => {
  const data = await c.req.json()
  const {name} = data
  //validering
  if (!isNameValid(name)){
    return c.json({error: "Invalid name"}, {status: 400})
  } 
  students.push({id: crypto.randomUUID(), name})
  return c.json(students, { status: 201})
})

//delete request håndtering med url params
//Eks på fetch("https/://server-url/api/students/${id}, {method:"DELETE"})
app.delete("/api/students/:id", (c) => {
  //her burde det håndteres og sendes tilbake en 404 hvis studenten ikke blir funnet
  const id = c.req.param("id")
  students = students.filter(
    (student) => student.id !== id
  )
  return c.json(students)
})

//patch request håndtering med url params
//Eks på fetch("https/://server-url/api/students/${id}, {method:"PATCH", body:  JSON.stringify(data)})
//Eks på hele frontend koden: 
/* const handleDelete = async (id:String) => {
  const response = await fetch("https/://server-url/api/students/${id}, {method:"PATCH", body:  JSON.stringify(data)})
  const result = await response.json()
  const students = await getStudentsFromApi() <- dette er hvis du ikke får noe tilbake fra databasen ved delete requests
  setStudentList(students)
}*/
app.delete("/api/students/:id", async (c) => {
  //her burde det håndteres og sendes tilbake en 404 hvis studenten ikke blir funnet
  const id = c.req.param("id")
  const {name} = await c.req.json()
  students = students.map(
    (student) => student.id === id ?
      {...student, name}
      :
      student
  )
  return c.json(students)
})

//Fanger opp alle errorer som ikke har blitt håndtert.
app.onError((err, c) => {
  console.error(err);

  return c.json(
    {
      error: {
        message: err.message,
      },
    },
    { status: 500 }
  );
});

export default app;
