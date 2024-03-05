import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Navbar2 from '../components/Navbar2'

const CollegeForm = () => {
    const { userId } = useParams();
 
 
    // console.log(" College Id is:", { userId })


    const [formFeild, setFormFeild] = useState([
         { CollegeID: userId ,
            Question: "", 
        }
    ])

    const handleChange = (event, index) => {
        console.log("Target name:",index, event.target.name);
        console.log("Target value:",index,event.target.value);
        let data = [...formFeild];
        data[index][event.target.name] = event.target.value;
        setFormFeild(data);
    };

    const AddFeild = () => {
        let object = { CollegeID: userId ,Question: "" }
        setFormFeild([...formFeild, object]);
    };
    const handleClick = async (e) => {
        e.preventDefault();
        console.log(formFeild);
        try{
            const formattedData = formFeild.map(question => [
                question.CollegeID,
                question.Question,
            ]);
    
            await axios.post("http://localhost:8800/form", formattedData);
            // navigate(`/login`);
      
          }catch(err){
            console.log(err);
          }

    }
    const RemoveFeild=(index)=>{
        let data= [...formFeild];
        data.splice(index,1);
        setFormFeild(data);
    }


    return (
        <div>
            <Navbar2 />
            <div >
                <form>
                    {formFeild.map((form, index) => (
                        <div key={index} className="mt-3">
                            <input
                                name='Question'
                                className="form-control-lg"
                                placeholder='Question'
                                onChange={(event) => handleChange(event, index)}
                                value={form.Question}
                            />
                            <button
                                type="button"
                                className="btn btn-danger mt-3"
                                onClick={() => RemoveFeild(index)}
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                </form>
                <button
                    type="button"
                    className="btn btn-secondary mt-3"
                    onClick={AddFeild}
                >
                    Add Question
                </button>
                <button
                    type="button"
                    className="btn btn-primary mt-5"
                    onClick={handleClick}
                >
                    Submit
                </button>
            </div>
        </div>
    )
}

export default CollegeForm
