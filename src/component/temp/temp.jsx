const cookies = require("js-cookie");

const temp = () => {
  return <div>{cookies.get("accessToken")}</div>;
};

export default temp;
