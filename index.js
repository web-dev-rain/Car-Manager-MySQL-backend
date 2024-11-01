const express = require('express')
const mysql = require("mysql");
const cors = require("cors");

const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const {static} = require("express");

const app = express();
const port = 3001;

app.use(express.json());
app.use(cors());

const con = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "",
    database: "nodejsdb"
})

con.connect(function (err) {
    if (err) {
        console.log("Error in Connection");
    } else {
        console.log("Connected");
    }
})

function getRequiredTireType() {
    let currentDate = new Date();
    let currentMonth = currentDate.getMonth();

    if (currentMonth > 10 || currentMonth < 2) {
        return "Зимние";
    } else {
        return "Летние";
    }
}

function getReplaceTiresNeedStatus(currentTires, requiredTires) {
    if (currentTires == requiredTires) {
        return "Нет";
    } else {
        return "Да";
    }
}

function setTireSeasonTypeInRussian(season) {
    if (season == "winter") {
        return "Зимние";
    } else {
        return "Летние";
    }
}

function addYearToDate(date) {
    let day = date.getDay();
    let month = date.getMonth();
    let year = date.getFullYear() + 1;
    return new Date(year + month + day);
}

function timeToDays(time) {
    return Math.ceil(time / (1000 * 3600 * 24));
}

app.get('/get', (req, res) => {
    const sql = "SELECT * FROM auto";
    //const sql = "SELECT a.model, a.description, tp.name AS auto_type, a.enginecapacity, a.insurance_end_date, a.remaining_days, a.fuel_consumption, a.distance_traveled, a.spent_fuel, a.tire_season_type, a.replace_tires_need FROM auto a JOIN type_auto tp ON a.type_auto_id = tp.id WHERE a.id = ?";
    con.query(sql, (err, result) => {
        if (err) return res.json({Error: "Get auto error in sql"});
        return res.json({Status: "Success", Result: result})
    })
})

app.get('/get/:id', (req, res) => {
    const id = req.params.id;
    const sql = "SELECT a.model, a.description, tp.name AS auto_type, a.enginecapacity, ti.services_package AS insurance_type, a.insurance_end_date, a.remaining_days, a.tech_inspection_date, a.next_tech_inspection, a.days_until_next_tech, a.fuel_consumption, a.distance_traveled, a.spent_fuel, a.tire_season_type, a.replace_tires_need FROM auto a JOIN type_auto tp ON a.type_auto_id = tp.id JOIN insurance_type ti ON a.insurance_type_id = ti.id WHERE a.id = ?";
    con.query(sql, [id], (err, result) => {
        if (err) return res.json({Error: "Get auto error in sql"});
        return res.json({Status: "Success", Result: result})
    })
})

app.post('/create', (req, res) => {

    let model = req.body.model;
    let description = req.body.description;
    let typeAutoId = req.body.type_auto_id;
    let engineCapacity = req.body.enginecapacity;

    let insuranceTypeId = req.body.insurance_type_id;
    //let date = new Date(req.body.insurance_end_date);
    let date = new Date(req.body.insurance_end_date);
    let insuranceEndDate = date;
    let currentDate = new Date();
    let remainingTime = date.getTime() - currentDate.getTime();
    let remainingDays = Math.ceil(remainingTime / (1000 * 3600 * 24));

    let techDate = new Date(req.body.tech_inspection_date);
    let techInspectionDate = techDate;
    let testDate = new Date(req.body.tech_inspection_date);
    let nextTechInspection = new Date(testDate.setFullYear(testDate.getFullYear() + 1));
    let timeUntilNextTech = nextTechInspection.getTime() - currentDate.getTime();
    let daysUntilNextTech = Math.ceil(timeUntilNextTech / (1000 * 3600 * 24));

    let fuelConsumption = req.body.fuel_consumption;
    let distanceTraveled = req.body.distance_traveled;
    let spentFuel = fuelConsumption * distanceTraveled / 100;

    let chosenSeasonType = req.body.tire_season_type;
    let tireSeasonType = setTireSeasonTypeInRussian(chosenSeasonType);
    let requiredTireType = getRequiredTireType();
    let replace_tires_need = getReplaceTiresNeedStatus(tireSeasonType, requiredTireType);

    con.query("INSERT INTO auto (" +
        "model, " +
        "description, " +
        "type_auto_id, " +
        "enginecapacity, " +
        "insurance_type_id, " +
        "insurance_end_date, " +
        "remaining_days, " +
        "tech_inspection_date, " +
        "next_tech_inspection, " +
        "days_until_next_tech, " +
        "fuel_consumption, " +
        "distance_traveled, " +
        "spent_fuel, " +
        "tire_season_type, " +
        "replace_tires_need) " +
        "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [
            model,
            description,
            typeAutoId,
            engineCapacity,
            insuranceTypeId,
            insuranceEndDate,
            remainingDays,
            techInspectionDate,
            nextTechInspection,
            daysUntilNextTech,
            fuelConsumption,
            distanceTraveled,
            spentFuel,
            tireSeasonType,
            replace_tires_need,
        ],
        (err, result) => {
            if (result) {
                res.send(result);
            } else {
                res.send({message: "Введите корректные данные"})
            }
        }
    )
})

