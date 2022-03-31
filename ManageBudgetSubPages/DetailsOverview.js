//Axios
import axios from 'axios';

//Bootstrap
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';

//Styles
import './DetailsOverview.css'

//Hooks
import { useEffect, useState } from 'react';
import Details from '../../Components/ManageBudgetComponents/DetailsOverview/Details';
import BankAccount from '../../Components/ManageBudgetComponents/DetailsOverview/BankAccount';
import Vat from '../../Components/ManageBudgetComponents/DetailsOverview/Vat';

export default function DetailsOverview({data, updateBudgetInfo}) {

  
  const [budgetInfo, setBudgetInfo] = useState({})

  console.log(data, "data");

  useEffect(() => {
    console.log("details loaded");

    if (data.length !== []) {
          setBudgetInfo(data);
    }
  }, [data]);


  //Post
  const postBudget= (data) => {
    axios.post(`https://${process.env.REACT_APP_IP}/api/budget/${budgetInfo.id}`, data).then((res) => {
      if (res.status === 200) {
        updateBudgetInfo(budgetInfo)
      }
    });
  };

  const addToBudget = (field, value) => {
    setBudgetInfo({
            ...budgetInfo,
            [field]: value
          })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    postBudget(budgetInfo)
  };

  return (
    <Form >
      <div className='p-2 p-md-3 d-flex flex-column justify-content-center align-items-center'>
           {/* <h1 className='text-center py-2'>Budget Information</h1> */}
    <Row xs={1} md={2} className="details p-md-2 col-md-12 ">
        <Col className='p-3 d-flex flex-column justify-content-center'>
         <Details budget={budgetInfo} addToBudget={addToBudget}/>
        </Col>

        <Col className='p-3 d-flex flex-column justify-content-center'>
          <Vat budget={budgetInfo} addToBudget={addToBudget}/>
        </Col>

        <Col className='p-3 d-flex flex-column justify-content-center'>
          <BankAccount budget={budgetInfo} addToBudget={addToBudget}/>
        </Col>
      </Row>
      <div className='col-12 col-md-12 d-flex justify-content-center '>
          <div className='col '>
            <Button variant='danger' className='ms-3 ms-md-4'>Cancel</Button>
            <Button variant='success' type='submit' className='ms-3' onClick={handleSubmit}>Submit</Button>
          </div>
          
        </div>
      </div>
    </Form>
  )
}
