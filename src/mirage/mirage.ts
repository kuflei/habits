import { createServer } from "miragejs";

export function makeServer({ environment = "development" } = {}) {
  return createServer({
    environment,

    seeds(server) {
      server.db.loadData({
        users: [
          {
            id: "1",
            name: "Piter",
            email: "john@example.com",
            password: "123",
            habits: [
              {
                id: "101",
                name: "Piter Exercise",
                startDate: "2025-02-01",
                endDate: "2025-02-12",
                frequency: 2,
                reward: "New Shoes",
                progress: {
                  "2025-02-01": true,
                  "2025-02-03": false,
                },
              },
              {
                id: "102",
                name: "Piter Exercise2",
                startDate: "2025-01-01",
                endDate: "2025-01-10",
                frequency: 3,
                reward: "New Shoes",
                progress: {
                  "2025-01-01": true,
                  "2025-01-03": false,
                },
              },
              {
                id: "1738316833536",
                name: "Test Habit",
                startDate: "2025-02-10",
                endDate: "2025-02-14",
                frequency: 1,
                progress: {},
                reward: "Piter New Book",
              },
              {
                id: "1738317216858",
                name: "Another Habit",
                startDate: "2025-02-02",
                endDate: "2025-02-22",
                frequency: 2,
                progress: {},
                reward: "Coffee",
              },
              {
                id: "1738317216812123",
                name: "Another Habit 2",
                startDate: "2025-02-02",
                endDate: "2025-02-22",
                frequency: 2,
                progress: {},
                reward: "Coffee",
              },
              {
                id: "1738317214356858",
                name: "Another Habit 3",
                startDate: "2025-02-02",
                endDate: "2025-02-22",
                frequency: 2,
                progress: {},
                reward: "Coffee",
              },
              {
                id: "1738317254616858",
                name: "Another Habit 4",
                startDate: "2025-02-02",
                endDate: "2025-02-22",
                frequency: 2,
                progress: {},
                reward: "Coffee",
              },
              {
                id: "173831721t546858",
                name: "Another Habit 5",
                startDate: "2025-02-02",
                endDate: "2025-02-22",
                frequency: 2,
                progress: {},
                reward: "Coffee",
              },
              {
                id: "1738317216545858",
                name: "Another Habit 6",
                startDate: "2025-02-02",
                endDate: "2025-02-22",
                frequency: 2,
                progress: {},
                reward: "Coffee",
              },
              {
                id: "173831724564516858",
                name: "Another Habit 7",
                startDate: "2025-02-02",
                endDate: "2025-02-22",
                frequency: 2,
                progress: {},
                reward: "Coffee",
              },
              {
                id: "1738317254516858",
                name: "Another Habit 8",
                startDate: "2025-02-02",
                endDate: "2025-02-22",
                frequency: 2,
                progress: {},
                reward: "Coffee",
              },
            ],
            wishlist: [
              { id: "111", name: "Piter New Book" },
              { id: "112", name: " PiterMovie Ticket" },
            ],
          },
          {
            id: "2",
            name: "Parker",
            email: "john2@example.com",
            password: "12345",
            habits: [
              {
                id: "201",
                name: "Parker Exercise",
                startDate: "2025-01-01",
                endDate: "2025-2-31",
                frequency: 4,
                reward: "Movie",
                progress: {},
              },
            ],
            wishlist: [
              { id: "221", name: "Parker New Book" },
              { id: "222", name: "Parker Movie Ticket" },
            ],
          },
        ],
      });
    },

    routes() {
      this.namespace = "/api";

      this.post("/login", (schema, request) => {
        const { email, password } = JSON.parse(request.requestBody);

        const user = schema.db.users.findBy({ email, password });

        if (!user) {
          return new Response(401, {}, { error: "Invalid credentials" });
        }

        return { userId: user.id, name: user.name };
      });

      this.post("/logout", () => {
        return new Response(200, {}, { message: "Logged out successfully" });
      });

      this.get("/wishlist", (schema, request) => {
        const userId = request.queryParams.userId;
        const user = schema.db.users.find(userId);

        if (!user) {
          return new Response(404, {}, { error: "User not found" });
        }

        return user.wishlist;
      });

      this.post("/wishlist", (schema, request) => {
        const userId = JSON.parse(request.requestBody).userId;
        const newItem = JSON.parse(request.requestBody).item;

        const user = schema.db.users.find(userId);

        if (!user) {
          return new Response(404, {}, { error: "User not found" });
        }

        user.wishlist.push(newItem);
        schema.db.users.update(userId, { wishlist: user.wishlist });

        return newItem;
      });

      this.delete("/wishlist/:id", (schema, request) => {
        const itemId = request.params.id;
        const userId = request.queryParams.userId;

        const user = schema.db.users.find(userId);

        if (!user) {
          return new Response(404, {}, { error: "User not found" });
        }

        user.wishlist = user.wishlist.filter((item) => item.id !== itemId);
        schema.db.users.update(userId, { wishlist: user.wishlist });

        return { message: "Item deleted successfully" };
      });

      this.get("/habits", (schema, request) => {
        const userId = request.queryParams.userId;

        const user = schema.db.users.find(userId);

        if (!user) {
          return new Response(404, {}, { error: "User not found" });
        }

        return user.habits;
      });
      this.patch("/habits/:id", (schema, request) => {
        const id = request.params.id;
        const { habit, userId } = JSON.parse(request.requestBody);

        const user = schema.db.users.find(userId);
        if (!user) {
          return new Response(404, {}, { error: "User not found" });
        }

        const habitIndex = user.habits.findIndex((h) => h.id === id);
        if (habitIndex === -1) {
          return new Response(404, {}, { error: "Habit not found" });
        }

        user.habits[habitIndex] = { ...user.habits[habitIndex], ...habit };

        schema.db.users.update(userId, { habits: user.habits });

        return user.habits[habitIndex];
      });

      this.post("/habits", (schema, request) => {
        const { userId, habit } = JSON.parse(request.requestBody);
        const user = schema.db.users.find(userId);

        if (!user) {
          return new Response(404, {}, { error: "User not found" });
        }

        user.habits.push(habit);
        schema.db.users.update(userId, { habits: user.habits });

        return habit;
      });

      this.delete("/habits/:id", (schema, request) => {
        const habitId = request.params.id;
        const userId = request.queryParams.userId;
        const user = schema.db.users.find(userId);

        if (!user) {
          return new Response(404, {}, { error: "User not found" });
        }

        user.habits = user.habits.filter((habit) => habit.id !== habitId);
        schema.db.users.update(userId, { habits: user.habits });

        return { message: "Habit deleted successfully" };
      });
    },
  });
}
