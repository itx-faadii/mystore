import { NextRequest, NextResponse } from "next/server";
import { generateBeautyProductInfo } from "@/lib/ai";
import { GenerateProductInfoRequest } from "@/lib/types";

export async function POST(req: NextRequest) {
  try {
    const body: GenerateProductInfoRequest = await req.json();

    if (!body.name || !body.category) {
      return NextResponse.json(
        { error: "Product name and category are required." },
        { status: 400 }
      );
    }

    const generatedInfo = await generateBeautyProductInfo(body);

    return NextResponse.json({
      success: true,
      data: generatedInfo,
    });
  } catch (error: any) {
    console.error("AI Generation Error:", error);
    return NextResponse.json(
      { error: "Failed to generate product information." },
      { status: 500 }
    );
  }
}