app.put("/update/:id", (req, res) => {
    const autoId = req.params.id;
    const q = "UPDATE auto SET " +
        "`model` = ?, " +
        "`description` = ?, " +
        "`type_auto_id` = ?, " +
        "`enginecapacity` = ?, " +
        "`insurance_type_id` = ?, " +
        "`insurance_end_date` = ?, " +
        "`remaining_days` = ?, " +
        "`tech_inspection_date` = ?, " +
        "`next_tech_inspection` = ?, " +
        "`days_until_next_tech` = ?, " +
        "`fuel_consumption` = ?, " +
        "`distance_traveled` = ?, " +
        "`spent_fuel` = ?, " +
        "`tire_season_type` = ?, " +
        "`replace_tires_need` = ? " +
        "WHERE id = ?";

    let model = req.body.model;
    let description = req.body.description;
    //let typeAutoId = setTypeAuto(req.body.type_auto_id);
    let typeAutoId = req.body.type_auto_id;
    let engineCapacity = req.body.enginecapacity;
    let insuranceTypeId = req.body.insurance_type_id;

    let date = new Date(req.body.insurance_end_date);
    let currentDate = new Date();
    let remainingTime = date.getTime() - currentDate.getTime();
    let remainingDays = Math.ceil(remainingTime / (1000 * 3600 * 24));
    console.log(req.body.tech_inspection_date);
    let techInspectionDate = new Date(req.body.tech_inspection_date); // ???
    let testDate = new Date(req.body.tech_inspection_date);
    let nextTechInspection = new Date(testDate.setFullYear(testDate.getFullYear() + 1));
    let timeUntilNextTech = nextTechInspection.getTime() - currentDate.getTime();
    let daysUntilNextTech = Math.ceil(timeUntilNextTech / (1000 * 3600 * 24));

    let fuelConsumption = req.body.fuel_consumption;
    let distanceTraveled = req.body.distance_traveled;
    let spentFuel = fuelConsumption * distanceTraveled / 100;

    let chosenSeasonType = req.body.tire_season_type;
    let tireSeasonType = setTireSeasonTypeInRussian(chosenSeasonType);
    let requiresTireType = getRequiredTireType();
    let replaceTiresNeed = getReplaceTiresNeedStatus(tireSeasonType, requiresTireType);

    const values = [
        model,
        description,
        typeAutoId,
        engineCapacity,
        insuranceTypeId,
        date,
        remainingDays,
        techInspectionDate,
        nextTechInspection,
        daysUntilNextTech,
        fuelConsumption,
        distanceTraveled,
        spentFuel,
        tireSeasonType,
        replaceTiresNeed
    ];

    con.query(q, [...values, autoId], (err, data) => {
        if (err) return res.send(err);
        return res.json(data); //return res.json({Status: "Success"})
    });
});

app.delete('/delete/:id', (req, res) => {
    const id = req.params.id;
    const sql = "Delete FROM auto WHERE id = ?";
    con.query(sql, [id], (err, result) => {
        if (err) return res.json({Error: "delete auto error in sql"});
        return res.json({Status: "Success"})
    })
})

app.get('/getTypeAuto/:id', (req, res) => {
    let sql = "SELECT tp.name FROM auto a JOIN type_auto tp ON a.type_auto_id = tp.id WHERE a.id = ?";
    con.query(sql, (err, result) => {
        if (err) return res.json({Error: "Error in runnig query1"});
        return res.json(result);
    })
})

// СОРТИРОВКА

app.get('/sortByModel', (req, res) => {
    const sql = "SELECT * FROM auto ORDER BY model";
    con.query(sql, (err, result) => {
        if (err) return res.json({Error: "Get auto error in sql"});
        return res.json({Status: "Success", Result: result})
    })
})

app.get('/sortByDays', (req, res) => {
    const sql = "SELECT * FROM auto ORDER BY remaining_days";
    con.query(sql, (err, result) => {
        if (err) return res.json({Error: "Get auto error in sql"});
        return res.json({Status: "Success", Result: result})
    })
})

app.get('/sortByDistanceTraveled', (req, res) => {
    const sql = "SELECT * FROM auto ORDER BY distance_traveled";
    con.query(sql, (err, result) => {
        if (err) return res.json({Error: "Get auto error in sql"});
        return res.json({Status: "Success", Result: result})
    })
})

// СТАТИСТИКА

app.get('/autoCount', (req, res) => {
    const sql = "Select count(id) as auto from auto";
    con.query(sql, (err, result) => {
        if (err) return res.json({Error: "Error in runnig query"});
        return res.json(result);
    })
})

