

import clientReducer from './client.reducer.js';

describe('clientReducer', () => {
 const clients = [{
    "id": "5c4f67517133351df75cde21",
    "company": "JacksonCorp",
    "userId": "5c4152a0c18bc9558709bae0",
    "firstName": "Joe",
    "lastName": "Jackson",
    "hourlyRate": 88,
    "phoneNumber": "+15555424234",
    "email": "joe@jacksoncorp.com",
    "address": {
      "streetOne": "100 Lonely Street",
      "streetTwo": "NW",
      "city": "New Orleans",
      "state": "LA",
      "zip": 14568
    },
    "photo": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAMCAgICAgMCAgIDAwMDBAYEBAQEBAgGBgUGCQgKCgkICQkKDA8MCgsOCwkJDRENDg8QEBEQCgwSExIQEw8QEBD/2wBDAQMDAwQDBAgEBAgQCwkLEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBD/wAARCABLADoDASIAAhEBAxEB/8QAHAAAAgMBAQEBAAAAAAAAAAAABgcEBQgBAwAC/8QAMhAAAgEDAwMDAwIFBQEAAAAAAQIDBAURAAYhBxIxE0FRCCJhMnEUIzOBkRUWcoKxof/EABQBAQAAAAAAAAAAAAAAAAAAAAD/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwB+Q17J9rDuyPfUS4VQIyDjI1Ft9SXUiTwBwx1DudakSszOAqAsxPgAaAR3beKK3RmquFTHBEpx3O2Mn4Golq3JbJonaOsiXHax7jjAIyD/AIB/xpZQ2e5df921lxiuT0e1LSe1HC/dK3sQPk4zz4GOOdW0PRPd6XTvsF7p3pMFEjnyCQVKjJHwGOgcVouMckPqxzJKG91551d26snnpXzkEMcE/GljeuiHVPpp09qeptLeoqymtjBrhRU7ZDQkAep93HcvB+Bq86YdQrdvrbpulEwSennekq4OcxSLgjyAcMjIw/DY9joGZaWqAwYjIPtokSKtKKRKnge+ha21A9UAtkEeM6J0rYgi/ao4HzoFlTVChGKk9pHP50AdZaiU9ONzRUtU1NPNa6mGCRSciRo2C+OeTgaLopHjiUMMD40N9QLdWXzatyt9smENTPCVjkJA7c+fPHjI0Al0ZnksfSy30NPAyer2zEkY7yVAJPz40a2+/XKB07Y1wzAA93A0oepN73tadr2+2bVKQCC30y/efu7ljAIIAOTxk8f20D2y59Zn2LcdzMjNU0TKPQCMDIpYDvIA8c/Gg3NVb/8AR6Y3vbt7gUQXOmZJG7sqV7SMf+azL9JT/wAfPvuKCJ0gS+epGGz2kMGUEHGDxGvgn2+Rny6BXvqv1O23dLDuPb8s9LLiIOuMKx9gCQ2f7fvjTr6R7Qk2Xsy22mutIt1bEJkqIXOJAyzyDMi4BWQnPcCAfHA0B5b6dKNg7oG7tF8Qp/SThf0jQPM8tQwpo6goykNlfjRNC6iJASCQo57vxoE+ZZ/Rj7h7AaiVXa6skijBUgqw4I1yO7I8KhjgnzqBdblCkRkMijAOecAaBb7yu7WK4TRQW+ORETKM2Asa48/gDVV0y65yWWa52qrs6VNHVUE9FU1jVMYISXtBkj7hgFSykAjntI99Ker6szbs3lvOhnqWnpbZWLDSp6fCwqO1jkeVLgn9jr7pZYqDdG9bVcJZduw2m0XBlvMVXXehBU0jIZC8kZbtdYwkhPCjhQc9wwG2Ppgul7jS67hudjW20G3Y/VlqmAWOplIAiI9mBZk5HzotvF2nvNZV3atlBqKyVpX7Bgdx+B8az31W+snplZelFb0O6XUklX/rE7U73N4fRgFHCGlxCGPefvVcEjGM4yMHSM2D9dd/sFnpKLdW3VvkcEQjaojqDFUED3YkMH448An3OedBvW0M7gju+/BXuPn9tWiU9y7F/lE8D21nTp79aXQncLK1bea2xyZGUr6Rjlv+UXeMfk408YvqE6LPEjr1L29hlBGa1AcftoMedUfqn2jsd5bTt8R3mviyrek+IY2/LDz/AG1mTen1CdRN/GSmr7u1Jb5DhqWk/lowxjDEfcwx5BOPxpVS1Dyp3sxJPOc67ExCJz50BXsXdD2Le3fPKIaaucwT9x+woRgE/wDw61T0gtuy7iNwWulp6K63ivoZVj9Op5hhNNUoxPacfreLznGB+QcTXI5qS3yNPL6P92UGw97XbeN4ov42lp7aaZKfIHrTtIsqIScDlIJfJHjHvggs9y7oiuO41qbfMxpqeKRIz29v6lIP/uqSOrdYigPGu7gvD33cd4vs1JTUr3Krnqmgpk7IomkkLFEX2UZwB8DUFGIHvzoJNNWSQvlGIJOrb/cNav297ccedUAJMgxxqaVlJJCZzoICnujAJ8cakjiMY9tRU/T/ANtS1/p6CPXf1QcaZ+14dv0vTSI1ElRQ1NwuhElY8fcnbCiMyLgggETxk+f0rj30uowoukAKKwEg4ZQwP7g8HRheZ2msEamOFFT1gqRQpGo/krz2qAM8DnzwPgaAHqexqmodHV19T7WXwRnzr8qOOdeaf0z+417qPsY6DkKd86qOSTjRSlBGEUMjZwM6FYSY5VZCQQw5GtA261297fSu9JGzNChJI5J7RoP/2Q==",
    "invoice": [],
    "__v": 0,
    "category": "Musician",
    "billable": false,
    "unpaid": 100
  }]

  const calls = [{
    "_id" : "5c4a2e935134a63c8c27b76e",
    "duration" : 9,
    "billable" : true,
    "id" : "5c4750b55a5cbb0b09158263",
    "userSid" : "AC1d8261f4ee03dbe1005af796ab821841",
    "startTime" : "2019-01-24T21:30:50.264Z",
    "endTime" : "2019-01-24T21:30:59.266Z",
    "organizationPhoneNumber" : "+13019803889",
    "clientPhoneNumber" : "+18025055503",
    "callSid" : "CAa417348e5e6a9ebda7cc22871cb1cc91",
    "direction" : "outgoing",
    "status" : "in-progress",
    "invoiced" : true,
    "__v" : 0
}]

  it('Should set the initial state when nothing is passed in', () => {
    const state = clientReducer(undefined, { type: '__UNKNOWN' });
    expect(state).toEqual({
      data: '',
      error: null,
      outgouingClientNumber: ''
    });
  });

  it('Should return the current state on an unknown action', () => {
    let currentState = {};
    const state = clientReducer(currentState, { type: '__UNKNOWN' });
    expect(state).toBe(currentState);
  });

  describe('FETCH_CLIENT_REQUEST', () => {
    it('Should set loading', () => {
      let state;
      state = clientReducer(state, { type: 'FETCH_CLIENT_REQUEST' });

      expect(state).toEqual({
        loading: true,
        data: '',
        error: null,
        outgouingClientNumber: ''
      });
    });
  });

  describe('FETCH_CLIENTS_SUCCESS', () => {
    it('Should set client data, loading false, error null', () => {
      let state;
      state = clientReducer(state, { type: 'FETCH_CLIENTS_SUCCESS', data: clients });

      expect(state).toEqual({
        loading: false,
        data: [{
          "id": "5c4f67517133351df75cde21",
          "company": "JacksonCorp",
          "userId": "5c4152a0c18bc9558709bae0",
          "firstName": "Joe",
          "lastName": "Jackson",
          "hourlyRate": 88,
          "phoneNumber": "+15555424234",
          "email": "joe@jacksoncorp.com",
          "address": {
            "streetOne": "100 Lonely Street",
            "streetTwo": "NW",
            "city": "New Orleans",
            "state": "LA",
            "zip": 14568
          },
          "photo": "data:image/jpeg;base64,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",
          "invoice": [],
          "__v": 0,
          "category": "Musician",
          "billable": false,
          "unpaid": 100
        }],
        error: null,
        outgouingClientNumber: ''
      });
    });
  });

  describe('FETCH_CLIENTS_ERROR', () => {
    it('Should set error and set loading false', () => {
      let state;
      state = clientReducer(state, { type: 'FETCH_CLIENTS_ERROR', error: 'BAD STUFF' });

      expect(state).toEqual({
        loading: false,
        data: '',
        error: 'BAD STUFF',
        outgouingClientNumber: '',
      });
    });
  });

  describe('SET_CLIENT', () => {
    it('Should set the clientId', () => {
      let state;
      state = clientReducer(state, { type: 'SET_CLIENT', id: '5c4f67517133351df75cde21' });

      expect(state).toEqual({
        
        data: '',
        error: null,
        outgouingClientNumber: '',
        clientId: '5c4f67517133351df75cde21'
      });
    });
  });

  describe('FETCH_CLIENT_CALLS_SUCCESS', () => {
    it('Should set client calls', () => {
      let state;
      state = clientReducer(state, { type: 'FETCH_CLIENT_CALLS_SUCCESS', calls: calls });

      expect(state).toEqual({
        data: '',
        calls: [{
          "_id" : "5c4a2e935134a63c8c27b76e",
          "duration" : 9,
          "billable" : true,
          "id" : "5c4750b55a5cbb0b09158263",
          "userSid" : "AC1d8261f4ee03dbe1005af796ab821841",
          "startTime" : "2019-01-24T21:30:50.264Z",
          "endTime" : "2019-01-24T21:30:59.266Z",
          "organizationPhoneNumber" : "+13019803889",
          "clientPhoneNumber" : "+18025055503",
          "callSid" : "CAa417348e5e6a9ebda7cc22871cb1cc91",
          "direction" : "outgoing",
          "status" : "in-progress",
          "invoiced" : true,
          "__v" : 0
      }],
        error: null,
        outgouingClientNumber: ''
      });
    });
  });

  describe('ADD CLIENT SUCCES', () => {
    it('is currently empty, should return state as is', () => {
      let state;
      state = clientReducer(state, { type: 'ADD_CLIENT_SUCCESS' });

      expect(state).toEqual({
        data: '',
        error: null,
        outgouingClientNumber: ''
      });
    });
  });

  describe('DELETE CLIENT SUCCESS', () => {
    it('is currently empty, should return state as is', () => {
      let state;
      state = clientReducer(state, { type: 'DELETE_CLIENT_SUCCESS' });

      expect(state).toEqual({
      
        data: '',
        error: null,
        outgouingClientNumber: ''
      });
    });
  });
});





