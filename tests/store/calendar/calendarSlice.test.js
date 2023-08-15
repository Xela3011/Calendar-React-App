import { calendarSlice, onAddNewEvent, onDeleteEvent, onLoadEvents, onLogoutCalendar, onSetActiveEvent, onUpdateEvent } from "../../../src/store/calendar/calendarSlice"
import { calendarWithActiveEventState, calendarWithEventsState, events, initialState } from "../../fixtures/calendarStates";

describe('Pruebas en calendarSlice', () => { 

    test('debe de regresar el estado por defecto', () => { 
        
        const state = calendarSlice.getInitialState();
        expect(state).toEqual(initialState);
     })

     test('onSetActiveEvent debe de activar el evento', () => { 
        const state = calendarSlice.reducer( calendarWithEventsState, onSetActiveEvent(events[0]));
        expect(state.activeEvent).toEqual(events[0]);
      })


      test('onAddNewEvent debe de crear un nuevo evento', () => { 
            const newEvent = {
                id: '1',
                title: 'Cumpleaños Sofía',
                notes: 'Hacer video de cumple',
                start: new Date('2023-07-30 15:00:00'),
                end: new Date('2023-07-31 17:00:00')
            }

            const state = calendarSlice.reducer(calendarWithEventsState, onAddNewEvent(newEvent));
            expect(state.events).toEqual([...events, newEvent ]);
       })

       test('onUpdateEvent debe de actualizar un evento', () => { 
        const updatedEvent = {
            id: '1',
            title: 'Cumpleaños Lider',
            notes: 'Comprar regalo',
            start: new Date('2023-07-26 14:00:00'),
            end: new Date('2023-07-26 16:00:00')
        }

        const state = calendarSlice.reducer(calendarWithEventsState, onUpdateEvent(updatedEvent));
        expect(state.events).toContain(updatedEvent);
        })

        test('onDeleteEvent debe de borrar el estado activo', () => { 
            const state = calendarSlice.reducer(calendarWithActiveEventState, onDeleteEvent())
            expect(state.activeEvent).toBe(null);
            expect(state.events).not.toContain(events[0]);
        });

        test('onLoadEvents debe de establecer los eventos', () => { 
            const state = calendarSlice.reducer(initialState, onLoadEvents(events));
            expect(state.isLoadingEvents).toBeFalsy();
            expect(state.events).toEqual(events); 

            const newState = calendarSlice.reducer(state, onLoadEvents(events));
            expect(state.events.length).toBe(2);
        });

        test('onLogoutCalendar debe de limpiar el estado', () => { 
            const state = calendarSlice.reducer(calendarWithActiveEventState, onLogoutCalendar());
            expect(state).toEqual(initialState);
        });

 })