//Axios
import axios from "axios";

//Router
import { Routes, Route, useParams } from 'react-router-dom';

//React
import { useEffect, useState } from "react";

//Bootstrap
import Container from 'react-bootstrap/Container';
import Sidebar from '../Components/Navigation/Sidebar';

//Components
import DetailsOverview from './ManageBudgetSubPages/DetailsOverview';
import CreateEnterprises from './ManageBudgetSubPages/CreateEnterprises';
import EditEnterprise from './ManageBudgetSubPages/EditEnterprise';

//Custom Styles
import './ManageBudget.css'
import BudgetNavigation from "./ManageBudgetSubPages/BudgetNavigation";
import Loans from "./ManageBudgetSubPages/Loans";



export default function ManageBudget() {

  const [budgetInfo, setBudgetInfo] = useState([])  
  const [enterprises, setEnterprises] = useState([]);

  const params = useParams();

  const getBudget = (id) => {
    axios.get(`https://${process.env.REACT_APP_IP}/api/budget/${id}`).then((res) => {
      console.log("Budget Found", res.data);
      setBudgetInfo(res.data.budgetDetails);
      setEnterprises(res.data.enterprises)
    });
  };

  useEffect(() => {

  getBudget(params.budgetId);
   
  }, [params]);

  const updateEnterprises = (data) => {
      console.log("Enterprises Updated")
      setEnterprises(data)
  }

  const updateBudgetInfo = (data) => {
    console.log("Budget Info Updated")
    setBudgetInfo(data)
  } 

  
  return (
  
      <Container fluid style={{minHeight: "100vh"}} className="d-flex">
          <Sidebar >
            <BudgetNavigation enterpriseData={enterprises} budgetInfoData={budgetInfo}/>
          </Sidebar>
          <main style={{width: "100%"}} className="manageBudgetMain">
          <Routes>
            <Route path={`details`} element={<DetailsOverview data={budgetInfo} updateBudgetInfo={updateBudgetInfo}/>}/>
            <Route path={`enterprises/:budgetId`} element={<CreateEnterprises enterprises={enterprises} updateEnterprises={updateEnterprises} budgetId={budgetInfo.id}/>}/>
            <Route path={`enterprise/:enterpriseId`} element={<EditEnterprise enterprises={enterprises} yearStart={budgetInfo.yearStartYear} monthStart={budgetInfo.yearStartMonth} length={budgetInfo.years}/>}/>
            <Route path={`loans`} element={<Loans budgetId={budgetInfo.id}/>}/>
          </Routes>
          </main>
      </Container>
    
       
  )
}
