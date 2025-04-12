//imports 
import PeopleModal from "./PeopleModal";
import './People.css';



const PeopleGroup = ({title, pepGroup}) => {

    return (
        <>
            <h1>{title}</h1>
            <div className='peopleList'>
                {pepGroup.map((p)=> 
                    <div className='peopleListItem'>
                        <img alt="person" src={p.imagePath}/>
                        {/* <h3>{p.name}</h3> */}
                        <PeopleModal {...p} title={title} />

                    </div>
                )}
                
            </div>
        </>
    );
}

export default PeopleGroup;