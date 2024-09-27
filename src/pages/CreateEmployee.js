import * as React from "react";
import "../styles/dashboard.css";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import {
  BasicButton,
  InputBox,
  SelectBox,
} from "../components/BasicComponents";
import SettingsIcon from "@mui/icons-material/Settings";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  p: 4,
};

export default function CreateEmployeeModal(props) {
  const { open, setOpen, state, onChange, fieldList, onSubmit,onChangeCustomField } = props;
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);



  // return (
  //   <div>
  //     <Modal
  //       open={open}
  //       onClose={handleClose}
  //       aria-labelledby="modal-modal-title"
  //       aria-describedby="modal-modal-description"
  //     >
  //       <Box sx={style}>
  //         <h3 className="dashboard-heading">Create New Employee</h3>
  //         <Box
  //           style={{
  //             display: "flex",
  //             flexDirection: "column",
  //             alignItems: "center",
  //             gap: "10px",
  //             height: "400px",
  //             overflowY: "scroll",
  //             overflowX: "hidden",
  //           }}
  //         >
  //           {/* default fields here */}
  //           <InputBox
  //             required
  //             label="Full Name"
  //             name="name"
  //             type="text"
  //             onChange={onChange}
  //             value={state.name}
  //           />

  //           <InputBox
  //             required
  //             label="Phone Number"
  //             name="phone_number"
  //             type="number"
  //             onChange={onChange}
  //             value={state.phone_number}
  //           />
  //           <InputBox
  //             required
  //             label="Email"
  //             name="email"
  //             type="text"
  //             onChange={onChange}
  //             value={state.email}
  //           />

  //           {/* custom fields here */}

  //           {fieldList.map((item) => (
  //             <InputBox
  //               key={item.name}
  //               required
  //               label={item.label}
  //               name={item.name}
  //               type={item.data_type==="int"?"number":item.type}
  //               onChange={onChangeCustomField}
  //               value={item.value}
  //               id={item.id}
  //               data_type={item.data_type}
  //             />
  //           ))}
  //         </Box>

  //         <Box
  //           style={{
  //             display: "flex",
  //             justifyContent: "center",
  //             paddingTop: "15px",
  //           }}
  //         >
  //           <BasicButton
  //             variant={"outlined"}
  //             onClick={onSubmit}
  //             name={"Submit"}
  //           />
  //         </Box>
  //       </Box>
  //     </Modal>
  //   </div>
  // );

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="modal-box">
          <h3 className="modal-title">Create New Employee</h3>
          
          <Box className="modal-content">
            {/* Default fields */}
            <InputBox
              required
              label="Full Name"
              name="name"
              type="text"
              onChange={onChange}
              value={state.name}
            />
  
            <InputBox
              required
              label="Phone Number"
              name="phone_number"
              type="text"
              onChange={onChange}
              value={state.phone_number}
            />
  
            <InputBox
              required
              label="Email"
              name="email"
              type="email"
              onChange={onChange}
              value={state.email}
            />
  
            {/* Custom fields */}
            {fieldList.map((item) => (
              <InputBox
                key={item.name}
                required
                label={item.label}
                name={item.name}
                type={item.data_type === "int" ? "number" : item.type}
                onChange={onChangeCustomField}
                value={item.value}
                id={item.id}
                data_type={item.data_type}
              />
            ))}
          </Box>
  
          <Box className="modal-footer">
            <BasicButton
              variant={"contained"}
              onClick={onSubmit}
              name={"Submit"}
            />
          </Box>
        </Box>
      </Modal>
    </div>
  );
  

}
