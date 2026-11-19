
"use client";

import { useEffect, useRef, useState } from "react";

interface Profile {
    id: string;
    name: string;
    age: number;
    photo: string;
    bio: string;
    city: string;
    college: string | null;
    interests: string[];
}

interface FeedResponse {
    success: boolean;
    count: number;
    profiles: Profile[];
}

interface SwipeResponse {
    success: boolean;
    message: string;
    isMatch: boolean;
}

export default function Discover() {
    const [profiles, setProfiles] = useState<Profile[]>([]);
    const [loading, setLoading] = useState(true);
    const [isSwiping, setIsSwiping] = useState(false);
    const [error, setError] = useState("");
    const [matchName, setMatchName] = useState("");

    const [dragX, setDragX] = useState(0);
    const [isDraggingUI, setIsDraggingUI] = useState(false);

    const dragStartX = useRef(0);
    const isDragging = useRef(false);
    const isSwipingRef = useRef(false);

    // Fetch profiles from the backend
    useEffect(() => {
        async function fetchProfiles() {
            try {
                const response = await fetch("/api/feed");

                if (!response.ok) {
                    throw new Error("Unable to load profiles.");
                }

                const data: FeedResponse = await response.json();

                if (!data.success) {
                    throw new Error("Something went wrong.");
                }

                setProfiles(data.profiles);
            } catch (err) {
                setError(
                    err instanceof Error
                        ? err.message
                        : "Something went wrong."
                );
            } finally {
                setLoading(false);
            }
        }

        fetchProfiles();
    }, []);

    // Handle LIKE and PASS
    async function handleSwipe(action: "LIKE" | "PASS") {
        const currentProfile = profiles[0];

        if (!currentProfile || isSwipingRef.current) return;

        isSwipingRef.current = true;
        setIsSwiping(true);
        setError("");

        try {
            const response = await fetch("/api/swipe", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    targetUserId: currentProfile.id,
                    action,
                }),
            });

            const data: SwipeResponse = await response.json();

            if (!response.ok || !data.success) {
                throw new Error(
                    data.message || "Unable to save your swipe."
                );
            }

            // Remove the profile only after successful API response
            setProfiles((currentProfiles) =>
                currentProfiles.filter(
                    (profile) => profile.id !== currentProfile.id
                )
            );

            // Show match feedback when both users liked each other
            if (data.isMatch) {
                setMatchName(currentProfile.name);
            }
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : "Something went wrong. Please try again."
            );
        } finally {
            isSwipingRef.current = false;
            setIsSwiping(false);
        }
    }


    // Start dragging the profile card
    function handleDragStart(
        event: React.PointerEvent<HTMLElement>
    ) {
        if (isSwipingRef.current) return;

        isDragging.current = true;
        setIsDraggingUI(true);

        dragStartX.current = event.clientX;

        event.currentTarget.setPointerCapture(event.pointerId);
    }

    // Move the card horizontally
    function handleDragMove(
        event: React.PointerEvent<HTMLElement>
    ) {
        if (!isDragging.current) return;

        const distance = event.clientX - dragStartX.current;

        setDragX(distance);
    }

    // Release the card
    function handleDragEnd() {
        if (!isDragging.current) return;

        isDragging.current = false;
        setIsDraggingUI(false);

        const SWIPE_THRESHOLD = 120;

        if (dragX > SWIPE_THRESHOLD) {
            setDragX(0);
            handleSwipe("LIKE");
        } else if (dragX < -SWIPE_THRESHOLD) {
            setDragX(0);
            handleSwipe("PASS");
        } else {
            // Return the card to its original position
            setDragX(0);
        }
    }

    // Handle cancelled pointer interaction
    function handleDragCancel() {
        isDragging.current = false;
        setIsDraggingUI(false);
        setDragX(0);
    }


    if (loading) {
        return (
            <section className="pt-10 text-center">
                <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-[#eeeaf4] border-t-[#ff347b]" />
                <p className="mt-4 text-sm text-[#777181]">
                    Finding people for you...
                </p>
            </section>
        );
    }

    if (error && profiles.length === 0) {
        return (
            <section className="mt-8 rounded-[20px] border-2 border-[#eeeaf4] p-6 text-center">
                <p className="font-bold text-[#211b29]">{error}</p>
                <button
                    onClick={() => window.location.reload()}
                    className="mt-4 rounded-full bg-[#ff347b] px-5 py-2 font-bold text-white"
                >
                    Try again
                </button>
            </section>
        );
    }

    if (profiles.length === 0) {
        return (
            <section className="mt-8 rounded-[24px] border-2 border-[#211b29] bg-[#e8e0ff] p-6 text-center shadow-[4px_5px_0_#211b29]">
                <div className="text-4xl">💗</div>
                <h2 className="mt-3 text-xl font-extrabold">
                    You&apos;re all caught up!
                </h2>
                <p className="mt-2 text-sm text-[#625d6b]">
                    There are no more profiles to discover right now.
                </p>
            </section>
        );
    }

    const profile = profiles[0];

    return (
        <section className="pt-4">
            <div className="mb-4 flex items-center justify-between">
                <h2 className="text-2xl font-extrabold">Discover</h2>
                <span className="rounded-full bg-[#f6f3fa] px-3 py-1 text-sm font-bold text-[#777181]">
                    {profiles.length} profiles
                </span>
            </div>

            {/* Profile Card */}
            <article
                onPointerDown={handleDragStart}
                onPointerMove={handleDragMove}
                onPointerUp={handleDragEnd}
                onPointerCancel={handleDragCancel}
                style={{
                    transform: `translateX(${dragX}px) rotate(${dragX * 0.04}deg)`,
                    touchAction: "pan-y",
                    transition: isDraggingUI
                        ? "none"
                        : "transform 0.3s ease",
                }}
                className={`overflow-hidden rounded-[24px] border-2 border-[#211b29] bg-white shadow-[4px_5px_0_#211b29] cursor-grab active:cursor-grabbing ${isSwiping ? "opacity-60" : "opacity-100"
                    }`}
            >
                <div className="relative aspect-[4/4.5] w-full bg-[#e8e0ff]">
                    <img
                        src={profile.photo}
                        alt={profile.name}
                        className="h-full w-full object-cover"
                    />

                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-5 pt-16">
                        <h3 className="text-3xl font-extrabold text-white">
                            {profile.name}, {profile.age}
                        </h3>

                        <p className="mt-1 text-sm font-medium text-white/90">
                            📍 {profile.city}
                        </p>
                    </div>
                </div>

                <div className="space-y-4 p-5">
                    {profile.college && (
                        <p className="text-sm font-semibold text-[#777181]">
                            🎓 {profile.college}
                        </p>
                    )}

                    <div>
                        <h4 className="mb-1 font-extrabold">About me</h4>
                        <p className="text-sm leading-relaxed text-[#625d6b]">
                            {profile.bio}
                        </p>
                    </div>

                    <div>
                        <h4 className="mb-2 font-extrabold">Interests</h4>

                        <div className="flex flex-wrap gap-2">
                            {profile.interests.map((interest) => (
                                <span
                                    key={interest}
                                    className="rounded-full border border-[#e5dcf4] bg-[#f7f4fc] px-3 py-1.5 text-xs font-semibold text-[#625d6b]"
                                >
                                    {interest}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </article>

            {/* Error feedback */}
            {error && (
                <p className="mt-3 text-center text-sm font-semibold text-red-600">
                    {error}
                </p>
            )}

            {/* LIKE and PASS buttons */}
            <div className="mt-6 flex items-center justify-center gap-8">
                <button
                    onClick={() => handleSwipe("PASS")}
                    disabled={isSwiping}
                    aria-label="Pass on profile"
                    className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-[#211b29] bg-white text-3xl text-[#777181] shadow-[3px_3px_0_#211b29] transition hover:bg-[#f6f3fa] disabled:cursor-not-allowed disabled:opacity-50"
                >
                    ✕
                </button>

                <button
                    onClick={() => handleSwipe("LIKE")}
                    disabled={isSwiping}
                    aria-label="Like profile"
                    className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-[#211b29] bg-[#ff347b] text-3xl text-white shadow-[3px_3px_0_#211b29] transition hover:scale-105 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    ♥
                </button>
            </div>

            <p className="mt-4 text-center text-xs text-[#777181]">
                {isSwiping
                    ? "Saving your choice..."
                    : "Pass or like to discover someone new"}
            </p>

            {/* Match feedback */}
            {matchName && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-5">
                    <div className="w-full max-w-sm rounded-[28px] border-2 border-[#211b29] bg-[#e8e0ff] p-7 text-center shadow-[5px_6px_0_#211b29]">
                        <div className="text-6xl">💗</div>

                        <h2 className="mt-4 text-3xl font-extrabold">
                            It&apos;s a match!
                        </h2>

                        <p className="mt-3 text-[#625d6b]">
                            You and {matchName} liked each other.
                        </p>

                        <button
                            onClick={() => setMatchName("")}
                            className="mt-6 w-full rounded-full border-2 border-[#211b29] bg-[#ff347b] px-5 py-3 font-bold text-white shadow-[3px_3px_0_#211b29]"
                        >
                            Keep discovering
                        </button>
                    </div>
                </div>
            )}
        </section>
    );
}