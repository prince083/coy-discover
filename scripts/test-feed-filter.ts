
import { prisma } from "../src/lib/prisma";

const DEMO_USER_ID = "demo-user";
const TARGET_USER_ID = "mock-user-01";

async function main() {
    console.log("Testing feed filtering...");

    try {
        // Create a temporary PASS swipe.
        await prisma.swipe.create({
            data: {
                actorId: DEMO_USER_ID,
                targetId: TARGET_USER_ID,
                action: "PASS",
            },
        });

        console.log("Temporary PASS swipe created.");

        // Request the actual API.
        const response = await fetch("http://localhost:3000/api/feed");
        const result = await response.json();

        if (!response.ok) {
            throw new Error(`API returned status ${response.status}`);
        }

        const targetStillExists = result.profiles.some(
            (profile: { id: string }) => profile.id === TARGET_USER_ID
        );

        if (targetStillExists) {
            throw new Error("Swiped profile still appears in feed.");
        }

        if (result.count !== 29) {
            throw new Error(`Expected 29 profiles, received ${result.count}`);
        }

        console.log("PASS: Swiped profile excluded from feed.");
        console.log("PASS: Feed count reduced from 30 to 29.");
    } finally {
        // Remove the temporary test swipe.
        await prisma.swipe.deleteMany({
            where: {
                actorId: DEMO_USER_ID,
                targetId: TARGET_USER_ID,
            },
        });

        console.log("Temporary test swipe cleaned up.");
    }
}

main()
    .catch((error) => {
        console.error("Feed filter test failed:", error);
        process.exitCode = 1;
    })
    .finally(async () => {
        await prisma.$disconnect();
    });