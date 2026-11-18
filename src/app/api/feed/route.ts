
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const DEMO_USER_ID = "demo-user";

export async function GET() {
    try {
        const profiles = await prisma.profile.findMany({
            where: {
                userId: {
                    not: DEMO_USER_ID,
                },
                user: {
                    swipesReceived: {
                        none: {
                            actorId: DEMO_USER_ID,
                        },
                    },
                },
            },
            select: {
                id: true,
                userId: true,
                age: true,
                photo: true,
                bio: true,
                city: true,
                college: true,
                interests: true,
                user: {
                    select: {
                        name: true,
                    },
                },
            },
            orderBy: {
                createdAt: "asc",
            },
        });

        const feed = profiles.map((profile) => ({
            id: profile.userId,
            name: profile.user.name,
            age: profile.age,
            photo: profile.photo,
            bio: profile.bio,
            city: profile.city,
            college: profile.college,
            interests: profile.interests,
        }));

        return NextResponse.json({
            success: true,
            count: feed.length,
            profiles: feed,
        });
    } catch (error) {
        console.error("GET /api/feed error:", error);

        return NextResponse.json(
            {
                success: false,
                message: "Unable to load the discovery feed.",
            },
            { status: 500 }
        );
    }
}