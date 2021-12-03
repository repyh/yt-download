import fs from 'fs';
import ytdl from 'ytdl-core';
import rl from 'readline';

const readline = rl.createInterface({
    input: process.stdin,
    output: process.stdout
})

async function main(videoURL) {
    console.clear();

    console.log(`
    __     _________   _____                      _                 _ 
    \\ \\   / /__   __| |  __ \\                    | |               | |
     \\ \\_/ /   | |    | |  | | _____      ___ __ | | ___   __ _  __| |
      \\   /    | |    | |  | |/ _ \\ \\ /\\ / / '_ \\| |/ _ \\ / _\` |/ _\` |
       | |     | |    | |__| | (_) \\ V  V /| | | | | (_) | (_| | (_| |
       |_|     |_|    |_____/ \\___/ \\_/\\_/ |_| |_|_|\\___/ \\__,_|\\__,_|
    `);

    console.log(`
    [1] - Download using URL
    [0] - Quit`);
    
    readline.question(`
    Select - `, (opt => {
        switch(Number(opt)) {
            case 1: {
                console.clear();
                console.log(`
    __     _________   _____                      _                 _ 
    \\ \\   / /__   __| |  __ \\                    | |               | |
     \\ \\_/ /   | |    | |  | | _____      ___ __ | | ___   __ _  __| |
      \\   /    | |    | |  | |/ _ \\ \\ /\\ / / '_ \\| |/ _ \\ / _\` |/ _\` |
       | |     | |    | |__| | (_) \\ V  V /| | | | | (_) | (_| | (_| |
       |_|     |_|    |_____/ \\___/ \\_/\\_/ |_| |_|_|\\___/ \\__,_|\\__,_|
    `);

                readline.question(`
    Video URL - `, async (video) => {

                    const data = await ytdl.getInfo(video).catch(() => {
                        console.log(`
                        
                        Invalid URL! Try again!`)
                        setTimeout(() => {
                            readline.close();
                            main();
                        }, 5000);
                    });
                    console.clear();

                    console.log(`
    __     _________   _____                      _                 _ 
    \\ \\   / /__   __| |  __ \\                    | |               | |
     \\ \\_/ /   | |    | |  | | _____      ___ __ | | ___   __ _  __| |
      \\   /    | |    | |  | |/ _ \\ \\ /\\ / / '_ \\| |/ _ \\ / _\` |/ _\` |
       | |     | |    | |__| | (_) \\ V  V /| | | | | (_) | (_| | (_| |
       |_|     |_|    |_____/ \\___/ \\_/\\_/ |_| |_|_|\\___/ \\__,_|\\__,_|
        `);

                    readline.question(`
    Video: "${data.videoDetails.title}"
                    
    [1] - Save as mp4
    [2] - Save as mp3
    
    Select - `, (op) => {
                        switch(Number(op)) { // 
                            case 1: {
                                ytdl(video)
                                    .on('progress', (total, downloadedSize, totalSize) => {
                                        let progress = (downloadedSize/totalSize)*100;
                                        console.clear();
// https://www.youtube.com/watch?v=keKof1rbJhM
                                        console.log(`
    __     _________   _____                      _                 _ 
    \\ \\   / /__   __| |  __ \\                    | |               | |
     \\ \\_/ /   | |    | |  | | _____      ___ __ | | ___   __ _  __| |
      \\   /    | |    | |  | |/ _ \\ \\ /\\ / / '_ \\| |/ _ \\ / _\` |/ _\` |
       | |     | |    | |__| | (_) \\ V  V /| | | | | (_) | (_| | (_| |
       |_|     |_|    |_____/ \\___/ \\_/\\_/ |_| |_|_|\\___/ \\__,_|\\__,_|
        `);
                                        console.log(`
    Downloaded (${progress.toFixed(2)}%)
    `)
                                    })
                                    .on('error', (e => {
                                        console.log(`
    __     _________   _____                      _                 _ 
    \\ \\   / /__   __| |  __ \\                    | |               | |
     \\ \\_/ /   | |    | |  | | _____      ___ __ | | ___   __ _  __| |
      \\   /    | |    | |  | |/ _ \\ \\ /\\ / / '_ \\| |/ _ \\ / _\` |/ _\` |
       | |     | |    | |__| | (_) \\ V  V /| | | | | (_) | (_| | (_| |
       |_|     |_|    |_____/ \\___/ \\_/\\_/ |_| |_|_|\\___/ \\__,_|\\__,_|
        `);

                                    fs.unlinkSync(`./videos/${data.videoDetails.title.replace(new RegExp('\\\\|/|\\|', 'g'), '-')}.mp4`);
                                    console.log(`
    Download Failed :(`)
                                    }))
                                    .on('end', () => {
                                        console.clear();

                                        console.log(`
    __     _________   _____                      _                 _ 
    \\ \\   / /__   __| |  __ \\                    | |               | |
     \\ \\_/ /   | |    | |  | | _____      ___ __ | | ___   __ _  __| |
      \\   /    | |    | |  | |/ _ \\ \\ /\\ / / '_ \\| |/ _ \\ / _\` |/ _\` |
       | |     | |    | |__| | (_) \\ V  V /| | | | | (_) | (_| | (_| |
       |_|     |_|    |_____/ \\___/ \\_/\\_/ |_| |_|_|\\___/ \\__,_|\\__,_|
        `);
                                        console.log(`
    Video downloaded successfully!`);
                                        readline.close();
                                        // main();
                                    })
                                    .pipe(fs.createWriteStream(`./videos/${data.videoDetails.title.replace(new RegExp('\\\\|/|\\|', 'g'), '-')}.mp4`))
                                break;
                            }
                            case 2: {
                                ytdl(video, { filter: 'audioonly', format: 'mp3' })
                                    .on('progress', (total, downloadedSize, totalSize) => {
                                        let progress = (downloadedSize/totalSize)*100;
                                        console.clear();
// https://www.youtube.com/watch?v=keKof1rbJhM
                                        console.log(`
    __     _________   _____                      _                 _ 
    \\ \\   / /__   __| |  __ \\                    | |               | |
     \\ \\_/ /   | |    | |  | | _____      ___ __ | | ___   __ _  __| |
      \\   /    | |    | |  | |/ _ \\ \\ /\\ / / '_ \\| |/ _ \\ / _\` |/ _\` |
       | |     | |    | |__| | (_) \\ V  V /| | | | | (_) | (_| | (_| |
       |_|     |_|    |_____/ \\___/ \\_/\\_/ |_| |_|_|\\___/ \\__,_|\\__,_|
        `);
                                        console.log(`
    Downloaded (${progress.toFixed(2)}%)
    `)
                                    })
                                    .on('error', (e => {
                                        console.log(`
    __     _________   _____                      _                 _ 
    \\ \\   / /__   __| |  __ \\                    | |               | |
     \\ \\_/ /   | |    | |  | | _____      ___ __ | | ___   __ _  __| |
      \\   /    | |    | |  | |/ _ \\ \\ /\\ / / '_ \\| |/ _ \\ / _\` |/ _\` |
       | |     | |    | |__| | (_) \\ V  V /| | | | | (_) | (_| | (_| |
       |_|     |_|    |_____/ \\___/ \\_/\\_/ |_| |_|_|\\___/ \\__,_|\\__,_|
        `);

                                    fs.unlinkSync(`./audios/${data.videoDetails.title.replace(new RegExp('\\\\|/|\\|', 'g'), '-')}.mp3`);
                                    console.log(`
    Download Failed :(`)
                                    }))
                                    .on('end', () => {
                                        console.clear();

                                        console.log(`
    __     _________   _____                      _                 _ 
    \\ \\   / /__   __| |  __ \\                    | |               | |
     \\ \\_/ /   | |    | |  | | _____      ___ __ | | ___   __ _  __| |
      \\   /    | |    | |  | |/ _ \\ \\ /\\ / / '_ \\| |/ _ \\ / _\` |/ _\` |
       | |     | |    | |__| | (_) \\ V  V /| | | | | (_) | (_| | (_| |
       |_|     |_|    |_____/ \\___/ \\_/\\_/ |_| |_|_|\\___/ \\__,_|\\__,_|
        `);
                                        console.log(`
    Audio downloaded successfully!`);
                                        readline.close();
                                        // main();
                                    })
                                    .pipe(fs.createWriteStream(`./audios/${data.videoDetails.title.replace(new RegExp('\\\\|/|\\|', 'g'), '-')}.mp3`))
                                break;
                            }
                        }
                    })
                })
                break;
            }
            case 0: {
                readline.close();
                break;
            }
            default: {
                readline.close();
                main();
            }
        }
    }))
}

main();