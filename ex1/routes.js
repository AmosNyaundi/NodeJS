const requestHandler = (req, res) => {
    const url = req.url;
    const method = req.method;
    if (url === '/'){
        res.write('<!DOCTYPE html>');
        res.write('<head><title>Users</title></head>');
        res.write('<h1>This is Exercse 1 for creating a user and listung users</h1>');
        res.write('<body><form action="/create-user" method="POST"><input type="text" name="username"><button type="submit">Create User</button></form></body>');
        res.write('</html>');
        return res.end();
    }
    if (url === '/users'){
        res.write('<!DOCTYPE html>');
        res.write('<head><title>Users</title></head>');
        res.write('<p>List of Users</p>');
        res.write('<ol><li>Amos Ngisa</li><li>Prisca Mutua</li><li>John Doe</li></ol>');
        res.write('</html>');
        return res.end();
    }
    if (url === '/create-user' && method === 'POST'){
        const body = [];
        req.on('data', chunk => {
            body.push(chunk);
        });
        return req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split('=')[0];
            console.log(message);
            res.statusCode = 302;
            res.setHeader('Location', '/users');
            res.end();
        });
    }
};

exports.handler = requestHandler;