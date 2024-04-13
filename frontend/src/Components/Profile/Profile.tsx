import React, {useState, useEffect} from "react";
import {Bookcase, IBookcase} from "../Bookcase/Bookcase.tsx";

export interface IProfile {
    id: number; //id = user_id
    user: number; //user = user profile id
    bio: string;
    name: string;
    profile_picture: string;
    social_links: string;
}

export const Profile: React.FC<{ profile: IProfile }> = ({ profile }) => {
    const [bookcase, setBookcase] = useState<IBookcase | null>(null);
    const [showForm, setShowForm] = useState(false);
    const [showBookcase, setShowBookcase] = useState<boolean>(false);

    useEffect(() => {
        const fetchBookcase = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/bookcasebyuserid/${profile.user}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch bookcase");
                }
                setBookcase(await response.json());
            } catch (error) {
                console.error('Error:', error);
            }
        };
        fetchBookcase();
    }, [profile]);

    const toggleFormVisibility = () => {
        setShowForm(!showForm);
        setShowBookcase(!showBookcase);
    };

    return (
        <div className="container-fluid">
            <div className="card" key={profile.user}>
                <div className="row">
                    <div className="card-header">
                        <img src={profile.profile_picture} className="img-fluid rounded-start" alt={profile.name}/>
                    </div>
                    <div className="card-body">
                        <h6 className="card-title">{profile.name}</h6>
                        <p className="card-text">Bio: {profile.bio}</p>
                        <p className="card-text">Social Links: {profile.social_links}</p>
                        <button className="btn-primary"
                                onClick={toggleFormVisibility}>{showForm ? "Hide Bookcase" : "Show Bookcase"}</button>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="card-body">
                    {showBookcase && <Bookcase bookcase={bookcase}/>}
                </div>
            </div>
            <br />
        </div>
    );
}
