//Axios
import axios from "axios";

//React
import { Fragment, useEffect, useState } from 'react';

//React Bootstrap
import Form from 'react-bootstrap/Form'

//Custom Styles
import './Monthly.css'

export default function Monthly({ enterprise, year, monthStart, updateNominals }) {

    const [months, setMonths] = useState(null)
    const [nominalCategories, setNominalCategories] = useState()
    const [edits, setEdits] = useState([])
    
//#region Fetch Requests
  
  //Post

  const postNominals = (nominalData) => {
    axios.post(
        `https://${process.env.REACT_APP_IP}/api/budget/${enterprise.budgetId}/enterprise/${enterprise.id}/editnominals`,
        nominalData
      )
      .then((res) => {
        if (res.status === "200") {
            updateNominals(res.enterprise)
        }else{
            console.log("Oops something went wrong", res)
        }
     })
    };

  //#endregion

    useEffect(() => {

        if (enterprise) {
            setNominalCategories(JSON.parse(JSON.stringify(enterprise.nominalCategories)))
        }

    }, [enterprise])
   
    useEffect(() => {
        let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        let arrayEdit = months.splice(0, monthStart - 1)
        months = months.concat(arrayEdit);
        setMonths(months)
    }, [monthStart])


    const handleEdit = (id, name, value, nomId, cat) => {

        let category = nominalCategories.find( ({categoryName}) => categoryName === cat);
        let nominal = category.nominals.find(({id}) => id === nomId)
        let monthEntries = nominal.monthEntries.find(({value}) => value === year)

        monthEntries.nominalEntries[0][`${name}`] = value;

        setEdits(prev => {
            let found = false;
            console.log(prev.length)
            if (prev.length === 0) {
                return [
                    ...prev,
                    monthEntries.nominalEntries[0]
                ]
            }else{
                console.log("length +1")
                 prev.forEach(edit => {
                    if (edit.id === id) {
                        console.log("id match")
                        edit = monthEntries.nominalEntries[0];
                        found = true;
                    }
                })
                
            }
            if (!found) {
                return [
                    ...prev,
                    monthEntries.nominalEntries[0]
                ]
            }else{
                return [...prev]
            }
        })

    }

    const handleSubmit = (e) => {
        e.preventDefault()

        postNominals(edits)
    }

    return (
        <Form >
            <table className='table table-borderless table-responsive'>
                <thead >
                    <tr>
                        <th className='col-1 thInfo'>Nominals</th>
                        <th className='thInfo'>Unit</th>
                        {months && months.map((month) => (
                            <th key={month} className="thInfo">{month}</th>
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
                                    let entry;

                                    if (entries.value === year) {
                                        entry = entries.nominalEntries[0];
                                        return (<Fragment key={`${entry.id}_${entry.year}`}>
                                            <td key={`${entry.id}_${entry.year}_month1Value`}><input type="number" className='form-control' defaultValue={entry.month1Value} onChange={(e) => { handleEdit(entry.id, "month1Value", e.target.value, nom.id , nom.category) }} /></td>
                                            <td key={`${entry.id}_${entry.year}_month2Value`}><input type="number" className='form-control' defaultValue={entry.month2Value} onChange={(e) => { handleEdit(entry.id, "month2Value", e.target.value, nom.id, nom.category) }} /></td>
                                            <td key={`${entry.id}_${entry.year}_month3Value`}><input type="number" className='form-control' defaultValue={entry.month3Value} onChange={(e) => { handleEdit(entry.id, "month3Value", e.target.value, nom.id, nom.category) }} /></td>
                                            <td key={`${entry.id}_${entry.year}_month4Value`}><input type="number" className='form-control' defaultValue={entry.month4Value} onChange={(e) => { handleEdit(entry.id, "month4Value", e.target.value, nom.id, nom.category) }} /></td>
                                            <td key={`${entry.id}_${entry.year}_month5Value`}><input type="number" className='form-control' defaultValue={entry.month5Value} onChange={(e) => { handleEdit(entry.id, "month5Value", e.target.value, nom.id, nom.category) }} /></td>
                                            <td key={`${entry.id}_${entry.year}_month6Value`}><input type="number" className='form-control' defaultValue={entry.month6Value} onChange={(e) => { handleEdit(entry.id, "month6Value", e.target.value, nom.id, nom.category) }} /></td>
                                            <td key={`${entry.id}_${entry.year}_month7Value`}><input type="number" className='form-control' defaultValue={entry.month7Value} onChange={(e) => { handleEdit(entry.id, "month7Value", e.target.value, nom.id, nom.category) }} /></td>
                                            <td key={`${entry.id}_${entry.year}_month8Value`}><input type="number" className='form-control' defaultValue={entry.month8Value} onChange={(e) => { handleEdit(entry.id, "month8Value", e.target.value, nom.id, nom.category) }} /></td>
                                            <td key={`${entry.id}_${entry.year}_month9Value`}><input type="number" className='form-control' defaultValue={entry.month9Value} onChange={(e) => { handleEdit(entry.id, "month9Value", e.target.value, nom.id, nom.category) }} /></td>
                                            <td key={`${entry.id}_${entry.year}_month10Value`}><input type="number" className='form-control' defaultValue={entry.month10Value} onChange={(e) => { handleEdit(entry.id, "month10Value", e.target.value, nom.id, nom.category) }} /></td>
                                            <td key={`${entry.id}_${entry.year}_month11Value`}><input type="number" className='form-control' defaultValue={entry.month11Value} onChange={(e) => { handleEdit(entry.id, "month11Value", e.target.value, nom.id, nom.category) }} /></td>
                                            <td key={`${entry.id}_${entry.year}_month12Value`}><input type="number" className='form-control' defaultValue={entry.month12Value} onChange={(e) => { handleEdit(entry.id, "month12Value", e.target.value, nom.id, nom.category) }} /></td>
                                        </Fragment>)
                                    }

                                })}
                            </tr>
                        ))}
                    </tbody>
                ))}

            </table>
            <button type="submit" className="btn btn-primary" onClick={(e) => handleSubmit(e)}>Submit</button>
        </Form>
    )
    
}
