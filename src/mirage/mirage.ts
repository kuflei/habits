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
                id: "1",
                name: "Habit 1",
                startDate: "2025-02-10",
                endDate: "2025-02-11",
                frequency: 4,
                reward: "Movie Ticket",
                progress: {
                  "2025-02-10": true,
                },
              },
              {
                id: "2",
                name: "Habit 2",
                startDate: "2025-01-10",
                endDate: "2025-02-07",
                frequency: 4,
                reward: "Book",
                progress: {
                  "2025-02-04": true,
                },
              },
              {
                id: "3",
                name: "Habit 3",
                startDate: "2025-01-17",
                endDate: "2025-02-02",
                frequency: 5,
                reward: "New Shoes",
                progress: {
                  "2025-02-01": true,
                },
              },
              {
                id: "4",
                name: "Habit 4",
                startDate: "2025-01-14",
                endDate: "2025-02-27",
                frequency: 4,
                reward: "Coffee",
                progress: {
                  "2025-02-20": true,
                },
              },
              {
                id: "5",
                name: "Habit 5",
                startDate: "2025-01-12",
                endDate: "2025-01-20",
                frequency: 2,
                reward: "New Shoes",
                progress: {
                  "2025-01-15": true,
                },
              },
              {
                id: "6",
                name: "Habit 6",
                startDate: "2025-01-20",
                endDate: "2025-02-07",
                frequency: 3,
                reward: "Book",
                progress: {
                  "2025-02-01": false,
                },
              },
              {
                id: "7",
                name: "Habit 7",
                startDate: "2025-01-30",
                endDate: "2025-02-23",
                frequency: 4,
                reward: "Movie Ticket",
                progress: {
                  "2025-02-19": false,
                },
              },
              {
                id: "8",
                name: "Habit 8",
                startDate: "2025-01-12",
                endDate: "2025-01-31",
                frequency: 5,
                reward: "Coffee",
                progress: {
                  "2025-01-12": true,
                },
              },
              {
                id: "9",
                name: "Habit 9",
                startDate: "2025-01-30",
                endDate: "2025-02-22",
                frequency: 1,
                reward: "Book",
                progress: {
                  "2025-02-12": true,
                },
              },
              {
                id: "10",
                name: "Habit 10",
                startDate: "2025-01-06",
                endDate: "2025-02-25",
                frequency: 4,
                reward: "Movie Ticket",
                progress: {
                  "2025-01-12": false,
                },
              },
              {
                id: "11",
                name: "Habit 11",
                startDate: "2025-02-13",
                endDate: "2025-02-15",
                frequency: 4,
                reward: "Book",
                progress: {
                  "2025-02-15": true,
                },
              },
              {
                id: "12",
                name: "Habit 12",
                startDate: "2025-02-06",
                endDate: "2025-02-21",
                frequency: 5,
                reward: "New Shoes",
                progress: {
                  "2025-02-19": false,
                },
              },
              {
                id: "13",
                name: "Habit 13",
                startDate: "2025-02-02",
                endDate: "2025-02-25",
                frequency: 4,
                reward: "Movie Ticket",
                progress: {
                  "2025-02-14": false,
                },
              },
              {
                id: "14",
                name: "Habit 14",
                startDate: "2025-01-08",
                endDate: "2025-01-20",
                frequency: 1,
                reward: "Coffee",
                progress: {
                  "2025-01-14": false,
                },
              },
              {
                id: "15",
                name: "Habit 15",
                startDate: "2025-02-14",
                endDate: "2025-02-26",
                frequency: 2,
                reward: "Coffee",
                progress: {
                  "2025-02-20": false,
                },
              },
              {
                id: "16",
                name: "Habit 16",
                startDate: "2025-01-24",
                endDate: "2025-02-10",
                frequency: 5,
                reward: "Coffee",
                progress: {
                  "2025-02-02": false,
                },
              },
              {
                id: "17",
                name: "Habit 17",
                startDate: "2025-01-11",
                endDate: "2025-01-30",
                frequency: 5,
                reward: "New Shoes",
                progress: {
                  "2025-01-30": false,
                },
              },
              {
                id: "18",
                name: "Habit 18",
                startDate: "2025-01-01",
                endDate: "2025-01-27",
                frequency: 3,
                reward: "New Shoes",
                progress: {
                  "2025-01-27": true,
                },
              },
              {
                id: "19",
                name: "Habit 19",
                startDate: "2025-02-08",
                endDate: "2025-02-23",
                frequency: 4,
                reward: "Movie Ticket",
                progress: {
                  "2025-02-21": false,
                },
              },
              {
                id: "20",
                name: "Habit 20",
                startDate: "2025-01-20",
                endDate: "2025-01-22",
                frequency: 5,
                reward: "Coffee",
                progress: {
                  "2025-01-20": false,
                },
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
          {
            id: "3",
            name: "User3",
            email: "user3@example.com",
            password: "2652",
            habits: [
              {
                id: "83061167",
                name: "User3 Habit 1",
                startDate: "2025-02-09",
                endDate: "2025-02-18",
                frequency: 1,
                reward: "New Shoes",
                progress: {
                  "2025-02-12": true,
                },
              },
              {
                id: "56025436",
                name: "User3 Habit 2",
                startDate: "2025-01-03",
                endDate: "2025-02-19",
                frequency: 4,
                reward: "Coffee",
                progress: {
                  "2025-02-15": true,
                },
              },
              {
                id: "67199931",
                name: "User3 Habit 3",
                startDate: "2025-01-17",
                endDate: "2025-02-28",
                frequency: 3,
                reward: "Movie Ticket",
                progress: {
                  "2025-01-23": true,
                },
              },
              {
                id: "76352158",
                name: "User3 Habit 4",
                startDate: "2025-02-11",
                endDate: "2025-02-20",
                frequency: 5,
                reward: "New Shoes",
                progress: {
                  "2025-02-13": false,
                },
              },
            ],
            wishlist: [
              {
                id: "930",
                name: "User3 Wishlist Item 1",
              },
              {
                id: "169",
                name: "User3 Wishlist Item 2",
              },
            ],
          },
          {
            id: "4",
            name: "User4",
            email: "user4@example.com",
            password: "9311",
            habits: [
              {
                id: "24055586",
                name: "User4 Habit 1",
                startDate: "2025-02-09",
                endDate: "2025-02-10",
                frequency: 4,
                reward: "Coffee",
                progress: {
                  "2025-02-10": true,
                },
              },
              {
                id: "40097408",
                name: "User4 Habit 2",
                startDate: "2025-01-26",
                endDate: "2025-03-01",
                frequency: 5,
                reward: "Coffee",
                progress: {
                  "2025-02-11": false,
                },
              },
              {
                id: "84109422",
                name: "User4 Habit 3",
                startDate: "2025-01-24",
                endDate: "2025-02-28",
                frequency: 5,
                reward: "Coffee",
                progress: {
                  "2025-02-07": true,
                },
              },
              {
                id: "29736933",
                name: "User4 Habit 4",
                startDate: "2025-02-07",
                endDate: "2025-02-25",
                frequency: 2,
                reward: "New Shoes",
                progress: {
                  "2025-02-25": true,
                },
              },
            ],
            wishlist: [
              {
                id: "394",
                name: "User4 Wishlist Item 1",
              },
            ],
          },
          {
            id: "5",
            name: "User5",
            email: "user5@example.com",
            password: "5111",
            habits: [
              {
                id: "97527081",
                name: "User5 Habit 1",
                startDate: "2025-01-17",
                endDate: "2025-01-20",
                frequency: 3,
                reward: "Coffee",
                progress: {
                  "2025-01-19": false,
                },
              },
              {
                id: "97305977",
                name: "User5 Habit 2",
                startDate: "2025-01-29",
                endDate: "2025-02-15",
                frequency: 2,
                reward: "Book",
                progress: {
                  "2025-01-31": false,
                },
              },
              {
                id: "2149792",
                name: "User5 Habit 3",
                startDate: "2025-01-11",
                endDate: "2025-01-27",
                frequency: 5,
                reward: "New Shoes",
                progress: {
                  "2025-01-11": false,
                },
              },
            ],
            wishlist: [
              {
                id: "627",
                name: "User5 Wishlist Item 1",
              },
              {
                id: "703",
                name: "User5 Wishlist Item 2",
              },
            ],
          },
          {
            id: "6",
            name: "User6",
            email: "user6@example.com",
            password: "2106",
            habits: [
              {
                id: "93411270",
                name: "User6 Habit 1",
                startDate: "2025-01-19",
                endDate: "2025-02-13",
                frequency: 2,
                reward: "New Shoes",
                progress: {
                  "2025-02-12": false,
                },
              },
              {
                id: "65556083",
                name: "User6 Habit 2",
                startDate: "2025-02-02",
                endDate: "2025-02-13",
                frequency: 5,
                reward: "New Shoes",
                progress: {
                  "2025-02-03": true,
                },
              },
              {
                id: "62385667",
                name: "User6 Habit 3",
                startDate: "2025-02-02",
                endDate: "2025-02-11",
                frequency: 5,
                reward: "Coffee",
                progress: {
                  "2025-02-07": true,
                },
              },
              {
                id: "70585601",
                name: "User6 Habit 4",
                startDate: "2025-02-01",
                endDate: "2025-02-14",
                frequency: 3,
                reward: "Book",
                progress: {
                  "2025-02-05": false,
                },
              },
              {
                id: "95070061",
                name: "User6 Habit 5",
                startDate: "2025-02-13",
                endDate: "2025-02-16",
                frequency: 1,
                reward: "Coffee",
                progress: {
                  "2025-02-15": false,
                },
              },
            ],
            wishlist: [
              {
                id: "797",
                name: "User6 Wishlist Item 1",
              },
              {
                id: "752",
                name: "User6 Wishlist Item 2",
              },
              {
                id: "900",
                name: "User6 Wishlist Item 3",
              },
            ],
          },
          {
            id: "7",
            name: "User7",
            email: "user7@example.com",
            password: "5096",
            habits: [
              {
                id: "86244539",
                name: "User7 Habit 1",
                startDate: "2025-01-31",
                endDate: "2025-02-07",
                frequency: 2,
                reward: "Movie Ticket",
                progress: {
                  "2025-02-07": true,
                },
              },
              {
                id: "67399046",
                name: "User7 Habit 2",
                startDate: "2025-01-16",
                endDate: "2025-02-15",
                frequency: 2,
                reward: "Coffee",
                progress: {
                  "2025-02-04": true,
                },
              },
              {
                id: "42123506",
                name: "User7 Habit 3",
                startDate: "2025-01-26",
                endDate: "2025-02-06",
                frequency: 1,
                reward: "New Shoes",
                progress: {
                  "2025-01-30": false,
                },
              },
              {
                id: "33037526",
                name: "User7 Habit 4",
                startDate: "2025-01-14",
                endDate: "2025-02-05",
                frequency: 5,
                reward: "Book",
                progress: {
                  "2025-01-16": false,
                },
              },
            ],
            wishlist: [
              {
                id: "194",
                name: "User7 Wishlist Item 1",
              },
              {
                id: "328",
                name: "User7 Wishlist Item 2",
              },
              {
                id: "793",
                name: "User7 Wishlist Item 3",
              },
            ],
          },
          {
            id: "8",
            name: "User8",
            email: "user8@example.com",
            password: "8970",
            habits: [
              {
                id: "97813340",
                name: "User8 Habit 1",
                startDate: "2025-01-06",
                endDate: "2025-02-27",
                frequency: 5,
                reward: "New Shoes",
                progress: {
                  "2025-01-27": false,
                },
              },
              {
                id: "83807912",
                name: "User8 Habit 2",
                startDate: "2025-01-18",
                endDate: "2025-01-31",
                frequency: 3,
                reward: "Book",
                progress: {
                  "2025-01-23": true,
                },
              },
              {
                id: "58227998",
                name: "User8 Habit 3",
                startDate: "2025-01-21",
                endDate: "2025-02-05",
                frequency: 2,
                reward: "Coffee",
                progress: {
                  "2025-01-22": true,
                },
              },
            ],
            wishlist: [
              {
                id: "869",
                name: "User8 Wishlist Item 1",
              },
            ],
          },
          {
            id: "9",
            name: "User9",
            email: "user9@example.com",
            password: "8131",
            habits: [
              {
                id: "36966979",
                name: "User9 Habit 1",
                startDate: "2025-02-11",
                endDate: "2025-02-13",
                frequency: 3,
                reward: "New Shoes",
                progress: {
                  "2025-02-11": false,
                },
              },
              {
                id: "38514752",
                name: "User9 Habit 2",
                startDate: "2025-01-23",
                endDate: "2025-01-27",
                frequency: 4,
                reward: "Book",
                progress: {
                  "2025-01-26": true,
                },
              },
            ],
            wishlist: [
              {
                id: "538",
                name: "User9 Wishlist Item 1",
              },
              {
                id: "285",
                name: "User9 Wishlist Item 2",
              },
            ],
          },
          {
            id: "10",
            name: "User10",
            email: "user10@example.com",
            password: "1258",
            habits: [
              {
                id: "84862044",
                name: "User10 Habit 1",
                startDate: "2025-01-12",
                endDate: "2025-02-04",
                frequency: 2,
                reward: "Book",
                progress: {
                  "2025-02-04": true,
                },
              },
              {
                id: "65371599",
                name: "User10 Habit 2",
                startDate: "2025-02-13",
                endDate: "2025-02-16",
                frequency: 4,
                reward: "Coffee",
                progress: {
                  "2025-02-13": true,
                },
              },
              {
                id: "34041006",
                name: "User10 Habit 3",
                startDate: "2025-01-02",
                endDate: "2025-01-08",
                frequency: 1,
                reward: "Movie Ticket",
                progress: {
                  "2025-01-04": false,
                },
              },
              {
                id: "87456043",
                name: "User10 Habit 4",
                startDate: "2025-01-14",
                endDate: "2025-02-18",
                frequency: 5,
                reward: "Book",
                progress: {
                  "2025-01-19": true,
                },
              },
              {
                id: "22133338",
                name: "User10 Habit 5",
                startDate: "2025-02-14",
                endDate: "2025-02-20",
                frequency: 1,
                reward: "Movie Ticket",
                progress: {
                  "2025-02-15": false,
                },
              },
            ],
            wishlist: [
              {
                id: "779",
                name: "User10 Wishlist Item 1",
              },
              {
                id: "902",
                name: "User10 Wishlist Item 2",
              },
              {
                id: "866",
                name: "User10 Wishlist Item 3",
              },
            ],
          },
          {
            id: "11",
            name: "User11",
            email: "user11@example.com",
            password: "6299",
            habits: [
              {
                id: "78554171",
                name: "User11 Habit 1",
                startDate: "2025-01-06",
                endDate: "2025-02-24",
                frequency: 1,
                reward: "Movie Ticket",
                progress: {
                  "2025-01-15": false,
                },
              },
              {
                id: "38886868",
                name: "User11 Habit 2",
                startDate: "2025-02-05",
                endDate: "2025-02-09",
                frequency: 5,
                reward: "Coffee",
                progress: {
                  "2025-02-08": true,
                },
              },
            ],
            wishlist: [
              {
                id: "903",
                name: "User11 Wishlist Item 1",
              },
            ],
          },
          {
            id: "12",
            name: "User12",
            email: "user12@example.com",
            password: "3450",
            habits: [
              {
                id: "60427444",
                name: "User12 Habit 1",
                startDate: "2025-01-20",
                endDate: "2025-02-10",
                frequency: 3,
                reward: "New Shoes",
                progress: {
                  "2025-02-08": true,
                },
              },
              {
                id: "90191373",
                name: "User12 Habit 2",
                startDate: "2025-01-25",
                endDate: "2025-02-07",
                frequency: 1,
                reward: "Movie Ticket",
                progress: {
                  "2025-02-01": true,
                },
              },
              {
                id: "3577483",
                name: "User12 Habit 3",
                startDate: "2025-01-27",
                endDate: "2025-02-23",
                frequency: 5,
                reward: "New Shoes",
                progress: {
                  "2025-02-05": false,
                },
              },
              {
                id: "70915513",
                name: "User12 Habit 4",
                startDate: "2025-01-19",
                endDate: "2025-02-17",
                frequency: 2,
                reward: "Coffee",
                progress: {
                  "2025-01-28": true,
                },
              },
              {
                id: "8152558",
                name: "User12 Habit 5",
                startDate: "2025-02-01",
                endDate: "2025-02-17",
                frequency: 3,
                reward: "Movie Ticket",
                progress: {
                  "2025-02-13": false,
                },
              },
            ],
            wishlist: [
              {
                id: "792",
                name: "User12 Wishlist Item 1",
              },
            ],
          },
          {
            id: "13",
            name: "User13",
            email: "user13@example.com",
            password: "5477",
            habits: [
              {
                id: "10320558",
                name: "User13 Habit 1",
                startDate: "2025-02-12",
                endDate: "2025-02-18",
                frequency: 1,
                reward: "Book",
                progress: {
                  "2025-02-14": false,
                },
              },
            ],
            wishlist: [
              {
                id: "340",
                name: "User13 Wishlist Item 1",
              },
              {
                id: "333",
                name: "User13 Wishlist Item 2",
              },
              {
                id: "452",
                name: "User13 Wishlist Item 3",
              },
            ],
          },
          {
            id: "14",
            name: "User14",
            email: "user14@example.com",
            password: "6962",
            habits: [
              {
                id: "80227465",
                name: "User14 Habit 1",
                startDate: "2025-02-01",
                endDate: "2025-02-22",
                frequency: 4,
                reward: "Movie Ticket",
                progress: {
                  "2025-02-17": true,
                },
              },
              {
                id: "87616665",
                name: "User14 Habit 2",
                startDate: "2025-01-16",
                endDate: "2025-01-17",
                frequency: 5,
                reward: "Coffee",
                progress: {
                  "2025-01-16": false,
                },
              },
              {
                id: "76969163",
                name: "User14 Habit 3",
                startDate: "2025-01-13",
                endDate: "2025-02-04",
                frequency: 3,
                reward: "Coffee",
                progress: {
                  "2025-01-27": true,
                },
              },
            ],
            wishlist: [
              {
                id: "321",
                name: "User14 Wishlist Item 1",
              },
            ],
          },
          {
            id: "15",
            name: "User15",
            email: "user15@example.com",
            password: "6414",
            habits: [
              {
                id: "95487344",
                name: "User15 Habit 1",
                startDate: "2025-01-30",
                endDate: "2025-02-20",
                frequency: 2,
                reward: "Movie Ticket",
                progress: {
                  "2025-02-10": true,
                },
              },
            ],
            wishlist: [
              {
                id: "263",
                name: "User15 Wishlist Item 1",
              },
            ],
          },
          {
            id: "16",
            name: "User16",
            email: "user16@example.com",
            password: "6590",
            habits: [
              {
                id: "40630422",
                name: "User16 Habit 1",
                startDate: "2025-02-08",
                endDate: "2025-02-21",
                frequency: 2,
                reward: "Movie Ticket",
                progress: {
                  "2025-02-17": true,
                },
              },
              {
                id: "30831186",
                name: "User16 Habit 2",
                startDate: "2025-01-27",
                endDate: "2025-02-12",
                frequency: 3,
                reward: "Book",
                progress: {
                  "2025-01-27": true,
                },
              },
              {
                id: "76325298",
                name: "User16 Habit 3",
                startDate: "2025-01-06",
                endDate: "2025-01-17",
                frequency: 1,
                reward: "Coffee",
                progress: {
                  "2025-01-12": true,
                },
              },
              {
                id: "81791996",
                name: "User16 Habit 4",
                startDate: "2025-01-21",
                endDate: "2025-02-25",
                frequency: 2,
                reward: "Book",
                progress: {
                  "2025-02-06": true,
                },
              },
              {
                id: "61142922",
                name: "User16 Habit 5",
                startDate: "2025-02-15",
                endDate: "2025-02-24",
                frequency: 2,
                reward: "Coffee",
                progress: {
                  "2025-02-15": true,
                },
              },
            ],
            wishlist: [
              {
                id: "637",
                name: "User16 Wishlist Item 1",
              },
            ],
          },
          {
            id: "17",
            name: "User17",
            email: "user17@example.com",
            password: "3017",
            habits: [
              {
                id: "64564693",
                name: "User17 Habit 1",
                startDate: "2025-01-14",
                endDate: "2025-01-17",
                frequency: 1,
                reward: "Movie Ticket",
                progress: {
                  "2025-01-16": false,
                },
              },
              {
                id: "37595663",
                name: "User17 Habit 2",
                startDate: "2025-01-31",
                endDate: "2025-02-27",
                frequency: 4,
                reward: "Book",
                progress: {
                  "2025-02-23": false,
                },
              },
            ],
            wishlist: [
              {
                id: "805",
                name: "User17 Wishlist Item 1",
              },
              {
                id: "397",
                name: "User17 Wishlist Item 2",
              },
              {
                id: "486",
                name: "User17 Wishlist Item 3",
              },
            ],
          },
          {
            id: "18",
            name: "User18",
            email: "user18@example.com",
            password: "5456",
            habits: [
              {
                id: "901637",
                name: "User18 Habit 1",
                startDate: "2025-01-06",
                endDate: "2025-01-17",
                frequency: 1,
                reward: "Movie Ticket",
                progress: {
                  "2025-01-14": true,
                },
              },
            ],
            wishlist: [
              {
                id: "833",
                name: "User18 Wishlist Item 1",
              },
            ],
          },
          {
            id: "19",
            name: "User19",
            email: "user19@example.com",
            password: "6428",
            habits: [
              {
                id: "66734931",
                name: "User19 Habit 1",
                startDate: "2025-02-08",
                endDate: "2025-02-20",
                frequency: 3,
                reward: "Movie Ticket",
                progress: {
                  "2025-02-10": false,
                },
              },
            ],
            wishlist: [
              {
                id: "588",
                name: "User19 Wishlist Item 1",
              },
            ],
          },
          {
            id: "20",
            name: "User20",
            email: "user20@example.com",
            password: "7592",
            habits: [
              {
                id: "95271369",
                name: "User20 Habit 1",
                startDate: "2025-02-09",
                endDate: "2025-02-20",
                frequency: 1,
                reward: "New Shoes",
                progress: {
                  "2025-02-17": true,
                },
              },
              {
                id: "63988863",
                name: "User20 Habit 2",
                startDate: "2025-01-10",
                endDate: "2025-02-01",
                frequency: 2,
                reward: "Book",
                progress: {
                  "2025-01-14": false,
                },
              },
              {
                id: "49911440",
                name: "User20 Habit 3",
                startDate: "2025-01-01",
                endDate: "2025-02-03",
                frequency: 1,
                reward: "Book",
                progress: {
                  "2025-01-06": false,
                },
              },
              {
                id: "50604462",
                name: "User20 Habit 4",
                startDate: "2025-01-22",
                endDate: "2025-02-28",
                frequency: 5,
                reward: "Coffee",
                progress: {
                  "2025-01-23": true,
                },
              },
            ],
            wishlist: [
              {
                id: "832",
                name: "User20 Wishlist Item 1",
              },
              {
                id: "395",
                name: "User20 Wishlist Item 2",
              },
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
