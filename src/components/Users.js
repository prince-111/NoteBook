import {useEffect, useState} from 'react'
import Table from 'react-bootstrap/Table';

const Users = () => {
   const [data, setData]=useState([])
   useEffect(()=>{
    fetch("http://localhost:5000/api/notes/Users").then((result)=>{
    // fetch("localhost:5000/api/notes/fetchallnotes").then((result)=>{

        result.json().then((resp)=>{
            setData(resp)
        })
    })
   },[])
   console.log(data)
  return (
    <> 
      <h1> Get all user here !</h1>
      <Table responsive striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Date</th>
            <th>Name</th>
            <th>Email</th>
            <th>No. of Notes</th>
            <th>Roles</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>01</td>
            <td>27-01-2023</td>
            <td>Prince</td>
            <td>prince123@gmail.com</td>
            <td>01</td>
            <td>Admin</td>
            <td>edit delete</td>
          </tr>
          {
           data.map((item,i)=>
            <tr key={i}>
            <td>{item._id} </td>
            <td>{item.date}</td>
            <td>{item.name}</td>
            <td>{item.email}</td>
            <td>{item.note}</td>
            <td>{item.role}</td>
            <td>E D</td>
          </tr>
          )
          }
          
        </tbody>

        {/* <tr>
                <td>Prince</td>
                <td>prince123@gmail.com</td>
                <td>1</td>
                <td>Admin</td>
                <td>edit delete</td>
            </tr> */}
        {/* <tr> */}
        {/* <td>{user.id}</td> */}
        {/* </tr> */}
      </Table>
    </>
  );
}

export default Users;
