type IncrementAction = { type: 'INCREMENT' };
type DecrementAction = { type: 'DECREMENT' };

export const increment = (): IncrementAction => ({ type: 'INCREMENT' });
export const decrement = (): DecrementAction => ({ type: 'DECREMENT' });