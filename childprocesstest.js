const { execSync } = require('child_process');


execSync('sqlite3.exe testdata.db "drop table if exists testdata;"');
execSync('sqlite3.exe testdata.db ".import testdata.csv testdata"');