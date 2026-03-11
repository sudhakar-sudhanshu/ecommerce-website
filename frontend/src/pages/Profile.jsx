import { useEffect, useState } from "react";
import { authFetch } from "../utils/auth";

function Profile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL;

  useEffect(() => {
    authFetch(`${BASEURL}/api/profile/`)
      .then((res) => res.json())
      .then((data) => {
        setProfile(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="pt-24 text-center">Loading profile...</div>;
  }

  return (
    <div className="pt-24 min-h-screen bg-blue-50 flex justify-center">
       <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6 rounded shadow w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">My Profile</h2>

        <div className="space-y-2">
          <p><strong>Username:</strong> {profile.username}</p>
          <p><strong>Email:</strong> {profile.email || "Not provided"}</p>
          <p><strong>First Name:</strong> {profile.first_name || "-"}</p>
          <p><strong>Last Name:</strong> {profile.last_name || "-"}</p>
        </div>
      </div>
    </div>
  );
}

export default Profile;
