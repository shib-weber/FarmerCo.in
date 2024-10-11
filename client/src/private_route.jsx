import { Route } from "react-router-dom"

const private_route = ({children, ...rest}) => {

    let auth
    const authCheck =async()=>{
        auth= await fetch('http://localhost:4000/api/farmer/istoken', 
            {
              method: 'GET',
              credentials: 'include', // Ensure cookies are sent along with the request
          });
    }
    authCheck
 
  return (
    <Route {...rest}>
        {!auth.token ?
        
        ""
        :
        children
        }
      
    </Route>
  )
}

export default private_route
