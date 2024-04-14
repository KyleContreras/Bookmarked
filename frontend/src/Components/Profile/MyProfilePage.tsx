import { useState, useEffect } from 'react';
import { IProfile } from "./Profile.tsx";
import EditProfile from "./EditProfile.tsx";
import DeleteProfileButton from "./DeleteProfileButton.tsx";
import CreateProfile from "./CreateProfile.tsx";
import { useNavigate } from "react-router-dom";

const MyProfilePage = () => {
    const [profileData, setProfileData] = useState<IProfile | null>(null);
    const navigate = useNavigate();
    const user_id = localStorage.getItem("user_id");
    const token = localStorage.getItem('token');

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const url = `http://3.143.218.54:8000/api/userprofile/my_profile`;

            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Authorization': `Token ${token}`,
                }
            });
            if (!response.ok) {
                throw new Error('Failed to fetch profile data');
            }
            setProfileData(await response.json());
        } catch (error) {
            console.error(error);
        }
    };

    const handleProfileDeleted = () => {
        setProfileData(null);
    };

    const handleProfileCreated = (newProfileData: IProfile) => {
        setProfileData(newProfileData);
    };

    const handleProfileEdit = (editedProfileData: IProfile) => {
        setProfileData(editedProfileData);
    }

    const handleToggleBookcase = () => {
        navigate("/mybookcase", { replace: true });
    }

    return (
        <div className="container-fluid d-flex flex-column align-items-center">
            <h2>My Profile</h2>
            <div>
                {!profileData || !profileData.name || !profileData.bio || !profileData.profile_picture || !profileData.social_links ? (
                    <CreateProfile user_id={user_id as string} token={token as string}  onProfileCreated={handleProfileCreated} />
                ) : (
                    <div className="card-body">
                        <p><img src={profileData.profile_picture} alt="Profile" className="img-fluid"/></p>
                        <p>Name: {profileData.name}</p>
                        <p>Bio: {profileData.bio}</p>
                        <p>Social Links: <a href={profileData.social_links}>{profileData.social_links}</a>
                        </p>
                        <EditProfile profile={profileData} token={token as string} onProfileEdit={handleProfileEdit}/>
                        <button className="btn-primary" onClick={handleToggleBookcase}>My Bookcase</button>
                        <DeleteProfileButton profile={profileData} token={token as string} onProfileDeleted={handleProfileDeleted}/>
                    </div>
                )}
            </div>
        </div>
    );
}

export default MyProfilePage;
