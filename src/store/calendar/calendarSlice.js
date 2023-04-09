import { createSlice } from '@reduxjs/toolkit';
// import { addHours } from 'date-fns';
// const tempEvent =   {
//     _id : new Date().getTime(),
//     title: 'Cumpleaños Lider',
//     notes: 'Comprar el pastel y regalo',
//     start: new Date(),
//     end: addHours(new Date(), 2),
//     bgColor: '#fafafa',
//     user: {
//       _id: '123',
//       name: 'Alex'
//     }
//   }
export const calendarSlice = createSlice({
   name: 'calendar',
   initialState: {
      isLoadingEvents: true,
      events : [],
      activeEvent: null
   },
   reducers: {
       onSetActiveEvent: (state, {payload}) => {
          state.activeEvent = payload;
       },
       onAddNewEvent: (state, {payload}) => {
         state.events.push(payload);
         state.activeEvent = null;
       },
       onUpdateEvent: (state, {payload}) => {
         state.events = state.events.map(event => {
            if(event.id === payload.id){
               return payload
            }
            return event;
         })
       },
       onDeleteEvent: (state) => {
         if(state.activeEvent){
            state.events = state.events.filter(event => event.id !== state.activeEvent.id);
            state.activeEvent = null;
         }
       },
       onLoadEvents: (state, {payload = []}) => {
         state.isLoadingEvents = false;
         //state.events = payload;
         payload.forEach(event => {
            const exist = state.events.some(dbEvent => dbEvent.id === event.id);
            if(!exist)
               state.events.push(event);
         });
       },
       onLogoutCalendar: (state) => {
         state.isLoadingEvents = true,
         state.events = [],
         state.activeEvent = null
       }
    }
 });

export const 
{ 
  onAddNewEvent, 
  onDeleteEvent, 
  onLoadEvents,
  onLogoutCalendar,
  onSetActiveEvent, 
  onUpdateEvent, 
 } = calendarSlice.actions;