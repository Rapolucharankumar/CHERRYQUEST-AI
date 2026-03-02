"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useUser } from "@/hooks/useUser";
import {
    Home,
    Map,
    Trophy,
    User as UserIcon,
    Settings,
    Sword,
    LayoutDashboard,
    LogOut,
    LogIn
} from "lucide-react";

const menuItems = [
    { icon: Home, label: "Home", href: "/" },
    { icon: Map, label: "Quest Map", href: "/quest" },
    { icon: Sword, label: "Boss Battles", href: "/boss-battles" },
    { icon: Trophy, label: "Leaderboard", href: "/leaderboard" },
    { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
    { icon: UserIcon, label: "Profile", href: "/profile" },
];

export function Sidebar() {
    const pathname = usePathname();
    const { user, logout } = useUser();
    const router = useRouter();

    const handleAuthAction = () => {
        if (user) {
            logout();
            router.push("/auth");
        } else {
            router.push("/auth");
        }
    };

    return (
        <div className="flex h-screen w-64 flex-col border-r bg-card/50 backdrop-blur-md">
            <div className="flex h-20 items-center justify-center border-b px-6">
                <Link href="/" className="flex items-center gap-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary cherry-glow">
                        <Sword className="h-6 w-6 text-white" />
                    </div>
                    <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                        CherryQuest AI
                    </span>
                </Link>
            </div>

            <div className="flex-1 overflow-y-auto py-6 px-4">
                <nav className="space-y-1">
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href;

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
                                    isActive
                                        ? "bg-primary text-white cherry-glow"
                                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                                )}
                            >
                                <Icon className={cn(
                                    "h-5 w-5 transition-transform duration-200 group-hover:scale-110",
                                    isActive ? "text-white" : "text-muted-foreground group-hover:text-primary"
                                )} />
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>
            </div>

            <div className="border-t p-4">
                <button
                    onClick={handleAuthAction}
                    className={cn(
                        "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all",
                        user
                            ? "text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                            : "bg-primary/10 text-primary hover:bg-primary hover:text-white"
                    )}
                >
                    {user ? <LogOut className="h-5 w-5" /> : <LogIn className="h-5 w-5" />}
                    {user ? "Sign Out" : "Sign In"}
                </button>
            </div>
        </div>
    );
}
