const express = require('express');
let mysql = require('mysql2');
const app = express();
const port = 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log('Server is running on port ${port}');
});

let mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Ezraabrari13',
  database: 'mahasiswa',
  port: 3308
});
db.connect((err) => {
  if (err) {
      console.error('Error connecting to database:', err);
      return;
  }
});


//buat method GET dan POST

//GET
app.get('/api/users', (req, res) => {
    db.query('SELECT * FROM users', (err, results) => {
        if (err) {
            console.error('Error fetching users:', err);
            res.status(500).send('Error fetching users');
            return;
        }
        res.json(results);
    });
});

app.post('/api/users', (req, res) => {
    const { nama, nim, kelas} = req.body;

    if (!nama || !nim || !kelas) {
        return res.status(400).json({message: 'nama, nim, kelas wajib diisi '});
    } 

    db.query(
        'INSERT INTO mahasiswa (nama, nim, kelas) VALUES (?, ?, ?,)',
        [nama, nim, kelas],
        (err, result) => {
            if(err) {
                console.error(err);
                return res.status(500).json({ message : 'Database Error'});
            }

            res.status(201).json({ message:'User created succesfully'})
        }
    );
});

app.put('/api/users/:id' , (res, res)=> {
    const userID = req.params.id;
    const {nama, nim, kelas} = req.body;
    db.query(
        'UPDATE mahasiswa SET nama = ?, nim = ?, kelas = ?, WHERE id = ?',
        [nama, nim, kelas, userId],
        (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: 'database error'})
            }
            res.json({ message: 'user Updated Succesfully'});
        }
    );
});

app.delete('/api/users/:id', (req, res) => {
    const userID = req.params.id;
    db.query('DELETE FROM MAHASISWA WHERE id = ?', [userId], (err, result) => {
        if(err) {
            console.error(err);
            return res.status(500).json({message: 'Database Error'})
        }
        res.json({ message: 'User Deleted Succesfully'});
    });
});
