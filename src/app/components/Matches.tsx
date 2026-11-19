
"use client";

import { useEffect, useState } from "react";

interface Match {
    userId: string;
    name: string;
    age: number;
    photo: string;
    city: string;
    college: string | null;
}

interface MatchesResponse {
    success: boolean;
    count: number;
    matches: Match[];
    message?: string;
}

export default function Matches() {
    const [matches, setMatches] = useState<Match[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function fetchMatches() {
            try {
                const response = await fetch("/api/matches");
                const data: MatchesResponse = await response.json();

                if (!response.ok || !data.success) {
                    throw new Error(data.message || "Could not load matches.");
                }

                setMatches(data.matches);
            } catch (err) {
                setError(
                    err instanceof Error ? err.message : "Something went wrong."
                );
            } finally {
                setLoading(false);
            }
        }

        fetchMatches();
    }, []);

    if (loading) {
        return (
            <div className="py-20 text-center text-[#777181]">
                Finding your matches...
            </div>
        );
    }

    if (error) {
        return (
            <div className="py-20 text-center">
                <p className="font-semibold text-red-500">{error}</p>
            </div>
        );
    }

    return (
        <section className="space-y-5 pt-2">
            <div>
                <h2 className="text-3xl font-black">Your matches 💗</h2>
                <p className="mt-1 text-sm text-[#777181]">
                    People who liked you back.
                </p>
            </div>

            {matches.length === 0 ? (
                <div className="rounded-[26px] border-2 border-[#211b29] bg-[#e8e0ff] p-7 text-center shadow-[4px_5px_0_#211b29]">
                    <div className="mb-3 text-5xl">💌</div>
                    <h3 className="text-xl font-extrabold">
                        No matches yet
                    </h3>
                    <p className="mt-2 text-sm text-[#625d6b]">
                        Keep discovering. When someone you like likes you back,
                        you&apos;ll find them here.
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-2 gap-4">
                    {matches.map((match) => (
                        <article
                            key={match.userId}
                            className="overflow-hidden rounded-[20px] border-2 border-[#211b29] bg-white shadow-[3px_4px_0_#211b29]"
                        >
                            <img
                                src={match.photo}
                                alt={match.name}
                                className="h-44 w-full object-cover"
                            />

                            <div className="p-3">
                                <h3 className="font-extrabold">
                                    {match.name}, {match.age}
                                </h3>
                                <p className="mt-1 text-xs text-[#777181]">
                                    📍 {match.city}
                                </p>
                                {match.college && (
                                    <p className="mt-1 truncate text-xs text-[#777181]">
                                        🎓 {match.college}
                                    </p>
                                )}
                            </div>
                        </article>
                    ))}
                </div>
            )}
        </section>
    );
}