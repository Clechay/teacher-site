const cli = require("quick-cli");

const ok = (...str) => cli.out("success", "[OK!] ", ...(str.map( el => String(el))));
const fail = (...str) => cli.out("error", "[FAILED] ", ...(str.map( el => String(el))));


async function multilaneInput(str) {
	let result = "";
	let last = "init";
	for(let i = 1; last !== ""; i++){
		last = await cli.input.text(`${str} (${i})`);
		result += last + "\n";
	}
	return result;
}

async function attempt(func, primaryMsg, badMsg) {
	const goodMsg = primaryMsg;
	try {
		await func();
		ok(goodMsg);
	} catch (error) {
		fail(badMsg);
		throw new Error(error);
	}
}

module.exports = {
	ok,
	fail,
	multilaneInput, 
	attempt
}