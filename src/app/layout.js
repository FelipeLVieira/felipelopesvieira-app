import {Inter} from 'next/font/google';
import Navbar from "@/app/components/navigation/NavBar";
import {Providers} from './providers'
import Footer from "@/app/components/footer/Footer";

const inter = Inter({subsets: ['latin']});

export const metadata = {
    title: 'Felipe Lopes Vieira',
    description: 'My personal website',
};

export default function RootLayout({children}) {
    return (
        <html lang="en" suppressHydrationWarning={true} data-lpignore="true">
        <body>
        <Providers>
            <Navbar/>
            {children}
            <Footer/>
        </Providers>
        </body>
        </html>
    );
}