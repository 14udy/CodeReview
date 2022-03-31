//React
import { useEffect, useState } from "react";

//Router
import { useParams } from "react-router-dom";

//Components
import Monthly from "../../Components/ManageBudgetComponents/EditEnterprise/Monthly";
import Yearly from "../../Components/ManageBudgetComponents/EditEnterprise/Yearly";

export default function EditEnterprise({
  enterprises = [],
  yearStart,
  monthStart,
  length,
}) {
  const [monthly, setMonthly] = useState(true);
  const [yearly, setYearly] = useState(false);

  const [enterprise, setEnterprise] = useState();

  const params = useParams();

  const [year, setYear] = useState(null);
  const [years, setYears] = useState([]);

  useEffect(() => {
    setYear(yearStart);

    if (enterprises.length) {
      enterprises.forEach((ent) => {
        if (ent.id.toString() === params.enterpriseId) {
          setEnterprise(ent);
        }
      });
    }
  }, [params, enterprises, yearStart]);

  useEffect(() => {
    const getYears = [];

    for (let index = yearStart; index < yearStart + length; index++) {
      getYears.push(index);
    }
    setYears(getYears);
  }, [length, yearStart]);

  const updateNominals = (edits) => {
    edits.forEach((edit) => {
      enterprise.nominalCategories.forEach((cat) => {
        cat.nominals.forEach((nom) => {
          if (nom.id === edit.nominalId) {
            let entry = nom.monthEntries.find(
              ({ value }) => value === edit.year
            );
            entry.nominalEntries[0] = edit;
          }
        });
      });
    });
  };

  return (
    <div className="row">
      <nav className="p-3 my-3 d-flex justify-content-between">
        <div className="ps-2">
          <button
            className="btn btn-primary me-2"
            onClick={() => {
              setMonthly(true);
              setYearly(false);
            }}
          >
            Montly
          </button>
          <button
            className="btn btn-primary"
            onClick={() => {
              setMonthly(false);
              setYearly(true);
            }}
          >
            Yearly
          </button>
        </div>
        <div>
        <button
            className="btn btn-primary me-2"
            onClick={() => {
            
            }}
          >
            Physical
          </button>
          <button
            className="btn btn-primary me-2"
            onClick={() => {
             
            }}
          >
            Income
          </button>
          <button
            className="btn btn-primary me-2"
            onClick={() => {
              
            }}
          >
            Expenditure
          </button>
        </div>
        <div className="pe-2">
          {enterprise &&
            years &&
            years.map((year) => (
              <button
                key={`${year}_btn`}
                className="btn btn-primary me-2"
                onClick={() => setYear(year)}
              >
                {year}
              </button>
            ))}
        </div>
      </nav>
      <div className="row">
        {monthly && year && (
          <Monthly
            enterprise={enterprise}
            year={year}
            monthStart={monthStart}
            updateNominals={updateNominals}
          />
        )}
        {yearly && <Yearly enterprise={enterprise} years={years} />}
      </div>
    </div>
  );
}
