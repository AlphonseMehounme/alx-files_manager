
const getConnect = (req, res) => {
    res.status(200).send('Get connect');
}

const getDisconnect = (req, res) => {
    res.status(200).send('Get disconnect');
}

module.exports = { getConnect, getDisconnect };
