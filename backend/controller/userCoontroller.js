export const dataUser = (req, res) => {
  res.status(200).json({
    status: 200,
    message: "sucess get user  ",
  });
};

export const addUser = (req, res) => {
  res.status(200).json({
    status: 200,
    message: "method post success",
  });
};
