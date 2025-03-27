//imports 
import PeopleModal from "./PeopleModal";


const PeopleGroup = ({title, pepGroup}) => {

    return (
        <>
            <h1>{title}</h1>
            <div className='peopleList' style={{color:"red",backgroundColor:"green"}}>
                {pepGroup.map((p)=> 
                    <div className='peopleListItem'>
                        <img alt="person" src={p.imagePath}/>
                        {/* <h3>{p.name}</h3> */}
                        <PeopleModal {...p}/>
                    </div>
                )}
                
            </div>
        </>
    );
}

export default PeopleGroup;