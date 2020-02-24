import React, {useEffect,useState,useContext,useCallback,useMemo} from 'react';
const Context = React.createContext('defaultContext')

function App() {
	const[app,setApp] = useState(true);
	const[count,setCount]=useState(1)


  return (
	  <Context.Provider value = {count}>
    <div className="App">
 	{app && "Show App"}
 	{!app && "Nothing"}
 	<hr/>
 	<button onClick={()=>setApp((s)=>!s)}>Toggle</button>
<Button count = {()=>setCount((s)=>s+1)}/>
<PlanetInfo id={count}/>
    </div>
	  </Context.Provider>

  );
}

const Button = ({count}) => {
	const value = useContext(Context)
	return <button onClick={count}>add {value}</button>
}

const getPlanet = (id)=>{
	return fetch(`https://swapi.co/api/planets/${id}/`)
		.then(res=>res.json())
		.then(data=>data)
}

const useRequest =  (request) => {
	const initialState = useMemo(()=>({data:null,loading:true,error:null}),[])
	const [data,setData] = useState(initialState);

	useEffect(()=>{
		setData(initialState)
		let cancelled = false;
		request()
			.then(data=> !cancelled && setData((state)=>({
				data,
				loading:false
			}))).catch(err=>{console.log("error")})
		return ()=>cancelled = true
	},[request, initialState])

	return data
}

const usePlanetInfo = (id) => {
	const request =  useCallback(()=> getPlanet(id),[id]);
	console.log('finish usePlanetInfo')
	return useRequest(request)

}


const PlanetInfo = ({id}) => {
	const {loading,data} = usePlanetInfo(id)

	if(loading){return (<div>loading...</div>)}

	return (<div>{id} - {data && data.name}</div>)
}

export default App;
