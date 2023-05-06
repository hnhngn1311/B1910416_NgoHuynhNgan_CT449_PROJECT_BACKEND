export const Authorization = (req, res) => {
    const authorHeader = req.headers.authorization;
    if (authorHeader != 'quantrivien') {
        return res.sendStatus(401);
    }
}