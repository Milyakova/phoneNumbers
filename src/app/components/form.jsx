import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { validator } from "../../utils/validator";
import { createNumber } from "../store/numbers";
const Form = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState({
    countryCode: "p88733",
    number: "",
    bookmark: false,
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    validate();
  }, [data]);

  const validate = () => {
    const errors = validator(data, validatorConfig);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const isValid = Object.keys(errors).length === 0;

  const handleChange = ({ target }) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    const newData = {
      ...data,
      _id: Date.now().toString(),
    };
    dispatch(createNumber(newData));
  };

  const validatorConfig = {
    number: {
      isRequired: {
        message: "Поле номера обязательно для заполнения",
      },
      isNumber: {
        message:
          "Длина номера телефона от 3 до 10 цифр, запрещены любые символы",
      },
    },
  };
  const getInputClasses = () => {
    return "form-control w-50 " + (errors.number ? "is-invalid" : "");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className=" input-group mb-5 w-75 mx-auto">
        <select
          className=" input-group-text w-25  form-select "
          id="countryCode"
          name="countryCode"
          value={data.countryCode}
          onChange={handleChange}
          error={errors?.countryCode}
        >
          <option value="p88733">+7</option>
          <option value="w80983">+375</option>
          <option value="g88483">+998</option>
        </select>

        <input
          autoFocus
          type="text"
          placeholder="Введите номер телефона"
          id="number"
          name="number"
          value={data.number}
          onChange={handleChange}
          error={errors?.number}
          className={getInputClasses()}
        />
        <button type="submit" disabled={!isValid} className=" btn btn-primary ">
          Submit
        </button>
        {errors && (
          <div className="invalid-feedback">{Object.values(errors)[0]}</div>
        )}
      </div>
    </form>
  );
};

export default Form;
