import React, { useEffect, useRef } from "react";

import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

import axios from "axios";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export default function Home() {
  const ref = useRef();

  function intToFloat(num, decPlaces) {
    return Math.floor(num * 100) / 100;
  }
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [age, setAge] = React.useState(1);
  const [loading, setLoading] = React.useState(true);
  const [submited, setSubmited] = React.useState(false);
  const [result, setResult] = React.useState(null);

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  useEffect(() => {
    if (ref.current) {
      return;
    } else setLoading(false);
  }, []);

  const handleSubmitForm = () => {
    const data = {
      cholesterol: parseInt(ref.current.cholesterol.value),
      glucose: parseInt(ref.current.glucose.value),
      hdl_chol: parseInt(ref.current.hdl_chol.value),
      chol_hdl_ratio: intToFloat(
        parseInt(ref.current.cholesterol.value) /
          parseInt(ref.current.hdl_chol.value),
        2
      ),
      age: parseInt(ref.current.age.value),
      gender: parseInt(age),
      height: parseInt(ref.current.height.value),
      weight: parseInt(ref.current.weight.value),
      bmi: intToFloat(
        (parseInt(ref.current.weight.value) /
          parseInt(ref.current.height.value) /
          parseInt(ref.current.height.value)) *
          703,
        2
      ),
      systolic_bp: parseInt(ref.current.systolic_bp.value),
      diastolic_bp: parseInt(ref.current.diastolic_bp.value),
      waist: parseInt(ref.current.waist.value),
      hip: parseInt(ref.current.hip.value),
      waist_hip_ratio: intToFloat(
        parseInt(ref.current.waist.value) / parseInt(ref.current.hip.value),
        2
      ),
    };
    axios
      .post("http://127.0.0.1:8000/prediction", data)
      .then((res) => {
        setResult(res.data.data.prediction);
        console.log({ ok: res.data.data.prediction });
        handleOpen();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      {loading && (
        <div className="bg-home min-h-screen h-full">
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <div className="flex flex-col items-center gap-4">
                <span
                  className={`${
                    result === "No diabetes" ? "text-green-800" : "text-red-800"
                  } text-lg font-bold`}
                >
                  {result === "No diabetes"
                    ? "You dont have diabete"
                    : "You have diabete"}{" "}
                  in 91%
                </span>
                <img
                  src={
                    result === "No diabetes" ? "/negative.jpg" : "/positive.jpg"
                  }
                  alt
                />
              </div>
            </Box>
          </Modal>
          <div className="flex flex-col items-center py-2 justify-center min-h-screen h-full">
            <div className="flex flex-col bg-[rgba(255,255,255,0.85)] p-10">
              <span className="text-xl uppercase tracking-wide text-blue-400">
                Diabete prediction
              </span>
              <form ref={ref} className="grid grid-cols-2 gap-8 mt-8">
                <TextField
                  type="number"
                  label="cholesterol"
                  variant="outlined"
                  name="cholesterol"
                  id="cholesterol"
                  onChange={() => submited && setSubmited(false)}
                  error={
                    ref.current?.cholesterol.value.length === 0 &&
                    isNaN(parseInt(ref.current?.cholesterol.value))
                  }
                  helperText={
                    submited &&
                    ref.current?.cholesterol.value.length === 0 &&
                    isNaN(parseInt(ref.current?.cholesterol.value)) &&
                    "Field required"
                  }
                />
                <TextField
                  type="number"
                  label="glucose"
                  variant="outlined"
                  onChange={() => submited && setSubmited(false)}
                  name="glucose"
                  error={
                    ref.current?.glucose.value.length === 0 &&
                    isNaN(parseInt(ref.current?.glucose.value))
                  }
                  helperText={
                    submited &&
                    ref.current?.glucose.value.length === 0 &&
                    isNaN(parseInt(ref.current?.glucose.value)) &&
                    "Field required"
                  }
                />
                <TextField
                  type="number"
                  label="hdl_chol"
                  name="hdl_chol"
                  onChange={() => submited && setSubmited(false)}
                  variant="outlined"
                  error={
                    ref.current?.hdl_chol.value.length === 0 &&
                    isNaN(parseInt(ref.current?.hdl_chol.value))
                  }
                  helperText={
                    submited &&
                    ref.current?.hdl_chol.value.length === 0 &&
                    isNaN(parseInt(ref.current?.hdl_chol.value)) &&
                    "Field required"
                  }
                />

                <TextField
                  type="number"
                  label="age"
                  variant="outlined"
                  name="age"
                  onChange={() => submited && setSubmited(false)}
                  error={
                    ref.current?.age.value.length === 0 &&
                    isNaN(parseInt(ref.current?.age.value))
                  }
                  helperText={
                    submited &&
                    ref.current?.age.value.length === 0 &&
                    isNaN(parseInt(ref.current?.age.value)) &&
                    "Field required"
                  }
                />
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">gender</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={age}
                    defaultValue={1}
                    label="Age"
                    onChange={handleChange}
                  >
                    <MenuItem value={1}>Man</MenuItem>
                    <MenuItem value={0}>Woman</MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  type="number"
                  label="height(inch)"
                  variant="outlined"
                  onChange={() => submited && setSubmited(false)}
                  name="height"
                  error={
                    ref.current?.height.value.length === 0 &&
                    isNaN(parseInt(ref.current?.height.value))
                  }
                  helperText={
                    submited &&
                    ref.current?.height.value.length === 0 &&
                    isNaN(parseInt(ref.current?.height.value)) &&
                    "Field required"
                  }
                />
                <TextField
                  type="number"
                  label="weight(lbs)"
                  variant="outlined"
                  name="weight"
                  onChange={() => submited && setSubmited(false)}
                  error={
                    ref.current?.weight.value.length === 0 &&
                    isNaN(parseInt(ref.current?.weight.value))
                  }
                  helperText={
                    submited &&
                    ref.current?.weight.value.length === 0 &&
                    isNaN(parseInt(ref.current?.weight.value)) &&
                    "Field required"
                  }
                />

                <TextField
                  type="number"
                  label="systolic_bp"
                  variant="outlined"
                  name="systolic_bp"
                  onChange={() => submited && setSubmited(false)}
                  error={
                    ref.current?.systolic_bp.value.length === 0 &&
                    isNaN(parseInt(ref.current?.systolic_bp.value))
                  }
                  helperText={
                    submited &&
                    ref.current?.systolic_bp.value.length === 0 &&
                    isNaN(parseInt(ref.current?.systolic_bp.value)) &&
                    "Field required"
                  }
                />
                <TextField
                  type="number"
                  label="diastolic_bp"
                  variant="outlined"
                  name="diastolic_bp"
                  onChange={() => submited && setSubmited(false)}
                  error={
                    ref.current?.diastolic_bp.value.length === 0 &&
                    isNaN(parseInt(ref.current?.diastolic_bp.value))
                  }
                  helperText={
                    submited &&
                    ref.current?.diastolic_bp.value.length === 0 &&
                    isNaN(parseInt(ref.current?.diastolic_bp.value)) &&
                    "Field required"
                  }
                />
                <TextField
                  type="number"
                  label="waist"
                  variant="outlined"
                  name="waist"
                  onChange={() => submited && setSubmited(false)}
                  error={
                    ref.current?.waist.value.length === 0 &&
                    isNaN(parseInt(ref.current?.waist.value))
                  }
                  helperText={
                    submited &&
                    ref.current?.waist.value.length === 0 &&
                    isNaN(parseInt(ref.current?.waist.value)) &&
                    "Field required"
                  }
                />
                <TextField
                  type="number"
                  label="hip"
                  variant="outlined"
                  onChange={() => submited && setSubmited(false)}
                  name="hip"
                  error={
                    ref.current?.hip.value.length === 0 &&
                    isNaN(parseInt(ref.current?.hip.value))
                  }
                  helperText={
                    submited &&
                    ref.current?.hip.value.length === 0 &&
                    isNaN(parseInt(ref.current?.hip.value)) &&
                    "Field required"
                  }
                />
              </form>
              <div className="flex justify-center items-center mt-10">
                <button
                  onClick={() => {
                    setSubmited(true);
                    handleSubmitForm();
                  }}
                  className="bg-blue-900 rounded-lg py-3 px-10 text-white"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {!loading && (
        <div className="min-h-screen w-full">
          <div className="flex justify-center items-center min-h-screen h-full">
            <div className="max-w-[400px]">
              <div className="loader">Charging...</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
