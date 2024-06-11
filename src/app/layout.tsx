import {ReactNode} from "react";
import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "../styles/styles.scss";
import styles from "./layout.module.scss";
import SystemBanner from "@/src/components/System/Banner";
import SystemHeader from "@/src/components/System/Header";
import SytemMenu from "@/src/components/System/Menu";
import SystemFooter from "@/src/components/System/Footer";
import SystemBreadcrumb from "@/src/components/System/Breadcrumb";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
    title: "Festivente | WMS",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: ReactNode;
}>) {
    return (
        <html lang="pl">
        <body className={inter.className}>
        <main className={styles.main}>
            {/*<SystemBanner/>*/}
            <div className={styles.mainContainer}>
                {/*<NuxtLoadingIndicator color="red" :height="20" /> */}
                <SystemHeader/>
                <div className={styles.mainContent}>
                    <SytemMenu/>
                    <div className={styles.mainContentInner}>
                        <SystemBreadcrumb/>
                        {children}
                    </div>
                </div>
            </div>
            <SystemFooter/>
        </main>
        </body>
        </html>
    );
}
