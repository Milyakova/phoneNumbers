import { useEffect, useState } from "react";
import configFile from "../app/config.json";
import httpServices from "../app/services/http.service";
import { useDispatch } from "react-redux";
import { loadcountryCodesList } from "../app/store/countryCodes.js";
import { loadNumbersList } from "../app/store/numbers.js";
const useMockData = () => {
  const statusConst = {
    idle: "not started",
    pending: "in process",
    successed: "Ready",
    error: "Error ocured",
  };
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(statusConst.idle);
  const [progress, setProgress] = useState(0);
  const [count, setCount] = useState(0);
  const summaryCount = configFile.countryCode.length;
  const incrementCount = () => {
    setCount((prevState) => prevState + 1);
  };
  const updateProgress = () => {
    if (count !== 0 && status === statusConst.idle) {
      setStatus(statusConst.pending);
    }
    const newProgress = Math.floor((count / summaryCount) * 100);
    if (progress < newProgress) {
      setProgress(() => newProgress);
    }
    if (newProgress === 100) {
      setStatus(statusConst.successed);
    }
  };
  const dispatch = useDispatch();
  useEffect(() => updateProgress(), [count]);

  async function initialize() {
    try {
      for (const code of configFile.countryCode) {
        await httpServices.put("countryCode/" + code._id, code);
        incrementCount();
      }
      dispatch(loadNumbersList());
      dispatch(loadcountryCodesList());
    } catch (error) {
      setError(error);
      setStatus(statusConst.error);
    }
  }
  return { error, initialize, progress, status };
};

export default useMockData;
