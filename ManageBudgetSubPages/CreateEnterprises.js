//Axios
import axios from "axios";

//Bootstrap
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

//Styles
import "./CreateEnterprises.css";

//React
import { useEffect, useState } from "react";

//FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";


export default function Enterprises({enterprises = [], updateEnterprises, budgetId}) {
  const [newEnterprise, setNewEnterprise] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [newNominal, setNewNominal] = useState("");
  const [newNominalUnit, setNewNominalUnit] = useState("");

  const [categories, setCategories] = useState(null);
  const [nominals, setNominals] = useState(null);

  let [selectedEnterprise, setSelectedEnterprise] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const [activeEnterprise, setActiveEnterprise] = useState(null);
  const [activeEnterpriseName, setActiveEnterpriseName] = useState(null);

  const [activeCategory, setActiveCategory] = useState(null);
  const [activeCategoryName, setActiveCategoryName] = useState(null);

  useEffect(() => {
   console.log(enterprises)
  }, [enterprises]);

  //#region Fetch Requests


  //Post
  const postEnterprise = (data) => {
    axios
      .post(`https://${process.env.REACT_APP_IP}/api/budget/${budgetId}/enterprise/`, data)
      .then((res) => {
        if (res.status === 200) {
          console.log("this post ran", res.data);
          const ent = res.data;
          updateEnterprises((prevEnterprises) => [...prevEnterprises, ent])
          setSelectedEnterprise(ent);
          setActiveEnterpriseName(ent.enterpriseName);
          setActiveEnterprise(`Ent_${ent.id}`);
          setCategories(ent.nominalCategories);
          setNominals([])
          setSelectedCategory(null);
          setActiveCategory(null);
          setNewEnterprise("");
        }
      });
  };

  const postNominal = (id, data) => {
    axios
      .post(
        `https://${process.env.REACT_APP_IP}/api/budget/${budgetId}/enterprise/${id}/nominal/`,
        data
      )
      .then((res) => {
        if (res.status === 200) {
          
          console.log("Nominal Added", res.data);
      
          selectedEnterprise.nominalCategories.forEach((cat) => {

            if (cat.categoryName === activeCategoryName) {
              cat.nominals.push(res.data)
            }
    
          }) 
          
          setNewNominal("");
        }
     })
    };

  //Delete
  const deleteEnterprise = (id) => {
    axios
      .delete(
        `https://${process.env.REACT_APP_IP}/api/budget/${budgetId}/enterprise/${id}`
      )
      .then((res) => {
        if (res.status === 200) {

          updateEnterprises((prevEnterprises) => {
            return prevEnterprises.filter((ent) => {
              return id !== ent.id
            })
          })
          // setEnterprises()
        }
      });
  };

  const deleteNominal = (id) => {
    axios
      .delete(
        `https://${process.env.REACT_APP_IP}/api/budget/${budgetId}/enterprise/${selectedEnterprise.id}/nominal/${id}`
      )
      .then((res) => {
        if (res.status === 200) {
          console.log(res)

          selectedEnterprise.nominalCategories.forEach((cat) => {
            if (cat.categoryName === activeCategoryName) {
              cat.nominals.forEach((nom, index) => {
                if (nom.id == id) {
                  cat.nominals.splice(index, 1)
                }
              })
            }
          }) 

          setNominals((prevNominals) => {
            return prevNominals.filter((nom) => {
              return id !== nom.id
            })
          })
          
        }
      });
  };

  //#endregion

  //Run once on page load
 

  const handleAddEnterprise = (e) => {
    e.preventDefault();
    const enterprise = { enterpriseName: newEnterprise.trim() };

    postEnterprise(enterprise);
  };

  const handleSelectEnterprise = (id, name) => {
    enterprises.forEach((ent) => {
      if (ent.id.toString() === id.toString()) {
        setSelectedEnterprise(ent);
        setActiveEnterpriseName(name);
        setCategories(ent.nominalCategories);
        setNominals([])
        setSelectedCategory(null);
        setActiveCategory(null);
      }
    });
  };

  const handleAddCategory = (e) => {
    e.preventDefault();

    if (selectedEnterprise !== null) {

      const category = { categoryName: newCategory.trim(), nominals: [] };

      selectedEnterprise.nominalCategories.push(category);

      // console.log(selectedEnterprise, "Selected")

      setSelectedCategory(category);
      setActiveCategory(`Cat_${category.categoryName}`);
      setActiveCategoryName( category.categoryName);
      setNominals(category.nominals);
      setNewCategory("");
    }
  };

  const handleSelectCategory = (name) => {
    categories.forEach((cat) => {
      if (cat.categoryName === name.toString()) {
        setSelectedCategory(cat);
        setActiveCategoryName(cat.categoryName);
        setNominals(cat.nominals);
      }
    });
  };

  const handleAddNominal = (e) => {
    e.preventDefault();

    if (selectedEnterprise !== null && selectedCategory !== null) {
      const nominal = {
        name: newNominal.trim(),
        units: newNominalUnit,
        category: selectedCategory.categoryName,
        type: "0"
      };

      postNominal(selectedEnterprise.id, nominal);

    }
  };

  console.log(enterprises, "Ents");
  console.log(nominals, "Noms");

  return (
    <div className="p-2 p-md-3 d-flex flex-column">
      {/* <h1 className="text-center py-2">Enterprises & Nominals</h1> */}
      <div className="enterprises d-flex py-2 col-12">
        <div className="p-3 d-flex flex-column col-4">
          <div className="p-3 infoBox form-group col-sm-12 ">
            <h4 className="mb-4">Enterprises</h4>
            <div className="optionList">
              {enterprises.length > 0 &&
                enterprises.map((ent) => (
                  <div
                  key={ent.id}
                    className={`p-0 optionListItem mb-2 d-flex justify-content-between ${
                      activeEnterprise === `Ent_${ent.id}` &&
                      "selectedEnt"
                    }`}
                  >
                    <div
                      className="col-10 p-2"
                      id={ent.id}
                      onClick={(e) => {
                        handleSelectEnterprise(e.target.id, ent.enterpriseName);
                        setActiveEnterprise(`Ent_${ent.id}`);
                      }}
                    >
                      {ent.enterpriseName}
                    </div>

                    <FontAwesomeIcon
                      icon={faTrash}
                      size="xl"
                      onClick={() => {
                        deleteEnterprise(ent.id);
                      }}
                      className=" p-1 me-3 mt-1"
                    />
                  </div>
                ))}
            </div>
            <form>
              <div className="d-flex col-12 mt-4">
                <div className="col-9">
                  <input
                    type="text"
                    aria-label="Enterprises"
                    className="form-control"
                    placeholder="Enter enterprise name..."
                    onChange={(e) => {
                      setNewEnterprise(e.target.value);
                    }}
                    value={newEnterprise}
                  />
                </div>
                <Button
                  className="col-3"
                  type="submit"
                  onClick={handleAddEnterprise}
                >
                  Add
                </Button>
              </div>
            </form>
          </div>
        </div>

        <div className="p-3 d-flex flex-column col-4">
          <div className="infoBox p-3 form-group col-sm-12 ">
            <h4 className="mb-4">
              {selectedEnterprise
                ? `${activeEnterpriseName} Categories`
                : "Select an enterprise to see categories"}
            </h4>
            <div className="optionList">
              {categories &&
                categories.map((cat, index) => (
                  <div
                    key={cat.categoryName}
                    className={`p-0 optionListItem mb-2 d-flex justify-content-between ${
                      activeCategory === `Cat_${cat.categoryName}` &&
                      "selectedEnt"
                    }`}
                  >
                    <div
                      id={cat.categoryName}
                      className={`col p-2`}
                      onClick={(e) => {
                        handleSelectCategory(e.target.id, cat.categoryName);
                        setActiveCategory(`Cat_${cat.categoryName}`);
                      }}
                    >
                      {cat.categoryName}
                    </div>
                  </div>
                ))}
            </div>
            <form>
              <div className="d-flex col-12 mt-4">
                <div className="col-10">
                  <input
                    type="text"
                    aria-label="Nominal Categories"
                    className="form-control"
                    placeholder="Enter category name..."
                    onChange={(e) => setNewCategory(e.target.value)}
                    value={newCategory}
                  />
                </div>
                <Button
                  className="col-2"
                  type="submit"
                  onClick={handleAddCategory}
                >
                  Add
                </Button>
              </div>
            </form>
          </div>
        </div>

        <div className="p-3 d-flex flex-column col-4">
          <div className="infoBox p-3 form-group col-sm-12 ">
            <h4 className="mb-4">
              {selectedCategory !== null
                ? `${activeCategoryName} Nominals`
                : "Select a category to see nominals"}
            </h4>
            <div className="optionList">
              {nominals &&
                nominals.map((nom) => (
                  <div
                    className={`p-0 optionListItem mb-2 d-flex justify-content-between `}
                    key={nom.id}
                    id={nom.name}
                  >
                    <div className=" p-2">{nom.name}</div>
                    <FontAwesomeIcon
                      icon={faTrash}
                      size="xl"
                      onClick={() => {
                        deleteNominal(nom.id);
                      }}
                      className=" p-1 me-3 mt-1"
                    />
                  </div>
                ))}
            </div>
            <form>
              <div className="d-flex col-12 mt-4">
                <div className="col-5">
                  <input
                    type="text"
                    aria-label="Nominal name"
                    className="form-control"
                    placeholder="Enter name..."
                    onChange={(e) => setNewNominal(e.target.value)}
                    value={newNominal}
                  />
                </div>
                <div className="col-5">
                  <Form.Select
                    className="form-control"
                    onChange={(e) => setNewNominalUnit(e.target.value)}
                  >
                    <option>Select Unit</option>
                    <option>£</option>
                  </Form.Select>
                </div>
                <Button
                  className="col-2"
                  type="submit"
                  onClick={handleAddNominal}
                >
                  Add
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
