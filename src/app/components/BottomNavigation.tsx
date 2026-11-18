
"use client";

type Tab = "home" | "discover" | "matches";

interface BottomNavigationProps {
    activeTab: Tab;
    onTabChange: (tab: Tab) => void;
}

export default function BottomNavigation({
    activeTab,
    onTabChange,
}: BottomNavigationProps) {
    const tabs: { id: Tab; icon: string; label: string }[] = [
        { id: "home", icon: "⌂", label: "Home" },
        { id: "discover", icon: "♡", label: "Discover" },
        { id: "matches", icon: "💗", label: "Matches" },
    ];

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-[#eeeaf4] bg-white">
            <div className="mx-auto flex max-w-[440px]">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => onTabChange(tab.id)}
                        className={`flex flex-1 flex-col items-center gap-1 py-3 text-sm font-semibold transition ${activeTab === tab.id
                                ? "text-[#ff347b]"
                                : "text-[#888391]"
                            }`}
                    >
                        <span className="text-xl">{tab.icon}</span>
                        {tab.label}
                    </button>
                ))}
            </div>
        </nav>
    );
}