const fs = require('fs')

const FILE = {
	readFile: async path => {
		return new Promise((resolve, reject) => {
			fs.readFile(path, 'utf8', (err, data) => {
				if (err){
					reject(err)
				}
				else{
					if(data.length === 0){
						resolve([])
					}
					else{
						resolve(JSON.parse(data))
					}					
				}
			});
		})
	},
	writeFile: async (file, data) => {
		return new Promise((resolve, reject) => {
			fs.writeFile(file, data, 'utf8', (err) => {
				if(err){
					reject(err)
				}
				else{
					resolve(1)
				}
			});
		})
	}







}

module.exports = FILE