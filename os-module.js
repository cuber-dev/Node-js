

const OS = require("os")

console.log(OS.userInfo())

const system = {
    name : OS.type(),
    version : OS.release(),
    totalMem : OS.totalmem(),
    freeMem : OS.freemem(),
    upTime : OS.uptime(),
}
console.log(system)