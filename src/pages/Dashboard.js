import * as React from "react";
import "../styles/dashboard.css";
import {
  BasicButton,
  InputBox,
  TablePagination,
  ToggleComponent,
} from "../components/BasicComponents";
import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import LineChartComponent from "../components/chart";
import EmployeeTable from "./EmployeeTable";
import CreateEmployeeModal from "./CreateEmployee";
import EmployeeSettingsModal from "./EmployeeSettings";
import axios from "axios";
import api from "../utils/api";
import { handleLoginError } from "../utils/utils";

const ToggleList = [
  { name: "Chart", value: "chart" },
  { name: "Employee", value: "Employee" },
];

const EmployeeFieldList = [
  { name: "Char", value: "char" },
  // { name: "Text", value: "text" },
  { name: "Int", value: "int" },
  { name: "Boolean", value: "bool" },
];

function Dashboard(props) {
  const { setOpenSnack, setSnackData } = props
  const [page,setPage] = useState(1)
  const [total_count,settotal_count] = useState(1)
  const handleChangePage = (e,v)=>{
    setPage(v)
  }
  const [search,setSearch] = useState("")

  const handleSearch = (e) =>{
    if (e) {
      let value = e.target.value;
      setSearch(value);
    }
  }
  



  const [is_create_new, set_create_new] = useState(false);
  const [is_settings, set_settings] = useState(false);

  const onClickCreateNew = () => set_create_new(true);
  const onClickSettings = () => set_settings(true);

  const [alignment, setAlignment] = React.useState("chart");

  const [state, setState] = useState({
    search: "",
    email: "",
    EmployeeList:[]
  });

  const [fieldList, setfieldList] = useState([]);

  const onChange = (e) => {
    
    
    if (e) {
      let name = e.target.name;
      let value = e.target.value;

      setState({ ...state, [name]: value });
    }
  };


  const onChangeCustomField = (e, id) => {
    console.log(e.target.type,e.target.checked,"==========");
    let value = ""
    if (e && e.target) {
      if (e.target.type === "checkbox"){
        value = e.target.checked;
      }
      else{
        value = e.target.value;
      }
  
      const updatedFieldList = fieldList.map((field) => {
        if (field.id === id) {
          return { ...field, value }; 
        }
        return field; 
      });  
      setfieldList(updatedFieldList); 
    } else {
      console.log("Invalid event or missing target");
    }
  };
  
  
  


  const onSelectChange = (e,v) =>{
    if (e) {
      let name = e.target.name;
      let value = e.target.value;

      setState({ ...state, [name]: value });
    }
    
  }

  const TogglehandleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  const onSearch = () => {
    //pass
  };


  const createEmployee = async() =>{
    let payload = {
      name:state.name,
      phone_number:state.phone_number,
      email:state.email,
      custom_values:[...fieldList]
    }
    try {
      const response = await api.post('/employee_view/',payload);
      setOpenSnack(true)
      setSnackData({
        type:"success",
        message:"Employee created successfully"
      })
      set_create_new(false)
      await fetchData()
      console.log("created successfully:", response.data);
    } catch (error) {
      console.error("Error creating :", error.response.data);
      handleLoginError(error, setOpenSnack, setSnackData);

    }
  }


  const createCustomField = async() =>{
    let payload = {
      field_name:state.field_name,
      data_type:state.data_type,
    }
    try {
      const response = await api.post('/employee-settings/',payload);
      console.log("created successfully:", response.data);
      setOpenSnack(true)
      setSnackData({
        type:"success",
        message:"Settings created successfully"
      })
      set_settings(false)
      await fetchSettings()
    } catch (error) {
      console.error("Error creating :", error.response.data);
      handleLoginError(error, setOpenSnack, setSnackData);

    }
  }

  const fetchSettings = async() =>{
    try {
      const response = await api.get('/dashboard');
      const EmployeeSettingsresponse = await api.get('/employee-settings');
      if (EmployeeSettingsresponse.status===200){
        let data = EmployeeSettingsresponse.data
        setfieldList([...data.data])

      }
      console.log('Data:', response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }


  const fetchData = async () => {
    try {
      let payload = {
        page:page,
        search:search
      }
      const response = await api.get('/dashboard');
      const EmployeeListresponse = await api.get('/employee_view',{ params: payload });

      console.log("EmployeeListresponse",EmployeeListresponse)
        
      if (EmployeeListresponse.status===200){
        let data = EmployeeListresponse.data
        setState({...state,EmployeeList:data.data})
        settotal_count(data.total_count)
      }
      console.log('Data:', response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };


  React.useEffect(()=>{

    if (page === 1){
      fetchSettings()
    }
    fetchData()
  },[page,search])


  console.log(state,"~~~~state");
  console.log(fieldList,"~~~~fieldList");
  
  return (
    <div className="dashboard-main-container">
      <h1 className="dashboard-heading">Dashboard</h1>

      <div className="toggle-div">
        <ToggleComponent
          ToggleList={ToggleList}
          handleChange={TogglehandleChange}
          alignment={alignment}
        />
      </div>

      {alignment === "Employee" ? (
        <div className="search-div">
          <InputBox
            label="Search here ..."
            onChange={handleSearch}
            value={search}
            name={"search"}
          />

          <div style={{display:"flex",gap:"10px"}}>
            <BasicButton
              variant={"outlined"}
              onClick={onClickCreateNew}
              name={"Create New +"}
            />
            <BasicButton
              variant={"outlined"}
              onClick={onClickSettings}
              name={"Employee Settings"}
            />
          </div>
        </div>
      ) : null}

      <div className="main-div">
        {alignment === "Employee" ? <EmployeeTable EmployeeList={state.EmployeeList} /> : <LineChartComponent />}
      </div>
      <div className="pagination-div">
        {alignment === "Employee" ? <TablePagination total_count={total_count} page={page} onChange={handleChangePage} /> : null}
      </div>

      {/* MODAL */}
      <CreateEmployeeModal
        open={is_create_new}
        setOpen={set_create_new}
        fieldList={fieldList}
        state={state}
        onChange={onChange}
        onSubmit={createEmployee}
        onChangeCustomField={onChangeCustomField}
      />
      <EmployeeSettingsModal
        open={is_settings}
        setOpen={set_settings}
        fieldList={EmployeeFieldList}
        state={state}
        onChange={onChange}
        onSubmit={createCustomField}
        onSelectChange={onSelectChange}
        
      />
    </div>
  );
}

export default Dashboard;
