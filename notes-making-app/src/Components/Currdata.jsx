import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import firebaseDB from "../firebase";

const Currdata = ({ allData, light, toggleDarkMode }) => {

    const [data, setData] = useState({});
    const { id } = useParams();
    const reqData = Object.keys(data).filter(e => e === id);
    const temp = allData[reqData[0]];

    useEffect(() => {
        firebaseDB.child('notes').on('value', snapshot => {
            if (snapshot.val()) {
                setData({ ...snapshot.val() })
            }
        })
    }, [])

    return (
        <>
            {
                temp &&
                (
                    temp.share ?
                        <div className="currData">
                            <button onClick={toggleDarkMode} className="toggleDarkMode">Switch to {light ? `Dark` : `Light`} Mode</button>
                            <div>Current Note: <b>{temp.text}</b></div>
                            <div>Last Updated at: <b>{new Date(temp.date).toLocaleString()}</b></div>
                        </div>
                        :
                        <h1>Not Found</h1>
                )
            }
        </>
    )
}
export default Currdata;