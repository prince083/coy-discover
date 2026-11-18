
import "dotenv/config";

import { prisma } from "../src/lib/prisma";

const DEMO_USER_ID = "demo-user";

const profiles = [
    {
        name: "Aarav Sharma",
        age: 23,
        bio: "Coffee lover, weekend traveller and amateur photographer.",
        city: "Lucknow",
        college: "University of Lucknow",
        interests: ["Travel", "Photography", "Music"],
    },
    {
        name: "Aisha Verma",
        age: 22,
        bio: "Bookworm who loves discovering hidden cafes.",
        city: "Noida",
        college: "Amity University",
        interests: ["Reading", "Coffee", "Art"],
    },
    {
        name: "Rohan Gupta",
        age: 24,
        bio: "Software developer by day, footballer by evening.",
        city: "Delhi",
        college: "Delhi University",
        interests: ["Technology", "Football", "Gaming"],
    },
    {
        name: "Priya Singh",
        age: 22,
        bio: "Dancing through life and collecting memories.",
        city: "Kanpur",
        college: "IIT Kanpur",
        interests: ["Dance", "Music", "Travel"],
    },
    {
        name: "Kabir Malhotra",
        age: 25,
        bio: "Fitness enthusiast and mountain explorer.",
        city: "Gurugram",
        college: "Amity University",
        interests: ["Fitness", "Hiking", "Photography"],
    },
    {
        name: "Ananya Mishra",
        age: 23,
        bio: "Artist, foodie and sunset admirer.",
        city: "Prayagraj",
        college: "Allahabad University",
        interests: ["Painting", "Food", "Travel"],
    },
    {
        name: "Vihaan Kapoor",
        age: 24,
        bio: "Music producer and aspiring entrepreneur.",
        city: "Mumbai",
        college: "Mumbai University",
        interests: ["Music", "Business", "Technology"],
    },
    {
        name: "Meera Joshi",
        age: 21,
        bio: "Nature lover who never says no to a road trip.",
        city: "Dehradun",
        college: "Graphic Era University",
        interests: ["Nature", "Travel", "Cooking"],
    },
    {
        name: "Arjun Mehta",
        age: 26,
        bio: "Startup enthusiast and weekend cyclist.",
        city: "Bengaluru",
        college: "Christ University",
        interests: ["Startups", "Cycling", "Technology"],
    },
    {
        name: "Sana Khan",
        age: 23,
        bio: "Exploring the world one dish at a time.",
        city: "Hyderabad",
        college: "Osmania University",
        interests: ["Cooking", "Food", "Travel"],
    },
    {
        name: "Aditya Rao",
        age: 22,
        bio: "Cricket fan, coder and movie enthusiast.",
        city: "Pune",
        college: "Pune University",
        interests: ["Cricket", "Movies", "Coding"],
    },
    {
        name: "Ishita Agarwal",
        age: 24,
        bio: "Minimalist at heart, maximalist with experiences.",
        city: "Jaipur",
        college: "Manipal University",
        interests: ["Art", "Fashion", "Travel"],
    },
    {
        name: "Dev Patel",
        age: 25,
        bio: "Adventure seeker and passionate photographer.",
        city: "Ahmedabad",
        college: "Nirma University",
        interests: ["Photography", "Hiking", "Music"],
    },
    {
        name: "Kavya Nair",
        age: 22,
        bio: "Classical music and creative writing enthusiast.",
        city: "Kochi",
        college: "CUSAT",
        interests: ["Music", "Writing", "Reading"],
    },
    {
        name: "Reyansh Sinha",
        age: 23,
        bio: "Always curious about technology and science.",
        city: "Patna",
        college: "NIT Patna",
        interests: ["Science", "Technology", "Gaming"],
    },
    {
        name: "Diya Choudhary",
        age: 21,
        bio: "Coffee, canvas and conversations.",
        city: "Chandigarh",
        college: "Panjab University",
        interests: ["Painting", "Coffee", "Reading"],
    },
    {
        name: "Kunal Bansal",
        age: 26,
        bio: "Entrepreneur with a passion for fitness.",
        city: "Gurugram",
        college: "Delhi University",
        interests: ["Business", "Fitness", "Travel"],
    },
    {
        name: "Tanya Roy",
        age: 23,
        bio: "Loves exploring new cultures and cuisines.",
        city: "Kolkata",
        college: "Jadavpur University",
        interests: ["Travel", "Food", "Photography"],
    },
    {
        name: "Manav Desai",
        age: 24,
        bio: "Football, music and spontaneous adventures.",
        city: "Surat",
        college: "SVNIT",
        interests: ["Football", "Music", "Travel"],
    },
    {
        name: "Riya Saxena",
        age: 22,
        bio: "Psychology student who loves meaningful conversations.",
        city: "Bhopal",
        college: "Barkatullah University",
        interests: ["Reading", "Psychology", "Movies"],
    },
    {
        name: "Atharv Kulkarni",
        age: 25,
        bio: "Developer, gamer and lifelong learner.",
        city: "Pune",
        college: "COEP",
        interests: ["Coding", "Gaming", "Technology"],
    },
    {
        name: "Nisha Reddy",
        age: 23,
        bio: "Yoga enthusiast and weekend trekker.",
        city: "Hyderabad",
        college: "JNTU",
        interests: ["Yoga", "Hiking", "Nature"],
    },
    {
        name: "Siddharth Jain",
        age: 24,
        bio: "Finance enthusiast and aspiring investor.",
        city: "Indore",
        college: "IIM Indore",
        interests: ["Finance", "Reading", "Business"],
    },
    {
        name: "Pooja Das",
        age: 22,
        bio: "Dance, travel and good food make me happy.",
        city: "Bhubaneswar",
        college: "KIIT",
        interests: ["Dance", "Food", "Travel"],
    },
    {
        name: "Harsh Vardhan",
        age: 26,
        bio: "Photographer capturing little moments.",
        city: "Varanasi",
        college: "BHU",
        interests: ["Photography", "Art", "History"],
    },
    {
        name: "Simran Kaur",
        age: 23,
        bio: "Fashion enthusiast and creative soul.",
        city: "Amritsar",
        college: "GNDU",
        interests: ["Fashion", "Art", "Music"],
    },
    {
        name: "Yash Thakur",
        age: 24,
        bio: "Basketball player and technology enthusiast.",
        city: "Nagpur",
        college: "VNIT",
        interests: ["Basketball", "Technology", "Fitness"],
    },
    {
        name: "Ira Mukherjee",
        age: 21,
        bio: "Poetry, books and long evening walks.",
        city: "Kolkata",
        college: "Presidency University",
        interests: ["Poetry", "Reading", "Nature"],
    },
    {
        name: "Dhruv Khanna",
        age: 25,
        bio: "Food explorer and weekend road trip planner.",
        city: "Delhi",
        college: "NSUT",
        interests: ["Food", "Travel", "Cars"],
    },
    {
        name: "Zoya Ali",
        age: 23,
        bio: "Designer who loves creativity and new experiences.",
        city: "Lucknow",
        college: "Integral University",
        interests: ["Design", "Photography", "Art"],
    },
];

