"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import api from "@/lib/api";

export interface User {
    id: string;
    email: string;
    xp: number;
    coins: number;
    level: number;
    streak: number;
    completedQuests: string[];
}

interface UserContextType {
    user: User | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<void>;
    register: (email: string, password: string) => Promise<void>;
    logout: () => void;
    refreshUser: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    const fetchUser = async () => {
        const token = localStorage.getItem("cherry_token");
        if (!token) {
            setLoading(false);
            return;
        }

        try {
            const res = await api.get("/auth/me");
            setUser(res.data);
        } catch (error) {
            console.error("Failed to fetch user:", error);
            localStorage.removeItem("cherry_token");
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    const login = async (email: string, password: string) => {
        const res = await api.post("/auth/login", { email, password });
        localStorage.setItem("cherry_token", res.data.token);
        await fetchUser();
    };

    const register = async (email: string, password: string) => {
        const res = await api.post("/auth/register", { email, password });
        localStorage.setItem("cherry_token", res.data.token);
        await fetchUser();
    };

    const logout = () => {
        localStorage.removeItem("cherry_token");
        setUser(null);
    };

    useEffect(() => {
        fetchUser();
    }, []);

    return (
        <UserContext.Provider value={{
            user,
            loading,
            login,
            register,
            logout,
            refreshUser: fetchUser
        }}>
            {children}
        </UserContext.Provider>
    );
}

export function useUser() {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return context;
}
