
import { prisma } from "../src/lib/prisma";

async function main() {
    const demoUser = await prisma.user.findUnique({
        where: { id: "demo-user" },
    });

    if (!demoUser) {
        throw new Error("Demo user not found!");
    }

    const incomingLikes = await prisma.swipe.findMany({
        where: {
            targetId: demoUser.id,
            action: "LIKE",
        },
        include: {
            actor: {
                include: {
                    profile: true,
                },
            },
        },
    });

    const outgoingSwipes = await prisma.swipe.count({
        where: {
            actorId: demoUser.id,
        },
    });

    const profileCount = await prisma.profile.count();

    console.log("\n--- Seed Verification ---");

    console.log("Demo user:", demoUser.name);
    console.log("Total profiles:", profileCount);
    console.log("Incoming likes:", incomingLikes.length);
    console.log("Outgoing swipes:", outgoingSwipes);

    console.log("\n--- People Who Liked Demo User ---");

    for (const swipe of incomingLikes) {
        console.log({
            name: swipe.actor.name,
            city: swipe.actor.profile?.city,
            action: swipe.action,
        });
    }

    if (incomingLikes.length !== 8) {
        throw new Error("Expected exactly 8 incoming likes.");
    }

    if (outgoingSwipes !== 0) {
        throw new Error("Demo user should have zero outgoing swipes.");
    }

    console.log("\nSeed verification passed!");
}

main()
    .catch((error) => {
        console.error("Verification failed:", error);
        process.exitCode = 1;
    })
    .finally(async () => {
        await prisma.$disconnect();
    });