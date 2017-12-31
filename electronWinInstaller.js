var electronInstaller = require('electron-winstaller');

resultPromise = electronInstaller.createWindowsInstaller({
	appDirectory: '/media/sysadmin/projects/Hasse/AdvisorAng4/build',
	outputDirectory: '/media/sysadmin/projects/Hasse/AdvisorAng4/release/Advisor',
	authors: 'Steve Mieskoski',
	exe: 'advisor.exe'
});

resultPromise.then(() => console.log("It worked!"), (e) => console.log(`No dice: ${e.message}`));