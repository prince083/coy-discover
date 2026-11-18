
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const DEMO_USER_ID = "demo-user";

const swipeSchema = z.object({
    targetUserId: z.string().min(1, "Target user ID is required."),
    action: z.enum(["LIKE", "PASS"]),
});

export async function POST(request: NextRequest) {
    try {
        // 1. Read and validate the request body.
        let body: unknown;

        try {
            body = await request.json();
        } catch {
            return NextResponse.json(
                { success: false, message: "Invalid JSON body." },
                { status: 400 }
            );
        }

        const validation = swipeSchema.safeParse(body);

        if (!validation.success) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Invalid request data.",
                    errors: validation.error.flatten(),
                },
                { status: 400 }
            );
        }

        const { targetUserId, action } = validation.data;

        // 2. Prevent users from swiping on themselves.
        if (targetUserId === DEMO_USER_ID) {
            return NextResponse.json(
                { success: false, message: "You cannot swipe on yourself." },
                { status: 400 }
            );
        }

        // 3. Check whether the target user exists and has a profile.
        const targetUser = await prisma.user.findUnique({
            where: { id: targetUserId },
            select: {
                id: true,
                profile: {
                    select: { id: true },
                },
            },
        });

        if (!targetUser || !targetUser.profile) {
            return NextResponse.json(
                { success: false, message: "Profile not found." },
                { status: 404 }
            );
        }

        // 4. Save the swipe.
        const swipe = await prisma.swipe.create({
            data: {
                actorId: DEMO_USER_ID,
                targetId: targetUserId,
                action,
            },
        });

        // 5. Check for a mutual LIKE.
        let isMatch = false;

        if (action === "LIKE") {
            const reverseSwipe = await prisma.swipe.findUnique({
                where: {
                    actorId_targetId: {
                        actorId: targetUserId,
                        targetId: DEMO_USER_ID,
                    },
                },
                select: {
                    action: true,
                },
            });

            isMatch = reverseSwipe?.action === "LIKE";
        }

        return NextResponse.json(
            {
                success: true,
                message: isMatch
                    ? "It's a match!"
                    : action === "LIKE"
                        ? "Like saved successfully."
                        : "Pass saved successfully.",
                swipe: {
                    id: swipe.id,
                    targetUserId: swipe.targetId,
                    action: swipe.action,
                },
                isMatch,
            },
            { status: 201 }
        );
    } catch (error) {
        // 6. Handle duplicate swipes.
        if (
            typeof error === "object" &&
            error !== null &&
            "code" in error &&
            error.code === "P2002"
        ) {
            return NextResponse.json(
                {
                    success: false,
                    message: "You have already swiped on this profile.",
                },
                { status: 409 }
            );
        }

        console.error("POST /api/swipe error:", error);

        return NextResponse.json(
            {
                success: false,
                message: "Unable to save your swipe.",
            },
            { status: 500 }
        );
    }
}