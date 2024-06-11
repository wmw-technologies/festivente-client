import {Icon} from '@/src/types';

interface SitemapItem {
    name: string;
    icon: Icon;
    path: string;
}

export const SITEMAP = [
    {
        name: "Dashboard",
        icon: "AdjustmentsVerticalIcon",
        path: "/dashboard"
    },
    {
        name: "Magazyn",
        icon: "ArrowLongUpIcon",
        path: "/warehouse"
    },
    {
        name: "Wypożyczenia",
        icon: "HomeIcon",
        path: "/rentals"
    },
    {
        name: "Pracownicy",
        icon: "ArrowLongUpIcon",
        path: "/employees"
    },
    {
        name: "Imprezy",
        icon: "ArrowLongUpIcon",
        path: "/events"
    },
    {
        name: "Transport",
        icon: "ArrowLongUpIcon",
        path: "/transport"
    },
    {
        name: "Serwis",
        icon: "ArrowLongUpIcon",
        path: "/service"
    },
] as Array<SitemapItem>;