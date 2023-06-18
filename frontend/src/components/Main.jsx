import Header from "./Header.jsx";
import Footer from "./Footer.jsx";

const Main = ({children}) => {
    return (
        <div className="flex flex-col min-h-screen">
            <Header/>
            <main className="flex-grow">
                {children}
            </main>
            <Footer/>
        </div>
    );
}

export default Main;