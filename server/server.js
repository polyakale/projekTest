require("dotenv").config();

const express = require("express");
const mysql = require("mysql");
const app = express();
const sanitizeHtml = require("sanitize-html");

const pool = require("./config/database.js");
const {
  sendingGet,
  sendingGetError,
  sendingGetById,
  sendingPost,
  sendingPut,
  sendingDelete,
  sendingInfo,
} = require("./config/sending.js");

//#region middlewares
app.use(express.json());
//#endregion middlewares

//#region cars
app.get("/cars", (req, res) => {
  pool.getConnection(function (error, connection) {
    if (error) {
      sendingInfo(res, 0, "server error", [], 403)
      return;
    }
    const sql = "SELECT * FROM cars";
    connection.query(sql, (error, results, fields) => {
      sendingGet(res, error, results);
    });
    connection.release();
  });
});

app.get("/cars/:id", (req, res) => {
  const id = req.params.id;
  pool.getConnection(function (error, connection) {
    if (error) {
      sendingInfo(res, 0, "server error", [], 403)
      return;
    }
    //   const sql = `
    //   SELECT * FROM cars
    // WHERE id = ${id}
    //   `;
    const sql = `
    SELECT * FROM cars
  WHERE id = ?
  `;
    connection.query(sql, [id], (error, results, fields) => {
      sendingGetById(res, error, results, id)
    });
    connection.release();
  });
});

app.post("/cars", (req, res) => {
  console.log(req.body);
  const newR = {
    name: mySanitizeHtml(req.body.name),
    licenceNumber: mySanitizeHtml(req.body.licenceNumber),
    hourlyRate: +mySanitizeHtml(req.body.hourlyRate),
  };

  pool.getConnection(function (error, connection) {
    if (error) {
      sendingInfo(res, 0, "server error", [], 403);
      return;
    }
    const sql = `
    INSERT INTO cars
      (name, licenceNumber, hourlyRate)
      VALUES
      (?, ?, ?)
    `;
    connection.query(
      sql,
      [newR.name, newR.licenceNumber, newR.hourlyRate],
      (error, results, fields) => {
        sendingPost(res, error, results, newR);
      }
    );
    connection.release();
  });
});

//update
app.put("/cars/:id", (req, res) => {
  const id = req.params.id;
  const newR = {
    name: mySanitizeHtml(req.body.name),
    licenceNumber: mySanitizeHtml(req.body.licenceNumber),
    hourlyRate: +mySanitizeHtml(req.body.hourlyRate),
  };
  pool.getConnection(function (error, connection) {
    if (error) {
      sendingInfo(res, 0, "server error", [], 403);
      return;
    }

    const sql = `
    UPDATE cars SET
    name = ?,
    licenceNumber = ?,
    hourlyRate = ?
    WHERE id = ?
  `;
    connection.query(
      sql,
      [newR.name, newR.licenceNumber, newR.hourlyRate, id],
      (error, results, fields) => {
        sendingPut(res, error, results, id, newR)
      }
    );
    connection.release();
  });
});

app.delete("/cars/:id", (req, res) => {
  const id = req.params.id;
  pool.getConnection(function (error, connection) {
    if (error) {
      sendingInfo(res, 0, "server error", [], 403);
      return;
    }

    const sql = `
    DELETE from cars
  WHERE id = ?
  `;
    connection.query(sql, [id], (error, results, fields) => {
      sendingDelete(res, error, results, id)
    });
    connection.release();
  });
});

//#endregion cars

//#region trips
app.get("/trips", (req, res) => {
  pool.getConnection(function (error, connection) {
    if (error) {
      sendingInfo(res, 0, "server error", [], 403)
      return;
    }
    const sql = "SELECT * FROM trips";
    connection.query(sql, (error, results, fields) => {
      sendingGet(res, error, results);
    });
    connection.release();
  });
});

app.get("/trips/:id", (req, res) => {
  const id = req.params.id;
  pool.getConnection(function (error, connection) {
    if (error) {
      sendingInfo(res, 0, "server error", [], 403)
      return;
    }
    //   const sql = `
    //   SELECT * FROM cars
    // WHERE id = ${id}
    //   `;
    const sql = `
    SELECT * FROM trips
  WHERE id = ?
  `;
    connection.query(sql, [id], (error, results, fields) => {
      sendingGetById(res, error, results, id)
    });
    connection.release();
  });
});

app.post("/trips", (req, res) => {
  console.log(req.body);
  const newR = {
    name: mySanitizeHtml(req.body.name),
    licenceNumber: mySanitizeHtml(req.body.licenceNumber),
    hourlyRate: +mySanitizeHtml(req.body.hourlyRate),
  };

  pool.getConnection(function (error, connection) {
    if (error) {
      sendingInfo(res, 0, "server error", [], 403);
      return;
    }
    const sql = `
    INSERT INTO cars
      (name, licenceNumber, hourlyRate)
      VALUES
      (?, ?, ?)
    `;
    connection.query(
      sql,
      [newR.name, newR.licenceNumber, newR.hourlyRate],
      (error, results, fields) => {
        sendingPost(res, error, results, newR);
      }
    );
    connection.release();
  });
});

//update
app.put("/trips/:id", (req, res) => {
  const id = req.params.id;
  const newR = {
    name: mySanitizeHtml(req.body.name),
    licenceNumber: mySanitizeHtml(req.body.licenceNumber),
    hourlyRate: +mySanitizeHtml(req.body.hourlyRate),
  };
  pool.getConnection(function (error, connection) {
    if (error) {
      sendingInfo(res, 0, "server error", [], 403);
      return;
    }

    const sql = `
    UPDATE cars SET
    name = ?,
    licenceNumber = ?,
    hourlyRate = ?
    WHERE id = ?
  `;
    connection.query(
      sql,
      [newR.name, newR.licenceNumber, newR.hourlyRate, id],
      (error, results, fields) => {
        sendingPut(res, error, results, id, newR)
      }
    );
    connection.release();
  });
});

app.delete("/trips/:id", (req, res) => {
  const id = req.params.id;
  pool.getConnection(function (error, connection) {
    if (error) {
      sendingInfo(res, 0, "server error", [], 403);
      return;
    }

    const sql = `
    DELETE from cars
  WHERE id = ?
  `;
    connection.query(sql, [id], (error, results, fields) => {
      sendingDelete(res, error, results, id)
    });
    connection.release();
  });
});

//#endregion trips

function mySanitizeHtml(data) {
  return sanitizeHtml(data, {
    allowedTags: [],
    allowedAttributes: {},
  });
}

app.listen(process.env.APP_PORT, () => {
  console.log(`Data server, listen port: ${process.env.APP_PORT}`);
});
