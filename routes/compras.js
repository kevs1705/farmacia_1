// Invocamos a express
const express = require('express');
const router = express.Router();

// Invocamos a la conexión de la base de datos
const connection = require('../database/db');

router.get('/compras', function(req, res) {
    connection.query('SELECT * FROM compras ORDER BY Fecha_Compra DESC LIMIT 200;', (error, results) => {
        if (error) {
            console.error('Error al obtener datos de la tabla compras:', error);
            res.status(500).send('Error al obtener datos de la tabla compras');
        } else {
            res.render('./compras/compras', { results: results });
        }
    });
});

router.post('/compras/:id?', function(req, res) {
    const id = req.params.id;
    const opcion = req.body.opcion;
    console.log("la fecha es" + req.body.Fecha);
    switch(opcion) {
        case 'crear':
            const nuevaCompra = {
                Fecha_Compra: req.body.Fecha,
                Total_Compra: req.body.Total_Compra,
                ID_Proveedor: req.body.ID_Proveedor
            };
            connection.query('INSERT INTO compras SET ?', nuevaCompra, (error, result) => {
                if (error) {
                    console.error('Error al insertar una nueva compra:', error);
                    res.status(500).send('Error al insertar una nueva compra');
                } else {
                    res.status(200).send('Compra creada correctamente');
                }
            });
            break;
        case 'editar':
            const datosCompra = {
                Fecha_Compra: req.body.Fecha,
                Total_Compra: req.body.Total_Compra,
                ID_Proveedor: req.body.ID_Proveedor
            };
            connection.query('UPDATE compras SET ? WHERE ID_Compra = ?', [datosCompra, id], (error, result) => {
                if (error) {
                    console.error('Error al actualizar la compra:', error);
                    res.status(500).send('Error al actualizar la compra');
                } else {
                    res.status(200).send('Compra actualizada correctamente');
                }
            });
            break;
        case 'eliminar':
            connection.query('DELETE FROM compras WHERE ID_Compra = ?', id, (error, result) => {
                if (error) {
                    console.error('Error al eliminar la compra:', error);
                    res.status(500).send('Error al eliminar la compra');
                } else {
                    res.status(200).send('Compra eliminada correctamente');
                }
            });
            break;
        default:
            res.status(400).send('Opción no válida');
            break;
    }
});

module.exports = router;
