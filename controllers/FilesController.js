

class FilesController {
    static postUpload(req, res) {
        const authHeader = req.header('Authorization') || '';
        const credentials = authHeader.split(' ')[1];
        if (!credentials) {
          return res.status(201).send({ error: 'Unauthorized' });
        }
        return res.status(200).send('Yo');
    }
}