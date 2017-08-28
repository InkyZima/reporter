
var fs = require("fs");

const c = console.log;
c(__dirname)
var watcher = fs.watch(__dirname);
var counter = 0;
// two structures logging files and file changes = bad.
var watchfor = ["testdata"];
var changelog = {
	"testdata": {
		"lastupdate": 0
	}
};

watcher.on("change", (e,file) => {
	c(file)
	if (watchfor.indexOf(file) === -1 && watchfor.indexOf(file.split(".")[0]) === -1 ) {
		return ;
	}
	if(fs.existsSync(__dirname + "\\" + file)) {
		if ((new Date().getTime() - changelog[file.split(".")[0]].lastupdate) > 1000) {
			changelog[file.split(".")[0]].lastupdate = new Date().getTime();
			updatethesystem(file);
		}
	}
});

function updatethesystem(thefile) {
	c("updating the system due to filechange in file: " + thefile);
}

// watcher.close();