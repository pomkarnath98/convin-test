import { useEffect } from "react";
import { Link } from "react-router-dom";
import firebaseDB from "../firebase";

const Notes = ({ allData, toggleSharing, dataObj, setDataObj, text, setText }) => {

    const changeText = (e) => {
        if (!text) setDataObj(allData)
        setText(e.target.value);
    }

    const addOrEdit = () => {
        text && firebaseDB.child('notes').push(
            {
                text,
                date: Date.now(),
                share: false
            },
            err => {
                if (err) console.log(err)
            }
        )
        setText("")
    }

    const search = () => {
        const temp = {};
        // eslint-disable-next-line
        Object.keys(allData).map(e => {
            if (allData[e].text.includes(text)) temp[e] = allData[e]
        })
        setDataObj(temp)
    }

    useEffect(() => {
        if (!text) setDataObj(allData)
        // eslint-disable-next-line
    }, [text])

    useEffect(() => {
        setDataObj(allData);
        // eslint-disable-next-line
    }, [allData])

    // console.log(dataObj)
    return (
        <>
            <h1>Keep Notes</h1>
            <div>
                <input value={text} onChange={(e) => changeText(e)} placeholder="Start Typing..." className="inputBox" />
                <button onClick={addOrEdit} className="addNoteBtn">Add</button>
                <button onClick={search} className="addNoteBtn">Search</button>
            </div>
            <div>
                {
                    Object.keys(dataObj).map(id => (
                        <div key={id} className="data">
                            <div>
                                <Link to={`/${id}`}>
                                    <div>{dataObj[id].text}</div>
                                    <i>Last Updated: {new Date(dataObj[id].date).toLocaleString()}</i>
                                </Link>
                            </div>
                            <button onClick={() => toggleSharing(id)}>{dataObj[id].share ? 'Disable' : 'Enable'} Link</button>
                        </div>
                    ))
                }
            </div>
        </>
    )
}

export default Notes