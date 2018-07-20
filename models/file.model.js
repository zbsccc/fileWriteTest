const fs = require('fs')

const FILE = {
	addData: async (path, newData) => {
		return new Promise((resolve, reject) => {
			fs.readFile(path, 'utf8', (err, data) => {
				if (err){
					reject(err)
				}
				else{
					if(data.length === 0){
						data = new Array()
					}
					else{
						data = JSON.parse(data);
					}

					if(data.length >= 10){
						resolve('数据最多存储10条')
					}
					else{
						data.push(newData);
						data = JSON.stringify(data);

						process.nextTick(() => {
							fs.writeFile(path, data, 'utf8', (err) => {
								if(err){
									reject(err)
								}
								else{
									resolve('数据存储成功')
								}
							});
						})
					}					
				}
			})
		})
	}







}

module.exports = FILE