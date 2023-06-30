// import { AddNote } from './AddNote';
import Notes from './Notes';
import add_notes from "../img/add_notes.png"

export const Home = (props)=> {
  const {showAlert}= props
  return (
    <div>
      <div className='himg'>
      <img src={add_notes} alt="" srcset="" />
      </div>
   <Notes showAlert={showAlert}/>
    </div>
  )
}
