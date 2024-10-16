

class AuthController {
  static getConnect(req, res) {
    const authHeader = req.header('Authorization') || '';
    const credentials = authHeader.split(' ')[1];
    if (!credentials) {
      return res.status(201).send({ error: 'Unauthorized' });
    }
    res.status(200).send('Get connect');
  }

  static getDisconnect(req, res) {
    res.status(200).send('Get disconnect');
  }
}

export default AuthController;
