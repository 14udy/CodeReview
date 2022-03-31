
//Bootstrap
import Form from 'react-bootstrap/Form'


export default function Details({budget, addToBudget}) {

  return (
    <>
    
          <div className='infoBox p-4 form-group col-sm-12 '>
          <h2 >Details</h2>
            <div className="input-group pb-3">
              <span className="input-group-text col-5 col-md-4">Budget Name</span>
              <input 
              type="text" 
              aria-label="Budget name" 
              className="form-control" 
              onChange={e => {addToBudget("name", e.target.value)} }
              value={budget.name ?? ""}/>
            </div>
            {/* <div className="input-group pb-3">
              <span className="input-group-text col-5 col-md-4">Budget Type</span>
              <input 
              type="text" 
              aria-label="Budget Type" 
              className="form-control" 
              onChange={e => addToBudget("type", e.target.value)}
              value={budget.type ?? ""} />
            </div> */}
            <div className="input-group pb-3">
              <span className="input-group-text col-5 col-md-4">Budget Length</span>
            <Form.Group className='col-3 col-md-4'>
              <Form.Select  value={budget.years ?? 0} onChange={e => addToBudget("years", e.target.value)}>
                <option disabled value={0}>Select length</option>
                <option value={1}>1</option>
                <option value={3}>3</option>
                <option value={5}>5</option>
              </Form.Select>
            </Form.Group>
            <span className="input-group-text col-3 col-md-2">Years</span>
            </div>
            <div className="input-group pb-3">
              <span className="input-group-text col-5 col-md-4">Budget Start Date</span>
              <div className='col-4 col-md-8 d-flex'>
                <Form.Select value={budget.yearStartMonth ?? 0} onChange={e => addToBudget("yearStartMonth", e.target.value)}>
                  <option  value={0}>Select month</option>
                  <option value={1}>January</option>
                  <option value={2}>February</option>
                  <option value={3}>March</option>
                  <option value={4}>April</option>
                  <option value={5}>May</option>
                  <option value={6}>June</option>
                  <option value={7}>July</option>
                  <option value={8}>August</option>
                  <option value={9}>September</option>
                  <option value={10}>October</option>
                  <option value={11}>November</option>
                  <option value={12}>December</option>
                </Form.Select>
                <input 
                type="number" 
                aria-label="Budget name" 
                className="form-control " 
                placeholder='eg 2020'
                onChange={e => {addToBudget("yearStartYear", e.target.value)} }
                value={budget.yearStartYear ?? ""}/>
                </div>
            </div>
            <div className="input-group pb-3">
              <span className="input-group-text col-5 col-md-4">Farmed Area</span>
              <div className='col-md-3'>
                <input 
                type="number" 
                aria-label="First name" 
                className="form-control" 
                onChange={e => addToBudget("farmedArea", e.target.value)}
                value={budget.farmedArea ?? ""}/>
              </div>
              <span className="input-group-text col-3 col-md-3">Hectacres</span>
            </div>
          </div>
    </>
  )
}
