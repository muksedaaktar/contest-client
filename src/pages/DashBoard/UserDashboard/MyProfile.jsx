import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import { updateProfile } from "firebase/auth";
import { useNavigate } from "react-router";

const MyProfile = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    const [address, setAddress] = useState(user?.address || "");
    const [bio, setBio] = useState(user?.bio || "");
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState(user?.displayName || "");
    const [photo, setPhoto] = useState(user?.photoURL || "");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetch(`http://localhost:3000/users/${user.email}`)
            .then(res => res.json())
            .then(data => {
                setName(data.name);
                setPhoto(data.photoURL);
                setAddress(data.address);
                setBio(data.bio);
            });
    }, [user.email]);

    const handleUpdate = async () => {
        setLoading(true);

        try {
            // Firebase update
            await updateProfile(user, {
                displayName: name,
                photoURL: photo,
            });

            // MongoDB update
            const res = await fetch(
                `http://localhost:3000/users/${user.email}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        name,
                        photoURL: photo,
                        address,
                        bio
                    }),
                }
            );

            if (!res.ok) {
                throw new Error("Failed to update profile");
            }

            Swal.fire({
                title: "Profile Updated 🎉",
                text: "Your changes are saved successfully",
                icon: "success",
                confirmButtonColor: "#54CF68",
            })
                .then(() => {
                    navigate("/my-profile");
                });

            setIsEditing(false);
        } catch (error) {
            console.log(error);

            Swal.fire({
                title: "Error",
                text: "Profile update failed",
                icon: "error",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative max-w-3xl mx-auto bg-base-100 shadow-2xl rounded-3xl p-8 mt-15">
            <button
                onClick={() => navigate("/user-dashboard")}
                className="absolute top-4 right-4 btn btn-circle btn-sm bg-base-200 hover:bg-red-500 hover:text-white border-0"
            >
                ✖
            </button>

            <h1 className="text-3xl font-bold mb-6">
                👤 My Profile
            </h1>

            <div className="flex flex-col md:flex-row items-center gap-6">

                {/* PHOTO */}
                <img
                    src={photo || "https://i.ibb.co/2kR1j2P/user.png"}
                    className="w-32 h-32 rounded-full border-4 border-primary object-cover"
                />

                {/* INFO */}
                <div className="flex-1 space-y-3">

                    {/* NAME */}
                    <div>
                        <p className="text-sm text-base-content/60">Name</p>

                        {isEditing ? (
                            <input
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="input input-bordered w-full"
                            />
                        ) : (
                            <h2 className="text-xl font-bold">{name}</h2>
                        )}
                    </div>

                    {/* EMAIL */}
                    <div>
                        <p className="text-sm text-base-content/60">Email</p>
                        <h3 className="font-medium">{user?.email}</h3>
                    </div>

                    {/* PHOTO URL */}
                    {isEditing && (
                        <div>
                            <p className="text-sm text-base-content/60">Photo URL</p>
                            <input
                                value={photo}
                                onChange={(e) => setPhoto(e.target.value)}
                                className="input input-bordered w-full"
                            />
                        </div>
                    )}

                    {/* ADDRESS */}
                    <div>
                        <p className="text-sm text-base-content/60">Address</p>

                        {isEditing ? (
                            <input
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                className="input input-bordered w-full"
                                placeholder="Enter your address"
                            />
                        ) : (
                            <p className="font-medium">{address || "Not added"}</p>
                        )}
                    </div>

                    {/* BIO */}
                    <div>
                        <p className="text-sm text-base-content/60">Bio</p>

                        {isEditing ? (
                            <textarea
                                value={bio}
                                onChange={(e) => setBio(e.target.value)}
                                className="textarea textarea-bordered w-full"
                                placeholder="Write something about yourself"
                            />
                        ) : (
                            <p className="font-medium">{bio || "No bio yet"}</p>
                        )}
                    </div>

                </div>
            </div>

            {/* BUTTONS */}
            <div className="mt-6 flex gap-3">

                {!isEditing ? (
                    <button
                        onClick={() => setIsEditing(true)}
                        className="btn btn-primary"
                    >
                        Edit Profile
                    </button>
                ) : (
                    <>
                        <button
                            onClick={handleUpdate}
                            disabled={loading}
                            className="btn btn-success text-white"
                        >
                            {loading ? "Saving..." : "Save Changes"}
                        </button>

                        <button
                            onClick={() => setIsEditing(false)}
                            className="btn btn-ghost"
                        >
                            Cancel
                        </button>
                    </>
                )}

            </div>
        </div>
    );
};

export default MyProfile;