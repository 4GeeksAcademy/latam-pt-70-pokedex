export const initialStore=()=>{
  return{
    message: null,

    likes: [],

    todos: [
      {
        id: 1,
        title: "Learn Fetch and Promises",
        background: '#3627b8',
      },
      {
        id: 2,
        title: "Learn useState and ReactRouter",
        background: null,
      },
      {
        id: 3,
        title: "Clean my Bathroom",
        background: null,
      },
    ]
  }
}

export default function storeReducer(store, action = {}) {

  switch(action.type){

    case 'add_task':

      const { id,  color } = action.payload;

      return {
        ...store,
        todos: store.todos.map((todo) => (todo.id === id ? { ...todo, background: color } : todo))
      };

    case 'add_like':

      const { pokemonName } = action.payload;

      const pokemonAlreadyLiked = store.likes.includes(pokemonName);

      if(pokemonAlreadyLiked){
        return store;
      }

      return {
        ...store,
        likes: [ ...store.likes, pokemonName ]
      }

    case 'remove_like':

      const { pokemonName } = action.payload;

      return {
        ...store,
        likes: store.likes.filter( item => item != pokemonName )
      }

      
    default:
      throw Error('Unknown action.');
  }    
}
