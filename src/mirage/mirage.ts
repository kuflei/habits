import { createServer } from 'miragejs';

export function makeServer({ environment = 'development' } = {}) {
    return createServer({
        environment,

        seeds(server) {
            server.db.loadData({
                users: [
                    {
                        id: '1',
                        name: 'John Doe',
                        email: 'john@example.com',
                        password: '123',
                        wishlist: [
                            { id: '101', name: 'New Book' },
                            { id: '102', name: 'Movie Ticket' },
                        ],
                    },
                    {
                        id: '2',
                        name: 'John Doe 2',
                        email: 'john2@example.com',
                        password: '12345',
                        wishlist: [
                            { id: '201', name: 'New Book' },
                            { id: '202', name: 'Movie Ticket' },
                        ],
                    },
                ],
            });
        },

        routes() {
            this.namespace = '/api';

            this.post('/login', (schema, request) => {
                const { email, password } = JSON.parse(request.requestBody);

                const user = schema.db.users.findBy({ email, password });

                if (!user) {
                    return new Response(401, {}, { error: 'Invalid credentials' });
                }

                return { userId: user.id, name: user.name };
            });

            this.post('/logout', () => {
                return new Response(200, {}, { message: 'Logged out successfully' });
            });

            this.get('/wishlist', (schema, request) => {
                const userId = request.queryParams.userId;
                const user = schema.db.users.find(userId);

                if (!user) {
                    return new Response(404, {}, { error: 'User not found' });
                }

                return user.wishlist;
            });

            this.post('/wishlist', (schema, request) => {
                const userId = JSON.parse(request.requestBody).userId;
                const newItem = JSON.parse(request.requestBody).item;

                const user = schema.db.users.find(userId);

                if (!user) {
                    return new Response(404, {}, { error: 'User not found' });
                }

                user.wishlist.push(newItem);
                schema.db.users.update(userId, { wishlist: user.wishlist });

                return newItem;
            });

            this.delete('/wishlist/:id', (schema, request) => {
                const itemId = request.params.id;
                const userId = request.queryParams.userId;

                const user = schema.db.users.find(userId);

                if (!user) {
                    return new Response(404, {}, { error: 'User not found' });
                }

                user.wishlist = user.wishlist.filter((item) => item.id !== itemId);
                schema.db.users.update(userId, { wishlist: user.wishlist });

                return { message: 'Item deleted successfully' };
            });
        },
    });
}
