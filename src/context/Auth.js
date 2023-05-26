import { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../Firebase';

const UserContext = createContext();
// The AuthContextProvider component is a wrapper component that will be used to provide the authentication context to its children components. 
// It takes the children prop, which represents the nested components.
export const AuthContextProvider = ({ children }) => {
// The user state is defined using the useState hook and is initialized as an empty object {}. 
// It will store the currently authenticated user.
  const [user, setUser] = useState({});

  // The useEffect hook is used to subscribe to authentication state changes. 
  useEffect(() => {
    // onAuthStateChanged function is called from Firebase, and a callback function that receives the currentUser as a parameter. 
    // Inside the callback the user state is updated with the new value.
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log(currentUser);
      setUser(currentUser);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    // The UserContext.Provider component is used to provide the user state as the value to the nested components.
    <UserContext.Provider value={{ user }}>
      {children}
    </UserContext.Provider>
  );
};

// The useAuth hook allows other components to consume the user value from the context using the useContext hook.
export const useAuth = () => {
  return useContext(UserContext);
};