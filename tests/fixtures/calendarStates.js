export const events = [
    {
        id: '1',
        title: 'Cumpleaños Lider',
        notes: 'Comprar el pastel y regalo',
        start: new Date('2023-07-26 15:00:00'),
        end: new Date('2023-07-26 17:00:00')
    },
    {
        id: '2',
        title: 'Cumpleaños Melissa',
        notes: 'Comprar velas',
        start: new Date('2023-07-26 15:00:00'),
        end: new Date('2023-07-26 17:00:00')
    }
]

export const initialState = {
    isLoadingEvents: true,
    events : [],
    activeEvent: null
}

export const calendarWithEventsState = {
    isLoadingEvents: true,
    events : [...events],
    activeEvent: null
}

export const calendarWithActiveEventState = {
    isLoadingEvents: true,
    events : [...events],
    activeEvent: {...events[0]}
}