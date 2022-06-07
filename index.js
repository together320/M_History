// git config http.sslVerify false

const execSync = (process) => {
	return new Promise((resolve, reject) => {
		require('child_process').exec(process, function(err, stdout, stderr) {
			if (err) {
				reject(err);
			}
			else {
				resolve();
			}
		});
	});
};

const start_year = 2022;
const start_month = 6;
const start_day = 5;
const end_year = 2022;
const end_month = 7;
const end_day = 5;
const max_commit = 2;
const frequency = 10;



const start_date = new Date(start_year, start_month - 1, start_day);
const end_date = new Date(end_year, end_month - 1, end_day);

const main = async () => {
	let date = start_date;
	while (date <= end_date) {
		if (Math.random() * 100 < frequency) {
			const year = 1900 + date.getYear();
			const month = date.getMonth() + 1;
			const day = date.getDate();
			
			const arg = `date ${month}-${day}-${year}`;
			console.log(arg);
			
			const rand = Math.random() * max_commit + 1;
			for (let i = 0; i < rand; i ++) {
				const data = `${arg} - ${i + 1}`;
				require("fs").writeFileSync("foo.txt", data);
				
				await execSync (arg);
				await execSync(`git add -A`);
				await execSync(`git commit -am "comment"`);
				await execSync(`git push origin main`);
			}
		}
		date.setDate(date.getDate() + 1);
	}
}

const change_date = async() => {
	await execSync("date 11-10-2022");
}

main();