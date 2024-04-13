import {useEffect, useState} from "react";
import {IProfile, Profile} from "./Profile.tsx";
import {useSearch} from "../../contexts/SearchContext.tsx";


const ProfilesPage = () => {
    //const [profiles, setProfiles] = useState<IProfile[]>([] || {});
    const [profiles, setProfiles] = useState<IProfile[]>([]);
    const [error, setError] = useState<string | null>(null);
    const { searchQuery } = useSearch();

    useEffect(() => {
        fetchData();
    }, [searchQuery]);

    const fetchData = async () => {
        try {
            let url = 'http://127.0.0.1:8000/api/userprofile/';
            if (searchQuery) {
                url = `http://127.0.0.1:8000/api/userprofile/?search=${encodeURIComponent(searchQuery)}`;
            }

            const response = await fetch(url);

            if (!response.ok) {
                throw new Error('Failed to fetch profile');
            }
            const profileData = await response.json();
            setProfiles(profileData);
            setError(null);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="content">
            <div className="container my-5">
                {error && <div className="alert alert-danger" role="alert">{error}</div>}
                {profiles.map((profile) => <Profile profile={profile} key={profile.user} />)}
            </div>
        </div>
    );
}

export default ProfilesPage;