app.get('/sumOfSpentFuel', (req, res) => {
    const sql = "SELECT SUM(spent_fuel) AS sumOfSpentFuel FROM auto;";
    con.query(sql, (err, result) => {
        if (err) return res.json({Error: "Error in runnig query"});
        return res.json(result);
    })
})

app.get('/sumOfDistanceTraveled', (req, res) => {
    const sql = "SELECT SUM(distance_traveled) AS sumDistanceTraveled FROM auto;";
    con.query(sql, (err, result) => {
        if (err) return res.json({Error: "Error in runnig query"});
        return res.json(result);
    })
})

app.get('/averageFuelConsumption', (req, res) => {
    const sql = "SELECT AVG(fuel_consumption) AS averageFuelConsumption FROM auto";
    con.query(sql, (err, result) => {
        if (err) return res.json({Error: "Error in runnig query"});
        return res.json(result);
    })
})

app.get('/averageEnginecapacity', (req, res) => {
    const sql = "SELECT AVG(enginecapacity) AS averageEnginecapacity FROM auto";
    con.query(sql, (err, result) => {
        if (err) return res.json({Error: "Error in runnig query"});
        return res.json(result);
    })
})

app.get('/insuranceEndCount', (req, res) => {
    const sql = "Select count(id) as insuranceEndCount from auto WHERE remaining_days < 1";
    con.query(sql, (err, result) => {
        if (err) return res.json({Error: "Error in runnig query"});
        return res.json(result);
    })
})

app.get('/wrongTypeTireCount', (req, res) => {
    const sql = "SELECT COUNT(*) AS wrongTiresCount FROM auto WHERE replace_tires_need = 'Да';";
    con.query(sql, (err, result) => {
        if (err) return res.json({Error: "Error in runnig query"});
        return res.json(result);
    })
})

app.get('/popularType', (req, res) => {

    const sql = "SELECT model as popular_model, " +
        "COUNT(*) as model_count " +
        "FROM auto GROUP BY " +
        "model ORDER BY model_count " +
        "DESC LIMIT 1";

    con.query(sql, (err, result) => {
        if (err) return res.json({Error: "Error in runnig query"});
        return res.json(result);
    })
})

app.get('/wrongTypeTire', (req, res) => {
    const sql = "SELECT * FROM auto WHERE replace_tires_need = 'Да';";
    con.query(sql, (err, result) => {
        if (err) return res.json({Error: "Get auto error in sql"});
        return res.json({Status: "Success", Result: result})
    })
})

app.get('/expiredInsurance', (req, res) => {
    const sql = "SELECT * FROM auto WHERE remaining_days < 1";
    con.query(sql, (err, result) => {
        if (err) return res.json({Error: "Get auto error in sql"});
        return res.json({Status: "Success", Result: result})
    })
})

app.get('/techInspectionProblem', (req, res) => {
    const sql = "SELECT * FROM auto WHERE days_until_next_tech < 1";
    con.query(sql, (err, result) => {
        if (err) return res.json({Error: "Get auto error in sql"});
        return res.json({Status: "Success", Result: result})
    })
})

app.get('/techInspectionProblemCount', (req, res) => {
    const sql = "Select count(id) as techInspectionProblemCount from auto WHERE days_until_next_tech < 1";
    con.query(sql, (err, result) => {
        if (err) return res.json({Error: "Error in runnig query"});
        return res.json(result);
    })
})

// РЕГИСТРАЦИЯ

app.get('/hash', (req, res) => {
    bcrypt.hash("123456", 10, (err, hash) => {
        if (err) return res.json({Error: "Error in hashing password"});
        const values = [
            hash
        ]
        return res.json({result: hash});
    })
})

app.post('/login', (req, res) => {
    const sql = "SELECT * FROM users Where email = ?";
    con.query(sql, [req.body.email], (err, result) => {
        if (err) return res.json({Status: "Error", Error: "Error in runnig query"});
        if (result.length > 0) {
            bcrypt.compare(req.body.password.toString(), result[0].password, (err, response) => {
                if (err) return res.json({Error: "password error"});
                if (response) {
                    const token = jwt.sign({role: "admin"}, "jwt-secret-key", {expiresIn: '1d'});
                    return res.json({Status: "Success", Token: token})
                } else {
                    return res.json({Status: "Error", Error: "Wrong Email or Password"});
                }
            })
        } else {
            return res.json({Status: "Error", Error: "Wrong Email or Password"});
        }
    })
})

app.post('/register', (req, res) => {
    const sql = "INSERT INTO users (`name`,`email`,`password`) VALUES (?)";
    bcrypt.hash(req.body.password.toString(), 10, (err, hash) => {
        if (err) return res.json({Error: "Error in hashing password"});
        const values = [
            req.body.name,
            req.body.email,
            hash,
        ]
        con.query(sql, [values], (err, result) => {
            if (err) return res.json({Error: "Error query"});
            return res.json({Status: "Success"});
        })
    })
})

app.listen(port, () => {
    console.log(`Приложение запущено на порту ${port}`)
})