async function main() {
    console.log("Starting Coy Discover database seeding...");

    // 1. Create or update the fixed demo user.
    await prisma.user.upsert({
        where: {
            id: DEMO_USER_ID,
        },
        update: {
            name: "Demo User",
        },
        create: {
            id: DEMO_USER_ID,
            name: "Demo User",
        },
    });

    console.log("Demo user ready.");

    // 2. Create or update the 30 mock users and profiles.
    for (const [index, profile] of profiles.entries()) {
        const userId = `mock-user-${String(index + 1).padStart(2, "0")}`;

        await prisma.user.upsert({
            where: { id: userId },
            update: { name: profile.name },
            create: {
                id: userId,
                name: profile.name,
            },
        });

        await prisma.profile.upsert({
            where: { userId },
            update: {
                age: profile.age,
                bio: profile.bio,
                city: profile.city,
                college: profile.college,
                interests: profile.interests,
                photo: `https://i.pravatar.cc/600?img=${index + 1}`,
            },
            create: {
                userId,
                age: profile.age,
                bio: profile.bio,
                city: profile.city,
                college: profile.college,
                interests: profile.interests,
                photo: `https://i.pravatar.cc/600?img=${index + 1}`,
            },
        });
    }

    console.log(`${profiles.length} mock profiles ready.`);

    // 3. Seed eight incoming likes.
    const incomingLikeUserIds = profiles.slice(0, 8).map(
        (_, index) =>
            `mock-user-${String(index + 1).padStart(2, "0")}`
    );

    for (const actorId of incomingLikeUserIds) {
        await prisma.swipe.upsert({
            where: {
                actorId_targetId: {
                    actorId,
                    targetId: DEMO_USER_ID,
                },
            },
            update: {
                action: "LIKE",
            },
            create: {
                actorId,
                targetId: DEMO_USER_ID,
                action: "LIKE",
            },
        });
    }

    console.log("8 incoming likes ready.");

    // 4. Verify final database counts.
    const userCount = await prisma.user.count();
    const profileCount = await prisma.profile.count();

    const incomingLikes = await prisma.swipe.count({
        where: {
            targetId: DEMO_USER_ID,
            action: "LIKE",
        },
    });

    const outgoingSwipes = await prisma.swipe.count({
        where: {
            actorId: DEMO_USER_ID,
        },
    });

    console.log("\nSeeding completed successfully!");
    console.table({
        users: userCount,
        profiles: profileCount,
        incomingLikes,
        outgoingSwipes,
    });
}

main()
    .catch((error) => {
        console.error("Seeding failed:", error);
        process.exitCode = 1;
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
