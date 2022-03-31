
export default function Vat({budget, addToBudget}) {

 
  return (
    <>
      <div className='infoBox p-4 form-group col-sm-12'>
      <h2>VAT</h2>
        <div className="input-group pb-3">
          <span className="input-group-text col-5 col-md-4">Reduced Rate</span>
          <div className='col col-md-2'>
            <input 
            type="number" 
            aria-label="First name" 
            className="form-control" 
            onChange={e => addToBudget("vatReducedRate", e.target.value) }
            value={budget.vatReducedRate ?? ""}/>
          </div>
          <span className="input-group-text col-2 col-md-2">%</span>
        </div>
        <div className="input-group pb-3">
          <span className="input-group-text col-5 col-md-4">Standard Rate</span>
          <div className='col col-md-2'>
            <input 
            type="number" 
            aria-label="First name" 
            className="form-control" 
            onChange={e => addToBudget("vatStandardRate", e.target.value) }
            value={budget.vatStandardRate ?? ""}/>
          </div>
          <span className="input-group-text col-2 col-md-2">%</span>
        </div>
      </div>
    </>
  )
}
