import { useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { getNumbersLoadingStatus, loadNumbersList } from "../../store/numbers";
import {
  getCountryCodesLoadingStatus,
  loadcountryCodesList,
} from "../../store/countryCodes";
import useMockData from "../../../utils/mockData";

const AppLoader = ({ children }) => {
  const { initialize } = useMockData();
  const dispatch = useDispatch();
  const numbersStatusLoading = useSelector(getNumbersLoadingStatus());
  const countriesStatusLoading = useSelector(getCountryCodesLoadingStatus());
  // useEffect(() => {
  //  async  initialize();
  //   dispatch(loadcountryCodesList());
  //   dispatch(loadNumbersList());
  // }, []);

  useEffect(() => {
    initialize();
  }, []);

  if (numbersStatusLoading || countriesStatusLoading) return "loading";
  return children;
};

AppLoader.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};
export default AppLoader;
