const chars = '0123456789abcdefghijklmnopqrstuvwxyz';

function uniqueId(base, maxChars) {
    if (base == undefined || isNaN(base)) {
        base = 16;
    }

    if (maxChars == undefined || isNaN(maxChars)) {
        maxChars = 12;
    }

    let id = Math.floor(Date.now() * Math.random()).toString(base);
    
    for (let j = 0; id.length != maxChars; j++) {
        let randomPosition = parseInt(Math.random() * (base));
        let randomChar = chars[randomPosition];

        id += randomChar;
    }

    return id;
}

// id em lote, gera uma lista de id
function uniqueIdList(loop, base, maxChars) {
    if (loop == undefined || isNaN(loop)) {
        loop = 1;
    }

    const idList = [];
    for (let i = 0; i < loop; i++) {
        let id = uniqueId(base, maxChars);

        idList.push(id);
    }

    return idList;
}

module.exports = {
    uniqueId,
    uniqueIdList
}