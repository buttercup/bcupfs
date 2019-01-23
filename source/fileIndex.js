function indexLineToRecord(line) {
    const [type, id, encSizeRaw, details] = line.split(",", 4);
    return {
        type,
        id,
        size: parseInt(encSizeRaw, 10),
        details
    };
}

module.exports = {
    indexLineToRecord
};