// describe('FETCH_CLIENT_REQUEST', () => {
//   it('Should set loading', () => {
//       let state;
//       state = trelloReducer(state, addList(list1Title));
//       state = trelloReducer(state, addList(list2Title));
//       expect(state).toEqual({
//           lists: [list1, list2]
//       });
//   });
// });

// describe('FETCH_CLIENT_REQUEST', () => {
//   it('Should set loading', () => {
//       let state;
//       state = trelloReducer(state, addList(list1Title));
//       state = trelloReducer(state, addList(list2Title));
//       expect(state).toEqual({
//           lists: [list1, list2]
//       });
//   });
// });

// describe('FETCH_CLIENT_REQUEST', () => {
//   it('Should set loading', () => {
//       let state;
//       state = trelloReducer(state, addList(list1Title));
//       state = trelloReducer(state, addList(list2Title));
//       expect(state).toEqual({
//           lists: [list1, list2]
//       });
//   });
// });

// describe('FETCH_CLIENT_REQUEST', () => {
//   it('Should set loading', () => {
//       let state;
//       state = trelloReducer(state, addList(list1Title));
//       state = trelloReducer(state, addList(list2Title));
//       expect(state).toEqual({
//           lists: [list1, list2]
//       });
//   });
// });

// describe('FETCH_CLIENT_REQUEST', () => {
//   it('Should set loading', () => {
//       let state;
//       state = trelloReducer(state, addList(list1Title));
//       state = trelloReducer(state, addList(list2Title));
//       expect(state).toEqual({
//           lists: [list1, list2]
//       });
//   });
// });