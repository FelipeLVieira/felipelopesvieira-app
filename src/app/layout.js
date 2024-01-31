import NavBar from "@/app/components/navigation/NavBar";
import Footer from "@/app/components/footer/Footer";
import styles from "/styles/globals.css";
import { Switch, Routes, Route } from 'react-router-dom';

const layoutStyles = {
    main { padding: '2rem 0' },
    navBar: { background: '#FFF', color: '#333' },
    footer: { position: 'fixed', bottom: 0, width: '100%' }
};

const RootLayout = ({ children }) => {
    return (
        <div style={layoutStyles.main}>
            <NavBar style={layoutStyles.navBar} />
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/about" component={About} />
                <Route path="/contact" component={Contact} />
            </Switch>
            <Footer style={layoutStyles.footer} />
        </div>
    );
};

export default RootLayout;