import Vue from "vue"
import Vuex from "vuex"
//import axios from 'axios'
Vue.use(Vuex);


export const store = new Vuex.Store({

    state: {
        people: [{
                "id": 1,
                "name": "Peter Kiss",
                "phone": "023567982",
                "email": "example1@example.com",
                "address": "Flat1 251a Mare Street, E8 3NS",
                "img": "./static/images/people-1.png",
            },
            {
                "id": 2,
                "name": "Adel Kiss",
                "phone": "077457821",
                "email": "example2@example.com",
                "address": "Flat2 251a Mare Street, E8 3NS",
                "img": "./static/images/people-2.png",
            },
            {
                "id": 3,
                "name": "Adrienn Barna",
                "phone": "346844212",
                "email": "example3@example.com",
                "address": "Flat3 251a Mare Street, E8 3NS",
                "img": "./static/images/people-3.png",
            },
            {
                "id": 4,
                "name": "Eszter Kovacs",
                "phone": "077074352",
                "email": "example4@example.com",
                "address": "Flat4 251a Mare Street, E8 3NS",
                "img": "./static//images/people-4.png",
            },
            {
                "id": 5,
                "name": "Janos Peto",
                "phone": "097855643",
                "email": "example5@example.com",
                "address": "Flat5 251a Mare Street, E8 3NS",
                "img": "./static/images/people-5.png",
            },
            {
                "id": 6,
                "name": "Marta Kiss",
                "phone": "765455987",
                "email": "example6@example.com",
                "address": "Flat6 251a Mare Street, E8 3NS",
                "img": "./static/images/people-6.png",
            },
            {
                "id": 7,
                "name": "Andrea Balogh",
                "phone": "123544688",
                "email": "example7@example.com",
                "address": "Flat7 251a Mare Street, E8 3NS",
                "img": "./static/images/people-7.png",
            },
            {
                "id": 8,
                "name": "David Jager",
                "phone": "996454632",
                "email": "example8@example.com",
                "address": "Flat8 251a Mare Street, E8 3NS",
                "img": "./static/images/people-8.png",
            },
            {
                "id": 9,
                "name": "Tamas Tompa",
                "phone": "0770234777",
                "email": "example9@example.com",
                "address": "Flat9 251a Mare Street, E8 3NS",
                "img": "./static/images/people-9.png",
            },
            {
                "id": 10,
                "name": "Hanna Bodri",
                "phone": "072765433",
                "email": "example10@example.com",
                "address": "Flat10 251a Mare Street, E8 3NS",
                "img": "./static/images/people-10.png",
            },
            {
                "id": 11,
                "name": "Pal Nagy",
                "phone": "075212345",
                "email": "example11@example.com",
                "address": "Flat11 251a Mare Street, E8 3NS",
                "img": "./static/images/people-11.png",
            },
            {
                "id": 12,
                "name": "Ivett Nagy",
                "phone": "075987665",
                "email": "example12@example.com",
                "address": "Flat12 251a Mare Street, E8 3NS",
                "img": "./static/images/people-12.png",
            },
            {
                "id": 13,
                "name": "Janos Eros",
                "phone": "0770879212",
                "email": "example13@example.com",
                "address": "Flat13 251a Mare Street, E8 3NS",
                "img": "./static/images/people-13.png",
            },
            {
                "id": 14,
                "name": "Tamas Zala",
                "phone": "072123432",
                "email": "example14@example.com",
                "address": "Flat14 251a Mare Street, E8 3NS",
                "img": "./static/images/people-14.png",
            },
            {
                "id": 15,
                "name": "Janos Arnoczki",
                "phone": "092554786",
                "email": "example15@example.com",
                "address": "Flat15 251a Mare Street, E8 3NS",
                "img": "./static/images/people-15.png",
            },
            {
                "id": 16,
                "name": "Sandor Marosfalvi",
                "phone": "077094866",
                "email": "example16@example.com",
                "address": "Flat16 251a Mare Street, E8 3NS",
                "img": "./static/images/people-16.png",
            }
        ]

    },

    mutations: {
        
    },

    actions: {
        
    },

    getters: {
        getPeople: state => {
            return state.people;
        }
    }

});