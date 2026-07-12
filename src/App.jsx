
import { createBrowserRouter, RouterProvider } from 'react-router-dom';


import { ABout,Homelayout,Landing,Error,NewsLetter,Cocktail,SinglePageError } from './pages';

import {loader as landingLoader} from './pages/Landing'
import {loader as singleCocktailLoader} from './pages/Cocktail'
import {action as newsletterAction} from './pages/NewsLetter'
import { QueryClient,QueryClientProvider } from '@tanstack/react-query';


const queryClient=new QueryClient({
  defaultOptions:{
    queries:{
      staleTime:1000*60*5
    }
  }
});


const router=createBrowserRouter([
  {
    path:'/',
    element: <Homelayout />,
    errorElement:<Error />,
    children:[
      {
        index:true,
        element: <Landing />,
        errorElement:<SinglePageError />,
        loader:landingLoader(queryClient),

      },
      {
        path:'cocktail/:id',
        element: <Cocktail />,
        errorElement:<SinglePageError />,
        loader:singleCocktailLoader(queryClient),
        
      },
      {
        path:'newsletter',
        element: <NewsLetter />,
        action:newsletterAction,
      },
      {
        path:'about',
        element: <ABout />,
        
      }
    ]
  },

])

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
    </QueryClientProvider>
  )
};
export default App;
