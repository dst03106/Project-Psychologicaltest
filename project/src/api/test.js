import Axios from "axios";

const TEST_URL = "https://www.career.go.kr/inspct/openapi/test";
const apikey = "22b308e00e924ac13272794919934f05";
const QUESTION_SEQ = "6";
const TARGET_SEQ = "100209";

const axios = Axios.create({
  baseURL: TEST_URL,
});

const SUCCESS = {
  Y: "Y",
  N: "N",
};

const api = {};

api.getQuestions = async () => {
  const res = await axios.get("/questions", {
    params: { apikey, q: QUESTION_SEQ },
    headers: { "Access-Control-Allow-Origin": "*" },
  });
  if (res?.data?.SUCC_YN === SUCCESS.Y) {
    return res.data.RESULT;
  }
  throw new Error(res?.data?.ERROR_REASON || "");
};

api.submit = async ({ name, gender, startDtm, answers }) => {
  const qestrnSeq = QUESTION_SEQ;
  const trgetSe = TARGET_SEQ;
  console.log({ name, gender, startDtm, answers });
  const res = await axios.post("/report", {
    apikey,
    qestrnSeq,
    trgetSe,
    name,
    gender,
    startDtm,
    answers,
  });
  if (res?.data?.SUCC_YN === SUCCESS.Y) {
    return res.data.RESULT;
  }
  throw new Error(res?.data?.ERROR_REASON || "");
};

export default api;
