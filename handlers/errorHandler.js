const { Client, EmbedBuilder } = require('discord.js');

/**
 * @param { Client } client
 */

async function loadErrors(client) {
    // client.configからIDを取得するように変更
    const errReportChId = client.config.errReportChId;

    async function logErr(description, consoleLog1, consoleLog2) {
        if(consoleLog1 == "" && consoleLog2 == "") {
            return;
        }

        // IDが設定されていない場合は何もしない
        if (!errReportChId) return;

        let botCh = await client.channels.cache.get(errReportChId);
        if (!botCh) botCh = await client.application.owner; //DM when unable to get bot-channel obj
    
        await botCh.send({content: `${client.application.owner}`, embeds: [new EmbedBuilder()
            .setTitle("📨 Anti-Crash Report")
            .setDescription("Detected system crash.\nRescued.\n\n" + description)
        ]});
        return;
    };

    process.on("unhandledRejection", (reason, p) => {
        console.log('unhandled Rejection from errorHandler.js');
	    console.log(`----${new Date().toLocaleString({ timeZone: 'Asia/Tokyo' })}----`);
        console.log(`reason:${reason}, p: ${p}`);
        console.log(p);
        logErr("**Unhandled Rejection**\n ```" + reason + "```", reason, p);
    });

    process.on("uncaughtException", (err, origin) => {
        console.log('uncaught Exception from errorHandler.js');
	    console.log(`----${new Date().toLocaleString({ timeZone: 'Asia/Tokyo' })}----`);
        console.log(`error:${err}, origin:${origin}, err.stack:${err.stack}`);
	    console.log("ERROR OCCURED");
        logErr("**Uncaught Exception**\n ```" + err + "\n----\n" + origin.toString() + "```", err, origin);
    });

    process.on("uncaughtExceptionMonitor", (err, origin) => {
	    console.log('uncaught Exception Monitor from errorHandler.js');
        console.log(`----${new Date().toLocaleString({ timeZone: 'Asia/Tokyo' })}----`);
        console.log(err, origin);
        logErr("**Uncaught Exception Monitor**\n ```" + err + "\n----\n" + origin.toString() + "```", err, origin);
    });
}

module.exports = { loadErrors };
