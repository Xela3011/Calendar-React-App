import { useDispatch, useSelector } from "react-redux"
import { calendarApi } from "../api";
import { onAddNewEvent, onDeleteEvent, onSetActiveEvent, onUpdateEvent, onLoadEvents } from "../store";
import { convertEventsDates } from "../helpers/";
import Swal from "sweetalert2";


export const useCalendarStore = () => {

   const dispatch = useDispatch();
   const {events,activeEvent} = useSelector(state => state.calendar);
   const {user} = useSelector(state => state.auth);

    const setActiveEvent = ( calendarEvent ) => {
      dispatch(onSetActiveEvent(calendarEvent));
    }  
    
    const startSavingEvent = async( calendarEvent ) => {
      try {
        if(calendarEvent.id){
          //updating
          await calendarApi.put(`/events/${calendarEvent.id}`, calendarEvent);
          dispatch(onUpdateEvent({...calendarEvent, user}));
          return;
        }
          //creating
          const {data} = await calendarApi.post('/events', calendarEvent);
          console.log({data});
          dispatch(onAddNewEvent({...calendarEvent, id: data.event.id, user}));
      } catch (error) {
        console.log(error);
        Swal.fire('Error al guardar', error.response.data.msg, 'error');
      }
    }

    const startDeletingEvent = async() => {
      try {
        await calendarApi.delete(`/events/${activeEvent.id}`);
        dispatch(onDeleteEvent());
      } catch (error) {
        console.log(error);
        Swal.fire('Error al guardar', error.response.data.msg, 'error');
      }
    }

    const startLoadingEvents = async() => {
        try {
          const {data} = await calendarApi.get('/events');
          const events = convertEventsDates(data.events);
          dispatch(onLoadEvents(events));
        } catch (error) {
          console.log('Error cargando evento');
          console.log(error);
        }
    }

  return {
    //props
    activeEvent,
    events,
    hasEventSelected: !!activeEvent,
    //methods
    startDeletingEvent,
    setActiveEvent,
    startLoadingEvents,
    startSavingEvent
  }
}
