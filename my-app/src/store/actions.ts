export type Action = { type: 'INCREMENT' } | { type: 'DECREMENT' };

export const increment = (): Action => ({ type: 'INCREMENT' });
export const decrement = (): Action => ({ type: 'DECREMENT' });

