import {Header} from "./Components/Header/Header";
import {MainDescription} from "./Components/MainDescription/MainDescription";
import {CatalogNav} from "./Components/Catalog/CatalogNav";
import {MainSection} from "./Components/MainSection/MainSection";
import {Footer} from "./Components/Footer/Footer";
import React from "react";

export const HomePage = () => {
    return (
        <>
            <Header />
            <div className="container">
                <MainDescription />
                <CatalogNav />
                <MainSection />
            </div>
            <Footer />
        </>
    )
}