const SiteReducer = (state, action) => {
    console.log(state);
    console.log(action);
    switch (action.type) {
      case "COLOR_LIGHT": {
        return {
          ...state,  
          colorMode: 'light',
        };
      }
      case "COLOR_DARK": {
        return {
          ...state,    
          colorMode: 'dark',
        };
      }
      case "COLOR_GREEN": {
        return {
          ...state,    
          colorMode: 'green',
        };
      }
      case "COLOR_PINK": {
        return {
          ...state,    
          colorMode: 'pink',
        };
      }
      case "COLOR_TOGGLE": {
        return {
          ...state,    
          colorMode: state.colorMode == 'dark' ? 'light' : 'dark',
        };
      }
      case "BAR_TOGGLE": {
        return {
          ...state,    
          barMode: !state.barMode,
        };
      }
      case "LOGIN": {
        return {
          ...state,    
          login: action.login,
        };
      }
      case "LOGOUT": {
        return {
          ...state,    
          login: {},
          colorMode: 'light',
        };
      }
      default:
        return state;
    }
  };
  
  export default SiteReducer;