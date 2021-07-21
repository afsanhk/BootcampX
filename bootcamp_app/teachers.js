const { Pool } = require('pg');

const inputs = process.argv.slice(2);
console.log(inputs);

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});

console.log('connected');

pool.query(`
SELECT DISTINCT teachers.name as teacher, cohorts.name as cohort
FROM assistance_requests
JOIN students ON students.id = assistance_requests.student_id
JOIN teachers ON teachers.id = assistance_requests.teacher_id
JOIN cohorts ON students.cohort_id = cohorts.id
WHERE cohorts.name = '${process.argv[2] || 'JUL02' }'
ORDER BY teacher;
`)
.then(res => {
  res.rows.forEach(row => {
    console.log(`${row.cohort}: ${row.teacher}`)
  }) 
})