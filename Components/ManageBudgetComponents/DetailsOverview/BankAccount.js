export default function BankAccount({ budget, addToBudget }) {
  return (
    <>
      <div className="infoBox p-4 form-group col-sm-12">
        <h2>Bank Account</h2>
        <div className="input-group pb-3">
          <span className="input-group-text col-5 col-md-4">Account Name</span>
          <input
            type="text"
            aria-label="Bank account name"
            className="form-control"
            onChange={(e) => addToBudget("bankAccountName", e.target.value)}
            value={budget.bankAccountName ?? ""}
          />
        </div>
        <div className="input-group pb-3">
          <span className="input-group-text col-5 col-md-4">Bank</span>
          <input
            type="text"
            aria-label="First name"
            className="form-control"
            onChange={(e) => addToBudget("bank", e.target.value)}
            value={budget.bank ?? ""}
          />
        </div>
        <div className="input-group pb-3">
          <span className="input-group-text col-5 col-md-4">
            Opening Balance
          </span>
          <span className="input-group-text col-1 col-md-1">£</span>
          <div className="col col-md-3">
            <input
              type="number"
              aria-label="First name"
              className="form-control"
              onChange={(e) => addToBudget("openingBalance", e.target.value)}
              value={budget.openingBalance ?? ""}
            />
          </div>
        </div>
        <div className="input-group pb-3">
          <span className="input-group-text col-5 col-md-4">
            Overdraft Limit
          </span>
          <span className="input-group-text col-1 col-md-1">£</span>
          <div className="col col-md-3">
            <input
              type="number"
              aria-label="First name"
              className="form-control"
              onChange={(e) => addToBudget("overdraftLimit", e.target.value)}
              value={budget.overdraftLimit ?? ""}
            />
          </div>
        </div>
        <div className="input-group pb-3">
          <span className="input-group-text col-5 col-md-4">
            Credit Interest Rate
          </span>
          <div className="col col-md-2">
            <input
              type="text"
              aria-label="First name"
              className="form-control"
              onChange={(e) =>
                addToBudget("creditInterestRate", e.target.value)
              }
              value={budget.creditInterestRate ?? ""}
            />
          </div>
          <span className="input-group-text col-2 col-md-2">%</span>
        </div>
        <div className="input-group pb-3">
          <span className="input-group-text col-6 col-md-4">
            Overdraft Interest Rate
          </span>
          <div className="col col-md-2">
            <input
              type="text"
              aria-label="First name"
              className="form-control"
              onChange={(e) =>
                addToBudget("overdraftInterestRate", e.target.value)
              }
              value={budget.overdraftInterestRate ?? ""}
            />
          </div>
          <span className="input-group-text col-2 col-md-2">%</span>
        </div>
      </div>
    </>
  );
}
