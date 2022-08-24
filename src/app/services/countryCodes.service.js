import httpService from "./http.service";

const countryCodesEndpoint = "countryCode/";

const countryCodesService = {
  get: async () => {
    const req = await httpService.get(countryCodesEndpoint);
    return req.data;
  },
};
export default countryCodesService;
