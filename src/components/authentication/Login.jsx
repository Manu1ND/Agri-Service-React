import { useState } from 'react';
import { loginFields } from "../../constants/formFields";
import FormAction from "./FormAction";
import Input from "./Input";
import { Select, Option } from "@material-tailwind/react";
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

const fields = loginFields;
let fieldsState = {};
fields.forEach(field => fieldsState[field.id] = '');
fieldsState["userType"] = '';

export default function Login() {
  const [loginState, setLoginState] = useState(fieldsState);

  let navigate = useNavigate();
  let location = useLocation();
  let from = location.state?.from?.pathname || "/";

  const handleChange = (e) => {
    if (e.target === undefined) {
      setLoginState({ ...loginState, "userType": e });
    } else {
      setLoginState({ ...loginState, [e.target.name]: e.target.value });
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    authenticateUser();
  }

  //Handle Login API Integration here
  const authenticateUser = () => {
    axios.post(import.meta.env.VITE_SERVER_URL + '/api/' + loginState.userType + '/login/', loginState)
      .then(res => {
        localStorage.setItem('userType', res.data.userType);
        localStorage.setItem('userID', res.data._id);
        navigate(from, { replace: true });
      })
      .catch(err => {
        console.log(err);
      });
  }

  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
      <div className="-space-y-px">
        <Select
          id="userType"
          name="userType"
          onChange={handleChange}
          label="Choose user type:"
          color="purple"
          className="rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm">
          <Option value="farmer">Farmer</Option>
          <Option value="supplier">Supplier</Option>
          <Option value="worker">Worker</Option>
        </Select>
        <br></br>
        {
          fields.map(field =>
            <Input
              key={field.id}
              handleChange={handleChange}
              value={loginState[field.id]}
              labelText={field.labelText}
              labelFor={field.labelFor}
              id={field.id}
              name={field.name}
              type={field.type}
              isRequired={field.isRequired}
              placeholder={field.placeholder}
            />
          )
        }
      </div>
      <FormAction handleSubmit={handleSubmit} text="Login" />
    </form>
  )
}