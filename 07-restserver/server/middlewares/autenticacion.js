const jwt = require('jsonwebtoken');
// ========================
// Verificar token
// ========================
let verificaToken = (req, res, next) => {
    try {
        let token = req.get('Authorization'); //Authorization
        //console.log("llego el token", token);
        jwt.verify(token, process.env.SEED, (err, decoded) => {
            if (err) {
                return res.status(401).json({
                    ok: false,
                    message: "Token no valido"
                })
            }

            req.usuario = decoded.usuario;
            next();
        });
    } catch (err) {
        return res.status(500).json({
            ok: false,
            message: "Error en token"
        })
    }

};
// ========================
// Verificar Admin role
// ========================
let verificaAdminRole = (req, res, next) => {
    try {
        let usuario = req.usuario;

        if (usuario.role === "ADMIN_ROLE") {
            next();
        } else {
            return res.status(401).json({
                ok: false,
                message: "Usuario no autorizado"
            })
        }
    } catch (err) {
        return res.status(500).json({
            ok: false,
            message: "Error en verificacion de role"
        })
    }


}
module.exports = {
    verificaToken,
    verificaAdminRole
};