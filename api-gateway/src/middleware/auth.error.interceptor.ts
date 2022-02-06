const authenticationErrorInterceptor = (
  err: any,
  _req: any,
  res: any,
  next: any
) => {
  if (err.name === 'UnauthorizedError') {
    console.log(err.message);
    res.status(401).send(err.message);
  } else {
    next();
  }
};

export default authenticationErrorInterceptor;
