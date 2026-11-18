
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const DEMO_USER_ID = "demo-user";

export async function GET() {
    try {
        const matches = await prisma.swipe.findMany({
            where: {
                actorId: DEMO_USER_ID,
                action: "LIKE",
                target: {
                    swipesSent: {
                        some: {
                            targetId: DEMO_USER_ID,
                            action: "LIKE",
                        },
                    },
                },
            },
            select: {
                id: true,
                createdAt: true,
                target: {
                    select: {
                        id: true,
                        name: true,
                        profile: {
                            select: {
                                age: true,
                                photo: true,
                                bio: true,
                                city: true,
                                college: true,
                                interests: true,
                            },
                        },
                    },
                },
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        const formattedMatches = matches.map((match) => ({
            userId: match.target.id,
            name: match.target.name,
            age: match.target.profile?.age,
            photo: match.target.profile?.photo,
            bio: match.target.profile?.bio,
            city: match.target.profile?.city,
            college: match.target.profile?.college,
            interests: match.target.profile?.interests,
            matchedAt: match.createdAt,
        }));

        return NextResponse.json({
            success: true,
            count: formattedMatches.length,
            matches: formattedMatches,
        });
    } catch (error) {
        console.error("GET /api/matches error:", error);

        return NextResponse.json(
            {
                success: false,
                message: "Unable to load matches.",
            },
            { status: 500 }
        );
    }
}