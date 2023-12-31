import { useEffect } from "react";
import EventDetails from '../components/EventDetails.js'
import EventForm from "../components/EventForm.js";
import { useEventContext } from "../hooks/useEventsContext.js";
import { useAuthContext } from "../hooks/useAuthContext.js"

const options = { weekday: 'long', day: 'numeric', month: 'long' };
const today = new Date();
const formattedDate = today.toLocaleDateString('en-US', options);

const Home = ()=>{

    const {events, dispatch} = useEventContext()
    const {user} =useAuthContext();

    useEffect(()=>{
        const fetchEvents = async()=>{
            const response =  await fetch('https://reminder-app-ov2s.onrender.com/api/events',{
                headers:{
                    'Authorization':`Bearer ${user.token}`
                }
            });
            const json = await response.json() // converts the response into array of json objs

            if(response.ok)
                dispatch({type:'SET_EVENTS', payload: json})
        }

        if(user)
            fetchEvents() //used to avoid making the useEffect's function async
    },[dispatch,user])

    return (
        <div className="home">
            <div className="workout">
            <h2>Welcome to Reminder App!</h2> 
            <h3>Today is {formattedDate}</h3>
                {events && events.map((event)=>{
                return <EventDetails key={event._id} event={event}/>
            })}
            </div>
            <EventForm />
        </div>
    )
}

export default Home;
