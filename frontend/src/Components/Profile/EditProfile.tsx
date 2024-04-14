import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {IProfile} from "./Profile.tsx";

interface IEditProfile {
    profile: IProfile;
    token: string;
    onProfileEdit: (updatedProfileData: IProfile) => void;
}

const EditProfile = ({ profile, token, onProfileEdit }:IEditProfile) => {
    const navigate = useNavigate();
    const [showForm, setShowForm] = useState(false);


    const [profilePicture, setProfilePicture] = useState(profile.profile_picture);
    const [profileName, setProfileName] = useState(profile.name);
    const [profileBio, setProfileBio] = useState(profile.bio);
    const [profileSocials, setProfileSocials] = useState(profile.social_links);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`http://3.143.218.54:8000/api/userprofile/${profile.id}/`, {
                method: "PATCH",
                headers: {
                    Authorization: `Token ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    profile_picture: profilePicture,
                    name: profileName,
                    bio: profileBio,
                    social_links: profileSocials,
                }),
            });
            const responseData = await response.json();
            if (!response.ok) {
                throw new Error(responseData.message || "Failed to create account");
            }

            onProfileEdit(responseData);
            navigate("/myprofile", { replace: true });
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const toggleForm = () => {
        setShowForm((prevState) => !prevState);
    };

    return (
        <div className="container-fluid d-flex flex-column align-items-center">
            <button onClick={toggleForm} className="btn btn-primary mb-2">{showForm ? 'Cancel' : 'Edit Profile'}</button>
            {showForm && (
                <form onSubmit={handleSubmit} className="mb-2">
                    <div className="mb-2">
                        <label htmlFor="profilePicture" className="form-label">
                            Profile Picture:
                            <input
                                type="text"
                                id="profilePicture"
                                value={profilePicture}
                                onChange={(e) => setProfilePicture(e.target.value)}
                                className="form-control"
                            />
                        </label>
                    </div>
                    <div className="mb-2">
                        <label htmlFor="profileName" className="form-label">
                            Name:
                            <input
                                type="text"
                                id="profileName"
                                value={profileName}
                                onChange={(e) => setProfileName(e.target.value)}
                                className="form-control"
                            />
                        </label>
                    </div>
                    <div className="mb-2">
                        <label htmlFor="profileBio" className="form-label">
                            Bio:
                            <input
                                type="text"
                                id="profileBio"
                                value={profileBio}
                                onChange={(e) => setProfileBio(e.target.value)}
                                className="form-control"
                            />
                        </label>
                    </div>
                    <div className="mb-2">
                        <label htmlFor="profileSocials" className="form-label">
                            Social Links:
                            <input
                                type="text"
                                id="profileSocials"
                                value={profileSocials}
                                onChange={(e) => setProfileSocials(e.target.value)}
                                className="form-control"
                            />
                        </label>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            )}
        </div>
    );
};

export default EditProfile;
