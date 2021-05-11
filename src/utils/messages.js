const generateMessage = (argsObj) => {

  if (!argsObj.username) {
    argsObj.username = "Admin";
  }
  return {
    ...argsObj,
    createdAt: new Date().getTime(),
  };
};

module.exports = {
  generateMessage,
};
