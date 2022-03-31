import Form from 'react-bootstrap/Form'


export default function Yearly({ enterprise, years}) {

  console.log(years)
  console.log(enterprise, "ent")

  return (
    <Form className='col-8'>
        <table className='table table-borderless table-responsive'>
            <thead>
                <tr>
                    <th className='col-1 thInfo'>Nominals</th>
                    <th className='thInfo'>Unit</th>
                    {years.map((year) => (
                        <th key={year} className="thInfo">{year}</th>
                    ))}
                </tr>
            </thead>
            {enterprise && enterprise.nominalCategories.map((cat) => (
            <tbody key={cat.categoryName}>
                <tr><td className='tdCat' colSpan={14} >{cat.categoryName}</td></tr>
                {cat.nominals.map((nom) => (
                <tr key={nom.name}>
                    <td className='p-0 ps-3 pt-3 tdName form-control-plaintext' style={{ minWidth: "150px" }}>{nom.name}</td>
                    <td className='pt-3 tdName'>{nom.units}</td>
                    {nom.monthEntries.map((entries) => {
                        const entry = entries.nominalEntries[0]
                        console.log(entry)
                        let total = 0;
                        for (let index = 1; index < 13; index++) {
                           total += entry[`month${index}Value`]
                        }
                        return <td key={entry.id + "input"} className='col-auto'><input type="number" className='form-control' defaultValue={total}/></td>
                    })}

                   
                </tr>
                ))}
            </tbody>
            ))}
        </table>
    </Form>
  )
}
