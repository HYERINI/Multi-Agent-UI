"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function PaymentSuccessClient() {
    const params = useSearchParams();
    const router = useRouter();

    useEffect(() => {
        const paymentKey = params.get("paymentKey");
        const orderId = params.get("orderId");
        const amount = params.get("amount");

        fetch("/api/toss/confirm", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ paymentKey, orderId, amount }),
        });
    }, [params]);

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold">결제 완료</h1>

            <button
                className="mt-6 bg-black text-white px-4 py-2 rounded"
                onClick={() => router.push("/")}
            >
                홈으로 이동
            </button>
        </div>
    );
}
