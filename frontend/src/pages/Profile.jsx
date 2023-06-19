import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState, useContext, useEffect } from 'react';
import AuthContext from '../context/AuthContext.jsx';
import Login from "../components/Login.jsx";
import SignUp from "../components/SignUp.jsx";
import UserProfile from "../components/UserProfile.jsx";
import imageOld from "../assets/images/logo/portrait-of-happy-senior-couple-tourists-outdoors-2022-01-19-00-15-22-utc.jpg";

const Profile = () => {
    const { isAuthenticated } = useContext(AuthContext);
    const [showLogin, setShowLogin] = useState(true);
    const [showUserProfile, setShowUserProfile] = useState(false);

    // This effect runs whenever isAuthenticated changes.
    useEffect(() => {
        setShowUserProfile(isAuthenticated);
    }, [isAuthenticated]);

    return (
        <div className="min-h-screen flex items-center justify-center my-[8rem]">
            <div className="flex w-full max-w-6xl">
                <div className="w-1/2 ">

                    <h1 className="text-3xl font-bold">Welcome to Java-Travels</h1>
                    <h2>Start Your Journey here.</h2>
                    <p className="mt-4 text-lg">Thank you for choosing Java Travels! We are thrilled to have you join our community of passionate travelers. Our mission is to provide you with unforgettable experiences and make your travel dreams a reality.</p>
                    <img className="mt-8" src={imageOld} alt="" />
                    <p>With Java Travel, you have access to an extensive selection of destinations, accommodations, and activities, all tailored to suit your unique preferences. Whether you're seeking relaxation on a pristine beach, exploring vibrant cities, or immersing yourself in breathtaking natural landscapes, we have something for everyone.</p>
                </div>
                <div className="w-1/2 bg-gray-50 p-8">
                    <div className="flex items-center justify-between mb-8">
                        <button
                            className={`w-1/2 py-6 px-4 ${showLogin ? 'bg-brand-blue-0-shades text-xl font-inder font-bold text-white rounded-md' : 'text-brand-blue-0-shades text-xl font-inder font-bold'}`}
                            onClick={() => setShowLogin(true)}
                        >
                            Login
                        </button>
                        <button
                            className={`w-1/2 py-6 px-4 ${showLogin ? 'text-brand-blue-0-shades text-xl font-inder font-bold' : 'bg-brand-blue-0-shades text-xl font-inder font-bold text-white rounded-md'}`}
                            onClick={() => setShowLogin(false)}
                        >
                            Sign Up
                        </button>
                    </div>
                    {
                        isAuthenticated ? (
                            <Transition appear show={showUserProfile} as={Fragment}>
                                <Dialog
                                    as="div"
                                    className="fixed inset-0 z-10 overflow-y-auto"
                                    static
                                    open={showUserProfile}
                                    onClose={() => setShowUserProfile(false)}
                                >
                                    <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
                                    <Dialog.Title className="sr-only">User Profile</Dialog.Title>
                                    <UserProfile />
                                </Dialog>
                            </Transition>
                        ) : showLogin ? <Login /> : <SignUp />
                    }
                </div>
            </div>
        </div>
    );
}

export default Profile;