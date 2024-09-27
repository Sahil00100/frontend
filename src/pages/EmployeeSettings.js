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

export default function EmployeeSettingsModal(props) {
  const {
    open,
    setOpen,
    state,
    onChange,
    fieldList,
    onSubmit,
    onSelectChange

  } = props;
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
       
  //         <Box sx={style}>
  //           <h3 className="modal-title">Settings</h3>
  //           <h4>Add New Fields:</h4>
  //           <Box
  //             style={{
  //               display: "flex",
  //               flexDirection: "column",
  //               alignItems: "center",
  //               gap: "10px",
  //               // height: "400px",
  //               // overflowY: "scroll",
  //               // overflowX: "hidden",
  //             }}
  //           >
  //             <InputBox
  //               label="Field Name"
  //               onChange={onChange}
  //               value={state.field_name}
  //               name={"field_name"}
  //             />

  //             <SelectBox
  //               label={"Data Type"}
  //               value={state.data_type}
  //               fieldList={fieldList}
  //               handleChange={onSelectChange}
  //               name={"data_type"}
  //             />

  //             <BasicButton
  //               variant={"contained"}
  //               onClick={onSubmit}
  //               name={"Submit"}
  //             />
       
  //           </Box>

            
  //         </Box>

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
        <Box sx={style} className="settings-modal-box">
          <h3 className="modal-title">Settings</h3>
          <h4 className="modal-subtitle">Add New Fields:</h4>
          
          <Box className="modal-content">
            <InputBox
              label="Field Name"
              onChange={onChange}
              value={state.field_name}
              name="field_name"
            />
  
            <SelectBox
              label="Data Type"
              value={state.data_type}
              fieldList={fieldList}
              handleChange={onSelectChange}
              name="data_type"
            />
  
            <BasicButton
              variant="contained"
              onClick={onSubmit}
              name="Submit"
            />
          </Box>
        </Box>
      </Modal>
    </div>
  );
  

}
