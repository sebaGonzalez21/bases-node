const jwt = require('jsonwebtoken');
// ========================
// Verificar token
// ========================
let verificaToken = (req, res, next) => {

        let token = req.get('Authorization') //Authorization
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

    }
    // ========================
    // Verificar Admin role
    // ========================
let verificaAdminRole = (req, res, next) => {

    let usuario = req.usuario;

    if (usuario.role === "ADMIN_ROLE") {
        next();
    } else {
        return res.status(401).json({
            ok: false,
            message: "Usuario no autorizado"
        })
    }

}
module.exports = {
    verificaToken,
    verificaAdminRole
};