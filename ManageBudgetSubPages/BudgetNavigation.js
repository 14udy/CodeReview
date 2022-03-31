//Router
import { Link } from "react-router-dom";

import { useEffect, useState } from "react";
//Bootstrap
import Nav from "react-bootstrap/Nav";

export default function BudgetNavigation({enterpriseData, budgetInfoData}) {

  
  const [enterprises, setEnterprises] = useState(null);
  const [budgetInfo, setBudgetInfo] = useState(null);

  useEffect(() => {
    if (!enterpriseData) {
      console.log("No enterprises");
      setEnterprises([]);
    } else {
      setEnterprises(enterpriseData);
    }

    if (!budgetInfoData) {
      console.log("No budget data")
    }else{
      setBudgetInfo(budgetInfoData)
    }
  }, [enterpriseData, budgetInfoData]);


  return (
    <>
       <div className="sidebarInfo">
          <p>{budgetInfo && budgetInfo.name}</p>
        </div>
        <Nav.Item className="d-flex">
          <Link to="details" className="sbLink">
            Budget Details
          </Link>
        </Nav.Item>
        <Nav.Item>
          <div className="sbLink">Enterprises</div>
          <div className="ddBody d-flex flex-column">
          <Link to="enterprises/0" className="sbSubLink">
                  View All Enterprises
                </Link>
                {enterprises &&
                  enterprises.map((ent) => (
                    <Link
                      to={`enterprise/${ent.id}`}
                      key={ent.id}
                      className="sbSubLink"
                    >
                      {ent.enterpriseName}
                    </Link>
                  ))}
          </div>
        </Nav.Item>
        <Nav.Item className="d-flex">
          <Link to="loans" className="sbLink">
            Loans
          </Link>
        </Nav.Item>
        <Nav.Item className="d-flex">
          <Link to="assets" className="sbLink">
            Assets
          </Link>
        </Nav.Item> 
    </>
  )
}
