import Axios from "axios";

const RESULT_URL = "https://www.career.go.kr/inspct/api/psycho";

const axios = Axios.create({
  baseURL: RESULT_URL,
});

const SUCCESS = {
  Y: "Y",
  N: "N",
};

const api = {};

api.getReport = async ({ seq }) => {
  const res = await axios.get("/report", {
    params: { seq },
  });
  if (res?.data?.result) {
    return res.data;
  }
  throw new Error(res?.data?.ERROR_REASON || "");
};

api.getJobsByEdu = async ({ no1, no2 }) => {
  const res = await axios.get("/value/jobs", {
    params: { no1, no2 },
  });
  if (res?.data) {
    return res.data;
  }
  throw new Error(res?.data?.ERROR_REASON || "");
};

api.getJobsByMajor = async ({ no1, no2 }) => {
  const res = await axios.get("/value/majors", {
    params: { no1, no2 },
  });
  if (res?.data) {
    return res.data;
  }
  throw new Error(res?.data?.ERROR_REASON || "");
};

export default api;
