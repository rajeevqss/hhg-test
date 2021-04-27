import React, {useState,useEffect} from 'react';
import {RouteComponentProps} from 'react-router';
import { Modal,Button,Form } from "react-bootstrap";

const Employee: React.FC<RouteComponentProps> = ({history}) => {
    const [allEmployee,setAllEmployee] = useState([]);
    const [modalStatus,setModalStatus] = useState(false)
    useEffect(() => {
        getAllEmployees();
    }, []);
    const getAllEmployees = async () =>{
        let data:any = await fetch("https://6087c58da3b9c200173b8bcc.mockapi.io/api/v1/employee");
        data = await data.json();
        setAllEmployee(data);
        setPagesLength(Math.ceil(data.length / 5));
    }

    const next = () =>{
        setCurrentPage((page) => page + 1);
    }
    const prev = () =>{
        setCurrentPage((page) => page - 1);
    }

    const [pages,setPagesLength] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

    const openModal = () =>{
        setModalStatus(true)
    }
    const getCurrentDataset = () =>{
        const startIndex = currentPage * 5 - 5;
        const endIndex = startIndex + 5;
        return allEmployee.slice(startIndex, endIndex);
    }
    
    const onFormSubmit = (e:any,data:any) => {
        e.preventDefault()
        if(!data || Object.keys(data).length != 3){
            alert('Please enter all fields')
            return false
        }
        let header:any = {};
        header['Content-type'] = "application/json; charset=UTF-8";
        fetch("https://6087c58da3b9c200173b8bcc.mockapi.io/api/v1/employee",{
            method: 'POST',
            body : JSON.stringify({ name : data.name||'' , email : data.email||'' , position : data.position||'' }),
            headers : header
        }).then(res=>res.json())
        .then(res=> {
            setModalStatus(false);
            alert('Employee created successfully');
            getAllEmployees();
        })
        .catch(err=>{
            alert('Error while creating');
            console.log(err)
        })
    };
        
    const EmployeeForm = ({ onSubmit } :any) =>{
        const [employeeData,setEmployeeData] = useState({});
        
        return(
            <Form onSubmit={(e)=>onSubmit(e,employeeData)}>
                <Form.Group controlId="formBasicName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text"  onChange={(e) => setEmployeeData({...employeeData , name : e.target.value})  }   placeholder="Enter Name" />
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" onChange={(e) => setEmployeeData({...employeeData , email : e.target.value})  }    placeholder="Enter Email" />
                </Form.Group>
                <Form.Group controlId="formBasicPosition">
                    <Form.Label>Position</Form.Label>
                    <Form.Control type="text"  onChange={(e) => setEmployeeData({...employeeData , position : e.target.value})  }    placeholder="Enter Position" />
                </Form.Group>
                <Button variant="primary" type="submit" block>
                    Submit
                </Button>
            </Form>
        )
    }
        
    const ModalComponent =  () =>{
        return(
            <Modal show={modalStatus} onHide={()=>setModalStatus(false) }>
                <Modal.Header>
                <Modal.Title>Add New Employee</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <>
                    
                <EmployeeForm onSubmit={onFormSubmit} />
                </>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={ () => setModalStatus(false) }>Close</Button>
                </Modal.Footer>
            </Modal>
        )
    }

    return (
            <div>
                <h4>Employee Page 
                
                <span onClick={ () => openModal() }>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="blue" className="ml-2 bi bi-plus-circle-fill" viewBox="0 0 16 16">
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z"/>
                    </svg>
                </span>
                
                

                </h4>
                
                <table className="table">
                    <thead>
                        <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Position</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            getCurrentDataset().map( (x:any,i:any)=>{

                                return(
                                    <tr key={i}>
                                        <td>{x.name}</td>
                                        <td>{x.email}</td>
                                        <td>{x.position}</td>
                                    </tr>
                                )

                            })
                        }
                    </tbody>
                </table>

                {
                    allEmployee.length > 0 ? 
                        <div className="text-center mt-2">
                            <button className="btn btn-primary mr-1"
                                onClick={()=> currentPage === 1 ? null :  prev()}
                            >
                                prev
                            </button>
                            <button className="btn btn-danger"
                                onClick={()=> currentPage == pages ? null :   next()}
                                
                            >
                                next
                            </button>
                        </div>
                    : null    
                }

                <div className="col-12 text-center mt-4">
                    <button className="btn  btn-secondary" onClick={()=> history.push('/')}>Go Back</button>
                </div>
                
                
                <ModalComponent />
                
            
            </div>
            
        )

}
export default Employee;