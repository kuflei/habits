import { createServer } from 'miragejs';

export function makeServer({ environment = 'development' } = {}) {
    return createServer({
        environment,

        seeds(server) {
            server.db.loadData({
                users: [
                    {
                        id: '1',
                        name: 'Piter',
                        email: 'john@example.com',
                        password: '123',
                        habits: [
                            { id: '101', name: "Piter Exercise", startDate: "2025-01-01", endDate: "2025-01-12", frequency: 1, reward: "New Shoes", "progress": {
                                    "2025-01-01": true,
                                    "2025-01-02": false
                                } },
                            { id: '102', name: "Piter Exercise2", startDate: "2025-01-01", endDate: "2025-01-10", frequency: 3, reward: "New Shoes", progress: {} },
                        ],
                        wishlist: [
                            { id: '111', name: 'Piter New Book' },
                            { id: '112', name: ' PiterMovie Ticket' },
                        ],
                    },
                    {
                        id: '2',
                        name: 'Parker',
                        email: 'john2@example.com',
                        password: '12345',
                        habits: [
                            { id: '201', name: "Parker Exercise", startDate: "2025-01-01", endDate: "2025-2-31", frequency: 4, reward: "Movie", progress: {} },
                        ],
                        wishlist: [
                            { id: '221', name: 'Parker New Book' },
                            { id: '222', name: 'Parker Movie Ticket' },
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

            this.get('/habits', (schema, request) => {
                const userId = request.queryParams.userId;
                console.log('Requested userId:', userId); // Логування userId

                const user = schema.db.users.find(userId);

                if (!user) {
                    console.log('User not found for id:', userId);
                    return new Response(404, {}, { error: 'User not found' });
                }

                console.log('User habits:', user.habits); // Логування звичок користувача
                return user.habits;
            });
            this.patch('/habits/:id', (schema, request) => {
                const id = request.params.id;
                const { habit, userId } = JSON.parse(request.requestBody);

                console.log("Отримано PATCH запит:", { id, userId, habit });

                const user = schema.db.users.find(userId);
                if (!user) {
                    return new Response(404, {}, { error: 'User not found' });
                }

                const habitIndex = user.habits.findIndex((h) => h.id === id);
                if (habitIndex === -1) {
                    return new Response(404, {}, { error: 'Habit not found' });
                }

                user.habits[habitIndex] = { ...user.habits[habitIndex], ...habit };

                schema.db.users.update(userId, { habits: user.habits });

                return user.habits[habitIndex];
            });


            this.post('/habits', (schema, request) => {
                const { userId, habit } = JSON.parse(request.requestBody);
                const user = schema.db.users.find(userId);

                if (!user) {
                    return new Response(404, {}, { error: 'User not found' });
                }

                user.habits.push(habit);
                schema.db.users.update(userId, { habits: user.habits });

                return habit;
            });

            this.delete('/habits/:id', (schema, request) => {
                const habitId = request.params.id;
                const userId = request.queryParams.userId;
                const user = schema.db.users.find(userId);

                if (!user) {
                    return new Response(404, {}, { error: 'User not found' });
                }

                user.habits = user.habits.filter((habit) => habit.id !== habitId);
                schema.db.users.update(userId, { habits: user.habits });

                return { message: 'Habit deleted successfully' };
            });
        },
    });
}
