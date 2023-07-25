
const pool = require("../database/index")
const postsController = {


    //Table users
    //Get users
    getAllU: async (req, res) => {
        const { email, mdp } = req.body;

        try {
            const [rows, fields] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);

            if (rows.length === 0) {
                return res.status(400).json({
                    error: 'Invalid email or password',
                });
            }

            const user = rows[0];

            if (mdp !== user.mdp) {
                return res.status(400).json({
                    error: 'Invalid email or password',
                });
            }

            return res.json({
                data: user
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },


    //Add user 
    createU: async (req, res) => {
        try {
            const { nom, email, tel, codeE, mdp } = req.body
            const sql = "insert into users (nom, email, tel, codeE, mdp) values (?,?,?,?,?)"
            const [rows, fields] = await pool.query(sql, [nom, email, tel, codeE, mdp])
            res.json({
                status: "user added"
            })
        } catch (error) {
            console.log(error)
            res.json({
                status: "error"
            })

        }
    },

    //edit password 
    updateU: async (req, res) => {
        try {
            const { email } = req.params;
            const { mdp } = req.body;
            const sql = "UPDATE users SET mdp = ? WHERE email = ?";
            const [result] = await pool.query(sql, [mdp, email]);

            if (result.affectedRows === 0) {
                return res.status(404).json({ error: "User not found" });
            }

            res.json({
                status: "success",
                message: "User updated successfully",
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "An error occurred" });
        }
    }
    ,


    //Table TRS
    //nombre de poste
    getCount: async (req, res) => {
        try {
            const [rows, fields] = await pool.query("select count (distinct Poste) from TRS ")
            const count = rows[0]['count (distinct Poste)'];
            res.json({ data: count });

        } catch (error) {
            console.log(error)
        }
    },

    //AVG TRS
    getAvgTrs: async (req, res) => {
        try {
            const [rows, fields] = await pool.query("select AVG (TRS) from TRS ")
            const count = rows[0]['AVG (TRS)'];
            res.json({ data: count });

        } catch (error) {
            console.log(error)
        }
    },

    //AVG TD
    getAvgTd: async (req, res) => {
        try {
            const [rows, fields] = await pool.query("select AVG (`Taux Disponibilité Opérationnelle`) from TRS ")
            const count = rows[0]['AVG (`Taux Disponibilité Opérationnelle`)'];
            res.json({ data: count });

        } catch (error) {
            console.log(error)
        }
    },

    //AVG TP
    getAvgTp: async (req, res) => {
        try {
            const [rows, fields] = await pool.query("select AVG (`Taux Performance`) from TRS ")
            const count = rows[0]['AVG (`Taux Performance`)'];
            res.json({ data: count });

        } catch (error) {
            console.log(error)
        }
    },

    //AVG TQ
    getAvgTq: async (req, res) => {
        try {
            const [rows, fields] = await pool.query("select AVG (`Taux Qualité`) from TRS ")
            const count = rows[0]['AVG (`Taux Qualité`)'];
            res.json({ data: count });

        } catch (error) {
            console.log(error)
        }
    },

    //AVG TRG
    getAvgTrg: async (req, res) => {
        try {
            const [rows, fields] = await pool.query("select AVG (TRG) from TRS ")
            const count = rows[0]['AVG (TRG)'];
            res.json({ data: count });

        } catch (error) {
            console.log(error)
        }
    },

    //Get Postes
    getPoste: async (req, res) => {
        try {
            const [rows, fields] = await pool.query("SELECT Poste, AVG(TRS) as avgTRS FROM TRS GROUP BY Poste")
            const posts = rows.map(row => ({ poste: row.Poste, taux: row.avgTRS }));
            res.json({ posts });

        } catch (error) {
            console.log(error)
        }
    },

    //Get Matin 
    getMatin: async (req, res) => {
        try {
            const [rows, fields] = await pool.query("SELECT Poste, AVG(TRS) as avgTRS FROM TRS WHERE `Type périodicité` = 'Seance' AND `Nom périodicité` = 'Matin' GROUP BY Poste;")
            const posts = rows.map(row => ({ poste: row.Poste, taux: row.avgTRS }));
            res.json({ posts });

        } catch (error) {
            console.log(error)
        }
    },

    //Get Soir
    getSoir: async (req, res) => {
        try {
            const [rows, fields] = await pool.query("SELECT Poste, AVG(TRS) as avgTRS FROM TRS WHERE `Type périodicité` = 'Seance' AND `Nom périodicité` = 'Soir' GROUP BY Poste;")
            const posts = rows.map(row => ({ poste: row.Poste, taux: row.avgTRS }));
            res.json({ posts });

        } catch (error) {
            console.log(error)
        }
    },

    //Get Nuit
    getNuit: async (req, res) => {
        try {
            const [rows, fields] = await pool.query("SELECT Poste, AVG(TRS) as avgTRS FROM TRS WHERE `Type périodicité` = 'Seance' AND `Nom périodicité` = 'Nuit' GROUP BY Poste;")
            const posts = rows.map(row => ({ poste: row.Poste, taux: row.avgTRS }));
            res.json({ posts });

        } catch (error) {
            console.log(error)
        }
    },

    //Get Jour
    getJour: async (req, res) => {
        try {
            const { date } = req.query;
            const [rows, fields] = await pool.query("SELECT Poste, AVG(TRS) as avgTRS FROM TRS  WHERE `Date initiale` = ? and `Type périodicité`='Jour' GROUP BY Poste", [date])
            const posts = rows.map(row => ({ poste: row.Poste, taux: row.avgTRS }));
            res.json({ posts });

        } catch (error) {
            console.log(error)
        }
    },


    //Get Mois
    getMois: async (req, res) => {
        try {
            const { date, annee } = req.query;
            const [rows, fields] = await pool.query("SELECT Poste, AVG(TRS) as avgTRS FROM TRS  WHERE `Nom périodicité` = ? and Année = ? and `Type périodicité`='Mois' GROUP BY Poste", [date, annee])
            const posts = rows.map(row => ({ poste: row.Poste, taux: row.avgTRS }));
            res.json({ posts });

        } catch (error) {
            console.log(error)
        }
    },

    //Get TP
    getTp: async (req, res) => {
        try {
            const { id } = req.query;
            const [rows, fields] = await pool.query("select `Taux Performance` from TRS where `Poste`=? order by `Date initiale` ", [id])
            res.json({
                data: rows
            })

        } catch (error) {
            console.log(error)
        }
    },

    //Get TQ
    getTq: async (req, res) => {
        try {
            const { id } = req.query;
            const [rows, fields] = await pool.query("select `Taux Qualité` from TRS where `Poste`=? order by `Date initiale` ", [id])
            res.json({
                data: rows
            })

        } catch (error) {
            console.log(error)
        }
    },

    //Get TRG
    getTrg: async (req, res) => {
        try {
            const { id } = req.query;
            const [rows, fields] = await pool.query("select TRG from TRS where `Poste`=? order by `Date initiale` ", [id])
            res.json({
                data: rows
            })

        } catch (error) {
            console.log(error)
        }
    },

    //Get TRE
    getTre: async (req, res) => {
        try {
            const { id } = req.query;
            const [rows, fields] = await pool.query("select TRE from TRS where `Poste`=? order by `Date initiale` ", [id])
            const posts = rows.map(row => ({ poste: row.Poste, taux: row.avgTRS }));
            res.json({
                data: rows
            })

        } catch (error) {
            console.log(error)
        }
    },

    getById: async (req, res) => {
        try {
            const { Poste } = req.params
            const [rows, fields] = await pool.query("select AVG(TRS) AS TRS from TRS where Poste = ?", [Poste])
            res.json({
                data: rows
            })
        } catch (error) {
            console.log(error)
        }
    },

    create: async (req, res) => {
        try {
            const { Poste, Typepériodicité, Dateinitiale, Nomjourinitiale, Nompériodicité, Année, TauxDisponibilitéOpérationnelle, TauxPerformance, TauxQualité, TRS, TRG, TRE, TempsPériodicité, TempsOverture, TempsFermeture, TempsArrêtsPlanifiés, TempsArrêtsNonPlanifiés, TempsEcartCadence, TempsNonQualité, TempsRequis, TempsdeFonctionnement, TempsNet, TempsUtile } = req.body
            const sql = "insert into TRS (Poste,Type périodicité,Date initiale,Nom jour initiale,Nom périodicité,Année,Taux Disponibilité Opérationnelle,Taux Performance,Taux Qualité,TRS,TRG,TRE,Temps Périodicité,Temps Overture,Temps Fermeture,Temps Arrêts Planifiés,Temps Arrêts Non Planifiés,Temps Ecart Cadence,Temps Non Qualité,Temps Requis,Temps de Fonctionnement,Temps Net,Temps Utile) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"
            const [rows, fields] = await pool.query(sql, [Poste, Typepériodicité, Dateinitiale, Nomjourinitiale, Nompériodicité, Année, TauxDisponibilitéOpérationnelle, TauxPerformance, TauxQualité, TRS, TRG, TRE, TempsPériodicité, TempsOverture, TempsFermeture, TempsArrêtsPlanifiés, TempsArrêtsNonPlanifiés, TempsEcartCadence, TempsNonQualité, TempsRequis, TempsdeFonctionnement, TempsNet, TempsUtile])
            res.json({
                status: "user added"
            })
        } catch (error) {
            console.log(error)
            res.json({
                status: "error"
            })

        }
    },
    update: async (req, res) => {
        try {
            const { email, username, password } = req.body
            const { id } = req.params
            const sql = "update users set email = ?, username = ? , password = ?  where id = ?"
            const [rows, fields] = await pool.query(sql, [email, username, password, id])
            res.json({
                status: "user updated"
            })
        } catch (error) {
            console.log(error)
            res.json({
                status: "error"
            })

        }
    },
    delete: async (req, res) => {
        try {
            const { id } = req.params
            const sql = "delete from users where id = ?"
            const [rows, fields] = await pool.query(sql, [id])
            res.json({
                status: "user deleted"
            })
        } catch (error) {
            console.log(error)
            res.json({
                status: "error"
            })

        }
    }




}

module.exports = postsController