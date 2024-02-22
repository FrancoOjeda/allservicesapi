const { onAuthStateChanged } = require('firebase/auth');
const { auth } = require('../firebase');

// onAuthStateChanged(auth, (user) => {
//   const uid = user.uid;
//   console.log(uid);
// })
const autorizarUsuario = (req, res, next) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      req.user = user;
      next();
    } else {
      res.status(401).send({ error: "No autorizado" });
    }
  })
};

module.exports = {
  autorizarUsuario
};
