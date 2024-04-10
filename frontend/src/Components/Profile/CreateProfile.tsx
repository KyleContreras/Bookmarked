import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {IProfile} from "./Profile.tsx";

interface ICreateProfile {
    user_id: string;
    token: string;
    onProfileCreated: (newProfileData: IProfile) => void;
}

const CreateProfile = ({user_id, token, onProfileCreated}: ICreateProfile) => {
    const navigate = useNavigate();
    const [status, setStatus] = useState('');
    const [showForm, setShowForm] = useState(false);

    const [profilePicture, setProfilePicture] =
        useState('https://img.freepik.com/free-vector/hand-drawn-flat-design-stack-books-illustration_23-2149330605.jpg?w=740');
    const [profileName, setProfileName] = useState('');
    const [profileBio, setProfileBio] = useState('');
    const [profileSocials, setProfileSocials] = useState('');

    const handleCreate = async (e) => {
        e.preventDefault();

        const url = `http://127.0.0.1:8000/api/userprofile/`;
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Authorization': `Token ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user: user_id,
                    profile_picture: profilePicture,
                    name: profileName,
                    bio: profileBio,
                    social_links: profileSocials,
                }),
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'Failed to create/update profile');
            }
            setStatus('Profile successfully created/updated!');
            onProfileCreated(data);
            navigate("/myprofile", { replace: true });
        } catch (error: any) {
            setStatus(error.message);
        }
    };

    const toggleFormVisibility = () => {
        setShowForm(!showForm);
    };

    return (
        <div className="container-fluid d-flex flex-column align-items-center">
                <button onClick={toggleFormVisibility} className="btn btn-primary">{showForm ? "Cancel" : "Create Profile"}</button>
            {showForm && (
                <div>
                    <h2>Create Profile</h2>
                    <form onSubmit={handleCreate} className="mb-2">
                        <div className="mb-2">
                            <label htmlFor="profilePicture" className="form-label">
                                Profile Picture:
                                <input
                                    type="text"
                                    placeholder="Profile Picture URL"
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
                                    placeholder="Name"
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
                                    placeholder="Bio"
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
                                    placeholder="Social Links"
                                    value={profileSocials}
                                    onChange={(e) => setProfileSocials(e.target.value)}
                                    className="form-control"
                                />
                            </label>
                        </div>
                        <button type="submit" className="btn btn-primary">Create Profile</button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default CreateProfile;
