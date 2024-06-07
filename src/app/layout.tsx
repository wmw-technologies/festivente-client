import {ReactNode} from "react";
import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "../styles/styles.scss";
import styles from "./layout.module.scss";
import SystemFooter from "@/src/components/System/Footer";

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
        {/*<nav>*/}
        {/*    <div className="logo">LOGO</div>*/}
        {/*    <ul className="menu">*/}
        {/*        {SITEMAP.map((item) => (*/}
        {/*            <li key={item.path}>*/}
        {/*                <Link href={item.path}>*/}
        {/*                    /!*<UIIcon name={item.icon} size={24}/>*!/*/}
        {/*                    <span>{item.name}</span>*/}
        {/*                </Link>*/}
        {/*            </li>*/}
        {/*        ))}*/}
        {/*    </ul>*/}
        {/*</nav>*/}
        {/*<div>*/}
        {/*    <header></header>*/}
        {/*    <main>{children}</main>*/}
        {/*</div>*/}
        <main className={styles.main}>
            {/*// <TheBanner />*/}
            <div className={styles.container}>
                {/*<NuxtLoadingIndicator color="red" :height="20" /> */}
                {/*<TheHeader/>*/}
                <div className="flex flex-1">
                    {/*<TheMenu/>*/}
                    <div className="flex-1 p-4 pt-0 border-l border-gray-light">
                        {/*<TheBreadcrumb/>*/}
                        {/*<slot/>*/}
                    </div>
                </div>
            </div>
            <SystemFooter/>
            {/*<TheFooter/>*/}
        </main>
        </body>
        </html>
    );
}
