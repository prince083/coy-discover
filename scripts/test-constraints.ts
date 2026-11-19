
import { prisma } from "../src/lib/prisma";

async function main() {
    console.log("Testing database constraints...");

    // Test 1: Existing demo user
    const demoUser = await prisma.user.findUnique({
        where: { id: "demo-user" },
    });

    if (!demoUser) {
        throw new Error("Demo user missing.");
    }

    // Test 2: Existing incoming swipe
    const existingSwipe = await prisma.swipe.findFirst({
        where: {
            targetId: demoUser.id,
            action: "LIKE",
        },
    });

    if (!existingSwipe) {
        throw new Error("Expected incoming swipe missing.");
    }

    // Test 3: Duplicate swipe must be rejected
    try {
        await prisma.swipe.create({
            data: {
                actorId: existingSwipe.actorId,
                targetId: existingSwipe.targetId,
                action: "LIKE",
            },
        });

        throw new Error(
            "FAILED: Duplicate swipe was unexpectedly accepted."
        );
    } catch (error: unknown) {
        if (
            typeof error === "object" &&
            error !== null &&
            "code" in error &&
            error.code === "P2002"
        ) {
            console.log("PASS: Duplicate swipe rejected.");
        } else {
            throw error;
        }
    }

    // Test 4: Verify no accidental extra records
    const swipeCount = await prisma.swipe.count();

    if (swipeCount !== 8) {
        throw new Error(
            `Expected 8 swipes, found ${swipeCount}.`
        );
    }

    console.log("PASS: Existing swipe data preserved.");
    console.log("\nAll database constraint tests passed!");
}

main()
    .catch((error) => {
        console.error("Constraint test failed:", error);
        process.exitCode = 1;
    })
    .finally(async () => {
        await prisma.$disconnect();
    });