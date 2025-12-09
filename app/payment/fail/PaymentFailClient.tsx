"use client";

import { useSearchParams, useRouter } from "next/navigation";

export default function PaymentFailClient() {
    const params = useSearchParams();
    const router = useRouter();

    const message = params.get("message");

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold text-red-500">결제 실패</h1>
            <p className="mt-4">{message ?? "결제가 실패했습니다."}</p>

            <button
                className="mt-6 bg-black text-white px-4 py-2 rounded"
                onClick={() => router.push("/")}
            >
                홈으로 이동
            </button>
        </div>
    );
}
