import React, {useState, useContext} from 'react'
import UserProvider from "../contexts/userProvider";
import Terminal from "../components/Terminal";
import DataTags from "../components/DataTags";

const noDataMsg = "Uh oh, there's nothing to show! " +
    "Login to see how much of your invaluable personal " +
	"data tech companies have at their disposal.";
	
const dataMsg = "See how much of your personal data tech companies have at their disposal. " + 
	"Click a field to explore your data.";

export default function Profile() {
	const [selected, setSelected] = useState("All");
    const userData = useContext(UserProvider.context);
    const text = Object.keys(userData).length ? dataMsg : noDataMsg;
    const options = Object.keys(userData).filter(key => {
        return userData[key] !== null;
    });

    return (
        <div className="page">
            <p className="page-title" style={{ textAlign: "center" }}>
                {text}
            </p>

                <DataTags
                    options={options}
                    onClick={option => setSelected(option)}
                    selected={selected}
                />

                <Terminal
                    userData={userData}
                    selected={selected}
                />
            <div style={{ marginBottom: 20 }} />
        </div>
    );
};