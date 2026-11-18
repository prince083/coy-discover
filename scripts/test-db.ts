
import { prisma } from "../src/lib/prisma";

async function main() {
    console.log("Testing SQLite connection...");

    const userCount = await prisma.user.count();
    const profileCount = await prisma.profile.count();
    const swipeCount = await prisma.swipe.count();

    console.log("\nDatabase connection successful!");

    console.table({
        users: userCount,
        profiles: profileCount,
        swipes: swipeCount,
    });
}

main()
    .catch((error) => {
        console.error("\nDatabase connection failed:");
        console.error(error);
        process.exitCode = 1;
    })
    .finally(async () => {
        await prisma.$disconnect();
    });