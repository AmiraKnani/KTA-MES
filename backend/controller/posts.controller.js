
const pool = require("../database/index")
const postsController = {


    // Table users

    // Get users
    getAllU: async (req, res) => {
        const { email, mdp } = req.body;

        try {
            const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
            const rows = result.rows;

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
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    // Add user 
    createU: async (req, res) => {
        try {
            const { nom, email, tel, codeE, mdp } = req.body
            const sql = "INSERT INTO users (nom, email, tel, codeE, mdp) VALUES ($1, $2, $3, $4, $5)"
            await pool.query(sql, [nom, email, tel, codeE, mdp]);

            res.json({
                status: "user added"
            });
        } catch (error) {
            console.error(error);
            res.json({
                status: "error"
            });
        }
    },

    // Edit password 
    updateU: async (req, res) => {
        try {
            const { email, mdp } = req.body;
            const sql = "UPDATE users SET mdp = $1 WHERE email = $2";
            const result = await pool.query(sql, [mdp, email]);

            if (result.rowCount === 0) { // Note: Instead of `affectedRows` we use `rowCount` in pg
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
    },

    // Check user 
    checkU: async (req, res) => {
        try {
            const { email } = req.query;
            const sql = "SELECT * FROM users WHERE email = $1";
            const result = await pool.query(sql, [email]);
            const rows = result.rows;

            if (rows.length === 0) {
                return res.json({
                    status: "error",
                    message: "Utilisateur introuvable"
                });
            }

            res.json({
                status: "success"
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                status: "error",
                message: "An error occurred while checking the user"
            });
        }
    },

    // Table TRS

    // Number of posts
    getCount: async (req, res) => {
        try {
            const result = await pool.query("SELECT COUNT(DISTINCT Poste) FROM TRS");
            const count = result.rows[0]['count']; // Note: column name will be 'count'

            res.json({ data: count });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },


    //AVG TRS
    getAvgTrs: async (req, res) => {
        try {
            const result = await pool.query("SELECT AVG(TRS) FROM TRS");
            const count = result.rows[0]['avg'];
            res.json({ data: count });

        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    },


    // AVG TD
    getAvgTd: async (req, res) => {
        try {
            const result = await pool.query("SELECT AVG(\"Taux Disponibilité Opérationnelle\") FROM TRS");
            const count = result.rows[0]['avg'];
            res.json({ data: count });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    // AVG TP
    getAvgTp: async (req, res) => {
        try {
            const result = await pool.query("SELECT AVG(\"Taux Performance\") FROM TRS");
            const count = result.rows[0]['avg'];
            res.json({ data: count });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    // AVG Tu per post
    getAvgTu: async (req, res) => {
        try {
            const { poste } = req.query;
            const result = await pool.query("SELECT AVG(\"Temps Utile\") FROM TRS WHERE Poste = $1", [poste]);
            const count = result.rows[0]['avg'];
            res.json({ data: count });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'An error occurred while fetching data' });
        }
    },

    // AVG TA per post
    getAvgTa: async (req, res) => {
        try {
            const { poste } = req.query;
            const result = await pool.query("SELECT AVG(\"Temps Arrêts Non Planifiés\" + \"Temps Arrêts Planifiés\") FROM TRS WHERE Poste = $1", [poste]);
            const count = result.rows[0]['avg'];
            res.json({ data: count });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'An error occurred while fetching data' });
        }
    },

    // AVG TQ
    getAvgTq: async (req, res) => {
        try {
            const result = await pool.query("SELECT AVG(\"Taux Qualité\") FROM TRS");
            const count = result.rows[0]['avg'];
            res.json({ data: count });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    // AVG TRG
    getAvgTrg: async (req, res) => {
        try {
            const result = await pool.query("SELECT AVG(TRG) FROM TRS");
            const count = result.rows[0]['avg'];
            res.json({ data: count });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    // Get Postes
    getPoste: async (req, res) => {
        try {
            const result = await pool.query("SELECT Poste, AVG(TRS) as avgTRS FROM TRS GROUP BY Poste");
            const posts = result.rows.map(row => ({ poste: row.poste, taux: row.avgtrs }));
            res.json({ posts });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },


    //Get Matin 
    getMatin: async (req, res) => {
        try {
            const { rows } = await pool.query("SELECT Poste, AVG(TRS) as avgTRS FROM TRS WHERE \"Type périodicité\" = 'Seance' AND \"Nom périodicité\" = 'Matin' GROUP BY Poste;");
            const posts = rows.map(row => ({ poste: row.poste, taux: row.avgtrs }));
            res.json({ posts });

        } catch (error) {
            console.log(error);
        }
    },

    //Get Soir
    getSoir: async (req, res) => {
        try {
            const { rows } = await pool.query("SELECT Poste, AVG(TRS) as avgTRS FROM TRS WHERE \"Type périodicité\" = 'Seance' AND \"Nom périodicité\" = 'Soir' GROUP BY Poste;");
            const posts = rows.map(row => ({ poste: row.poste, taux: row.avgtrs }));
            res.json({ posts });

        } catch (error) {
            console.log(error);
        }
    },

    //Get Nuit
    getNuit: async (req, res) => {
        try {
            const { rows } = await pool.query("SELECT Poste, AVG(TRS) as avgTRS FROM TRS WHERE \"Type périodicité\" = 'Seance' AND \"Nom périodicité\" = 'Nuit' GROUP BY Poste;");
            const posts = rows.map(row => ({ poste: row.poste, taux: row.avgtrs }));
            res.json({ posts });

        } catch (error) {
            console.log(error);
        }
    },

    //Get Jour
    getJour: async (req, res) => {
        try {
            const { date } = req.query;
            const { rows } = await pool.query("SELECT Poste, AVG(TRS) as avgTRS FROM TRS WHERE \"Date initiale\" = $1 and \"Type périodicité\"='Jour' GROUP BY Poste", [date]);
            const posts = rows.map(row => ({ poste: row.poste, taux: row.avgtrs }));
            res.json({ posts });

        } catch (error) {
            console.log(error);
        }
    },



    //Get Semaine
    getSemaine: async (req, res) => {
        try {
            const { date } = req.query;
            const { rows } = await pool.query("SELECT Poste, AVG(TRS) as avgTRS FROM TRS WHERE \"Date initiale\" = $1 and \"Type périodicité\"='Semaine' GROUP BY Poste", [date]);
            const posts = rows.map(row => ({ poste: row.poste, taux: row.avgtrs }));
            res.json({ posts });

        } catch (error) {
            console.log(error);
        }
    },

    //Get Mois
    getMois: async (req, res) => {
        try {
            const { date, annee } = req.query;
            const { rows } = await pool.query("SELECT Poste, AVG(TRS) as avgTRS FROM TRS WHERE \"Nom périodicité\" = $1 and Année = $2 and \"Type périodicité\"='Mois' GROUP BY Poste", [date, annee]);
            const posts = rows.map(row => ({ poste: row.poste, taux: row.avgtrs }));
            res.json({ posts });

        } catch (error) {
            console.log(error);
        }
    },

    //Get TP
    getTp: async (req, res) => {
        try {
            const { id } = req.query;
            const { rows } = await pool.query("SELECT AVG(\"Taux Performance\") as \"Taux Performance\", \"Nom périodicité\" FROM TRS WHERE Poste=$1 and \"Type périodicité\"='Mois' GROUP BY \"Nom périodicité\" ORDER BY MIN(\"Date initiale\")", [id]);
            res.json({ data: rows });

        } catch (error) {
            console.log(error);
        }
    },

    //Get TP1
    getTp1: async (req, res) => {
        try {
            const { rows } = await pool.query("SELECT AVG(\"Taux Performance\") as \"Taux Performance\", \"Nom périodicité\" FROM TRS WHERE \"Type périodicité\"='Mois' GROUP BY \"Nom périodicité\" ORDER BY MIN(\"Date initiale\")");
            res.json({ data: rows });

        } catch (error) {
            console.log(error);
        }
    },

    //Get TQ
    getTq: async (req, res) => {
        try {
            const { id } = req.query;
            const { rows } = await pool.query("SELECT AVG(\"Taux Qualité\") as \"Taux Qualité\", \"Nom périodicité\" FROM TRS WHERE Poste=$1 and \"Type périodicité\"='Mois' GROUP BY \"Nom périodicité\" ORDER BY MIN(\"Date initiale\")", [id]);
            res.json({ data: rows });

        } catch (error) {
            console.log(error);
        }
    },

    //Get TQ1
    getTq1: async (req, res) => {
        try {
            const { rows } = await pool.query("SELECT AVG(\"Taux Qualité\") as \"Taux Qualité\", \"Nom périodicité\" FROM TRS WHERE \"Type périodicité\"='Mois' GROUP BY \"Nom périodicité\" ORDER BY MIN(\"Date initiale\")");
            res.json({ data: rows });

        } catch (error) {
            console.log(error);
        }
    },

    //Get TRG
    getTrg: async (req, res) => {
        try {
            const { id } = req.query;
            const { rows } = await pool.query("SELECT AVG(TRG) as TRG, \"Nom périodicité\" FROM TRS WHERE Poste=$1 and \"Type périodicité\"='Mois' GROUP BY \"Nom périodicité\" ORDER BY MIN(\"Date initiale\")", [id]);
            res.json({ data: rows });

        } catch (error) {
            console.log(error);
        }
    },


    //Get TRG1
    getTrg1: async (req, res) => {
        try {
            const { rows } = await pool.query("SELECT AVG(TRG) AS TRG, \"Nom périodicité\" FROM TRS WHERE \"Type périodicité\"='Mois' GROUP BY \"Nom périodicité\" ORDER BY MIN(\"Date initiale\") ");
            res.json({ data: rows });

        } catch (error) {
            console.log(error);
        }
    },

    //Get TRE
    getTre: async (req, res) => {
        try {
            const { id } = req.query;
            const { rows } = await pool.query("SELECT AVG(TRE) AS TRE, \"Nom périodicité\" FROM TRS WHERE Poste=$1 AND \"Type périodicité\"='Mois' GROUP BY \"Nom périodicité\" ORDER BY MIN(\"Date initiale\")", [id]);
            res.json({
                data: rows
            });

        } catch (error) {
            console.log(error);
        }
    },

    //Get TRE1
    getTre1: async (req, res) => {
        try {
            const { rows } = await pool.query("SELECT AVG(TRE) AS TRE, \"Nom périodicité\" FROM TRS WHERE \"Type périodicité\"='Mois' GROUP BY \"Nom périodicité\" ORDER BY MIN(\"Date initiale\")");
            res.json({
                data: rows
            });

        } catch (error) {
            console.log(error);
        }
    },

    //Get Trimestre1
    getTrimestre1: async (req, res) => {
        try {
            const { annee } = req.query;
            const { rows } = await pool.query("SELECT Poste, AVG(TRS) AS avgTRS FROM TRS WHERE \"Nom périodicité\"='1' AND Année=$1 AND \"Type périodicité\"='Trimestre' GROUP BY Poste", [annee]);
            const posts = rows.map(row => ({ poste: row.poste, taux: row.avgtrs }));
            res.json({ posts });

        } catch (error) {
            console.log(error);
        }
    },

    //Get Trimestre2
    getTrimestre2: async (req, res) => {
        try {
            const { annee } = req.query;
            const { rows } = await pool.query("SELECT Poste, AVG(TRS) AS avgTRS FROM TRS WHERE \"Nom périodicité\"='2' AND Année=$1 AND \"Type périodicité\"='Trimestre' GROUP BY Poste", [annee]);
            const posts = rows.map(row => ({ poste: row.poste, taux: row.avgtrs }));
            res.json({ posts });

        } catch (error) {
            console.log(error);
        }
    },

    //Get Trimestre3
    getTrimestre3: async (req, res) => {
        try {
            const { annee } = req.query;
            const { rows } = await pool.query("SELECT Poste, AVG(TRS) AS avgTRS FROM TRS WHERE \"Nom périodicité\"='3' AND Année=$1 AND \"Type périodicité\"='Trimestre' GROUP BY Poste", [annee]);
            const posts = rows.map(row => ({ poste: row.poste, taux: row.avgtrs }));
            res.json({ posts });

        } catch (error) {
            console.log(error);
        }
    },

    //Get Trimestre4
    getTrimestre4: async (req, res) => {
        try {
            const { annee } = req.query;
            const { rows } = await pool.query("SELECT Poste, AVG(TRS) AS avgTRS FROM TRS WHERE \"Nom périodicité\"='4' AND Année=$1 AND \"Type périodicité\"='Trimestre' GROUP BY Poste", [annee]);
            const posts = rows.map(row => ({ poste: row.poste, taux: row.avgtrs }));
            res.json({ posts });

        } catch (error) {
            console.log(error);
        }
    },

    // getOperations
    getOperation: async (req, res) => {
        try {
            const { rows } = await pool.query("SELECT \"Designation Opération\" FROM operations");
            const result = rows.map(row => row["Designation Opération"].trim());
            res.json(result);

        } catch (error) {
            console.log(error);
            res.status(500).send('An error occurred');
        }
    },

    // getOperationsPoste
    getOP: async (req, res) => {
        try {
            const { designationOperation } = req.query;
            const { rows } = await pool.query("SELECT TRS.Poste, AVG(TRS.TRS) AS avgTRS FROM TRS JOIN postes P ON P.\"Code Poste\" = TRS.Poste JOIN operations O ON O.\"Code Opération\" = P.\"Code Opération\" WHERE O.\"Designation Opération\" = $1 GROUP BY TRS.Poste;", [designationOperation]);

            const posts = rows.map(row => ({
                poste: row.poste,
                taux: row.avgtrs
            }));

            res.json({ posts });

        } catch (error) {
            console.log(error);
            res.status(500).send('An error occurred');
        }
    },

    // getTables
    getTables: async (req, res) => {
        try {
            const { rows } = await pool.query("SELECT \"Code Poste\", \"Designation Poste\", etat, image FROM postes");
            const data = rows.map(row => ({
                'Code Poste': row["Code Poste"],
                'Designation Poste': row["Designation Poste"].replace(/\r/g, ''),
                'Etat': row['etat'].replace(/\r/g, ''),
                'Image': row['image'],
            }));
            res.json({
                data: data
            });

        } catch (error) {
            console.log(error);
            res.status(500).send('An error occurred');
        }
    },






    getById: async (req, res) => {
        try {
            const { Poste } = req.params
            const [rows, fields] = await pool.query("select AVG(TRS) AS TRS from TRS where Poste = $1", [Poste])
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
            const sql = "insert into TRS (Poste,Type périodicité,Date initiale,Nom jour initiale,Nom périodicité,Année,Taux Disponibilité Opérationnelle,Taux Performance,Taux Qualité,TRS,TRG,TRE,Temps Périodicité,Temps Overture,Temps Fermeture,Temps Arrêts Planifiés,Temps Arrêts Non Planifiés,Temps Ecart Cadence,Temps Non Qualité,Temps Requis,Temps de Fonctionnement,Temps Net,Temps Utile) values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23)"
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
            const sql = "update users set email = $1, username = $2 , password = $3  where id = $4"
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
            const sql = "delete from users where id = $1"
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